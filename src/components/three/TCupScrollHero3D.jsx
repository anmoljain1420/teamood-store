import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Rotate3d, Layers } from 'lucide-react';

// ==========================================
// 1. PROCEDURAL STEAM DISK TEXTURE
// ==========================================
function createSteamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  grad.addColorStop(0.35, 'rgba(255, 248, 238, 0.35)');
  grad.addColorStop(0.7, 'rgba(255, 240, 225, 0.1)');
  grad.addColorStop(1, 'rgba(255, 240, 225, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ==========================================
// 2. ARTISANAL TAPRI BRASS KETTLE
// ==========================================
function Kettle({ scrollProgress }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      const p = scrollProgress.current;
      // Pouring window when user scrolls between 0.25 and 0.65
      if (p > 0.15 && p < 0.75) {
        ref.current.visible = true;
        // Kettle enters from top-left, tilts, and exits
        const local = (p - 0.15) / 0.6;
        const tilt = Math.sin(local * Math.PI) * 0.75;
        ref.current.rotation.z = -tilt;
        ref.current.position.x = THREE.MathUtils.lerp(-2.2, -1.25, Math.min(1, local * 2));
        ref.current.position.y = THREE.MathUtils.lerp(3.2, 1.6, Math.min(1, local * 2));
      } else {
        ref.current.visible = false;
        ref.current.position.set(-2.5, 3.5, 0);
      }
    }
  });

  return (
    <group ref={ref} position={[-2.5, 3.5, 0]}>
      {/* Brass Body */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.75, 1.0, 32]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.25} metalness={0.88} />
      </mesh>
      {/* Lid & Knob */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.35, 0.42, 0.12, 24]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.22} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#6B3E26" roughness={0.4} />
      </mesh>
      {/* Spout */}
      <group position={[0.48, 0.05, 0]} rotation={[0, 0, -0.65]}>
        <mesh position={[0.25, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.14, 0.65, 16]} />
          <meshStandardMaterial color="#DFAF62" roughness={0.25} metalness={0.88} />
        </mesh>
      </group>
      {/* Handle */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.5, 0.035, 12, 24, Math.PI * 0.95]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// ==========================================
// 3. TEA POURING LIQUID STREAM
// ==========================================
function Stream({ scrollProgress }) {
  const ref = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.65, 1.45, 0),
      new THREE.Vector3(-0.35, 1.15, 0.02),
      new THREE.Vector3(0.0, 0.6, 0)
    ]);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const p = scrollProgress.current;
      const isPouring = p > 0.25 && p < 0.62;
      ref.current.visible = isPouring;
      if (isPouring) {
        const t = state.clock.getElapsedTime();
        ref.current.scale.x = 1.0 + Math.sin(t * 30) * 0.08;
      }
    }
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 20, 0.038, 10, false]} />
      <meshStandardMaterial
        color="#D98845"
        emissive="#8C461E"
        emissiveIntensity={0.6}
        roughness={0.15}
        transparent={true}
        opacity={0.92}
      />
    </mesh>
  );
}

// ==========================================
// 4. MAIN 3D TEA CUP SCENE
// ==========================================
function TeaCupScene({ scrollProgress, mousePos, isOrbitMode, flavorColor }) {
  const cupRef = useRef();
  const liquidRef = useRef();
  const frothRef = useRef();
  const steamRef = useRef();
  const spicesRef = useRef();

  const steamTex = useMemo(() => createSteamTexture(), []);

  // Steam particle positions
  const steamCount = 30;
  const steamData = useMemo(() => {
    const pos = new Float32Array(steamCount * 3);
    const speed = new Float32Array(steamCount);
    for (let i = 0; i < steamCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 1] = 0.7 + Math.random() * 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      speed[i] = 0.012 + Math.random() * 0.016;
    }
    return { pos, speed };
  }, [steamCount]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current; // 0 (top of page) to 1 (scrolled down)

    if (cupRef.current && !isOrbitMode) {
      // ----------------------------------------------------
      // TOP TO BOTTOM SCROLL MOTION & AXIAL ROTATION
      // ----------------------------------------------------
      // Start centered in hero (y = 0.0)
      // As user scrolls, the cup travels downward toward the bottom (y = -2.6)
      // And rotates smoothly 360 degrees
      const targetY = THREE.MathUtils.lerp(0.0, -2.6, p);
      const targetRotY = p * Math.PI * 2 + Math.sin(t * 0.5) * 0.1 + (mousePos.current.x * 0.3);
      const targetRotX = 0.08 + THREE.MathUtils.lerp(0, 0.15, p) - (mousePos.current.y * 0.15);
      const targetX = THREE.MathUtils.lerp(0, 0.35, Math.sin(p * Math.PI));

      // Subtle natural breathing float
      const breath = Math.sin(t * 1.4) * 0.025;

      cupRef.current.position.y = THREE.MathUtils.lerp(cupRef.current.position.y, targetY + breath, 0.08);
      cupRef.current.position.x = THREE.MathUtils.lerp(cupRef.current.position.x, targetX, 0.08);
      cupRef.current.rotation.y = THREE.MathUtils.lerp(cupRef.current.rotation.y, targetRotY, 0.08);
      cupRef.current.rotation.x = THREE.MathUtils.lerp(cupRef.current.rotation.x, targetRotX, 0.08);
    }

    // ----------------------------------------------------
    // LIQUID LEVEL ANIMATION (Rises with pouring)
    // ----------------------------------------------------
    if (liquidRef.current && frothRef.current) {
      // Liquid level starts at 0.55 on load, rises to 0.94 as kettle pours
      let fill = 0.65;
      if (p > 0.25 && p < 0.65) {
        fill = THREE.MathUtils.lerp(0.65, 0.95, (p - 0.25) / 0.4);
      } else if (p >= 0.65) {
        fill = 0.95;
      }
      liquidRef.current.scale.y = fill;
      liquidRef.current.position.y = -0.3 + (fill * 1.55) / 2;

      const topY = -0.3 + fill * 1.55;
      frothRef.current.position.y = topY;
    }

    // ----------------------------------------------------
    // STEAM PARTICLES UPDATE
    // ----------------------------------------------------
    if (steamRef.current) {
      const positions = steamRef.current.geometry.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        positions[i * 3 + 1] += steamData.speed[i];
        positions[i * 3] += Math.sin(t * 1.2 + i) * 0.002;
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = 0.6;
          positions[i * 3] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // ----------------------------------------------------
    // SPICES ORBIT
    // ----------------------------------------------------
    if (spicesRef.current) {
      spicesRef.current.rotation.y += delta * 0.2;
      // Slight expansion on scroll
      const expand = 1.0 + p * 0.4;
      spicesRef.current.scale.setScalar(expand);
    }
  });

  return (
    <>
      {/* Artisanal Tapri Brass Kettle */}
      <Kettle scrollProgress={scrollProgress} />

      {/* Tea Pouring Liquid Stream */}
      <Stream scrollProgress={scrollProgress} />

      {/* Main 3D Tea Cup Container */}
      <group ref={cupRef} position={[0, 0, 0]}>
        {/* 1. TRANSPARENT FLUTED GLASS CUP */}
        {/* Lower Faceted Fluted Glass */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.12, 0.8, 1.75, 16, 1, true]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.96}
            transparent={true}
            roughness={0.03}
            ior={1.52}
            thickness={0.55}
            attenuationColor="#FFF8ED"
            attenuationDistance={1.6}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
          />
        </mesh>

        {/* Smooth Cylindrical Lip */}
        <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[1.18, 1.12, 0.32, 36, 1, true]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.96}
            transparent={true}
            roughness={0.02}
            ior={1.52}
            thickness={0.45}
            clearcoat={1.0}
          />
        </mesh>

        {/* Smooth Rounded Glass Rim */}
        <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.18, 0.035, 12, 40]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.08} metalness={0.05} />
        </mesh>

        {/* Weighted Solid Crystal Base */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.8, 0.74, 0.28, 16]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.92}
            transparent={true}
            roughness={0.06}
            ior={1.54}
            thickness={0.9}
          />
        </mesh>

        {/* Modern Sleek Glass Handle */}
        <mesh position={[1.14, 0.45, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.07, 14, 28, Math.PI * 0.95]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.94}
            transparent={true}
            roughness={0.05}
            ior={1.52}
            thickness={0.5}
          />
        </mesh>

        {/* 2. SPICED CHAI LIQUID COLUMN */}
        <mesh ref={liquidRef} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[1.06, 0.76, 1.55, 32]} />
          <meshStandardMaterial
            color={flavorColor}
            emissive={flavorColor}
            emissiveIntensity={0.35}
            roughness={0.16}
            metalness={0.05}
            transparent={true}
            opacity={0.95}
          />
        </mesh>

        {/* 3. GOLDEN CREMA FROTH SURFACE */}
        <mesh ref={frothRef} position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 32]} />
          <meshStandardMaterial
            color="#DFAF62"
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* 4. RISING VOLUMETRIC STEAM PARTICLES */}
        <points ref={steamRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={steamCount}
              array={steamData.pos}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.42}
            map={steamTex}
            transparent={true}
            opacity={0.38}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#FFF8ED"
          />
        </points>

        {/* 5. FLOATING INGREDIENTS ORBIT */}
        <group ref={spicesRef}>
          {/* Green Cardamom */}
          <mesh position={[1.45, 0.4, 0.3]} scale={[0.16, 0.28, 0.16]} rotation={[0.4, 0.8, -0.3]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#6B8849" roughness={0.6} />
          </mesh>
          {/* Cinnamon Bark */}
          <mesh position={[-1.4, 0.65, 0.4]} rotation={[0.5, 0.3, 0.4]}>
            <cylinderGeometry args={[0.065, 0.075, 0.9, 12, 1, true]} />
            <meshStandardMaterial color="#7D3F1D" roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
          {/* Ginger Slice */}
          <mesh position={[0.7, -0.5, 1.3]} scale={[0.24, 0.06, 0.28]} rotation={[0.6, 0.2, 0.4]}>
            <cylinderGeometry args={[1, 0.9, 0.8, 12]} />
            <meshStandardMaterial color="#E8C37B" roughness={0.5} />
          </mesh>
          {/* Star Anise */}
          <mesh position={[-1.1, -0.3, -1.0]} scale={0.16} rotation={[0.3, 0.9, -0.4]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#5C2C15" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Ground Contact Shadow */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.35}
        scale={5.5}
        blur={2.2}
        far={3.5}
        color="#392317"
      />
    </>
  );
}

// ==========================================
// 5. EXPORTED COMPONENT (CLEAN & ROBUST)
// ==========================================
export default function TCupScrollHero3D({ className = "h-[450px] sm:h-[520px] lg:h-[580px]" }) {
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [flavor, setFlavor] = useState('masala');

  const flavors = {
    masala: { color: '#8C461E', label: 'Shahi Masala' },
    chocolate: { color: '#381B0E', label: 'Dark Chocolate' },
    kesar: { color: '#B57422', label: 'Kashmiri Kesar' },
    adrak: { color: '#783A16', label: 'Zesty Adrak' }
  };

  useEffect(() => {
    // Passive scroll listener: calculate scroll progress across the hero/top fold
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollRange = window.innerHeight * 1.5; // smooth progress across first 1.5 viewports
      const p = Math.min(1, Math.max(0, scrollY / scrollRange));
      scrollProgress.current = p;
    };

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative w-full ${className} select-none`}>
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.1} color="#FFF8ED" />
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFFDF8" />
        <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#DFAF62" />
        <pointLight position={[0, -1.5, -2]} intensity={1.2} color="#DFAF62" />

        <TeaCupScene
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          isOrbitMode={isOrbitMode}
          flavorColor={flavors[flavor].color}
        />

        {isOrbitMode && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.5}
          />
        )}
      </Canvas>

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsOrbitMode(!isOrbitMode)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-soft flex items-center gap-1.5 ${
            isOrbitMode
              ? 'bg-tea-caramel text-cream-50'
              : 'bg-cream-50/95 hover:bg-cream-200 text-tea-brown border border-tea-caramel/25'
          }`}
          title="Toggle 360 mouse orbit"
        >
          <Rotate3d className="w-3.5 h-3.5" />
          <span>{isOrbitMode ? 'Lock Scroll' : '360° Drag'}</span>
        </button>
      </div>

      {/* Flavor Switcher Pills at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-cream-50/90 backdrop-blur-md border border-tea-caramel/25 shadow-soft">
        {Object.entries(flavors).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setFlavor(key)}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition ${
              flavor === key
                ? 'bg-tea-brown text-cream-50 shadow-xs'
                : 'text-tea-dark/70 hover:text-tea-dark'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Scroll indicator badge */}
      <div className="absolute bottom-3 left-4 text-[10px] font-bold text-tea-brown/60 uppercase tracking-widest hidden sm:flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-tea-caramel animate-pulse" />
        <span>Scroll to animate cup & pour</span>
      </div>
    </div>
  );
}
