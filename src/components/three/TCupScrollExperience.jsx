import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  ChevronDown,
  Layers,
  Thermometer
} from 'lucide-react';

// =========================================================================
// 1. PROCEDURAL SOFT VOLUMETRIC STEAM
// =========================================================================
function createSoftSteamTexture() {
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

// =========================================================================
// 2. TAPRI SPUN BRASS KETTLE (Animates in & pours on scroll)
// =========================================================================
function TapriBrassKettle({ progressRef }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      const p = progressRef.current;
      // Pouring window between scroll 0.40 and 0.72
      if (p > 0.35 && p < 0.75) {
        ref.current.visible = true;
        const local = (p - 0.35) / 0.4;
        const tilt = Math.sin(local * Math.PI) * 0.75;
        ref.current.rotation.z = -tilt;

        // Follow cup coordinates dynamically
        const cupY = THREE.MathUtils.lerp(1.6, -2.4, p);
        const cupX = 1.1 + Math.sin(p * Math.PI) * 0.2;

        ref.current.position.y = cupY + 1.45;
        ref.current.position.x = cupX - 1.15;
      } else {
        ref.current.visible = false;
        ref.current.position.set(-4.0, 5.0, 0);
      }
    }
  });

  return (
    <group ref={ref} position={[-4.0, 5.0, 0]}>
      {/* Kettle Body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.72, 0.95, 48]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.25} metalness={0.88} />
      </mesh>
      {/* Kettle Lid & Finial */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.32, 0.4, 0.12, 32]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.22} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#5C2D13" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Tapri Spout */}
      <group position={[0.48, 0.05, 0]} rotation={[0, 0, -0.65]}>
        <mesh position={[0.24, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.14, 0.65, 24]} />
          <meshStandardMaterial color="#DFAF62" roughness={0.24} metalness={0.88} />
        </mesh>
      </group>
      {/* Arched Handle */}
      <mesh position={[-0.05, 0.55, 0]}>
        <torusGeometry args={[0.5, 0.035, 12, 28, Math.PI * 0.95]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// =========================================================================
// 3. GLISTENING AMBER TEA LIQUID STREAM
// =========================================================================
function TeaLiquidStream({ progressRef }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const p = progressRef.current;
      const isPouring = p > 0.42 && p < 0.68;
      ref.current.visible = isPouring;

      if (isPouring) {
        const t = state.clock.getElapsedTime();
        const cupY = THREE.MathUtils.lerp(1.6, -2.4, p);
        const cupX = 1.1 + Math.sin(p * Math.PI) * 0.2;

        ref.current.position.y = cupY;
        ref.current.position.x = cupX;
        ref.current.scale.x = 1.0 + Math.sin(t * 30) * 0.08;
      }
    }
  });

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.65, 1.6, 0),
      new THREE.Vector3(-0.35, 1.3, 0.02),
      new THREE.Vector3(-0.1, 0.9, 0.01),
      new THREE.Vector3(0.0, 0.6, 0)
    ]);
  }, []);

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 24, 0.035, 12, false]} />
      <meshStandardMaterial
        color="#D98845"
        emissive="#8C461E"
        emissiveIntensity={0.65}
        roughness={0.12}
        transparent={true}
        opacity={0.94}
      />
    </mesh>
  );
}

// =========================================================================
// 4. THE REALISTIC 3D TEA GLASS CUP (PROPORTIONED & SMOOTH)
// =========================================================================
function Real3DTeaGlass({ progressRef, mouseRef }) {
  const cupGroupRef = useRef();
  const liquidRef = useRef();
  const frothRef = useRef();
  const steamRef = useRef();
  const spicesRef = useRef();

  const steamTex = useMemo(() => createSoftSteamTexture(), []);
  const steamCount = 30;

  const steamData = useMemo(() => {
    const pos = new Float32Array(steamCount * 3);
    const speed = new Float32Array(steamCount);
    for (let i = 0; i < steamCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = 0.7 + Math.random() * 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      speed[i] = 0.012 + Math.random() * 0.016;
    }
    return { pos, speed };
  }, [steamCount]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const p = progressRef.current; // Normalized scroll: 0 (top) to 1 (bottom)
    const isMobile = state.viewport.width < 5.5;

    if (cupGroupRef.current) {
      // -----------------------------------------------------------------
      // THE T-CUP SCROLL MECHANISM:
      // As the user scrolls down, the cup glides from the TOP of the screen
      // down through the CENTER and down toward the BOTTOM!
      // At p = 0: y = +1.6 (Top of screen, proudly visible in hero)
      // At p = 0.5: y = 0.0 (Center of screen during pouring)
      // At p = 1.0: y = -2.4 (Exits down toward bottom into next sections)
      // -----------------------------------------------------------------
      const targetY = THREE.MathUtils.lerp(1.6, -2.4, p);

      // On desktop, position cup on the right side (x = 1.15) to leave
      // space for the editorial storytelling text on the left!
      const baseX = isMobile ? 0 : 1.15;
      const targetX = baseX + Math.sin(p * Math.PI) * 0.2;

      // Axial 360-degree rotation synchronized with scroll
      const targetRotY = p * Math.PI * 2.5 + Math.sin(t * 0.5) * 0.06 + (mouseRef.current.x * 0.25);

      // Subtle dynamic tilt
      const targetRotX = 0.08 + Math.sin(p * Math.PI) * 0.12 - (mouseRef.current.y * 0.12);

      // Gentle floating breath
      const breath = Math.sin(t * 1.4) * 0.02;

      cupGroupRef.current.position.y = THREE.MathUtils.lerp(
        cupGroupRef.current.position.y,
        targetY + breath,
        0.08
      );
      cupGroupRef.current.position.x = THREE.MathUtils.lerp(
        cupGroupRef.current.position.x,
        targetX,
        0.08
      );
      cupGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cupGroupRef.current.rotation.y,
        targetRotY,
        0.08
      );
      cupGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        cupGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
    }

    // -----------------------------------------------------------------
    // TEA LIQUID LEVEL RISES AS USER SCROLLS PAST THE POURING KETTLE
    // -----------------------------------------------------------------
    if (liquidRef.current && frothRef.current) {
      let fill = 0.65;
      if (p > 0.38 && p < 0.72) {
        fill = THREE.MathUtils.lerp(0.65, 0.95, (p - 0.38) / 0.34);
      } else if (p >= 0.72) {
        fill = 0.95;
      }
      liquidRef.current.scale.y = fill;
      liquidRef.current.position.y = -0.3 + (fill * 1.55) / 2;

      const topY = -0.3 + fill * 1.55;
      frothRef.current.position.y = topY;
    }

    // -----------------------------------------------------------------
    // STEAM PARTICLES UPDATE
    // -----------------------------------------------------------------
    if (steamRef.current) {
      const positions = steamRef.current.geometry.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        positions[i * 3 + 1] += steamData.speed[i];
        positions[i * 3] += Math.sin(t * 1.2 + i) * 0.002;
        if (positions[i * 3 + 1] > 2.7) {
          positions[i * 3 + 1] = 0.65;
          positions[i * 3] = (Math.random() - 0.5) * 0.45;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // -----------------------------------------------------------------
    // SPICES ORBIT EXPANSION
    // -----------------------------------------------------------------
    if (spicesRef.current) {
      spicesRef.current.rotation.y += delta * 0.2;
      const expand = 1.0 + Math.sin(p * Math.PI) * 0.45;
      spicesRef.current.scale.setScalar(expand);
    }
  });

  return (
    <>
      <TapriBrassKettle progressRef={progressRef} />
      <TeaLiquidStream progressRef={progressRef} />

      {/* Main Glass Cup Container */}
      <group ref={cupGroupRef} position={[1.15, 1.6, 0]}>
        {/* ======================================================== */}
        {/* 1. TRANSPARENT GLASS (Smooth 64-segment geometry)        */}
        {/* ======================================================== */}
        {/* Outer Fluted Glass Body */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[1.05, 0.75, 1.85, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.96}
            transparent={true}
            opacity={1}
            roughness={0.03}
            ior={1.52}
            thickness={0.4}
            attenuationColor="#FFF8ED"
            attenuationDistance={2.0}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
          />
        </mesh>

        {/* Rounded Glass Rim */}
        <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.035, 16, 64]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.08} metalness={0.08} />
        </mesh>

        {/* Solid Weighted Crystal Base */}
        <mesh position={[0, -0.48, 0]}>
          <cylinderGeometry args={[0.75, 0.7, 0.25, 64]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.92}
            transparent={true}
            roughness={0.06}
            ior={1.54}
            thickness={0.8}
          />
        </mesh>

        {/* Sleek Glass Handle */}
        <mesh position={[1.08, 0.45, 0]}>
          <torusGeometry args={[0.46, 0.065, 16, 36, Math.PI * 0.95]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.95}
            transparent={true}
            roughness={0.05}
            ior={1.52}
            thickness={0.45}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 2. CHAI LIQUID COLUMN (Clean smaller radius, NO clipping)*/}
        {/* ======================================================== */}
        <mesh ref={liquidRef} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.94, 0.68, 1.55, 64]} />
          <meshStandardMaterial
            color="#8C461E"
            emissive="#4A200B"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.05}
            transparent={true}
            opacity={0.96}
          />
        </mesh>

        {/* 3. GOLDEN CARAMEL CREMA FROTH SURFACE */}
        <mesh ref={frothRef} position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.93, 64]} />
          <meshStandardMaterial
            color="#DFAF62"
            roughness={0.45}
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
            size={0.4}
            map={steamTex}
            transparent={true}
            opacity={0.38}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#FFF8ED"
          />
        </points>

        {/* ======================================================== */}
        {/* 5. DELICATE BOTANICAL SPICES (Properly Proportioned)     */}
        {/* ======================================================== */}
        <group ref={spicesRef}>
          {/* Idukki Green Cardamom Pod */}
          <group position={[1.4, 0.4, 0.3]} scale={[0.12, 0.22, 0.12]} rotation={[0.4, 0.8, -0.3]}>
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#6B8849" roughness={0.6} />
            </mesh>
            <mesh position={[0, 1.05, 0]}>
              <coneGeometry args={[0.2, 0.45, 8]} />
              <meshStandardMaterial color="#4A6131" roughness={0.7} />
            </mesh>
          </group>

          {/* Kerala Cinnamon Quill */}
          <group position={[-1.3, 0.65, 0.4]} rotation={[0.5, 0.3, 0.4]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.07, 0.9, 16, 1, true]} />
              <meshStandardMaterial color="#7D3F1D" roughness={0.8} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Sliced Ginger Disc */}
          <group position={[0.65, -0.45, 1.25]} scale={[0.2, 0.045, 0.22]} rotation={[0.6, 0.2, 0.4]}>
            <mesh>
              <cylinderGeometry args={[1, 0.92, 0.8, 18]} />
              <meshStandardMaterial color="#E8C37B" roughness={0.5} />
            </mesh>
          </group>

          {/* 8-Pointed Star Anise */}
          <group position={[-1.1, -0.3, -0.95]} scale={0.14} rotation={[0.3, 0.9, -0.4]}>
            <mesh>
              <sphereGeometry args={[0.4, 12, 12]} />
              <meshStandardMaterial color="#4A2311" roughness={0.75} />
            </mesh>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
              <group key={idx} rotation={[0, (idx * Math.PI) / 4, 0]}>
                <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                  <coneGeometry args={[0.2, 0.7, 6]} />
                  <meshStandardMaterial color="#5C2C15" roughness={0.72} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* Ground Contact Shadow */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.35}
        scale={6}
        blur={2.4}
        far={4}
        color="#392317"
      />
    </>
  );
}

// =========================================================================
// 5. MASTER T-CUP SCROLL EXPERIENCE COMPONENT (PINNED 350vh)
// =========================================================================
export default function TCupScrollExperience() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const targetProgress = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const maxScroll = el.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / maxScroll));
      targetProgress.current = p;

      // Update text step threshold smoothly
      if (p < 0.28) {
        setActiveStep(0);
      } else if (p < 0.60) {
        setActiveStep(1);
      } else if (p < 0.85) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    // Smooth animation loop to interpolate scroll position
    let animId;
    const updateLoop = () => {
      progressRef.current = THREE.MathUtils.lerp(
        progressRef.current,
        targetProgress.current,
        0.08
      );
      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-cream-100">
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Warm Ambient Radial Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-tea-light/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-tea-caramel/10 rounded-full blur-3xl pointer-events-none" />

        {/* ----------------------------------------------------------------- */}
        {/* PERSISTENT FULL-VIEWPORT 3D THREE.JS CANVAS                       */}
        {/* ----------------------------------------------------------------- */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5.0], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={1.1} color="#FFF8ED" />
            <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFFDF8" />
            <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#DFAF62" />
            <pointLight position={[0, -1.5, -2]} intensity={1.2} color="#DFAF62" />

            <Real3DTeaGlass
              progressRef={progressRef}
              mouseRef={mouseRef}
            />
          </Canvas>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* SYNCHRONIZED NARRATIVE HTML CONTENT OVERLAYS                      */}
        {/* ----------------------------------------------------------------- */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none flex flex-col justify-between py-8 sm:py-10">
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-tea-brown/70 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tea-caramel animate-pulse" />
              <span>
                {activeStep === 0 && '01 • Hero Introduction'}
                {activeStep === 1 && '02 • Whole Spices & Heritage'}
                {activeStep === 2 && '03 • The Tapri Kettle Pour'}
                {activeStep === 3 && '04 • Pure Earthen Saunda Pan'}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-tea-dark/60 font-mono text-[11px]">
              <span>T-CUP SCROLL EXPERIENCE</span>
            </div>
          </div>

          {/* Center Dynamic Scroll-Driven Content Sections (Left Column) */}
          <div className="relative w-full max-w-lg">
            {/* STEP 0: HERO (Visible on Page Load at top) */}
            <div
              className={`transition-all duration-700 space-y-6 ${
                activeStep === 0
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-8 pointer-events-none absolute inset-0'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/90 border border-tea-caramel/30 text-tea-brown text-xs font-semibold tracking-wide shadow-soft">
                <Sparkles className="w-3.5 h-3.5 text-tea-caramel" />
                <span>Authentic Chai Culture • Kota, Rajasthan</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-tea-dark tracking-tight leading-[1.12]">
                More Than Just Chai.<br />
                <span className="text-tea-caramel italic">It's A Whole Mood.</span>
              </h1>

              <p className="text-base sm:text-lg text-tea-dark/80 font-sans leading-relaxed">
                Discover the art of chai, unforgettable flavours and moments worth sharing in an atmosphere where Kota's youth, thinkers, and tea purists feel right at home.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-tea-brown hover:bg-tea-dark text-cream-50 font-semibold text-sm transition shadow-medium group"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/franchise"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-cream-50 hover:bg-cream-200 border border-tea-caramel/35 text-tea-brown font-semibold text-sm transition shadow-soft"
                >
                  <span>Become a Franchise Partner</span>
                </Link>
              </div>

              {/* Trust stats */}
              <div className="pt-6 border-t border-tea-caramel/15 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="font-serif text-2xl font-bold text-tea-brown">100%</p>
                  <p className="text-xs text-tea-dark/70 font-medium">Whole Indian Spices</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-tea-brown">Kota</p>
                  <p className="text-xs text-tea-dark/70 font-medium">Flagship Cafe</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-tea-brown">3</p>
                  <p className="text-xs text-tea-dark/70 font-medium">Signature Brands</p>
                </div>
              </div>
            </div>

            {/* STEP 1: HERITAGE & WHOLE SPICES (Appears as user scrolls) */}
            <div
              className={`transition-all duration-700 space-y-5 ${
                activeStep === 1
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-300 text-tea-brown text-xs font-bold uppercase tracking-wider">
                <span>Botanical Harmony</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark leading-tight">
                Every Sip Has <span className="text-tea-caramel italic">A Story.</span>
              </h2>

              <p className="text-tea-dark/80 text-base leading-relaxed">
                From hand-crushed Idukki green cardamom to Ceylon cinnamon quills and sun-dried ginger, we celebrate the timeless alchemy of Indian spices simmered slowly with farm-fresh milk.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-tea-dark/85">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Single-Estate Assam CTC selected for golden body & malty finish</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pure earthen Rajasthani kulhads baked in artisan wood kilns</span>
                </div>
              </div>
            </div>

            {/* STEP 2: HIGH TAPRI KETTLE POUR (Pouring active) */}
            <div
              className={`transition-all duration-700 space-y-5 ${
                activeStep === 2
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tea-caramel/20 text-tea-brown text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-tea-caramel" />
                <span>The Aeration Method</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark leading-tight">
                The High <span className="text-tea-caramel italic">Kettle Pour.</span>
              </h2>

              <p className="text-tea-dark/80 text-base leading-relaxed">
                Poured from height using traditional spun-brass ketlis at 96°C. The aerodynamic drop naturally cools the brew, infuses micro-air bubbles, and creates our signature frothy golden caramel crema.
              </p>

              <div className="inline-grid grid-cols-2 gap-4 p-4 rounded-2xl bg-cream-50/90 border border-tea-caramel/25 shadow-soft">
                <div>
                  <p className="text-[10px] uppercase font-bold text-tea-dark/60">Brew Temperature</p>
                  <p className="font-serif text-xl font-bold text-tea-brown">96°C Steady</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-tea-dark/60">Crema Aeration</p>
                  <p className="font-serif text-xl font-bold text-tea-brown">Natural Foam</p>
                </div>
              </div>
            </div>

            {/* STEP 3: TRANSITION TO CAFE EXPERIENCES */}
            <div
              className={`transition-all duration-700 space-y-4 ${
                activeStep === 3
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
              }`}
            >
              <span className="text-xs uppercase tracking-widest text-tea-caramel font-bold">
                The Journey Continues
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark">
                Step Into Our Sanctuary
              </h2>
              <p className="text-tea-dark/80 text-sm sm:text-base leading-relaxed">
                Scroll down to explore our complete handcrafted cafe creations, packaged tea blends, and Kota heritage story.
              </p>
              <ChevronDown className="w-6 h-6 text-tea-caramel animate-bounce pt-2" />
            </div>
          </div>

          {/* Bottom Telemetry & Scroll Cue */}
          <div className="flex items-center justify-between pt-4 border-t border-tea-caramel/15">
            <span className="text-xs text-tea-brown font-semibold hidden sm:inline">
              Crafted in Kota, Rajasthan
            </span>

            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 text-xs font-bold text-tea-brown animate-pulse mx-auto sm:mx-0">
              <span>Scroll to control 3D cup journey</span>
              <ChevronDown className="w-4 h-4 text-tea-caramel" />
            </div>

            <span className="text-xs text-tea-brown/60 hidden sm:inline">
              100% Pure Indian Botanical Craft
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
