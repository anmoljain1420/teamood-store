import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Realistic Glass Cup with Tea Liquid, Spices, and Steam
function RealisticTeaCup({ mousePos }) {
  const cupRef = useRef();
  const teaLiquidRef = useRef();
  const steamParticlesRef = useRef();
  const spicesGroupRef = useRef();

  // Generate steam particles
  const particleCount = 45;
  const particles = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const speed = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = Math.random() * 2.5 + 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      speed[i] = 0.012 + Math.random() * 0.018;
    }
    return { pos, speed };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle breathing rotation and mouse reaction
    if (cupRef.current) {
      const targetRotY = (mousePos.x || 0) * 0.4 + Math.sin(t * 0.4) * 0.15;
      const targetRotX = -(mousePos.y || 0) * 0.2 + 0.1;
      cupRef.current.rotation.y = THREE.MathUtils.lerp(cupRef.current.rotation.y, targetRotY, 0.05);
      cupRef.current.rotation.x = THREE.MathUtils.lerp(cupRef.current.rotation.x, targetRotX, 0.05);
    }

    // Gentle liquid simmer motion
    if (teaLiquidRef.current) {
      teaLiquidRef.current.position.y = 0.55 + Math.sin(t * 2) * 0.015;
    }

    // Slowly swirl the spices
    if (spicesGroupRef.current) {
      spicesGroupRef.current.rotation.y += delta * 0.2;
    }

    // Animate rising steam particles
    if (steamParticlesRef.current) {
      const positions = steamParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particles.speed[i];
        positions[i * 3] += Math.sin(t + i) * 0.003;
        // Reset when too high
        if (positions[i * 3 + 1] > 3.2) {
          positions[i * 3 + 1] = 0.9;
          positions[i * 3] = (Math.random() - 0.5) * 0.7;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
        }
      }
      steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={cupRef} position={[0, -0.6, 0]}>
      {/* 1. Transparent Glass Tea Cup */}
      {/* Outer Glass Wall */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.2, 0.85, 2.0, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#FFFDF8"
          transmission={0.92}
          opacity={1}
          transparent={true}
          roughness={0.05}
          ior={1.52}
          thickness={0.3}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Glass Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.85, 0.78, 0.22, 48]} />
        <meshPhysicalMaterial
          color="#FFFDF8"
          transmission={0.88}
          transparent={true}
          roughness={0.08}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>

      {/* Cup Rim Top */}
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.035, 16, 64]} />
        <meshStandardMaterial color="#FFF8ED" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* 2. Hot Spiced Chai Liquid inside */}
      <mesh ref={teaLiquidRef} position={[0, 0.55, 0]}>
        <cylinderGeometry args={[1.14, 0.82, 1.68, 40]} />
        <meshStandardMaterial
          color="#8C5331"
          roughness={0.2}
          metalness={0.05}
          emissive="#6B3E26"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Liquid Top Surface with Rich Cream Foam Ring */}
      <mesh position={[0, 1.39, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.13, 40]} />
        <meshStandardMaterial
          color="#C98B4B"
          roughness={0.3}
          metalness={0.02}
        />
      </mesh>

      {/* Spices Group submerged & floating */}
      <group ref={spicesGroupRef} position={[0, 1.35, 0]}>
        {/* Cinnamon Stick */}
        <mesh position={[0.3, -0.2, 0.2]} rotation={[0.4, 0.6, 0.8]}>
          <cylinderGeometry args={[0.07, 0.08, 1.1, 16]} />
          <meshStandardMaterial color="#4A2511" roughness={0.9} />
        </mesh>

        {/* Green Cardamom Pod 1 */}
        <mesh position={[-0.45, 0.04, 0.25]} rotation={[0.2, 0.5, 0.3]} scale={[0.12, 0.18, 0.12]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#6E8457" roughness={0.7} />
        </mesh>

        {/* Green Cardamom Pod 2 */}
        <mesh position={[0.2, 0.02, -0.45]} rotation={[-0.3, 0.8, -0.4]} scale={[0.1, 0.16, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#7B9362" roughness={0.7} />
        </mesh>

        {/* Star Anise (Petals) */}
        <group position={[-0.1, 0.05, -0.2]} rotation={[0, 0.3, 0]} scale={0.16}>
          {[0, 1, 2, 3, 4].map(idx => (
            <mesh key={idx} rotation={[0, (idx * Math.PI * 2) / 5, 0.2]} position={[0, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.45, 1.4, 8]} />
              <meshStandardMaterial color="#3A1C0C" roughness={0.8} />
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.4, 12, 12]} />
            <meshStandardMaterial color="#2B1408" roughness={0.9} />
          </mesh>
        </group>

        {/* Floating Tea Leaves */}
        {[-0.6, 0.5, -0.2, 0.35].map((x, i) => (
          <mesh key={i} position={[x, 0.03, (i % 2 === 0 ? 0.35 : -0.3)]} rotation={[0.2 * i, 0.5 * i, 0.1 * i]} scale={[0.12, 0.02, 0.2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#2C1A10" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* 3. Rising Steam Particles */}
      <points ref={steamParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.pos}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#FFFDF8"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Warm Glow below the cup */}
      <pointLight position={[0, 0.2, 0]} color="#DFAF62" intensity={2.5} distance={3.5} />
    </group>
  );
}

export default function TeaCupHero3D() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [hasError, setHasError] = React.useState(false);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  if (hasError) {
    // Beautiful Static Fallback Image if WebGL is unavailable
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-elevated border-4 border-tea-caramel/20">
          <img
            src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
            alt="Artisanal Handcrafted Tea Cup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tea-dark/60 via-transparent to-transparent flex items-end justify-center p-6">
            <span className="text-white font-serif text-lg tracking-wide">Kota's Finest Artisanal Chai</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[450px] md:h-[580px] lg:h-[650px] relative select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Warm Ambient Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[460px] md:h-[460px] bg-tea-light/15 rounded-full blur-3xl pointer-events-none" />

      <Canvas
        onError={() => setHasError(true)}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.2, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} color="#FFFDF8" />
        <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#DFAF62" />
        <pointLight position={[0, -1, 1]} color="#C98B4B" intensity={1.2} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <RealisticTeaCup mousePos={mousePos} />
        </Float>

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.45}
          scale={5}
          blur={2.4}
          far={3}
          color="#392317"
        />
      </Canvas>

      {/* Interactive Micro-badge */}
      <div className="absolute bottom-4 right-4 md:right-8 bg-cream-50/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-tea-caramel/25 shadow-soft text-xs text-tea-brown font-medium flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Interactive 3D Steam & Spices</span>
      </div>
    </div>
  );
}
