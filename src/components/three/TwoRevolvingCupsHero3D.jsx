import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Tea Leaf particle component
function OrbitingTeaLeaves({ count = 8, color = "#83B579", radius = 1.6 }) {
  const groupRef = useRef();

  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 1.8;
      const speed = 0.5 + Math.random() * 0.8;
      const scale = 0.12 + Math.random() * 0.08;
      const rotSpeed = (Math.random() - 0.5) * 2;
      return { angle, yOffset, speed, scale, rotSpeed };
    });
  }, [count]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {leaves.map((leaf, idx) => {
        const x = Math.cos(leaf.angle) * radius;
        const z = Math.sin(leaf.angle) * radius;
        return (
          <mesh key={idx} position={[x, leaf.yOffset, z]} scale={leaf.scale}>
            {/* Organic leaf shape */}
            <cylinderGeometry args={[0.02, 0.4, 1.2, 5]} />
            <meshStandardMaterial
              color={color}
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Single Realistic 3D Tea Cup with Glass, Liquid, Branded Sleeve, Lid & Ice/Steam
function TeaCup({
  position = [0, 0, 0],
  rotationSpeed = 0.7,
  liquidColor = "#D6882E",
  sleeveColor = "#1D3D2C",
  sleeveTextColor = "#F5D36F",
  brandText = "TEAMOOD",
  flavorName = "EARL GREY",
  reverse = false,
  isMobile = false
}) {
  const cupGroupRef = useRef();
  const innerLiquidRef = useRef();

  useFrame((state, delta) => {
    if (cupGroupRef.current) {
      cupGroupRef.current.rotation.y += delta * rotationSpeed * (reverse ? -1 : 1);
    }
    if (innerLiquidRef.current) {
      // Gentle liquid wobble
      innerLiquidRef.current.rotation.y -= delta * 0.1;
    }
  });

  // Create canvas texture for the sleeve branding
  const sleeveTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = sleeveColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative edge borders
    ctx.strokeStyle = sleeveTextColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    // Brand Name
    ctx.fillStyle = sleeveTextColor;
    ctx.font = 'bold 74px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${brandText} • CAFE`, canvas.width / 4, 110);
    ctx.fillText(`${brandText} • CAFE`, (3 * canvas.width) / 4, 110);

    // Subtitle
    ctx.font = '600 32px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(flavorName, canvas.width / 4, 175);
    ctx.fillText(flavorName, (3 * canvas.width) / 4, 175);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  }, [sleeveColor, sleeveTextColor, brandText, flavorName]);

  return (
    <group position={position}>
      {/* Gentle natural floating physics */}
      <Float
        speed={1.8}
        rotationIntensity={0.2}
        floatIntensity={0.6}
        floatingRange={[-0.12, 0.12]}
      >
        <group ref={cupGroupRef} scale={isMobile ? 0.85 : 1.05}>
          {/* 1. OUTER GLASS BEVERAGE CUP */}
          {/* Main transparent glass body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.95, 0.72, 2.3, 32, 1, true]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.88}
              opacity={0.85}
              transparent
              roughness={0.08}
              metalness={0.05}
              ior={1.48}
              thickness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Solid glass base */}
          <mesh position={[0, -1.14, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.08, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.8}
              opacity={0.9}
              transparent
              roughness={0.1}
              ior={1.48}
            />
          </mesh>

          {/* 2. INNER LIQUID (Steeped Tea) */}
          <group ref={innerLiquidRef}>
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.88, 0.68, 1.85, 32]} />
              <meshStandardMaterial
                color={liquidColor}
                roughness={0.15}
                metalness={0.1}
                transparent
                opacity={0.92}
              />
            </mesh>

            {/* Liquid Meniscus / Top surface with soft cream/bubble rim */}
            <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.88, 32]} />
              <meshStandardMaterial
                color={liquidColor}
                roughness={0.2}
                metalness={0.05}
              />
            </mesh>

            {/* Floating ice cubes / tea beads inside */}
            <mesh position={[0.25, 0.65, 0.2]} rotation={[0.4, 0.5, 0]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshPhysicalMaterial
                color="#FFFFFF"
                transmission={0.95}
                transparent
                opacity={0.7}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[-0.2, 0.58, -0.25]} rotation={[0.2, -0.6, 0.4]}>
              <boxGeometry args={[0.26, 0.26, 0.26]} />
              <meshPhysicalMaterial
                color="#FFFFFF"
                transmission={0.95}
                transparent
                opacity={0.7}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* 3. BRANDED BEVERAGE SLEEVE (Packaging band) */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.965, 0.85, 0.95, 32, 1, true]} />
            <meshStandardMaterial
              map={sleeveTexture}
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Top & bottom rings of sleeve */}
          <mesh position={[0, 0.42, 0]}>
            <torusGeometry args={[0.965, 0.02, 16, 32]} />
            <meshStandardMaterial color={sleeveTextColor} roughness={0.3} metalness={0.3} />
          </mesh>
          <mesh position={[0, -0.52, 0]}>
            <torusGeometry args={[0.85, 0.02, 16, 32]} />
            <meshStandardMaterial color={sleeveTextColor} roughness={0.3} metalness={0.3} />
          </mesh>

          {/* 4. PREMIUM CUP LID (Satin Ivory/White Domed Lid with drinking sip port) */}
          <group position={[0, 1.15, 0]}>
            {/* Outer lid rim */}
            <mesh position={[0, 0.03, 0]}>
              <cylinderGeometry args={[1.02, 0.98, 0.12, 32]} />
              <meshStandardMaterial color="#FAFAF2" roughness={0.25} metalness={0.05} />
            </mesh>
            {/* Domed top step */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.88, 0.96, 0.15, 32]} />
              <meshStandardMaterial color="#FAFAF2" roughness={0.25} metalness={0.05} />
            </mesh>
            {/* Sipping port accent */}
            <mesh position={[0.6, 0.23, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
              <meshStandardMaterial color="#1D3D2C" roughness={0.5} />
            </mesh>
            {/* Eco straw sticking out gracefully */}
            <mesh position={[0.6, 0.65, 0]} rotation={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.04, 0.04, 0.9, 16]} />
              <meshStandardMaterial color="#83B579" roughness={0.3} />
            </mesh>
          </group>

          {/* Orbiting botanical particles */}
          <OrbitingTeaLeaves
            count={6}
            color={liquidColor === "#8FB769" ? "#83B579" : "#F5D36F"}
            radius={1.4}
          />
        </group>
      </Float>

      {/* Realistic contact shadow on floor plane */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.35}
        scale={3.5}
        blur={2.4}
        far={3}
      />
    </group>
  );
}

// Scene with interactive parallax and responsive dual cup placement
function RevolvingCupsScene({ mousePos }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 7.5;
  const sceneRef = useRef();

  useFrame((state, delta) => {
    if (sceneRef.current) {
      // Subtle 3D Parallax following mouse
      const targetRotY = (mousePos.current.x * 0.15);
      const targetRotX = (-mousePos.current.y * 0.1);
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, targetRotY, 0.05);
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, targetRotX, 0.05);
    }
  });

  // Calculate cup positions based on viewport
  // On desktop: left cup on the left, right cup on the right
  // On mobile: cups reposition above and below the headline
  const leftCupPos = isMobile ? [0, 2.3, 0] : [-3.3, 0, 0];
  const rightCupPos = isMobile ? [0, -2.4, 0] : [3.3, 0, 0];

  return (
    <group ref={sceneRef}>
      {/* 3-Point Studio Lighting for Sparkling Glass and Beverage Vibrancy */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 8, 5]} intensity={1.5} color="#FFFFFF" castShadow />
      <directionalLight position={[-6, 5, -3]} intensity={0.8} color="#CFE9C5" />
      <pointLight position={[0, -2, 4]} intensity={0.6} color="#F5D36F" />
      <pointLight position={[0, 4, -4]} intensity={0.4} color="#FFDCCB" />

      {/* CUP 1 (LEFT): Rich Amber Earl Grey / Shahi Masala Chai in Forest Green Sleeve */}
      <TeaCup
        position={leftCupPos}
        rotationSpeed={0.55}
        liquidColor="#D98A28" // Warm golden tea amber
        sleeveColor="#1D3D2C" // Forest Green
        sleeveTextColor="#F5D36F" // Lemon
        brandText="TEAMOOD"
        flavorName="EARL GREY"
        reverse={false}
        isMobile={isMobile}
      />

      {/* CUP 2 (RIGHT): Crisp Jade Mint Green / Sparkling Peach Rose in Fresh Mint Sleeve */}
      <TeaCup
        position={rightCupPos}
        rotationSpeed={0.5}
        liquidColor="#7EB356" // Vibrant emerald mint green
        sleeveColor="#CFE9C5" // Mint Green
        sleeveTextColor="#1D3D2C" // Forest Green
        brandText="TEAMOOD"
        flavorName="MINT GREEN"
        reverse={true}
        isMobile={isMobile}
      />
    </group>
  );
}

// Main Export Component
export default function TwoRevolvingCupsHero3D() {
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mousePos.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: (e.clientY / innerHeight) * 2 - 1,
    };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <RevolvingCupsScene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
