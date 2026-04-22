"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import OrbPlaceholder from "./OrbPlaceholder";

const CodeOrbClient = dynamic(() => import("./CodeOrbClient"), {
  ssr: false,
  loading: () => <OrbPlaceholder />,
});

interface CodeOrbProps {
  mouseX?: number;
  mouseY?: number;
}

export default function CodeOrb(_props: CodeOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[360px] md:min-h-[480px]">
      <CodeOrbClient mouseX={mouse.x} mouseY={mouse.y} />
    </div>
  );
}
