import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Ring } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. DYNAMIC GOLDEN & ELECTRIC YELLOW PARTICLE GALAXY
// -------------------------------------------------------------
function ParticleGalaxy({ count = 1200, color = "#FFE600", secondaryColor = "#FFB800" }) {
  const pointsRef = useRef();

  const [positions, scales, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color(color);
    const color2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < count; i++) {
      // Logarithmic spiral / vortex distribution
      const radius = Math.pow(Math.random(), 0.5) * 5.2 + 0.8;
      const angle = Math.random() * Math.PI * 2;
      const ySpread = (Math.random() - 0.5) * 3.8;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = ySpread * (1 - (radius / 6) * 0.4);
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      sca[i] = Math.random() * 0.08 + 0.02;

      // Blend between electric yellow and gold
      const mixed = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, sca, col];
  }, [count, color, secondaryColor]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    // Swirling galaxy rotation
    pointsRef.current.rotation.y = time * 0.12;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// -------------------------------------------------------------
// 2. KINETIC INTERLOCKING TORUS KNOT (QUANTUM TEA REACTOR)
// -------------------------------------------------------------
function KineticQuantumTorus({
  color = "#FFE600",
  metalness = 0.85,
  roughness = 0.15,
  pulseIntensity = 1.0
}) {
  const outerKnotRef = useRef();
  const innerKnotRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (outerKnotRef.current) {
      // Hypnotic counter-rotation
      outerKnotRef.current.rotation.x = time * 0.35;
      outerKnotRef.current.rotation.y = time * 0.45;
      outerKnotRef.current.rotation.z = Math.sin(time * 0.2) * 0.4;
    }

    if (innerKnotRef.current) {
      innerKnotRef.current.rotation.x = -time * 0.4;
      innerKnotRef.current.rotation.y = -time * 0.3;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.25;
      ring1Ref.current.rotation.y = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.2;
      ring2Ref.current.rotation.z = -time * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.4;
      ring3Ref.current.rotation.x = time * 0.2;
    }
  });

  return (
    <group>
      {/* Primary Kinetic Torus Knot (Glossy Obsidian & Electric Yellow Rim) */}
      <mesh ref={outerKnotRef} scale={[1.15, 1.15, 1.15]}>
        <torusKnotGeometry args={[1.35, 0.36, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#0F0F0F"
          emissive={color}
          emissiveIntensity={0.45 * pulseIntensity}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={1.0}
        />
      </mesh>

      {/* Inner Glowing Energy Ribbon Knot */}
      <mesh ref={innerKnotRef} scale={[0.85, 0.85, 0.85]}>
        <torusKnotGeometry args={[1.05, 0.08, 96, 16, 3, 5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8 * pulseIntensity}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Gyroscopic Neon Orbit Rings */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.025, 16, 80]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      </group>

      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.9, 0.02, 16, 80]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
        </mesh>
      </group>

      <group ref={ring3Ref}>
        <mesh rotation={[Math.PI / 6, -Math.PI / 3, 0]}>
          <torusGeometry args={[3.2, 0.018, 16, 80]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Core Glowing Energy Sphere */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 3. FLOATING CYBER CRYSTALS & OBSIDIAN PRISMS
// -------------------------------------------------------------
function FloatingPrisms({ color = "#FFE600" }) {
  const prisms = [
    { pos: [-2.6, 1.8, 0.8], rot: [0.5, 0.8, -0.2], scale: 0.55 },
    { pos: [2.8, -1.6, -0.5], rot: [-0.4, 0.5, 0.7], scale: 0.65 },
    { pos: [2.4, 1.9, -1.2], rot: [0.7, -0.3, 0.4], scale: 0.48 },
    { pos: [-2.9, -1.2, 0.6], rot: [-0.6, 0.4, -0.5], scale: 0.58 },
    { pos: [0.3, 2.8, 0.7], rot: [0.2, -0.8, 0.6], scale: 0.42 },
    { pos: [-1.4, -2.5, -0.8], rot: [0.8, 0.3, -0.4], scale: 0.5 }
  ];

  return (
    <group>
      {prisms.map((p, i) => (
        <Float key={i} speed={2.2 + i * 0.3} rotationIntensity={1.5} floatIntensity={1.2}>
          <group position={p.pos} rotation={p.rot} scale={p.scale}>
            {/* Glossy Obsidian Octahedron */}
            <mesh>
              <octahedronGeometry args={[0.9, 0]} />
              <meshPhysicalMaterial
                color="#0D0D0D"
                emissive={color}
                emissiveIntensity={0.2}
                roughness={0.08}
                metalness={0.9}
                clearcoat={1.0}
              />
            </mesh>
            {/* Neon Accent Edge Wireframe */}
            <mesh scale={[1.02, 1.02, 1.02]}>
              <octahedronGeometry args={[0.9, 0]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

// -------------------------------------------------------------
// 4. INTERACTIVE CLICK SHOCKWAVE EXPANSION
// -------------------------------------------------------------
function ClickShockwave({ triggerTime, color }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current || !triggerTime) return;
    const elapsed = state.clock.getElapsedTime() - triggerTime;
    if (elapsed < 1.2) {
      const scale = 0.1 + elapsed * 5.5;
      ringRef.current.scale.set(scale, scale, scale);
      ringRef.current.material.opacity = Math.max(0, 1 - elapsed / 1.2);
      ringRef.current.visible = true;
    } else {
      ringRef.current.visible = false;
    }
  });

  return (
    <mesh ref={ringRef} visible={false} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1.05, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// -------------------------------------------------------------
// 5. MASTER SCENE CONTAINER WITH PARALLAX & MOMENTUM
// -------------------------------------------------------------
function SceneMaster({ activeMood, clickTrigger, scrollY }) {
  const masterGroup = useRef();

  useFrame((state) => {
    if (!masterGroup.current) return;
    const { pointer } = state;

    // Smooth lerp to mouse position
    masterGroup.current.rotation.y = THREE.MathUtils.lerp(
      masterGroup.current.rotation.y,
      pointer.x * 0.45,
      0.06
    );
    masterGroup.current.rotation.x = THREE.MathUtils.lerp(
      masterGroup.current.rotation.x,
      -pointer.y * 0.35,
      0.06
    );

    // Scroll depth modulation
    const scrollFactor = Math.min(scrollY / 700, 1);
    masterGroup.current.position.y = THREE.MathUtils.lerp(
      masterGroup.current.position.y,
      -scrollFactor * 1.2,
      0.08
    );
    const targetScale = 1 - scrollFactor * 0.18;
    masterGroup.current.scale.set(targetScale, targetScale, targetScale);
  });

  return (
    <group ref={masterGroup}>
      {/* Golden & Yellow Stardust Nebula */}
      <ParticleGalaxy
        count={1400}
        color={activeMood.accentColor}
        secondaryColor={activeMood.secondaryColor}
      />

      {/* Kinetic Double Torus Knot */}
      <Float speed={2.8} rotationIntensity={0.8} floatIntensity={0.9}>
        <KineticQuantumTorus
          color={activeMood.accentColor}
          pulseIntensity={activeMood.pulse}
        />
      </Float>

      {/* Floating Obsidian Crystal Prisms */}
      <FloatingPrisms color={activeMood.accentColor} />

      {/* Click Shockwave Ring */}
      <ClickShockwave
        triggerTime={clickTrigger.time}
        color={activeMood.accentColor}
      />
    </group>
  );
}

// -------------------------------------------------------------
// 6. MAIN EXPORT: HIGH-ENERGY 3D CYBER REACTOR & MOOD CONTROLS
// -------------------------------------------------------------
export default function LiquidFlavorUniverse3D() {
  const [scrollY, setScrollY] = useState(0);
  const [clickTrigger, setClickTrigger] = useState({ time: 0 });

  const moodModes = [
    {
      id: "electric-chai",
      name: "Electric Chai",
      tag: "Volt Energy",
      accentColor: "#FFE600",
      secondaryColor: "#FFF066",
      pulse: 1.2,
      bgGlow: "from-yellow/20"
    },
    {
      id: "golden-saffron",
      name: "Golden Saffron",
      tag: "Royal Luxury",
      accentColor: "#FFB800",
      secondaryColor: "#FFA000",
      pulse: 1.0,
      bgGlow: "from-amber-500/20"
    },
    {
      id: "cyber-matcha",
      name: "Cyber Volt",
      tag: "High Velocity",
      accentColor: "#D4FF00",
      secondaryColor: "#B5FF00",
      pulse: 1.3,
      bgGlow: "from-lime-400/20"
    },
    {
      id: "solar-spice",
      name: "Solar Spice",
      tag: "Pure Kadak",
      accentColor: "#FF9900",
      secondaryColor: "#FFE600",
      pulse: 1.1,
      bgGlow: "from-orange-500/20"
    }
  ];

  const [activeMood, setActiveMood] = useState(moodModes[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCanvasClick = (e) => {
    setClickTrigger({ time: performance.now() / 1000 });
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-[620px] sm:h-[720px] lg:h-[800px] overflow-hidden select-none cursor-crosshair"
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute inset-0 bg-radial-gradient pointer-events-none transition-all duration-700 opacity-40`}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeMood.accentColor}25 0%, transparent 70%)`
        }}
      />

      {/* Cyber Grid Background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <Canvas
        className="w-full h-full"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />

        {/* Dynamic Studio Lights tailored for Yellow & Black High Speculars */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-5, -4, -3]} intensity={1.5} color={activeMood.accentColor} />
        <pointLight position={[0, 3, 2]} intensity={2.0} color={activeMood.accentColor} distance={8} />
        <pointLight position={[-3, -2, 2]} intensity={1.2} color="#FFFFFF" distance={7} />

        {/* Master Scene */}
        <SceneMaster
          activeMood={activeMood}
          clickTrigger={clickTrigger}
          scrollY={scrollY}
        />
      </Canvas>

      {/* Bottom Floating Mood HUD Control Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 px-3 py-2 rounded-full bg-black/90 backdrop-blur-xl border border-yellow/30 shadow-glow-yellow max-w-[95%]">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-yellow/80 px-2">
          <span className="w-2 h-2 rounded-full bg-yellow animate-ping" />
          KINETIC MOOD:
        </span>
        {moodModes.map((mood) => {
          const isActive = activeMood.id === mood.id;
          return (
            <button
              key={mood.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMood(mood);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-yellow text-black shadow-glow-yellow scale-105'
                  : 'bg-white/5 text-white/80 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: mood.accentColor }}
              />
              <span>{mood.name}</span>
            </button>
          );
        })}
      </div>

      {/* Top Interactive Hints */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-yellow/30 text-yellow font-mono text-[11px] tracking-wide shadow-soft">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
        <span>CLICK TO TRIGGER SHOCKWAVE • DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
