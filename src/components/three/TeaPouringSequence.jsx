import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

// 3D Teapot / Kettle Component
function Kettle({ pourProgress }) {
  const kettleRef = useRef();

  useFrame(() => {
    if (kettleRef.current) {
      // Tilt kettle based on pourProgress (0 to 1)
      // Progress 0-0.2: lowering into position
      // Progress 0.2-0.8: tilt 0 to -48 degrees
      const tilt = pourProgress > 0.15 ? Math.min(0.85, (pourProgress - 0.15) * 1.3) : 0;
      kettleRef.current.rotation.z = -tilt;
      kettleRef.current.position.y = 1.6 - (pourProgress * 0.2);
      kettleRef.current.position.x = -1.2 + (pourProgress * 0.3);
    }
  });

  return (
    <group ref={kettleRef} position={[-1.2, 1.6, 0]}>
      {/* Kettle Body (Royal Brass/Copper Finish) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.85, 32, 24]} />
        <meshStandardMaterial
          color="#DFAF62"
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      {/* Kettle Lid with Brass Finial */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.15, 32]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#6B3E26" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Spout extending to the right */}
      <group position={[0.7, 0.15, 0]} rotation={[0, 0, -0.65]}>
        <mesh position={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.18, 0.8, 24]} />
          <meshStandardMaterial color="#DFAF62" roughness={0.25} metalness={0.75} />
        </mesh>
      </group>

      {/* Curved Handle Arching over the Kettle */}
      <mesh position={[-0.1, 0.7, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.68, 0.07, 16, 32, Math.PI * 0.9]} />
        <meshStandardMaterial color="#392317" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}

// Dynamic Tea Stream
function TeaStream({ pourProgress }) {
  const streamRef = useRef();

  useFrame((state) => {
    if (streamRef.current) {
      // Stream is active when pourProgress > 0.25
      const isPouring = pourProgress > 0.25 && pourProgress < 0.98;
      streamRef.current.visible = isPouring;

      if (isPouring) {
        // Subtle shimmering wave in the stream
        const t = state.clock.getElapsedTime();
        streamRef.current.scale.x = 1 + Math.sin(t * 20) * 0.08;
      }
    }
  });

  // Calculate curve points from kettle spout tip to cup rim center
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.35, 1.35, 0),
    new THREE.Vector3(-0.05, 0.6, 0),
    new THREE.Vector3(0.5, -0.2, 0)
  );

  const tubeGeometry = new THREE.TubeGeometry(curve, 24, 0.05, 12, false);

  return (
    <mesh ref={streamRef} geometry={tubeGeometry}>
      <meshStandardMaterial
        color="#C98B4B"
        roughness={0.15}
        metalness={0.1}
        emissive="#6B3E26"
        emissiveIntensity={0.4}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

// Cup with Filling Liquid Level & Steam
function TargetCup({ pourProgress }) {
  const liquidMeshRef = useRef();
  const steamRef = useRef();

  useFrame((state) => {
    // Fill level rises from 0.05 to 1.0 as progress moves from 0.3 to 0.95
    const fillPercent = THREE.MathUtils.clamp((pourProgress - 0.28) / 0.65, 0.02, 1);

    if (liquidMeshRef.current) {
      liquidMeshRef.current.scale.y = Math.max(0.05, fillPercent);
      liquidMeshRef.current.position.y = -0.7 + (fillPercent * 0.45);
    }

    if (steamRef.current) {
      steamRef.current.visible = fillPercent > 0.15;
      steamRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[0.5, -0.6, 0]}>
      {/* Transparent Glass Cup */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.75, 0.55, 1.4, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#FFFDF8"
          transmission={0.92}
          roughness={0.06}
          ior={1.5}
          transparent
          thickness={0.25}
        />
      </mesh>

      {/* Glass Base */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.55, 0.5, 0.15, 32]} />
        <meshPhysicalMaterial color="#FFF8ED" transmission={0.9} transparent roughness={0.1} />
      </mesh>

      {/* Filling Tea Liquid */}
      <mesh ref={liquidMeshRef} position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.7, 0.52, 0.9, 32]} />
        <meshStandardMaterial
          color="#8C5331"
          roughness={0.25}
          emissive="#6B3E26"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Floating Steam Wisp */}
      <group ref={steamRef} position={[0, 0.5, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.sin(i) * 0.15, i * 0.3, Math.cos(i) * 0.15]}>
            <sphereGeometry args={[0.15 + i * 0.08, 12, 12]} />
            <meshStandardMaterial color="#FFF8ED" transparent opacity={0.2 - i * 0.05} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function TeaPouringSequence() {
  const [pourProgress, setPourProgress] = useState(0.45);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play animation loop
  useEffect(() => {
    let animId;
    let forward = true;

    const loop = () => {
      if (isPlaying) {
        setPourProgress((prev) => {
          if (prev >= 1) {
            forward = false;
            return 0.98;
          }
          if (prev <= 0.05) {
            forward = true;
            return 0.07;
          }
          return forward ? prev + 0.005 : prev - 0.007;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <section className="py-20 bg-gradient-to-b from-cream-100 via-cream-200 to-cream-100 relative overflow-hidden border-y border-tea-caramel/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Story Context Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tea-caramel/15 border border-tea-caramel/30 text-tea-brown text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-tea-caramel" />
              <span>Signature 3D Pour Experience</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-tea-dark font-bold leading-tight">
              The Ritual of the <span className="text-tea-caramel italic">Perfect High Pour</span>
            </h2>

            <p className="text-tea-dark/80 text-base md:text-lg leading-relaxed font-sans">
              In Kota's royal tea lore, the secret to velvety, aromatic chai is the iconic high drop. As the steaming decoction cascades through the air, it aerates with whole spices, creating a luscious natural crema on top.
            </p>

            {/* Interactive Control Panel */}
            <div className="p-5 rounded-2xl bg-cream-50/90 border border-tea-caramel/25 shadow-soft space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-tea-brown uppercase tracking-wider">
                <span>Interactive Pour Scrubber</span>
                <span className="text-tea-caramel">{Math.round(pourProgress * 100)}% Brewed</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={pourProgress}
                onChange={(e) => {
                  setIsPlaying(false);
                  setPourProgress(parseFloat(e.target.value));
                }}
                className="w-full h-2 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-tea-caramel"
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-tea-brown text-cream-50 hover:bg-tea-dark text-xs font-medium transition shadow-soft"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Pour
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Auto Pour
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setPourProgress(0);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-tea-brown/80 hover:text-tea-dark hover:bg-cream-200 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Brew notes */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-cream-300/40 text-center">
                <p className="text-xs text-tea-brown/70">Kettle Heat</p>
                <p className="text-sm font-bold text-tea-dark">96°C Simmer</p>
              </div>
              <div className="p-3 rounded-xl bg-cream-300/40 text-center">
                <p className="text-xs text-tea-brown/70">Drop Height</p>
                <p className="text-sm font-bold text-tea-dark">18 Inches</p>
              </div>
              <div className="p-3 rounded-xl bg-cream-300/40 text-center">
                <p className="text-xs text-tea-brown/70">Infusion</p>
                <p className="text-sm font-bold text-tea-dark">5 Spices</p>
              </div>
            </div>
          </div>

          {/* 3D Scene Viewport */}
          <div className="lg:col-span-7 h-[420px] md:h-[500px] w-full relative rounded-3xl bg-cream-50/60 border border-tea-caramel/20 shadow-medium overflow-hidden">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-cream-50/80 backdrop-blur-sm border border-tea-caramel/20 text-[11px] font-medium text-tea-brown">
              Real-time 3D Canvas
            </div>

            <Canvas
              camera={{ position: [0, 0.4, 4.2], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 5, 3]} intensity={1.8} color="#FFFDF8" />
              <directionalLight position={[-3, -1, -2]} intensity={0.5} color="#DFAF62" />
              <pointLight position={[0.5, 0, 1]} color="#C98B4B" intensity={1.5} />

              <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
                <Kettle pourProgress={pourProgress} />
                <TeaStream pourProgress={pourProgress} />
                <TargetCup pourProgress={pourProgress} />
              </Float>

              <ContactShadows
                position={[0, -1.6, 0]}
                opacity={0.4}
                scale={6}
                blur={2.5}
                far={3}
                color="#392317"
              />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
