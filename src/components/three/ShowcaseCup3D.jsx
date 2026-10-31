import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Orbiting floating botanicals tailored to the flavor
function FloatingBotanicals({ botanicals = [], themeColor = "#F5D36F" }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  const botanicalItems = useMemo(() => {
    return [
      { pos: [1.8, 0.8, 0.4], rot: [0.3, 0.5, 0.2], scale: 0.25 },
      { pos: [-1.7, -0.6, 0.6], rot: [-0.4, 0.2, 0.6], scale: 0.28 },
      { pos: [1.4, -0.9, -0.5], rot: [0.5, -0.3, 0.1], scale: 0.22 },
      { pos: [-1.5, 0.9, -0.4], rot: [-0.2, 0.8, -0.3], scale: 0.26 },
      { pos: [0.3, 1.6, -0.8], rot: [0.1, 0.4, 0.5], scale: 0.24 },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {botanicalItems.map((item, idx) => (
        <group key={idx} position={item.pos} rotation={item.rot} scale={item.scale}>
          {/* Stylized organic leaf/botanical geometry */}
          <mesh>
            <cylinderGeometry args={[0.05, 0.55, 1.4, 6]} />
            <meshStandardMaterial
              color={themeColor}
              roughness={0.3}
              metalness={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.08]} scale={0.5}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} transmission={0.7} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 3D Product Cup Model for Showcase
function ProductCupModel({ flavour }) {
  const cupRef = useRef();
  const liquidRef = useRef();

  // Create high-res dynamic texture for sleeve
  const sleeveTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    // Fill background with sleeve color
    ctx.fillStyle = flavour.cupSleeveColor || flavour.themeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle pattern bands
    ctx.fillStyle = 'rgba(29, 61, 44, 0.08)';
    for (let i = 0; i < canvas.width; i += 32) {
      ctx.fillRect(i, 0, 16, canvas.height);
    }

    // Border
    ctx.strokeStyle = '#1D3D2C';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Brand Name
    ctx.fillStyle = '#1D3D2C';
    ctx.font = '900 68px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TEAMOOD', canvas.width / 4, 110);
    ctx.fillText('TEAMOOD', (3 * canvas.width) / 4, 110);

    // Flavour Name
    ctx.font = '700 34px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#1D3D2C';
    ctx.fillText(flavour.name.toUpperCase(), canvas.width / 4, 185);
    ctx.fillText(flavour.name.toUpperCase(), (3 * canvas.width) / 4, 185);

    // Quality Badge
    ctx.font = '600 20px "DM Sans", sans-serif';
    ctx.fillText(`★ ${flavour.category.toUpperCase()} • 100% ARTISAN ★`, canvas.width / 4, 240);
    ctx.fillText(`★ ${flavour.category.toUpperCase()} • 100% ARTISAN ★`, (3 * canvas.width) / 4, 240);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, [flavour]);

  useFrame((state, delta) => {
    if (cupRef.current) {
      cupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={cupRef}>
      {/* 1. OUTER TRANSPARENT DRINK CUP BODY */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 0.82, 2.7, 36, 1, true]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.88}
          opacity={0.85}
          transparent
          roughness={0.1}
          metalness={0.08}
          ior={1.49}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Solid bottom base */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.1, 36]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.85}
          opacity={0.9}
          transparent
          roughness={0.12}
        />
      </mesh>

      {/* 2. INNER LIQUID */}
      <group ref={liquidRef}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[1.02, 0.78, 2.25, 36]} />
          <meshStandardMaterial
            color={flavour.cupLiquidColor}
            roughness={0.18}
            metalness={0.1}
            transparent
            opacity={0.94}
          />
        </mesh>

        {/* Top liquid surface */}
        <mesh position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.02, 36]} />
          <meshStandardMaterial
            color={flavour.cupLiquidColor}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>

        {/* Clear ice cubes */}
        <mesh position={[0.3, 0.8, 0.2]} rotation={[0.3, 0.6, 0.1]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshPhysicalMaterial color="#FFFFFF" transmission={0.92} transparent opacity={0.8} />
        </mesh>
        <mesh position={[-0.28, 0.72, -0.22]} rotation={[-0.2, 0.4, 0.5]}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshPhysicalMaterial color="#FFFFFF" transmission={0.92} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* 3. SLEEVE PACKAGING BAND */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.115, 0.98, 1.15, 36, 1, true]} />
        <meshStandardMaterial
          map={sleeveTexture}
          roughness={0.35}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sleeve Trim Rings */}
      <mesh position={[0, 0.52, 0]}>
        <torusGeometry args={[1.115, 0.02, 16, 36]} />
        <meshStandardMaterial color="#1D3D2C" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <torusGeometry args={[0.98, 0.02, 16, 36]} />
        <meshStandardMaterial color="#1D3D2C" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 4. DOMED LID */}
      <group position={[0, 1.35, 0]}>
        {/* Rim collar */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.18, 1.13, 0.14, 36]} />
          <meshStandardMaterial color="#FAFAF2" roughness={0.25} />
        </mesh>
        {/* Dome */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.98, 1.14, 0.22, 36]} />
          <meshStandardMaterial color="#FAFAF2" roughness={0.25} />
        </mesh>
        {/* Drinking lip */}
        <mesh position={[0.7, 0.32, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#1D3D2C" roughness={0.4} />
        </mesh>
        {/* Eco Straw */}
        <mesh position={[0.7, 0.78, 0]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.045, 0.045, 1.0, 16]} />
          <meshStandardMaterial color={flavour.cupSleeveColor} roughness={0.3} />
        </mesh>
      </group>

      {/* Orbiting Botanicals */}
      <FloatingBotanicals
        botanicals={flavour.botanicals}
        themeColor={flavour.themeColor}
      />
    </group>
  );
}

export default function ShowcaseCup3D({ activeFlavour }) {
  return (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[540px] relative select-none">
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 7, 4]} intensity={1.6} color="#FFFFFF" castShadow />
        <directionalLight position={[-5, 4, -3]} intensity={0.7} color={activeFlavour.themeColor} />
        <pointLight position={[0, 2, 4]} intensity={0.6} color="#FFFFFF" />

        <Float
          speed={2.2}
          rotationIntensity={0.25}
          floatIntensity={0.8}
          floatingRange={[-0.15, 0.15]}
        >
          <ProductCupModel flavour={activeFlavour} />
        </Float>

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.4}
          scale={4.2}
          blur={2.6}
          far={3.5}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
