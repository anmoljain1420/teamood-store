import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function FloatingSpice({ position, rotation, type, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.004;
      meshRef.current.position.y += Math.sin(t + position[0]) * 0.001;
    }
  });

  if (type === 'cinnamon') {
    return (
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <cylinderGeometry args={[0.08, 0.09, 1.2, 16]} />
        <meshStandardMaterial color="#4A2511" roughness={0.8} />
      </mesh>
    );
  }

  if (type === 'cardamom') {
    return (
      <mesh ref={meshRef} position={position} rotation={rotation} scale={[0.15 * scale, 0.24 * scale, 0.15 * scale]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#6E8457" roughness={0.6} />
      </mesh>
    );
  }

  if (type === 'starAnise') {
    return (
      <group ref={meshRef} position={position} rotation={rotation} scale={0.2 * scale}>
        {[0, 1, 2, 3, 4].map((idx) => (
          <mesh key={idx} rotation={[0, (idx * Math.PI * 2) / 5, 0.2]}>
            <cylinderGeometry args={[0.15, 0.45, 1.3, 8]} />
            <meshStandardMaterial color="#3A1C0C" roughness={0.8} />
          </mesh>
        ))}
      </group>
    );
  }

  // Tea Leaf default
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[0.18 * scale, 0.02 * scale, 0.3 * scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#24140A" roughness={0.9} />
    </mesh>
  );
}

export default function FloatingIngredients3D({ className = "h-48" }) {
  return (
    <div className={`w-full relative pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 2]} intensity={1.5} color="#FFFDF8" />
        <directionalLight position={[-3, -2, -1]} intensity={0.5} color="#DFAF62" />

        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <FloatingSpice position={[-3.2, 0.8, 0]} rotation={[0.4, 0.5, 0.2]} type="cinnamon" scale={1.1} />
          <FloatingSpice position={[-1.8, -1.0, 0.5]} rotation={[0.2, 0.8, 0.1]} type="cardamom" scale={1.2} />
          <FloatingSpice position={[0.2, 1.2, -0.5]} rotation={[0.5, 0.1, 0.4]} type="starAnise" scale={1.1} />
          <FloatingSpice position={[2.2, -0.6, 0.2]} rotation={[0.3, 0.6, 0.5]} type="cardamom" scale={1.3} />
          <FloatingSpice position={[3.4, 0.9, -0.2]} rotation={[0.6, 0.2, 0.7]} type="cinnamon" scale={0.9} />
          <FloatingSpice position={[-0.8, -0.5, 0]} rotation={[0.1, 0.9, 0.3]} type="leaf" scale={1.2} />
          <FloatingSpice position={[1.4, 0.7, 0]} rotation={[0.4, 0.3, 0.6]} type="leaf" scale={1.4} />
        </Float>
      </Canvas>
    </div>
  );
}
