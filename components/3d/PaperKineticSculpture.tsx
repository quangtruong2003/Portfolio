"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, Sparkles } from "lucide-react";

interface PaperKineticSculptureProps {
  stageLabel: string;
  overviewLabel?: string;
  explodeLabel: string;
  assembleLabel: string;
  pulseLabel: string;
  strataHint: string;
  layers: [string, string, string];
  liveDownloads?: string | null;
  language?: "vi" | "en";
}

type GazePreset = "cursor" | "headline" | "projects";

const VERTEX_SHADER_SRC = `
  attribute vec2 aPos;
  varying vec2 vQuadUv;

  void main() {
    // Map [-1..1] quad to [0..1] top-to-bottom UV
    vQuadUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;

  varying vec2 vQuadUv;

  uniform sampler2D uBaseTex;
  uniform sampler2D uMapsTex;
  uniform sampler2D uIrisTex;
  uniform vec2 uEyeGaze;     // in 585x1024 pixel units: x in [-4.8..4.8], y in [-2.5..2.5]
  uniform vec3 uHeadRot;     // x: yaw (rad), y: pitch (rad), z: roll (rad)
  uniform float uBlink;      // [0.0 .. 1.0] eyelid closure
  uniform float uBreath;     // [-1.0 .. +1.0] organic chest breathing
  uniform float uSmile;      // [0.0 .. 1.0] subtle warm expression lift
  uniform float uAspectScale;// aspect ratio framing scale

  const vec2 TEX_SIZE = vec2(585.0, 1024.0);
  const float BUST_V_SPAN = 0.66; // Upper 676px of 1024px portrait
  const vec2 PIVOT_PX = vec2(293.0, 352.0);
  const vec2 L_EYE_C = vec2(246.2, 209.0);
  const vec2 R_EYE_C = vec2(339.6, 210.2);

  // Compute smooth diffeomorphic inverse 3D source coordinate in 585x1024 pixel space
  vec2 computeWarpedPx(vec2 baseUv, out float outDepth, out float outHeadW) {
    vec2 dAndW = texture2D(uMapsTex, clamp(baseUv, vec2(0.001), vec2(0.999))).rg;
    float depth = dAndW.r;
    float headW = dAndW.g;
    outDepth = depth;
    outHeadW = headW;

    vec2 px = baseUv * TEX_SIZE;
    vec2 dPiv = px - PIVOT_PX;

    // 1. Inverse 3D Head Roll around cervical neck pivot
    float cr = cos(-uHeadRot.z);
    float sr = sin(-uHeadRot.z);
    vec2 rotP = vec2(dPiv.x * cr - dPiv.y * sr, dPiv.x * sr + dPiv.y * cr);

    // 2. Smooth 3D Perspective Foreshortening & Relief Parallax (nose/brow/cheeks shift more than ears/neck)
    float zRel = depth - 0.32;
    float yaw = uHeadRot.x;
    float pitch = uHeadRot.y;

    float perspX = 1.0 - (dPiv.x / 293.0) * yaw * 0.11 - zRel * abs(yaw) * 0.06;
    float perspY = 1.0 - (dPiv.y / 352.0) * pitch * 0.09;

    vec2 headSrcDelta = vec2(
      rotP.x * perspX - yaw * (44.0 * zRel + 16.0),
      rotP.y * perspY - pitch * (34.0 * zRel + 12.0)
    );

    // 3. Torso 25% Follow + Gentle Chest Breathing (anchored at bottom edge of frame)
    float bottomFade = clamp((676.0 - px.y) / 320.0, 0.0, 1.0);
    vec2 torsoSrcDelta = vec2(
      dPiv.x * (1.0 - uBreath * 0.006 * bottomFade) - yaw * 11.0 * bottomFade,
      dPiv.y + uBreath * 3.6 * bottomFade - pitch * 6.5 * bottomFade
    );

    float w = headW * headW * (3.0 - 2.0 * headW);
    vec2 warpedPx = PIVOT_PX + mix(torsoSrcDelta, headSrcDelta, w);

    // 4. Subtle Facial Micro-Muscle Coupling in Head-Local Space
    vec2 dL = warpedPx - L_EYE_C;
    vec2 dR = warpedPx - R_EYE_C;
    float peri = exp(-dot(dL, dL) / (2.0 * 24.0 * 24.0)) + exp(-dot(dR, dR) / (2.0 * 24.0 * 24.0));
    warpedPx -= uEyeGaze * 0.17 * peri;

    // Eyebrows gently arch when looking upward or smiling
    vec2 dBrowL = (warpedPx - vec2(244.0, 180.0)) / vec2(38.0, 13.0);
    vec2 dBrowR = (warpedPx - vec2(344.0, 181.0)) / vec2(38.0, 13.0);
    float browMask = exp(-dot(dBrowL, dBrowL) * 0.5) + exp(-dot(dBrowR, dBrowR) * 0.5);
    warpedPx.y += (max(0.0, -uEyeGaze.y) * 0.55 + uSmile * 0.65) * browMask;

    // Subtle warm micro-smile at mouth corners
    vec2 dMouthL = (warpedPx - vec2(253.0, 310.0)) / vec2(18.0, 14.0);
    vec2 dMouthR = (warpedPx - vec2(332.0, 310.0)) / vec2(18.0, 14.0);
    float mL = exp(-dot(dMouthL, dMouthL) * 0.5);
    float mR = exp(-dot(dMouthR, dMouthR) * 0.5);
    warpedPx.y += (mL + mR) * uSmile * 1.15;
    warpedPx.x += (mL - mR) * uSmile * 0.55;

    return warpedPx;
  }

  void main() {
    // Aspect-preserving bust coordinate mapping
    float u = (vQuadUv.x - 0.5) / uAspectScale + 0.5;
    float v = vQuadUv.y * BUST_V_SPAN;
    vec2 baseUv = vec2(u, v);

    // Dynamic 3D Studio Drop-Shadow cast onto the archival wall behind the bust
    vec2 shadowBaseUv = baseUv + vec2(0.018 + uHeadRot.x * 0.048, -0.010 - uHeadRot.y * 0.032);
    float shDepth, shW;
    vec2 shadowWarpedUv = computeWarpedPx(shadowBaseUv, shDepth, shW) / TEX_SIZE;
    float shadowAlpha = 0.0;
    if (shadowWarpedUv.x >= 0.002 && shadowWarpedUv.x <= 0.998 && shadowWarpedUv.y >= 0.002 && shadowWarpedUv.y <= BUST_V_SPAN) {
      shadowAlpha = texture2D(uBaseTex, shadowWarpedUv).a * 0.13;
    }

    if (u < 0.001 || u > 0.999 || v < 0.001 || v > BUST_V_SPAN) {
      gl_FragColor = vec4(0.094, 0.090, 0.082, shadowAlpha);
      return;
    }

    float depth, headW;
    vec2 warpedPx = computeWarpedPx(baseUv, depth, headW);
    vec2 warpedUv = warpedPx / TEX_SIZE;

    if (warpedUv.x < 0.002 || warpedUv.x > 0.998 || warpedUv.y < 0.002 || warpedUv.y > BUST_V_SPAN + 0.02) {
      gl_FragColor = vec4(0.094, 0.090, 0.082, shadowAlpha);
      return;
    }

    vec4 baseSample = texture2D(uBaseTex, warpedUv);
    if (baseSample.a < 0.005) {
      gl_FragColor = vec4(0.094, 0.090, 0.082, shadowAlpha);
      return;
    }

    // Sample eye aperture mask & lid blink coordinate in Head-Local warped space (100% locked to sockets!)
    vec4 localMaps = texture2D(uMapsTex, warpedUv);
    float mEye = localMaps.b;
    float vLid = localMaps.a;
    vec3 color = baseSample.rgb;

    // Photorealistic Eye-Socket Rendering: Real Iris + Foreshortening + Dual Corneal Catchlights
    if (mEye > 0.01) {
      bool isLeft = warpedPx.x < 293.0;
      vec2 eyeC = isLeft ? L_EYE_C : R_EYE_C;

      vec2 rel = (warpedPx - uEyeGaze) - eyeC;
      float foreshorten = max(0.85, 1.0 - abs(uEyeGaze.x) * 0.018);
      float ax = 32.0 + (rel.x / foreshorten) * 3.0 + (isLeft ? 0.0 : 64.0);
      float ay = 32.0 + rel.y * 3.0;

      float xMin = isLeft ? 0.5 : 64.5;
      float xMax = isLeft ? 63.5 : 127.5;

      if (ax >= xMin && ax <= xMax && ay >= 0.5 && ay <= 63.5) {
        vec4 irSample = texture2D(uIrisTex, vec2(ax / 128.0, ay / 64.0));
        if (irSample.a > 0.01) {
          vec2 cl1 = eyeC + uEyeGaze * vec2(0.72, 0.65) + vec2(-1.25, -2.25);
          float d1 = length(warpedPx - cl1);
          float catchLight = exp(-(d1 * d1) / 1.42) * 0.76;

          vec2 cl2 = eyeC + uEyeGaze * vec2(0.75, 0.70) + vec2(2.0, 1.55);
          float d2 = length(warpedPx - cl2);
          catchLight += exp(-(d2 * d2) / 0.88) * 0.23;

          float topAo = clamp((warpedPx.y - (eyeC.y - 5.5)) / 5.0, 0.48, 1.0);
          vec3 irShaded = clamp(irSample.rgb * topAo + vec3(catchLight), 0.0, 1.0);

          vec3 socketCol = mix(baseSample.rgb, irShaded, irSample.a);
          color = mix(color, socketCol, mEye);
        }
      }
    }

    // Natural Eyelid Coupling (upper lid follows downward gaze) & Blink Fold
    float effBlink = clamp(uBlink + max(0.0, uEyeGaze.y / 2.6) * 0.27, 0.0, 0.96);
    float lidMargin = mix(0.22, 0.95, effBlink);

    if (effBlink > 0.01 && vLid > 0.015 && vLid <= lidMargin + 0.07) {
      vec3 skinRef = texture2D(uBaseTex, warpedUv + vec2(0.0, 15.0 / 1024.0)).rgb * 0.95;
      vec3 lashCol = skinRef * 0.23;

      float topF = clamp((vLid - 0.015) / 0.09, 0.0, 1.0);
      float botF = clamp((lidMargin + 0.06 - vLid) / 0.06, 0.0, 1.0);

      bool isLeft = warpedPx.x < 293.0;
      float ux0 = isLeft ? 224.5 : 319.5;
      float ux1 = isLeft ? 266.0 : 362.0;
      float hu = clamp((warpedPx.x - ux0) / (ux1 - ux0), 0.0, 1.0);
      float hEnv = pow(sin(hu * 3.14159265), 0.5);
      float lidAlpha = topF * botF * hEnv * clamp(effBlink * 2.2, 0.0, 1.0);

      float distM = abs(vLid - lidMargin);
      vec3 lidCol;
      if (distM < 0.075) {
        float wL = cos((distM / 0.075) * 1.570796) * (0.55 + 0.35 * effBlink);
        lidCol = mix(skinRef, lashCol, wL);
      } else {
        float vt = clamp((vLid - 0.02) / max(0.05, lidMargin - 0.02), 0.0, 1.0);
        float dome = 0.88 + 0.13 * sin(vt * 3.14159265);
        lidCol = skinRef * dome;
      }
      color = mix(color, lidCol, lidAlpha);
    }

    // Dynamic 3D Normal-Mapped Studio Key Light & Subsurface Skin Warmth
    float dRight = texture2D(uMapsTex, warpedUv + vec2(4.0 / 585.0, 0.0)).r;
    float dDown  = texture2D(uMapsTex, warpedUv + vec2(0.0, 4.0 / 1024.0)).r;
    vec3 surfNormal = normalize(vec3((localMaps.r - dRight) * 5.2 + uHeadRot.x * 0.55, (localMaps.r - dDown) * 5.2 - uHeadRot.y * 0.55, 1.0));

    vec3 keyLightDir = normalize(vec3(-0.22 + uHeadRot.x * 0.85, -0.28 + uHeadRot.y * 0.75, 0.92));
    float diff = dot(surfNormal, keyLightDir);
    float baseDiff = dot(normalize(vec3((localMaps.r - dRight) * 5.2, (localMaps.r - dDown) * 5.2, 1.0)), normalize(vec3(-0.22, -0.28, 0.92)));
    float lightDelta = (diff - baseDiff) * 0.25 * (0.45 + 0.55 * headW);

    color = clamp(color * (1.0 + lightDelta) + vec3(0.015, 0.011, 0.006) * max(0.0, lightDelta), 0.0, 1.0);

    // Composite foreground bust cleanly over cast shadow
    float outAlpha = baseSample.a + shadowAlpha * (1.0 - baseSample.a);
    vec3 shadowRgb = vec3(0.094, 0.090, 0.082);
    vec3 outRgb = mix(shadowRgb, color, baseSample.a / max(0.001, outAlpha));

    gl_FragColor = vec4(outRgb, outAlpha);
  }
`;

function damp(cur: number, target: number, lambda: number, dt: number): number {
  return cur + (target - cur) * (1 - Math.exp(-lambda * dt));
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function PaperKineticSculpture({
  stageLabel,
  pulseLabel,
  strataHint,
  layers,
  liveDownloads,
  language = "en",
}: PaperKineticSculptureProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  const [preset, setPreset] = useState<GazePreset>("cursor");
  const [webglReady, setWebglReady] = useState(false);

  const stateRef = useRef({
    preset: "cursor" as GazePreset,
    pointerNx: 0,
    pointerNy: 0,
    lastPointerMoveAt: 0,
    eyeX: 0,
    eyeY: 0,
    headYaw: 0,
    headPitch: 0,
    headRoll: 0,
    blink: 0,
    blinkPhase: -1,
    doubleBlinkPending: false,
    nextBlinkAt: 2.2,
    nodImpulse: 0,
    smile: 0.15,
    saccadeX: 0,
    saccadeY: 0,
    nextSaccadeAt: 1.8,
  });

  useEffect(() => {
    stateRef.current.preset = preset;
  }, [preset]);

  const triggerBlinkAndNod = useCallback(() => {
    const st = stateRef.current;
    st.blinkPhase = 0;
    st.nodImpulse = 0.11;
    st.smile = 0.85;
  }, []);

  useEffect(() => {
    const onWindowPointerMove = (e: PointerEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const eyeScreenX = rect.left + rect.width * 0.5;
      const eyeScreenY = rect.top + rect.height * 0.34;

      const dx = (e.clientX - eyeScreenX) / Math.max(260, window.innerWidth * 0.45);
      const dy = (e.clientY - eyeScreenY) / Math.max(220, window.innerHeight * 0.42);

      stateRef.current.pointerNx = Math.tanh(dx * 1.25);
      stateRef.current.pointerNy = Math.tanh(dy * 1.25);
      stateRef.current.lastPointerMoveAt = performance.now();

      const insideFrame =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      stateRef.current.smile = insideFrame ? 0.65 : 0.2;
    };

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onWindowPointerMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = stageRef.current;
    if (!canvas || !wrapper) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Single full-screen quad: per-pixel fragment warp guarantees 0% mesh polygon tearing!
    const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uBaseTexLoc = gl.getUniformLocation(prog, "uBaseTex");
    const uMapsTexLoc = gl.getUniformLocation(prog, "uMapsTex");
    const uIrisTexLoc = gl.getUniformLocation(prog, "uIrisTex");
    const uHeadRotLoc = gl.getUniformLocation(prog, "uHeadRot");
    const uEyeGazeLoc = gl.getUniformLocation(prog, "uEyeGaze");
    const uBlinkLoc = gl.getUniformLocation(prog, "uBlink");
    const uBreathLoc = gl.getUniformLocation(prog, "uBreath");
    const uSmileLoc = gl.getUniformLocation(prog, "uSmile");
    const uAspectScaleLoc = gl.getUniformLocation(prog, "uAspectScale");

    const loadTexture = (url: string, unit: number): Promise<WebGLTexture | null> =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const tex = gl.createTexture();
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          resolve(tex);
        };
        img.onerror = () => resolve(null);
        img.src = url;
      });

    let width = 520;
    let height = 390;
    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(260, Math.round(rect.width));
      height = Math.max(260, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReduced = reducedQuery.matches;
    const onReducedChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
    };
    reducedQuery.addEventListener("change", onReducedChange);

    let inViewport = true;
    const io = new IntersectionObserver(
      (entries) => {
        inViewport = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(wrapper);

    let disposed = false;
    let rafId = 0;
    const textures: WebGLTexture[] = [];

    void Promise.all([
      loadTexture("/portrait/truong-eyeless.png", 0),
      loadTexture("/portrait/truong-maps.png", 1),
      loadTexture("/portrait/truong-irises.png", 2),
    ]).then(([t0, t1, t2]) => {
      if (disposed || !t0 || !t1 || !t2) return;
      textures.push(t0, t1, t2);

      gl.uniform1i(uBaseTexLoc, 0);
      gl.uniform1i(uMapsTexLoc, 1);
      gl.uniform1i(uIrisTexLoc, 2);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      setWebglReady(true);

      let elapsed = 0;
      let lastNow = performance.now();

      const animate = (now: number) => {
        rafId = window.requestAnimationFrame(animate);
        if (!inViewport) return;

        const dt = Math.max(0, Math.min((now - lastNow) / 1000, 0.05));
        lastNow = now;
        elapsed += dt;

        const st = stateRef.current;

        if (!prefersReduced) {
          if (st.blinkPhase >= 0) {
            st.blinkPhase += dt / 0.21;
            if (st.blinkPhase >= 1) {
              st.blinkPhase = -1;
              st.blink = 0;
              if (st.doubleBlinkPending) {
                st.doubleBlinkPending = false;
                st.nextBlinkAt = elapsed + 0.14;
              } else {
                st.nextBlinkAt = elapsed + 2.8 + ((Math.sin(elapsed * 7.3) + 1) * 1.3);
              }
            } else {
              const t = st.blinkPhase;
              st.blink =
                t < 0.35
                  ? Math.sin((t / 0.35) * (Math.PI * 0.5))
                  : Math.cos(((t - 0.35) / 0.65) * (Math.PI * 0.5));
            }
          } else if (elapsed >= st.nextBlinkAt) {
            st.blinkPhase = 0;
            st.doubleBlinkPending = Math.sin(elapsed * 13.7) > 0.62;
          }

          if (elapsed >= st.nextSaccadeAt) {
            st.saccadeX = Math.sin(elapsed * 3.7) * 0.24;
            st.saccadeY = Math.cos(elapsed * 2.9) * 0.14;
            st.nextSaccadeAt = elapsed + 1.9 + ((Math.cos(elapsed * 5.1) + 1) * 0.85);
          }
        }

        const pointerIdleSec = (now - st.lastPointerMoveAt) / 1000;
        let targetNx = 0;
        let targetNy = 0;

        if (st.preset === "headline") {
          targetNx = -0.82 + st.saccadeX * 0.25;
          targetNy = -0.14 + st.saccadeY * 0.25;
        } else if (st.preset === "projects") {
          targetNx = -0.45 + st.saccadeX * 0.25;
          targetNy = 0.72 + st.saccadeY * 0.2;
        } else if (pointerIdleSec < 2.6) {
          targetNx = st.pointerNx;
          targetNy = st.pointerNy;
        } else {
          targetNx = st.saccadeX;
          targetNy = st.saccadeY;
        }

        const maxEyePxX = 4.6;
        const maxEyePxY = 2.3;
        const maxHeadYaw = 0.22;
        const maxHeadPitch = 0.15;

        if (prefersReduced) {
          st.eyeX = targetNx * maxEyePxX;
          st.eyeY = targetNy * maxEyePxY;
          st.headYaw = targetNx * maxHeadYaw;
          st.headPitch = targetNy * maxHeadPitch;
          st.headRoll = targetNx * 0.035;
        } else {
          st.eyeX = damp(st.eyeX, targetNx * maxEyePxX, 16.0, dt);
          st.eyeY = damp(st.eyeY, targetNy * maxEyePxY, 16.0, dt);

          const idleSwayYaw = Math.sin(elapsed * 0.95) * 0.022;
          const idleSwayPitch = Math.cos(elapsed * 0.75) * 0.016;
          const idleSwayRoll = Math.sin(elapsed * 0.62) * 0.012;

          st.nodImpulse = damp(st.nodImpulse, 0, 7.5, dt);
          st.smile = damp(st.smile, 0.2, 3.2, dt);

          st.headYaw = damp(st.headYaw, targetNx * maxHeadYaw + idleSwayYaw, 5.2, dt);
          st.headPitch = damp(
            st.headPitch,
            targetNy * maxHeadPitch + idleSwayPitch + st.nodImpulse,
            5.2,
            dt
          );
          st.headRoll = damp(
            st.headRoll,
            targetNx * 0.038 + idleSwayRoll,
            4.6,
            dt
          );
        }

        const breath = prefersReduced ? 0 : Math.sin(elapsed * 1.68);

        const canvasAspect = width / height;
        const bustAspect = 585.0 / 676.0;
        const aspectScale = Math.min(0.96, (bustAspect / canvasAspect) * 0.94);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform3f(uHeadRotLoc, st.headYaw, st.headPitch, st.headRoll);
        gl.uniform2f(uEyeGazeLoc, st.eyeX, st.eyeY);
        gl.uniform1f(uBlinkLoc, st.blink);
        gl.uniform1f(uBreathLoc, breath);
        gl.uniform1f(uSmileLoc, st.smile);
        gl.uniform1f(uAspectScaleLoc, aspectScale);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (readoutRef.current) {
          const yawDeg = Math.round((st.headYaw * 180) / Math.PI);
          const pitchDeg = Math.round((st.headPitch * 180) / Math.PI);
          readoutRef.current.textContent = `YAW ${yawDeg >= 0 ? `+${yawDeg}` : yawDeg}° · PITCH ${pitchDeg >= 0 ? `+${pitchDeg}` : pitchDeg}°`;
        }
      };

      rafId = window.requestAnimationFrame(animate);
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      reducedQuery.removeEventListener("change", onReducedChange);
      textures.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(vbo);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2.0;
    const ny = ((e.clientY - (rect.top + rect.height * 0.34)) / (rect.height * 0.6)) * 1.1;
    stateRef.current.pointerNx = Math.max(-1, Math.min(1, nx));
    stateRef.current.pointerNy = Math.max(-1, Math.min(1, ny));
    stateRef.current.lastPointerMoveAt = performance.now();
    stateRef.current.smile = 0.7;
    if (preset !== "cursor") setPreset("cursor");
  };

  const presetKeys: GazePreset[] = ["cursor", "headline", "projects"];

  return (
    <div className="paper-stack paper-chamfer relative flex flex-col justify-between p-4 sm:p-5">
      {/* Top Archival Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5 font-mono text-xs text-[var(--ink-secondary)]">
        <span className="inline-flex min-w-0 items-center gap-2 truncate font-medium text-[var(--ink-primary)]">
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-patina)]"
            aria-hidden="true"
          />
          <span className="truncate">{stageLabel}</span>
        </span>

        <button
          type="button"
          onClick={triggerBlinkAndNod}
          className="inline-flex min-h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[2px] border border-[var(--rule-strong)] bg-[var(--bg-canvas)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
        >
          <Sparkles size={12} aria-hidden="true" />
          <span>{pulseLabel}</span>
        </button>
      </div>

      {/* 3D Interactive Portrait Studio Aperture */}
      <div
        ref={stageRef}
        onPointerMove={handleStagePointerMove}
        onClick={triggerBlinkAndNod}
        data-cursor="inspect"
        className="paper-well relative my-3 h-[320px] w-full cursor-pointer overflow-hidden rounded-[3px] select-none sm:h-[365px]"
      >
        {/* Subtle Architectural Drafting Halo Behind 3D Bust */}
        <svg
          viewBox="0 0 520 380"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="studio-glow" cx="50%" cy="38%" r="54%">
              <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.95" />
              <stop offset="68%" stopColor="#F1EAE0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#E3DACB" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <rect width="520" height="380" fill="url(#studio-glow)" />

          {/* Concentric Studio Calibration Circles Behind Head */}
          <circle
            cx="260"
            cy="145"
            r="128"
            fill="none"
            stroke="#9E9686"
            strokeOpacity="0.32"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <circle
            cx="260"
            cy="145"
            r="92"
            fill="none"
            stroke="#B8332A"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <line
            x1="44"
            y1="145"
            x2="476"
            y2="145"
            stroke="#9E9686"
            strokeOpacity="0.22"
            strokeWidth="0.8"
          />
          <line
            x1="260"
            y1="16"
            x2="260"
            y2="364"
            stroke="#9E9686"
            strokeOpacity="0.22"
            strokeWidth="0.8"
          />

          {/* Corner Patent Registration Ticks */}
          <path
            d="M 10 24 L 10 10 L 24 10 M 496 10 L 510 10 L 510 24 M 10 356 L 10 370 L 24 370 M 496 370 L 510 370 L 510 356"
            fill="none"
            stroke="#8E8677"
            strokeWidth="1.1"
          />
        </svg>

        {/* Live WebGL Per-Pixel 3D Head & Eye-Tracking Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={stageLabel}
          className={
            "relative z-10 block h-full w-full transition-opacity duration-300 " +
            (webglReady ? "opacity-100" : "opacity-0")
          }
        />

        {/* Top-Left & Top-Right Live 3D Pose Telemetry Badges */}
        <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-center justify-between gap-2 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)]/90 px-2 py-0.5 text-[var(--ink-primary)]">
            <Eye size={12} className="text-[var(--accent-vermilion)]" aria-hidden="true" />
            <span>3D GAZE · 60FPS</span>
          </span>

          <span
            ref={readoutRef}
            className="hidden rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)]/90 px-2 py-0.5 text-[var(--ink-secondary)] tabular-nums sm:inline-block"
          >
            YAW +0° · PITCH +0°
          </span>
        </div>

        {/* Bottom Identity & Live SmoothScroll Badge Inside Frame */}
        <div className="pointer-events-none absolute inset-x-3 bottom-2.5 z-20 flex items-center justify-between gap-2">
          <span className="rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)]/92 px-2.5 py-1 font-mono text-xs font-medium text-[var(--ink-primary)] shadow-[0_4px_12px_rgba(24,23,21,0.08)]">
            {language === "vi" ? "Nguyễn Quang Trường" : "Nguyen Quang Truong"}
          </span>

          {liveDownloads && (
            <span className="rounded-[2px] border border-[var(--accent-patina)]/35 bg-[var(--accent-patina-wash)]/95 px-2.5 py-1 font-mono text-xs font-semibold text-[var(--accent-patina)] shadow-[0_4px_12px_rgba(24,23,21,0.08)]">
              {`SmoothScroll · ${liveDownloads}`}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Interactive Gaze Direction Switcher */}
      <div className="space-y-2 border-t border-[var(--rule-cut)] pt-2.5">
        <p className="font-sans text-xs text-[var(--ink-secondary)]">{strataHint}</p>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3" role="tablist" aria-label={stageLabel}>
          {layers.map((label, idx) => {
            const key = presetKeys[idx] ?? "cursor";
            const active = preset === key;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setPreset(key);
                  triggerBlinkAndNod();
                }}
                className={
                  "min-h-9 cursor-pointer rounded-[3px] border px-2.5 py-1.5 text-left font-mono text-xs transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] " +
                  (active
                    ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] font-semibold text-[var(--bg-sheet-top)]"
                    : "border-[var(--rule-cut)] bg-[var(--bg-canvas)] text-[var(--ink-secondary)] hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)]")
                }
              >
                <span className="block truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
