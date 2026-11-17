"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PaperKineticSculptureProps {
  stageLabel: string;
  explodeLabel: string;
  assembleLabel: string;
  pulseLabel: string;
  strataHint: string;
  layers: [string, string, string];
}

const DATUM_CODES = ["FIG.1A · RUST", "FIG.1B · API", "FIG.1C · DATA"] as const;

function createRingPlateGeometry(
  outerRadius: number,
  innerRadius: number,
  depth: number,
  segments = 48
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  if (innerRadius > 0.05) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: segments,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}

function createNotchedSquarePlate(
  halfSize: number,
  chamfer: number,
  holeRadius: number,
  depth: number
): THREE.ExtrudeGeometry {
  const s = halfSize;
  const c = chamfer;
  const shape = new THREE.Shape();
  shape.moveTo(-s + c, -s);
  shape.lineTo(s - c, -s);
  shape.lineTo(s, -s + c);
  shape.lineTo(s, s - c);
  shape.lineTo(s - c, s);
  shape.lineTo(-s + c, s);
  shape.lineTo(-s, s - c);
  shape.lineTo(-s, -s + c);
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.028,
    bevelThickness: 0.024,
    curveSegments: 48,
  });
  geometry.center();
  return geometry;
}

export default function PaperKineticSculpture({
  stageLabel,
  explodeLabel,
  assembleLabel,
  pulseLabel,
  strataHint,
  layers,
}: PaperKineticSculptureProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<SVGSVGElement>(null);
  const overlaySvgRef = useRef<SVGSVGElement>(null);
  const cornerTicksRef = useRef<SVGPathElement>(null);
  const leaderPathRef = useRef<SVGPathElement>(null);
  const leaderDotRef = useRef<SVGCircleElement>(null);
  const leaderRingRef = useRef<SVGCircleElement>(null);
  const leaderTextRef = useRef<SVGTextElement>(null);

  const [exploded, setExploded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const stateRef = useRef({
    exploded: false,
    activeLayer: 0,
    pointerX: 0,
    pointerY: 0,
    rotorVelocity: 0.35,
    pulseWave: 0,
    needsFrame: true,
  });

  useEffect(() => {
    stateRef.current.exploded = exploded;
    stateRef.current.needsFrame = true;
  }, [exploded]);

  useEffect(() => {
    stateRef.current.activeLayer = activeLayer;
    stateRef.current.needsFrame = true;
  }, [activeLayer]);

  const triggerPulse = useCallback(() => {
    stateRef.current.rotorVelocity = Math.min(stateRef.current.rotorVelocity + 3.2, 7.5);
    stateRef.current.pulseWave = 1;
    stateRef.current.needsFrame = true;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReduced = reducedMotionQuery.matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, -1.35, 7.4);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xf9f5eb, 1.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffcf5, 1.85);
    keyLight.position.set(3.2, 4.4, 6.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.bias = -0.0015;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe5d4bc, 0.7);
    rimLight.position.set(-4.2, -2.5, 3.5);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    rootGroup.rotation.x = -0.34;
    rootGroup.rotation.y = 0.24;
    scene.add(rootGroup);

    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const matStratumBase = track(
      new THREE.MeshStandardMaterial({
        color: 0xdad2c1,
        roughness: 0.92,
        metalness: 0.02,
      })
    );
    const matStratumMid = track(
      new THREE.MeshStandardMaterial({
        color: 0xeae4d7,
        roughness: 0.9,
        metalness: 0.02,
      })
    );
    const matStratumTop = track(
      new THREE.MeshStandardMaterial({
        color: 0xf9f7f1,
        roughness: 0.88,
        metalness: 0.02,
      })
    );
    const matVermilion = track(
      new THREE.MeshStandardMaterial({
        color: 0xb8332a,
        roughness: 0.58,
        metalness: 0.08,
      })
    );
    const matBrass = track(
      new THREE.MeshStandardMaterial({
        color: 0xb68434,
        roughness: 0.42,
        metalness: 0.52,
      })
    );
    const matInkLine = track(
      new THREE.LineBasicMaterial({
        color: 0x3b3831,
        transparent: true,
        opacity: 0.35,
      })
    );
    const matActiveLine = track(
      new THREE.LineBasicMaterial({
        color: 0xb8332a,
        transparent: true,
        opacity: 0.95,
      })
    );

    // Stratum III: Base Foundation Sheet (MySQL & Redis)
    const stratum3Group = new THREE.Group();
    const geomBase = track(createNotchedSquarePlate(2.12, 0.38, 0.72, 0.16));
    const meshBase = new THREE.Mesh(geomBase, matStratumBase);
    meshBase.castShadow = true;
    meshBase.receiveShadow = true;
    stratum3Group.add(meshBase);

    const edgesBase = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(geomBase, 28)),
      matInkLine
    );
    stratum3Group.add(edgesBase);

    const barGeom = track(new THREE.BoxGeometry(0.42, 0.06, 0.05));
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const bar = new THREE.Mesh(barGeom, matBrass);
      bar.position.set(Math.cos(angle) * 1.52, Math.sin(angle) * 1.52, 0.1);
      bar.rotation.z = angle;
      bar.castShadow = true;
      stratum3Group.add(bar);
    }

    // Stratum II: Middle Cut-Paper Gate Ring (Laravel API & Queues)
    const stratum2Group = new THREE.Group();
    const geomMid = track(createNotchedSquarePlate(1.76, 0.56, 0.98, 0.15));
    const meshMid = new THREE.Mesh(geomMid, matStratumMid);
    meshMid.castShadow = true;
    meshMid.receiveShadow = true;
    stratum2Group.add(meshMid);

    const edgesMid = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(geomMid, 28)),
      matInkLine
    );
    stratum2Group.add(edgesMid);

    // Stratum I: Top Precision Paper Aperture (Native Hook & Rust Core)
    const stratum1Group = new THREE.Group();
    const geomTop = track(createNotchedSquarePlate(1.42, 0.26, 0.84, 0.14));
    const meshTop = new THREE.Mesh(geomTop, matStratumTop);
    meshTop.castShadow = true;
    meshTop.receiveShadow = true;
    stratum1Group.add(meshTop);

    const edgesTop = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(geomTop, 28)),
      matInkLine
    );
    stratum1Group.add(edgesTop);

    // Central Kinetic Rotor Assembly (SmoothScroll Physics Wheel)
    const rotorGroup = new THREE.Group();
    const outerWheelGeom = track(createRingPlateGeometry(0.72, 0.48, 0.14, 56));
    const outerWheelMesh = new THREE.Mesh(outerWheelGeom, matVermilion);
    outerWheelMesh.castShadow = true;
    outerWheelMesh.receiveShadow = true;
    rotorGroup.add(outerWheelMesh);

    const innerHubGeom = track(createRingPlateGeometry(0.32, 0.11, 0.18, 36));
    const innerHubMesh = new THREE.Mesh(innerHubGeom, matBrass);
    innerHubMesh.castShadow = true;
    rotorGroup.add(innerHubMesh);

    const spokeGeom = track(new THREE.BoxGeometry(0.18, 0.045, 0.09));
    for (let i = 0; i < 12; i++) {
      const theta = (i / 12) * Math.PI * 2;
      const spoke = new THREE.Mesh(spokeGeom, i % 3 === 0 ? matBrass : matStratumTop);
      spoke.position.set(Math.cos(theta) * 0.4, Math.sin(theta) * 0.4, 0.02);
      spoke.rotation.z = theta;
      spoke.castShadow = true;
      rotorGroup.add(spoke);
    }

    rootGroup.add(stratum3Group);
    rootGroup.add(stratum2Group);
    rootGroup.add(stratum1Group);
    rootGroup.add(rotorGroup);

    const pinGeom = track(new THREE.CylinderGeometry(0.032, 0.032, 1.2, 16));
    pinGeom.rotateX(Math.PI / 2);
    const pins: THREE.Mesh[] = [];
    const pinCoords = [
      [-1.18, 1.18],
      [1.18, 1.18],
      [-1.18, -1.18],
      [1.18, -1.18],
    ];
    for (const [px, py] of pinCoords) {
      const pin = new THREE.Mesh(pinGeom, matBrass);
      pin.position.set(px, py, 0.1);
      rootGroup.add(pin);
      pins.push(pin);
    }

    const canvas = renderer.domElement;
    canvas.className = "h-full w-full block";
    container.innerHTML = "";
    container.appendChild(canvas);

    const resize = () => {
      if (!container) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      stateRef.current.needsFrame = true;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let inViewport = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inViewport = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
      stateRef.current.needsFrame = true;
    };
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    let curTiltX = -0.34;
    let curTiltY = 0.24;
    let curExplode = stateRef.current.exploded ? 1 : 0;
    let rotorAngle = 0;
    let rafId = 0;
    let lastTime = performance.now();

    const layerGroups = [stratum1Group, stratum2Group, stratum3Group];
    const layerEdges = [edgesTop, edgesMid, edgesBase];
    // Exact unoccluded outer bevel-rim anchors in local plate space:
    // Stratum I (foreground): upper-right bevel edge -> open top-right margin
    // Stratum II (mid): exposed upper-left bevel edge -> open top-left margin
    // Stratum III (base): exposed lower-left bevel edge -> open bottom-left margin
    const localAnchors = [
      new THREE.Vector3(1.42, 0.52, 0.095),
      new THREE.Vector3(-1.76, 0.24, 0.095),
      new THREE.Vector3(-2.12, -0.52, 0.1),
    ];
    const projVec = new THREE.Vector3();

    const updateLeaderProjection = () => {
      const w = Math.max(container.clientWidth, 260);
      const h = Math.max(container.clientHeight, 220);

      if (overlaySvgRef.current) {
        overlaySvgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }
      if (cornerTicksRef.current) {
        cornerTicksRef.current.setAttribute(
          "d",
          `M 10 22 L 10 10 L 22 10 M ${w - 22} 10 L ${w - 10} 10 L ${w - 10} 22 M 10 ${h - 22} L 10 ${h - 10} L 22 ${h - 10} M ${w - 22} ${h - 10} L ${w - 10} ${h - 10} L ${w - 10} ${h - 22}`
        );
      }

      scene.updateMatrixWorld(true);
      const idx = stateRef.current.activeLayer;
      const targetGroup = layerGroups[idx] ?? stratum1Group;
      const localAnchor = localAnchors[idx] ?? localAnchors[0];

      projVec.copy(localAnchor).applyMatrix4(targetGroup.matrixWorld).project(camera);

      // Exact 1:1 CSS pixel coordinates on the Three.js canvas — zero horizontal/vertical clamping
      const sx = (projVec.x * 0.5 + 0.5) * w;
      const sy = (-projVec.y * 0.5 + 0.5) * h;

      let labelY: number;
      let elbowX: number;
      let lineEndX: number;
      let textX: number;
      let textAnchor: "start" | "end";

      if (idx === 0) {
        // Stratum I -> open top-right margin
        labelY = 26;
        textX = w - 20;
        textAnchor = "end";
        lineEndX = w - 102;
        elbowX = Math.min(lineEndX - 10, sx + 22);
      } else if (idx === 1) {
        // Stratum II -> open top-left margin
        labelY = 26;
        textX = 20;
        textAnchor = "start";
        lineEndX = 96;
        elbowX = Math.max(lineEndX + 10, sx - 22);
      } else {
        // Stratum III -> open bottom-left margin
        labelY = h - 22;
        textX = 20;
        textAnchor = "start";
        lineEndX = 102;
        elbowX = Math.max(lineEndX + 10, sx - 16);
      }

      if (leaderPathRef.current) {
        leaderPathRef.current.setAttribute(
          "d",
          `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${elbowX.toFixed(1)} ${labelY.toFixed(1)} L ${lineEndX.toFixed(1)} ${labelY.toFixed(1)}`
        );
      }
      if (leaderDotRef.current) {
        leaderDotRef.current.setAttribute("cx", sx.toFixed(1));
        leaderDotRef.current.setAttribute("cy", sy.toFixed(1));
      }
      if (leaderRingRef.current) {
        leaderRingRef.current.setAttribute("cx", sx.toFixed(1));
        leaderRingRef.current.setAttribute("cy", sy.toFixed(1));
      }
      if (leaderTextRef.current) {
        leaderTextRef.current.setAttribute("x", textX.toFixed(1));
        leaderTextRef.current.setAttribute("y", (labelY + 3.5).toFixed(1));
        leaderTextRef.current.setAttribute("text-anchor", textAnchor);
        leaderTextRef.current.textContent = DATUM_CODES[idx] ?? DATUM_CODES[0];
      }
    };

    const animateFrame = (now: number) => {
      rafId = window.requestAnimationFrame(animateFrame);
      if (!inViewport) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const st = stateRef.current;
      const targetExplode = st.exploded ? 1 : 0;
      const targetTiltX = -0.34 + st.pointerY * 0.22;
      const targetTiltY = 0.24 + st.pointerX * 0.28;

      if (prefersReduced) {
        curExplode = targetExplode;
        curTiltX = -0.34;
        curTiltY = 0.24;
      } else {
        curExplode += (targetExplode - curExplode) * Math.min(1, dt * 6.5);
        curTiltX += (targetTiltX - curTiltX) * Math.min(1, dt * 6);
        curTiltY += (targetTiltY - curTiltY) * Math.min(1, dt * 6);

        rotorAngle += st.rotorVelocity * dt;
        st.rotorVelocity += (0.28 - st.rotorVelocity) * Math.min(1, dt * 2.4);
        st.pulseWave = Math.max(0, st.pulseWave - dt * 1.8);
      }

      const spread = 0.24 + curExplode * 0.56;
      const waveLift = Math.sin(st.pulseWave * Math.PI) * 0.09;

      stratum3Group.position.z = -spread;
      stratum2Group.position.z = 0 + waveLift * 0.5;
      stratum1Group.position.z = spread + waveLift;
      rotorGroup.position.z = spread * 0.55 + 0.06 + waveLift * 1.2;

      stratum2Group.rotation.z = curExplode * 0.08;
      rotorGroup.rotation.z = -rotorAngle;

      for (const pin of pins) {
        pin.scale.z = 0.45 + curExplode * 0.65;
      }

      layerEdges.forEach((edge, idx) => {
        edge.material = st.activeLayer === idx ? matActiveLine : matInkLine;
      });

      rootGroup.rotation.x = curTiltX;
      rootGroup.rotation.y = curTiltY;

      if (!prefersReduced || st.needsFrame) {
        renderer.render(scene, camera);
        updateLeaderProjection();
        st.needsFrame = false;
      }
    };

    const spreadInit = 0.24 + curExplode * 0.56;
    stratum3Group.position.z = -spreadInit;
    stratum1Group.position.z = spreadInit;
    rotorGroup.position.z = spreadInit * 0.55 + 0.06;
    renderer.render(scene, camera);
    updateLeaderProjection();
    container.dataset.ready = "true";
    if (fallbackRef.current) {
      fallbackRef.current.style.display = "none";
    }
    rafId = window.requestAnimationFrame(animateFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    stateRef.current.pointerX = nx;
    stateRef.current.pointerY = ny;
  };

  const handlePointerLeave = () => {
    stateRef.current.pointerX = 0;
    stateRef.current.pointerY = 0;
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const boost = Math.min(Math.abs(event.deltaY) * 0.018, 3.8);
    stateRef.current.rotorVelocity = Math.min(stateRef.current.rotorVelocity + boost, 8);
    stateRef.current.pulseWave = 0.85;
  };

  return (
    <div
      data-cursor="inspect"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onWheel={handleWheel}
      className="paper-well relative flex flex-col justify-between overflow-hidden rounded-[4px] p-4 sm:p-5"
    >
      {/* Top Drafting Registration Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5">
        <span className="font-mono text-xs uppercase tracking-[0.04em] text-[var(--ink-secondary)]">
          {stageLabel}
        </span>
        <span className="font-mono text-xs text-[var(--ink-tertiary)] tabular-nums">
          SCALE 1:1
        </span>
      </div>

      {/* 3D Sculpture Viewport + Immediate Layered Paper-Cut SVG Fallback */}
      <div className="relative my-2 h-[250px] w-full sm:h-[290px]">
        <svg
          ref={fallbackRef}
          viewBox="0 0 360 280"
          className="h-full w-full"
          role="img"
          aria-label={stageLabel}
        >
          <defs>
            <filter id="cut-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#181715" floodOpacity="0.16" />
            </filter>
          </defs>
          <polygon
            points="78,42 282,42 308,68 308,212 282,238 78,238 52,212 52,68"
            fill="#DAD2C1"
            stroke={activeLayer === 2 ? "#B8332A" : "#8E8677"}
            strokeWidth="1.5"
            filter="url(#cut-shadow)"
            transform={exploded ? "translate(0, 14)" : undefined}
          />
          <polygon
            points="102,58 258,58 284,84 284,196 258,222 102,222 76,196 76,84"
            fill="#EAE4D7"
            stroke={activeLayer === 1 ? "#B8332A" : "#8E8677"}
            strokeWidth="1.5"
            filter="url(#cut-shadow)"
          />
          <polygon
            points="124,74 236,74 258,96 258,184 236,206 124,206 102,184 102,96"
            fill="#F9F7F1"
            stroke={activeLayer === 0 ? "#B8332A" : "#8E8677"}
            strokeWidth="1.5"
            filter="url(#cut-shadow)"
            transform={exploded ? "translate(0, -14)" : undefined}
          />
          <circle cx="180" cy="140" r="46" fill="none" stroke="#B8332A" strokeWidth="14" />
          <circle cx="180" cy="140" r="18" fill="none" stroke="#B68434" strokeWidth="7" />
        </svg>

        <div
          ref={mountRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-300 data-[ready=true]:opacity-100"
          aria-hidden="true"
        />

        {/* Camera-Projected Patent-Sheet SVG Leader Callout + Corner Registration Marks */}
        <svg
          ref={overlaySvgRef}
          viewBox="0 0 480 290"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Corner Patent Registration Ticks */}
          <path
            ref={cornerTicksRef}
            d="M 10 22 L 10 10 L 22 10 M 458 10 L 470 10 L 470 22 M 10 268 L 10 280 L 22 280 M 458 280 L 470 280 L 470 268"
            fill="none"
            stroke="#9E9686"
            strokeWidth="1"
          />
          <path
            ref={leaderPathRef}
            d="M 320 96 L 342 26 L 378 26"
            fill="none"
            stroke="#B8332A"
            strokeWidth="1.25"
            strokeDasharray="3 2.5"
          />
          <circle
            ref={leaderRingRef}
            cx="320"
            cy="96"
            r="6"
            fill="none"
            stroke="#B8332A"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <circle ref={leaderDotRef} cx="320" cy="96" r="3" fill="#B8332A" />
          <text
            ref={leaderTextRef}
            x="460"
            y="29.5"
            textAnchor="end"
            fill="#B8332A"
            fontSize="10.5"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            {DATUM_CODES[activeLayer]}
          </text>
        </svg>
      </div>

      {/* Interactive Stratum Selector Tabs */}
      <div className="relative z-10 space-y-2.5 border-t border-[var(--rule-cut)] pt-3">
        <p className="font-sans text-xs text-[var(--ink-secondary)]">{strataHint}</p>

        <div className="grid grid-cols-1 gap-1.5">
          {layers.map((layerName, index) => {
            const isSelected = activeLayer === index;
            return (
              <button
                key={layerName}
                type="button"
                onClick={() => setActiveLayer(index)}
                aria-pressed={isSelected}
                className={
                  "flex min-h-11 w-full cursor-pointer items-center justify-between rounded-[3px] border px-3 py-1.5 text-left font-mono text-xs transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.99] " +
                  (isSelected
                    ? "border-[var(--accent-vermilion)] bg-[var(--bg-sheet-top)] font-medium text-[var(--ink-primary)] shadow-[0_2px_6px_rgba(24,23,21,0.06)]"
                    : "border-transparent bg-[var(--bg-canvas)]/70 text-[var(--ink-secondary)] hover:border-[var(--rule-cut)] hover:bg-[var(--bg-sheet-top)]/70")
                }
              >
                <span className="truncate pr-2">{layerName}</span>
                <span
                  className={
                    "shrink-0 rounded-[2px] px-1.5 py-0.5 text-xs tabular-nums " +
                    (isSelected
                      ? "bg-[var(--accent-vermilion)] text-[var(--bg-sheet-top)]"
                      : "bg-[var(--bg-sheet-mid)] text-[var(--ink-tertiary)]")
                  }
                >
                  {`0${index + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explode / Pulse Controls */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => setExploded((prev) => !prev)}
            aria-pressed={exploded}
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-3 font-sans text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color,transform] duration-150 ease-out hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] active:scale-[0.97]"
          >
            {exploded ? assembleLabel : explodeLabel}
          </button>
          <button
            type="button"
            onClick={triggerPulse}
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-3 font-sans text-xs font-medium text-[var(--ink-primary)] transition-[background-color,border-color,color,transform] duration-150 ease-out hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
          >
            {pulseLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
