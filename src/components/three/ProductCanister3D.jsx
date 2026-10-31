import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Canister({ productName, color = "#6B3E26" }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // gentle idle rotation
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Main Canister Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 2.2, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* Luxury Metallic Gold Lid */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.25, 48]} />
        <meshStandardMaterial
          color="#DFAF62"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Lid Rim */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* Gold Base Rim */}
      <mesh position={[0, -1.12, 0]}>
        <cylinderGeometry args={[0.96, 0.96, 0.08, 48]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Center Label Band */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.96, 0.96, 1.3, 48]} />
        <meshStandardMaterial
          color="#FFFDF8"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Gold Label Borders */}
      <mesh position={[0, 0.7, 0]}>
        <torusGeometry args={[0.965, 0.015, 16, 48]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[0.965, 0.015, 16, 48]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function ProductCanister3D({ productName = "Teamood Signature Blend", color = "#6B3E26" }) {
  return (
    <div className="w-full h-64 md:h-80 relative select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.6, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} color="#FFFDF8" />
        <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#DFAF62" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Canister productName={productName} color={color} />
        </Float>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 3} />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={4}
          blur={2}
          far={3}
          color="#392317"
        />
      </Canvas>
      <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
        <span className="text-[11px] font-medium text-tea-brown/60 bg-cream-50/80 px-2.5 py-0.5 rounded-full border border-tea-caramel/20">
          Drag to inspect 360°
        </span>
      </div>
    </div>
  );
}
