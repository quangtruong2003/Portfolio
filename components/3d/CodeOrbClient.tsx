"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";

// ─── Skill Data ────────────────────────────────────────────────────────────────

type Category = "backend" | "database" | "frontend" | "tools";

interface SkillNode {
  name: string;
  category: Category;
  orbit: "inner" | "outer";
}

const SKILLS: SkillNode[] = [
  { name: "PHP", category: "backend", orbit: "inner" },
  { name: "Laravel", category: "backend", orbit: "inner" },
  { name: "MySQL", category: "database", orbit: "inner" },
  { name: "RESTful API", category: "backend", orbit: "inner" },
  { name: "Spring Boot", category: "backend", orbit: "outer" },
  { name: "React", category: "frontend", orbit: "outer" },
  { name: "Tailwind", category: "frontend", orbit: "outer" },
  { name: "Git", category: "tools", orbit: "outer" },
  { name: "Filament", category: "frontend", orbit: "outer" },
  { name: "Firebase", category: "tools", orbit: "outer" },
  { name: "JWT", category: "backend", orbit: "outer" },
  { name: "VNPay", category: "tools", orbit: "outer" },
  { name: "Clerk", category: "tools", orbit: "outer" },
  { name: "RBAC", category: "backend", orbit: "outer" },
];

const CATEGORY_COLORS: Record<Category, string> = {
  backend: "#c96442",
  database: "#e07a5f",
  frontend: "#d97757",
  tools: "#b85c38",
};

const ORBIT_RADIUS: Record<"inner" | "outer", number> = {
  inner: 1.65,
  outer: 2.8,
};
const ORBIT_SPEED: Record<"inner" | "outer", number> = {
  inner: 0.18,
  outer: 0.09,
};

// ─── Constellation Lines ───────────────────────────────────────────────────────

function ConstellationLine({
  start,
  end,
  color,
  opacity,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  opacity: number;
}) {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={0.8}
      transparent
      opacity={opacity}
      dashed
      dashSize={0.08}
      gapSize={0.04}
    />
  );
}

// ─── Orbital Path Ring ────────────────────────────────────────────────────────

function OrbitPath({
  radius,
  color,
  opacity,
}: {
  radius: number;
  color: string;
  opacity: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime();
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.05) * 0.12;
    ringRef.current.rotation.z = t * 0.03;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 6, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={opacity}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
}

// ─── Skill Sphere ─────────────────────────────────────────────────────────────

function SkillSphere({
  skill,
  orbitRadius,
  startAngle,
  orbitSpeed,
  index,
}: {
  skill: SkillNode;
  orbitRadius: number;
  startAngle: number;
  orbitSpeed: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const vecRef = useRef(new THREE.Vector3());

  const color = CATEGORY_COLORS[skill.category];
  const sphereSize = skill.orbit === "inner" ? 0.13 : 0.1;
  const bobOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const bobSpeed = useMemo(() => 0.6 + Math.random() * 0.4, []);
  const verticalOffset = useMemo(() => (Math.random() - 0.5) * 0.6, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = clock.getElapsedTime();

    const angle = startAngle + t * orbitSpeed;
    const bobY = Math.sin(t * bobSpeed + bobOffset) * 0.08;

    vecRef.current.set(
      Math.cos(angle) * orbitRadius,
      verticalOffset + bobY,
      Math.sin(angle) * orbitRadius
    );

    groupRef.current.position.copy(vecRef.current);
    meshRef.current.rotation.y = t * 0.5 + index;
    meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.3;
  });

  return (
    <group ref={groupRef}>
      <Float speed={0} rotationIntensity={0} floatIntensity={0}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[sphereSize, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.9}
            roughness={0.15}
            metalness={0.6}
          />
        </mesh>
        {/* Glow halo */}
        <mesh>
          <sphereGeometry args={[sphereSize * 1.8, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.15}
            transparent
            opacity={0.08}
            roughness={1}
            side={THREE.BackSide}
          />
        </mesh>
        {/* HTML Label */}
        <Html
          position={[0, sphereSize + 0.22, 0]}
          center
          distanceFactor={6}
          occlude={false}
          zIndexRange={[0, 10]}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 9px 3px 6px",
              background: "rgba(249, 246, 238, 0.82)",
              backdropFilter: "blur(8px)",
              borderRadius: "20px",
              border: `1px solid ${color}40`,
              boxShadow: `0 2px 12px rgba(201, 100, 66, 0.12), 0 1px 3px rgba(0,0,0,0.06)`,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "#3d2a1e",
              whiteSpace: "nowrap",
              cursor: "default",
              userSelect: "none",
              animation: `fadeSlideIn 0.6s ease ${index * 0.06}s both`,
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            {skill.name}
          </div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateX(-8px) scale(0.9); }
              to   { opacity: 1; transform: translateX(0) scale(1); }
            }
          `}</style>
        </Html>
      </Float>
    </group>
  );
}

// ─── Central Crystal ──────────────────────────────────────────────────────────

function CentralCrystal() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!coreRef.current || !innerRef.current) return;
    const t = clock.getElapsedTime();
    coreRef.current.rotation.y = t * 0.28;
    coreRef.current.rotation.x = t * 0.14;
    innerRef.current.rotation.y = -t * 0.2;
    innerRef.current.rotation.z = t * 0.1;
  });

  return (
    <group>
      {/* Outer crystal */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#c96442"
          emissive="#c96442"
          emissiveIntensity={1.2}
          roughness={0.05}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      {/* Inner glow core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#f5f4ed"
          emissive="#e8a87c"
          emissiveIntensity={1.5}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Point light from crystal */}
      <pointLight intensity={6} color="#c96442" distance={4} decay={2} />
    </group>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const innerSkills = useMemo(
    () => SKILLS.filter((s) => s.orbit === "inner"),
    []
  );
  const outerSkills = useMemo(
    () => SKILLS.filter((s) => s.orbit === "outer"),
    []
  );

  const innerAngles = useMemo(
    () =>
      innerSkills.map((_, i) => (i / innerSkills.length) * Math.PI * 2),
    [innerSkills]
  );
  const outerAngles = useMemo(
    () =>
      outerSkills.map((_, i) => (i / outerSkills.length) * Math.PI * 2 + 0.3),
    [outerSkills]
  );

  const innerLines = useMemo(() => {
    const lines: Array<{
      start: THREE.Vector3;
      end: THREE.Vector3;
    }> = [];
    for (let i = 0; i < innerSkills.length; i++) {
      const a0 = innerAngles[i];
      const a1 = innerAngles[(i + 1) % innerSkills.length];
      const r = ORBIT_RADIUS.inner;
      lines.push({
        start: new THREE.Vector3(Math.cos(a0) * r, 0, Math.sin(a0) * r),
        end: new THREE.Vector3(Math.cos(a1) * r, 0, Math.sin(a1) * r),
      });
    }
    return lines;
  }, [innerSkills, innerAngles]);

  const outerLines = useMemo(() => {
    const lines: Array<{
      start: THREE.Vector3;
      end: THREE.Vector3;
    }> = [];
    for (let i = 0; i < outerSkills.length; i++) {
      const a0 = outerAngles[i];
      const a1 = outerAngles[(i + 1) % outerSkills.length];
      const r = ORBIT_RADIUS.outer;
      lines.push({
        start: new THREE.Vector3(Math.cos(a0) * r, 0, Math.sin(a0) * r),
        end: new THREE.Vector3(Math.cos(a1) * r, 0, Math.sin(a1) * r),
      });
    }
    return lines;
  }, [outerSkills, outerAngles]);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseX * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouseY * 0.3,
      0.03
    );
    camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.06,
        0.03
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY * 0.04,
        0.03
      );
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} color="#f5f4ed" />
      <pointLight position={[5, 5, 5]} intensity={12} color="#c96442" />
      <pointLight position={[-4, -2, -4]} intensity={6} color="#d97757" />
      <pointLight position={[0, -4, 3]} intensity={4} color="#e8a87c" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <OrbitPath radius={ORBIT_RADIUS.inner} color="#c96442" opacity={0.18} />
        <OrbitPath radius={ORBIT_RADIUS.outer} color="#d97757" opacity={0.12} />

        {innerLines.map((line, i) => (
          <ConstellationLine
            key={`inner-${i}`}
            start={line.start}
            end={line.end}
            color="#c96442"
            opacity={0.35}
          />
        ))}

        {outerLines.map((line, i) => (
          <ConstellationLine
            key={`outer-${i}`}
            start={line.start}
            end={line.end}
            color="#d97757"
            opacity={0.25}
          />
        ))}

        {innerSkills.map((skill, i) => {
          const a = innerAngles[i];
          const rInner = ORBIT_RADIUS.inner;
          const rOuter = ORBIT_RADIUS.outer;
          return (
            <ConstellationLine
              key={`cross-${i}`}
              start={new THREE.Vector3(Math.cos(a) * rInner, 0, Math.sin(a) * rInner)}
              end={new THREE.Vector3(Math.cos(a) * rOuter, 0, Math.sin(a) * rOuter)}
              color="#b85c38"
              opacity={0.15}
            />
          );
        })}

        {innerSkills.map((skill, i) => (
          <SkillSphere
            key={skill.name + "-inner"}
            skill={skill}
            orbitRadius={ORBIT_RADIUS.inner}
            startAngle={innerAngles[i]}
            orbitSpeed={ORBIT_SPEED.inner}
            index={i}
          />
        ))}

        {outerSkills.map((skill, i) => (
          <SkillSphere
            key={skill.name + "-outer"}
            skill={skill}
            orbitRadius={ORBIT_RADIUS.outer}
            startAngle={outerAngles[i]}
            orbitSpeed={ORBIT_SPEED.outer}
            index={i + innerSkills.length}
          />
        ))}

        <CentralCrystal />
      </Float>
    </group>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface CodeOrbClientProps {
  mouseX?: number;
  mouseY?: number;
}

export default function CodeOrbClient({ mouseX = 0, mouseY = 0 }: CodeOrbClientProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  );
}
