"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural Idealcombi-style window: slim charcoal frame, glazed sash that
 * opens on demand. Built from primitives (no model download → fast first load).
 */
function WindowModel({ open, colour }: { open: boolean; colour: string }) {
  const sash = useRef<THREE.Group>(null);
  const target = open ? -Math.PI * 0.42 : 0;

  useFrame((_, delta) => {
    if (!sash.current) return;
    sash.current.rotation.y = THREE.MathUtils.damp(sash.current.rotation.y, target, 4, delta);
  });

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colour, metalness: 0.35, roughness: 0.45 }),
    [colour]
  );
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 0.92, thickness: 0.4, roughness: 0.05,
        metalness: 0, color: "#cfd8da", ior: 1.5,
      }),
    []
  );

  const W = 2.2, H = 3.0, D = 0.14, T = 0.1; // outer frame dims

  return (
    <group position={[0, 0, 0]}>
      {/* Outer frame */}
      {[
        [0, H / 2 - T / 2, 0, W, T, D],
        [0, -H / 2 + T / 2, 0, W, T, D],
        [-W / 2 + T / 2, 0, 0, T, H - 2 * T, D],
        [W / 2 - T / 2, 0, 0, T, H - 2 * T, D],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x, y, z]} material={frameMat} castShadow>
          <boxGeometry args={[w, h, d]} />
        </mesh>
      ))}

      {/* Opening sash, hinged on the left */}
      <group position={[-W / 2 + T, 0, 0]}>
        <group ref={sash}>
          <group position={[(W - 2 * T) / 2, 0, 0]}>
            {/* sash frame */}
            {[
              [0, (H - 2 * T) / 2 - T / 2, 0, W - 2 * T, T, D * 0.8],
              [0, -(H - 2 * T) / 2 + T / 2, 0, W - 2 * T, T, D * 0.8],
              [-(W - 2 * T) / 2 + T / 2, 0, 0, T, H - 4 * T, D * 0.8],
              [(W - 2 * T) / 2 - T / 2, 0, 0, T, H - 4 * T, D * 0.8],
              // central mullion + transom (echoes the glazing-bar look)
              [0, 0, 0, T * 0.6, H - 4 * T, D * 0.5],
              [0, (H - 4 * T) / 6, 0, W - 2 * T, T * 0.6, D * 0.5],
              [0, -(H - 4 * T) / 6, 0, W - 2 * T, T * 0.6, D * 0.5],
            ].map(([x, y, z, w, h, d], i) => (
              <mesh key={i} position={[x, y, z]} material={frameMat} castShadow>
                <boxGeometry args={[w, h, d]} />
              </mesh>
            ))}
            {/* glass */}
            <mesh material={glassMat}>
              <boxGeometry args={[W - 3 * T, H - 5 * T, 0.02]} />
            </mesh>
            {/* handle */}
            <mesh position={[(W - 2 * T) / 2 - T * 1.4, 0, D * 0.55]} material={frameMat}>
              <cylinderGeometry args={[0.025, 0.025, 0.22]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

const COLOURS = [
  { name: "Charcoal", hex: "#1f1f1f" },
  { name: "Anthracite", hex: "#3a3f42" },
  { name: "White", hex: "#e8e6e0" },
  { name: "Bronze", hex: "#6e5635" },
];

export default function Window3D() {
  const [open, setOpen] = useState(false);
  const [colour, setColour] = useState(COLOURS[0].hex);

  return (
    <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden hairline bg-charcoal">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [2.6, 0.4, 4.2], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
        <WindowModel open={open} colour={colour} />
        <ContactShadows position={[0, -1.7, 0]} opacity={0.55} blur={2.4} scale={8} />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          minDistance={3} maxDistance={7}
          minPolarAngle={Math.PI * 0.25} maxPolarAngle={Math.PI * 0.62}
        />
        <Html position={[1.25, 1.55, 0]} center distanceFactor={6}>
          <div className="pointer-events-none whitespace-nowrap rounded-sm bg-ink/80 px-2.5 py-1 text-[10px] tracking-wide text-bronze-soft backdrop-blur">
            Slim frame profile
          </div>
        </Html>
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ink/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="eyebrow !text-white/50">Frame</span>
          {COLOURS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setColour(c.hex)}
              aria-label={`Frame colour: ${c.name}`}
              className={`h-6 w-6 rounded-full border transition-transform hover:scale-110 ${colour === c.hex ? "border-bronze scale-110" : "border-white/20"}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-xs uppercase tracking-eyebrow text-bronze hover:text-bronze-soft transition-colors"
        >
          {open ? "Close window" : "Open window"}
        </button>
        <span className="hidden sm:block text-[10px] text-white/40">Drag to rotate</span>
      </div>
    </div>
  );
}
