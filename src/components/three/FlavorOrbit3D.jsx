import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Orbiting satellites around central core in Yellow & Black
function OrbitingSatellites({ activeMode }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = time * 0.4;
  });

  return (
    <group ref={group}>
      {/* Satellite 1: Electric Yellow Octahedron */}
      <group position={[2.4, 0.4, 0]}>
        <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1}>
          <mesh>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial
              color="#FFE600"
              emissive="#FFE600"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      </group>

      {/* Satellite 2: Glossy Obsidian Sphere with Yellow Ring */}
      <group position={[-2.3, -0.3, 0.8]}>
        <Float speed={2.2} rotationIntensity={1} floatIntensity={1.1}>
          <mesh>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshPhysicalMaterial
              color="#0A0A0A"
              roughness={0.1}
              metalness={0.9}
              clearcoat={1.0}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.45, 0.02, 12, 32]} />
            <meshBasicMaterial color="#FFE600" />
          </mesh>
        </Float>
      </group>

      {/* Satellite 3: Golden Crystal Star */}
      <group position={[0.5, 2.2, -1.2]}>
        <Float speed={2.8} rotationIntensity={1.4} floatIntensity={1}>
          <mesh scale={[0.3, 0.6, 0.3]}>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              color="#FFB800"
              emissive="#FFB800"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </Float>
      </group>

      {/* Satellite 4: White Diamond Prism */}
      <group position={[-0.8, -2.1, -0.6]}>
        <Float speed={3.0} rotationIntensity={1.1} floatIntensity={1.3}>
          <mesh>
            <octahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.95} />
          </mesh>
        </Float>
      </group>

      {/* Satellite 5: Orbiting Gold Ring Node */}
      <group position={[1.8, -1.5, 1.4]}>
        <Float speed={2.6} rotationIntensity={0.8} floatIntensity={1.2}>
          <mesh>
            <torusGeometry args={[0.3, 0.04, 16, 32]} />
            <meshBasicMaterial color="#FFE600" />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

// Center Flavor Reactor
function CentralFlavorCore({ color = "#FFE600" }) {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.25) * 0.2;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -time * 0.35;
  });

  return (
    <group>
      {/* Center Dynamic Torus Knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.05, 0.28, 80, 20, 2, 3]} />
        <meshPhysicalMaterial
          color="#0F0F0F"
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
        />
      </mesh>

      {/* Orbital Neon Ring 1 */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.0, 0.03, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Orbital Neon Ring 2 */}
      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.02, 16, 64]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function FlavorOrbit3D() {
  const modes = [
    { id: 'masala', name: 'Kadak Masala', color: '#FFE600' },
    { id: 'saffron', name: 'Shahi Kesar', color: '#FFB800' },
    { id: 'cardamom', name: 'Royal Elaichi', color: '#D4FF00' },
    { id: 'cocoa', name: 'Dark Velvet', color: '#FFAA00' }
  ];

  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-[#141414] via-[#0A0A0A] to-black border border-yellow/20 overflow-hidden shadow-elevated">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeMode.color}20 0%, transparent 65%)`
        }}
      />

      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[0, 2, 2]} intensity={2.0} color={activeMode.color} distance={8} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <CentralFlavorCore color={activeMode.color} />
          <OrbitingSatellites activeMode={activeMode} />
        </Float>
      </Canvas>

      {/* Orbit Mode Switcher */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-yellow/30 max-w-[95%]">
        {modes.map((mode) => {
          const isActive = activeMode.id === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-yellow text-black shadow-glow-yellow'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {mode.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
