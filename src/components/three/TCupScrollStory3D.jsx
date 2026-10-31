import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  ChevronDown,
  Rotate3d,
  Layers
} from 'lucide-react';

// ==========================================================
// 1. PROCEDURAL STEAM TEXTURE FOR 3D PARTICLES
// ==========================================================
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

// ==========================================================
// 2. ARTISANAL SPUN BRASS TAPRI KETTLE
// ==========================================================
function TapriKettle({ progressRef }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const p = progressRef.current;
      const isMobile = state.viewport.width < 5.5;
      const baseX = isMobile ? 0 : 1.25;

      // Kettle appears and tilts during pouring window (p: 0.28 to 0.72)
      if (p > 0.25 && p < 0.72) {
        ref.current.visible = true;
        const local = (p - 0.25) / 0.47;
        const tilt = Math.sin(local * Math.PI) * 0.72;
        ref.current.rotation.z = -tilt;

        // Track cup's exact dynamic coordinates
        const cupY = THREE.MathUtils.lerp(1.15, -2.1, p);
        const cupX = baseX + Math.sin(p * Math.PI) * 0.25;

        ref.current.position.y = cupY + 1.45;
        ref.current.position.x = cupX - 1.15;
      } else {
        ref.current.visible = false;
        ref.current.position.set(-3.0, 5.0, 0);
      }
    }
  });

  return (
    <group ref={ref} position={[-3.0, 5.0, 0]}>
      {/* Kettle Spun Brass Body */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.78, 1.05, 48]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.25} metalness={0.88} />
      </mesh>
      {/* Decorative Trim */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.025, 12, 36]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.2} metalness={0.85} />
      </mesh>
      {/* Domed Lid & Finial */}
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.36, 0.44, 0.14, 32]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.25} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#5C2D13" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Tapri Spout */}
      <group position={[0.52, 0.05, 0]} rotation={[0, 0, -0.65]}>
        <mesh position={[0.26, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.15, 0.7, 24]} />
          <meshStandardMaterial color="#DFAF62" roughness={0.24} metalness={0.88} />
        </mesh>
      </group>
      {/* Arched Brass Top Handle */}
      <mesh position={[-0.05, 0.6, 0]}>
        <torusGeometry args={[0.55, 0.038, 12, 28, Math.PI * 0.95]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// ==========================================================
// 3. AMBER TEA STREAM
// ==========================================================
function TeaStream({ progressRef }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const p = progressRef.current;
      const isPouring = p > 0.35 && p < 0.65;
      ref.current.visible = isPouring;

      if (isPouring) {
        const t = state.clock.getElapsedTime();
        const isMobile = state.viewport.width < 5.5;
        const baseX = isMobile ? 0 : 1.25;

        const cupY = THREE.MathUtils.lerp(1.15, -2.1, p);
        const cupX = baseX + Math.sin(p * Math.PI) * 0.25;

        ref.current.position.y = cupY;
        ref.current.position.x = cupX;
        ref.current.scale.x = 1.0 + Math.sin(t * 30) * 0.08;
      }
    }
  });

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.68, 1.7, 0),
      new THREE.Vector3(-0.35, 1.35, 0.02),
      new THREE.Vector3(-0.1, 0.95, 0.01),
      new THREE.Vector3(0.0, 0.65, 0)
    ]);
  }, []);

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 24, 0.038, 12, false]} />
      <meshStandardMaterial
        color="#D98845"
        emissive="#8C461E"
        emissiveIntensity={0.65}
        roughness={0.12}
        metalness={0.1}
        transparent={true}
        opacity={0.94}
      />
    </mesh>
  );
}

// ==========================================================
// 4. PHOTOREALISTIC TRANSPARENT GLASS TEA CUP
// ==========================================================
function RealisticGlassCup({ progressRef, mouseRef, isOrbitMode, flavorColor }) {
  const cupGroupRef = useRef();
  const liquidRef = useRef();
  const frothRef = useRef();
  const steamRef = useRef();
  const spicesRef = useRef();

  const steamTex = useMemo(() => createSteamTexture(), []);
  const steamCount = 32;

  const steamData = useMemo(() => {
    const pos = new Float32Array(steamCount * 3);
    const speed = new Float32Array(steamCount);
    for (let i = 0; i < steamCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.55;
      pos[i * 3 + 1] = 0.75 + Math.random() * 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.55;
      speed[i] = 0.012 + Math.random() * 0.016;
    }
    return { pos, speed };
  }, [steamCount]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const p = progressRef.current; // 0 (top) to 1 (bottom)
    const isMobile = state.viewport.width < 5.5;

    if (cupGroupRef.current && !isOrbitMode) {
      // -----------------------------------------------------------------
      // THE T-CUP SCROLL MECHANIC:
      // Cup travels continuously from TOP of the screen to the BOTTOM!
      // At p = 0: y = +1.15 (near top of viewport, alongside hero text)
      // At p = 0.5: y = 0.0 (center of viewport)
      // At p = 1.0: y = -2.1 (exits toward bottom of viewport)
      // -----------------------------------------------------------------
      const targetY = THREE.MathUtils.lerp(1.15, -2.1, p);

      // Horizontal offset: on desktop, placed to the right (x = 1.25)
      // On mobile, centered (x = 0)
      const baseX = isMobile ? 0 : 1.25;
      const targetX = baseX + Math.sin(p * Math.PI) * 0.25;

      // Continuous axial rotation as it travels down (0 to 360+ degrees)
      const targetRotY = p * Math.PI * 2.5 + Math.sin(t * 0.6) * 0.08 + (mouseRef.current.x * 0.25);

      // Subtle tilt for cinematic depth
      const targetRotX = 0.08 + Math.sin(p * Math.PI) * 0.1 - (mouseRef.current.y * 0.12);

      // Gentle floating hover breath
      const breath = Math.sin(t * 1.5) * 0.025;

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
    // TEA LIQUID LEVEL RISES WITH POURING
    // -----------------------------------------------------------------
    if (liquidRef.current && frothRef.current) {
      let fill = 0.65;
      if (p > 0.32 && p < 0.68) {
        fill = THREE.MathUtils.lerp(0.65, 0.94, (p - 0.32) / 0.36);
      } else if (p >= 0.68) {
        fill = 0.94;
      }
      liquidRef.current.scale.y = fill;
      liquidRef.current.position.y = -0.3 + (fill * 1.6) / 2;

      const topY = -0.3 + fill * 1.6;
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
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = 0.65;
          positions[i * 3] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // -----------------------------------------------------------------
    // FLOATING BOTANICAL SPICES ORBIT
    // -----------------------------------------------------------------
    if (spicesRef.current) {
      spicesRef.current.rotation.y += delta * 0.22;
      const expand = 1.0 + Math.sin(p * Math.PI) * 0.45;
      spicesRef.current.scale.setScalar(expand);
    }
  });

  return (
    <>
      <TapriKettle progressRef={progressRef} />
      <TeaStream progressRef={progressRef} />

      {/* Main Glass Cup Group */}
      <group ref={cupGroupRef} position={[0, 2.2, 0]}>
        {/* ======================================================== */}
        {/* 1. TRANSPARENT GLASS BODY (Smooth 64-segment geometry)   */}
        {/* ======================================================== */}
        {/* Outer Glass Wall */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.1, 0.78, 1.95, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.96}
            transparent={true}
            opacity={1}
            roughness={0.04}
            ior={1.52}
            thickness={0.45}
            attenuationColor="#FFF8ED"
            attenuationDistance={1.8}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Smooth Rounded Glass Lip Rim */}
        <mesh position={[0, 1.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.038, 16, 64]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.08} metalness={0.08} />
        </mesh>

        {/* Solid Heavy Base (Crystal Tapri Glass Bottom) */}
        <mesh position={[0, -0.48, 0]}>
          <cylinderGeometry args={[0.78, 0.72, 0.26, 64]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.93}
            transparent={true}
            roughness={0.06}
            ior={1.54}
            thickness={0.85}
          />
        </mesh>

        {/* Glass Handle */}
        <mesh position={[1.12, 0.45, 0]}>
          <torusGeometry args={[0.48, 0.07, 16, 40, Math.PI * 0.95]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.95}
            transparent={true}
            roughness={0.05}
            ior={1.52}
            thickness={0.5}
          />
        </mesh>

        {/* ======================================================== */}
        {/* 2. SPICED CHAI TEA LIQUID (Sized smaller to avoid clash) */}
        {/* ======================================================== */}
        <mesh ref={liquidRef} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.98, 0.72, 1.6, 64]} />
          <meshStandardMaterial
            color={flavorColor}
            emissive={flavorColor}
            emissiveIntensity={0.32}
            roughness={0.16}
            metalness={0.05}
            transparent={true}
            opacity={0.95}
          />
        </mesh>

        {/* 3. GOLDEN CARAMEL CREMA FROTH SURFACE */}
        <mesh ref={frothRef} position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.97, 64]} />
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
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#FFF8ED"
          />
        </points>

        {/* ======================================================== */}
        {/* 5. FLOATING WHOLE BOTANICAL SPICES (Cleanly Proportioned)*/}
        {/* ======================================================== */}
        <group ref={spicesRef}>
          {/* Idukki Green Cardamom Pod */}
          <group position={[1.5, 0.4, 0.3]} scale={[0.13, 0.24, 0.13]} rotation={[0.4, 0.8, -0.3]}>
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
          <group position={[-1.4, 0.65, 0.4]} rotation={[0.5, 0.3, 0.4]}>
            <mesh>
              <cylinderGeometry args={[0.065, 0.075, 0.95, 16, 1, true]} />
              <meshStandardMaterial color="#7D3F1D" roughness={0.8} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Sliced Ginger Disc */}
          <group position={[0.7, -0.5, 1.3]} scale={[0.22, 0.05, 0.25]} rotation={[0.6, 0.2, 0.4]}>
            <mesh>
              <cylinderGeometry args={[1, 0.92, 0.8, 18]} />
              <meshStandardMaterial color="#E8C37B" roughness={0.5} />
            </mesh>
          </group>

          {/* 8-Pointed Star Anise */}
          <group position={[-1.15, -0.3, -1.0]} scale={0.15} rotation={[0.3, 0.9, -0.4]}>
            <mesh>
              <sphereGeometry args={[0.4, 12, 12]} />
              <meshStandardMaterial color="#4A2311" roughness={0.75} />
            </mesh>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
              <group key={idx} rotation={[0, (idx * Math.PI) / 4, 0]}>
                <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                  <coneGeometry args={[0.22, 0.75, 6]} />
                  <meshStandardMaterial color="#5C2C15" roughness={0.72} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* Ground Contact Shadow */}
      <ContactShadows
        position={[0, -2.7, 0]}
        opacity={0.35}
        scale={6}
        blur={2.4}
        far={4}
        color="#392317"
      />
    </>
  );
}

// ==========================================================
// 5. MASTER T-CUP SCROLL STORY COMPONENT (PINNED 350vh)
// ==========================================================
export default function TCupScrollStory3D() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [flavor, setFlavor] = useState('masala');

  const flavors = {
    masala: { color: '#8C461E', label: 'Shahi Masala' },
    chocolate: { color: '#381B0E', label: 'Dark Chocolate' },
    kesar: { color: '#B57422', label: 'Kashmiri Kesar' },
    adrak: { color: '#783A16', label: 'Zesty Adrak' }
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      progressRef.current = p;

      // Update text step threshold
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-cream-100">
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Warm Ambient Radial Gradients */}
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

            <RealisticGlassCup
              progressRef={progressRef}
              mouseRef={mouseRef}
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

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsOrbitMode(!isOrbitMode)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition shadow-xs flex items-center gap-1.5 ${
                  isOrbitMode
                    ? 'bg-tea-caramel text-cream-50'
                    : 'bg-cream-50/95 hover:bg-cream-200 text-tea-brown border border-tea-caramel/25'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5" />
                <span>{isOrbitMode ? 'Lock Scroll' : '360° Drag'}</span>
              </button>
            </div>
          </div>

          {/* Center Dynamic Scroll-Driven Content Sections */}
          <div className="relative w-full max-w-xl">
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

          {/* Bottom Telemetry & Blend Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-tea-caramel/15 pointer-events-auto">
            {/* Blend selector pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-cream-50/95 border border-tea-caramel/25 shadow-soft">
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

            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 text-xs font-bold text-tea-brown animate-pulse">
              <span>Scroll down to control 3D cup journey</span>
              <ChevronDown className="w-4 h-4 text-tea-caramel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
