import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Rotate3d,
  Layers,
  Thermometer,
  Compass,
  Volume2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. PROCEDURAL STEAM TEXTURE FOR 3D CANVAS
// ==========================================
function createSteamParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
  grad.addColorStop(0.35, 'rgba(255, 248, 238, 0.4)');
  grad.addColorStop(0.7, 'rgba(255, 240, 225, 0.12)');
  grad.addColorStop(1, 'rgba(255, 240, 225, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ==========================================
// 2. DETAILED 3D BOTANICAL SPICE MODELS
// ==========================================

// Idukki Green Cardamom Pod (Elettaria cardamomum)
function CardamomModel({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Ribbed Spindle Body */}
      <mesh scale={[0.22, 0.42, 0.22]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#6B8849" roughness={0.55} metalness={0.05} />
      </mesh>
      {/* Pointed Calyx Tip */}
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.07, 0.18, 8]} />
        <meshStandardMaterial color="#4A6131" roughness={0.65} />
      </mesh>
      {/* Longitudinal Ridge Trim */}
      <mesh scale={[0.23, 0.43, 0.1]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#86A360" roughness={0.5} wireframe={false} />
      </mesh>
    </group>
  );
}

// Kerala Cinnamon Bark Stick (Cinnamomum verum)
function CinnamonModel({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Outer Bark Quill */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.09, 1.1, 16, 1, true]} />
        <meshStandardMaterial color="#7D3F1D" roughness={0.78} metalness={0.04} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Rolled Core */}
      <mesh position={[0.02, 0, 0.02]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.045, 0.05, 1.05, 12, 1, true]} />
        <meshStandardMaterial color="#5C2D13" roughness={0.82} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Fresh Sun-Dried Ginger Slice (Zingiber officinale)
function GingerModel({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Golden Disc Flesh */}
      <mesh scale={[0.32, 0.08, 0.38]}>
        <cylinderGeometry args={[1, 0.95, 0.8, 18]} />
        <meshStandardMaterial color="#E8C37B" roughness={0.48} metalness={0.06} />
      </mesh>
      {/* Brown Outer Skin Rim */}
      <mesh scale={[0.33, 0.082, 0.39]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.96, 0.06, 12, 24]} />
        <meshStandardMaterial color="#8E5E2F" roughness={0.88} />
      </mesh>
    </group>
  );
}

// 8-Pointed Star Anise Pod (Illicium verum)
function StarAniseModel({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Central Hub */}
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#4A2311" roughness={0.75} />
      </mesh>
      {/* 8 Radial Boat-Shaped Carpel Arms */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * Math.PI) / 4;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.26, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.08, 0.32, 6]} />
              <meshStandardMaterial color="#5C2C15" roughness={0.72} />
            </mesh>
            {/* Glossy Amber Seed in Carpel */}
            <mesh position={[0.22, 0.03, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#B86E28" roughness={0.2} metalness={0.1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Whole Clove Bud (Syzygium aromaticum)
function CloveModel({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stem Stalk */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.45, 10]} />
        <meshStandardMaterial color="#36170A" roughness={0.82} />
      </mesh>
      {/* Calyx Head */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#552410" roughness={0.65} />
      </mesh>
    </group>
  );
}

// Assam Black Tea Leaf (Camellia sinensis)
function TeaLeafModel({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Organic Curved Blade */}
      <mesh scale={[0.16, 0.5, 0.02]} rotation={[0.2, 0, 0.3]}>
        <sphereGeometry args={[1, 14, 8]} />
        <meshStandardMaterial color="#2E1C0F" roughness={0.68} metalness={0.08} />
      </mesh>
      {/* Midrib Vein */}
      <mesh position={[0, 0, 0.02]} scale={[0.02, 0.52, 0.02]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
        <meshStandardMaterial color="#4A2F1C" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ==========================================
// 3. ARTISANAL BRASS CHAI KETTLE (TAPRI KETLI)
// ==========================================
function TapriBrassKettle({ kettleState }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(kettleState.x, kettleState.y, kettleState.z);
      groupRef.current.rotation.z = kettleState.rotZ;
      groupRef.current.rotation.y = kettleState.rotY;
      groupRef.current.visible = kettleState.visible;
    }
  });

  return (
    <group ref={groupRef} position={[-3.5, 4.5, 0]}>
      {/* Main Brass Conical Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.95, 1.25, 36]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.25} metalness={0.86} />
      </mesh>

      {/* Decorative Belly Ring */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.88, 0.025, 12, 36]} />
        <meshStandardMaterial color="#C98B4B" roughness={0.2} metalness={0.88} />
      </mesh>

      {/* Domed Kettle Lid */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.45, 0.52, 0.16, 28]} />
        <meshStandardMaterial color="#DFAF62" roughness={0.24} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#6B3E26" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Curved Swan-Neck Tapri Spout */}
      <group position={[0.62, 0.05, 0]} rotation={[0, 0, -0.65]}>
        <mesh position={[0.32, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.18, 0.8, 20]} />
          <meshStandardMaterial color="#DFAF62" roughness={0.24} metalness={0.86} />
        </mesh>
        <mesh position={[0.72, 0.05, 0]} rotation={[0, 0, 0.38]}>
          <cylinderGeometry args={[0.065, 0.08, 0.22, 20]} />
          <meshStandardMaterial color="#C98B4B" roughness={0.22} metalness={0.88} />
        </mesh>
      </group>

      {/* Arched Top Handle with Dark Grip */}
      <group position={[-0.05, 0.72, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.65, 0.04, 12, 28, Math.PI * 0.95]} />
          <meshStandardMaterial color="#C98B4B" roughness={0.28} metalness={0.82} />
        </mesh>
        <mesh position={[0, 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 0.42, 14]} />
          <meshStandardMaterial color="#2B150A" roughness={0.85} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// 4. ANIMATED CHAI LIQUID POUR STREAM
// ==========================================
function PouringLiquidStream({ isPouring, kettlePos }) {
  const meshRef = useRef();

  // Create smooth CatmullRom spline from kettle spout tip to cup mouth
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.65, 1.6, 0),
      new THREE.Vector3(-0.35, 1.35, 0.05),
      new THREE.Vector3(-0.12, 1.05, 0.02),
      new THREE.Vector3(0.0, 0.72, 0)
    ]);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.visible = isPouring;
      if (isPouring) {
        const t = state.clock.getElapsedTime();
        // Dynamic ripple pulsation to simulate turbulent fluid stream
        meshRef.current.scale.x = 1.0 + Math.sin(t * 35) * 0.08;
        meshRef.current.scale.z = 1.0 + Math.cos(t * 35) * 0.08;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <tubeGeometry args={[curve, 32, 0.042, 12, false]} />
      <meshStandardMaterial
        color="#D98845"
        emissive="#8C461E"
        emissiveIntensity={0.6}
        roughness={0.12}
        metalness={0.1}
        transparent={true}
        opacity={0.92}
      />
    </mesh>
  );
}

// ==========================================
// 5. MASTER 3D TEA CUP & LIQUID SCENE
// ==========================================
function MasterTeaCupScene({
  scrollProgress,
  isExploded,
  isOrbitMode,
  selectedFlavorColor = '#8C461E'
}) {
  const cupGroupRef = useRef();
  const glassWallRef = useRef();
  const teaLiquidRef = useRef();
  const frothSurfaceRef = useRef();
  const steamGroupRef = useRef();
  const botanicalsGroupRef = useRef();
  const { camera } = useThree();

  // State calculations from continuous scroll progress
  // Progress is 0.00 to 1.00
  const steamTex = useMemo(() => createSteamParticleTexture(), []);

  // Steam particle positions
  const steamCount = 35;
  const steamData = useMemo(() => {
    const pos = new Float32Array(steamCount * 3);
    const speed = new Float32Array(steamCount);
    for (let i = 0; i < steamCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.7;
      pos[i * 3 + 1] = 0.8 + Math.random() * 2.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
      speed[i] = 0.015 + Math.random() * 0.02;
    }
    return { pos, speed };
  }, [steamCount]);

  // Kettle state calculated from scrollProgress
  const kettleState = useMemo(() => {
    // Scene 3 runs approximately from scroll 0.36 to 0.58
    if (scrollProgress >= 0.33 && scrollProgress <= 0.60) {
      const p = (scrollProgress - 0.33) / 0.27; // 0 to 1
      let x, y, rotZ, visible = true;
      if (p < 0.25) {
        // Enters from top-left [-3.5, 4.5] to [-1.4, 1.85]
        const local = p / 0.25;
        x = THREE.MathUtils.lerp(-3.5, -1.4, local);
        y = THREE.MathUtils.lerp(4.5, 1.85, local);
        rotZ = THREE.MathUtils.lerp(0, -0.3, local);
      } else if (p < 0.75) {
        // Pouring position tilted
        x = -1.4;
        y = 1.85;
        const pourSub = Math.sin(((p - 0.25) / 0.5) * Math.PI);
        rotZ = -0.3 - pourSub * 0.48; // Max tilt -0.78 rad
      } else {
        // Tilts back and exits to [-4.0, 5.0]
        const local = (p - 0.75) / 0.25;
        x = THREE.MathUtils.lerp(-1.4, -4.0, local);
        y = THREE.MathUtils.lerp(1.85, 5.0, local);
        rotZ = THREE.MathUtils.lerp(-0.3, 0.1, local);
      }
      return { x, y, z: 0, rotZ, rotY: 0.1, visible };
    }
    return { x: -4.5, y: 5.5, z: 0, rotZ: 0, rotY: 0, visible: false };
  }, [scrollProgress]);

  const isPouring = scrollProgress >= 0.39 && scrollProgress <= 0.53;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);

    if (cupGroupRef.current && !isOrbitMode) {
      // ----------------------------------------------------
      // SCENE 1 (0.00 -> 0.18): Hero Entrance from Top
      // ----------------------------------------------------
      let targetY, targetX, targetZ = 0;
      let targetRotY = 0, targetRotX = 0.08;
      let targetScale = 1.0;

      if (p < 0.18) {
        const s1 = p / 0.18;
        // Cup enters gracefully from top y = 5.8 down to y = 0.0
        targetY = THREE.MathUtils.lerp(5.8, 0.0, s1);
        targetX = 0;
        targetRotY = THREE.MathUtils.lerp(-0.6, 0.2, s1);
        targetRotX = THREE.MathUtils.lerp(0.3, 0.08, s1);
        targetScale = THREE.MathUtils.lerp(0.85, 1.0, s1);
      }
      // ----------------------------------------------------
      // SCENE 2 (0.18 -> 0.38): Cup Movement to Right & Story
      // ----------------------------------------------------
      else if (p < 0.38) {
        const s2 = (p - 0.18) / 0.20;
        targetY = THREE.MathUtils.lerp(0.0, -0.2, s2);
        // Moves from center to right side (giving room to story text on left)
        targetX = THREE.MathUtils.lerp(0.0, 1.65, s2);
        targetRotY = THREE.MathUtils.lerp(0.2, Math.PI * 0.75, s2);
        targetRotX = 0.08;
        targetScale = 1.02;
      }
      // ----------------------------------------------------
      // SCENE 3 (0.38 -> 0.58): Chai Pouring Position
      // ----------------------------------------------------
      else if (p < 0.58) {
        const s3 = (p - 0.38) / 0.20;
        targetY = THREE.MathUtils.lerp(-0.2, -0.3, s3);
        // Centers slightly under kettle spout
        targetX = THREE.MathUtils.lerp(1.65, 0.35, s3);
        targetRotY = THREE.MathUtils.lerp(Math.PI * 0.75, Math.PI * 1.05, s3);
        targetRotX = 0.1;
        targetScale = 1.05;
      }
      // ----------------------------------------------------
      // SCENE 4 (0.58 -> 0.78): Botanical Exploded Anatomy
      // ----------------------------------------------------
      else if (p < 0.78) {
        const s4 = (p - 0.58) / 0.20;
        targetY = THREE.MathUtils.lerp(-0.3, 0.0, s4);
        targetX = THREE.MathUtils.lerp(0.35, 0.0, s4);
        targetRotY = THREE.MathUtils.lerp(Math.PI * 1.05, Math.PI * 1.5, s4);
        targetRotX = 0.12;
        targetScale = 1.0;
      }
      // ----------------------------------------------------
      // SCENE 5 (0.78 -> 0.90): 360-Degree Glamour Spin
      // ----------------------------------------------------
      else if (p < 0.90) {
        const s5 = (p - 0.78) / 0.12;
        targetY = 0.0;
        targetX = 0.0;
        // Sweeps full 360 rotation
        targetRotY = Math.PI * 1.5 + s5 * Math.PI * 2;
        targetRotX = 0.14 + Math.sin(s5 * Math.PI) * 0.05;
        targetScale = 1.08;
      }
      // ----------------------------------------------------
      // SCENE 6 (0.90 -> 1.00): Transition & Exit Downward
      // ----------------------------------------------------
      else {
        const s6 = (p - 0.90) / 0.10;
        targetY = THREE.MathUtils.lerp(0.0, -5.8, s6);
        targetX = THREE.MathUtils.lerp(0.0, 0.4, s6);
        targetRotY = Math.PI * 3.5 + s6 * 0.8;
        targetRotX = THREE.MathUtils.lerp(0.14, 0.3, s6);
        targetScale = THREE.MathUtils.lerp(1.08, 0.8, s6);
      }

      // Add gentle idle floating breath
      const idleFloat = Math.sin(t * 1.2) * 0.03;
      cupGroupRef.current.position.y = THREE.MathUtils.lerp(
        cupGroupRef.current.position.y,
        targetY + idleFloat,
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
      cupGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(cupGroupRef.current.scale.x, targetScale, 0.08)
      );

      // Camera distance adjustment (macro closer in Scene 5)
      let camDist = 5.4;
      if (p >= 0.78 && p <= 0.90) {
        const s5 = (p - 0.78) / 0.12;
        camDist = THREE.MathUtils.lerp(5.4, 4.3, Math.sin(s5 * Math.PI));
      }
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camDist, 0.05);
    }

    // ----------------------------------------------------
    // LIQUID LEVEL ANIMATION (Empty to Full during Scene 3)
    // ----------------------------------------------------
    if (teaLiquidRef.current && frothSurfaceRef.current) {
      let liquidProgress = 0.1;
      if (p < 0.39) {
        liquidProgress = 0.1; // starts empty / pre-pour
      } else if (p < 0.53) {
        // Rises smoothly from 0.1 to 0.94 as kettle pours
        liquidProgress = THREE.MathUtils.lerp(0.1, 0.94, (p - 0.39) / 0.14);
      } else {
        liquidProgress = 0.94; // stays full
      }

      // Scale Y of liquid cylinder
      teaLiquidRef.current.scale.y = liquidProgress;
      // Position liquid so base remains anchored at y = -0.32
      teaLiquidRef.current.position.y = -0.32 + (liquidProgress * 1.7) / 2;

      // Position froth crema disk right on top of liquid level
      const liquidTopY = -0.32 + liquidProgress * 1.7;
      frothSurfaceRef.current.position.y = liquidTopY;
      frothSurfaceRef.current.scale.setScalar(0.75 + liquidProgress * 0.25);
    }

    // ----------------------------------------------------
    // EXPLODED VIEW LAYER ANIMATION (Scene 4 & Manual Toggle)
    // ----------------------------------------------------
    if (glassWallRef.current) {
      const explodeFactor = isExploded || (p >= 0.60 && p <= 0.76) ? 1.0 : 0.0;
      const targetSep = explodeFactor * 0.45;
      glassWallRef.current.position.x = THREE.MathUtils.lerp(
        glassWallRef.current.position.x,
        targetSep,
        0.06
      );
    }

    // ----------------------------------------------------
    // STEAM PARTICLES UPDATE
    // ----------------------------------------------------
    if (steamGroupRef.current) {
      const positions = steamGroupRef.current.geometry.attributes.position.array;
      const hasLiquid = p > 0.42;
      steamGroupRef.current.visible = hasLiquid;

      if (hasLiquid) {
        for (let i = 0; i < steamCount; i++) {
          positions[i * 3 + 1] += steamData.speed[i];
          positions[i * 3] += Math.sin(t * 1.5 + i) * 0.002;
          if (positions[i * 3 + 1] > 3.2) {
            positions[i * 3 + 1] = 0.7;
            positions[i * 3] = (Math.random() - 0.5) * 0.6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
          }
        }
        steamGroupRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    // ----------------------------------------------------
    // BOTANICAL SPICES EXPANSION (Scene 4 Exploded Orbit)
    // ----------------------------------------------------
    if (botanicalsGroupRef.current) {
      // Rotate botanical orbit slowly
      botanicalsGroupRef.current.rotation.y += delta * 0.15;

      // Orbit radius expands during Scene 4
      let orbitRadius = 1.35;
      if (p >= 0.56 && p <= 0.78) {
        const s4 = (p - 0.56) / 0.22;
        orbitRadius = 1.35 + Math.sin(s4 * Math.PI) * 1.1; // Expands up to 2.45
      } else if (isExploded) {
        orbitRadius = 2.4;
      }
      botanicalsGroupRef.current.scale.setScalar(orbitRadius / 1.35);
    }
  });

  return (
    <>
      {/* Tapri Spun Brass Chai Kettle */}
      <TapriBrassKettle kettleState={kettleState} />

      {/* Pouring Stream Connecting Spout to Cup */}
      <PouringLiquidStream isPouring={isPouring} kettlePos={kettleState} />

      {/* Main Continuous Tea Glass Container */}
      <group ref={cupGroupRef} position={[0, 0, 0]}>
        {/* 1. OUTER TRANSPARENT GLASS CUP */}
        <group ref={glassWallRef}>
          {/* Fluted Faceted Glass Wall (Classic Indian Cutting Glass) */}
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[1.15, 0.82, 1.9, 16, 1, true]} />
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

          {/* Smooth Upper Cylindrical Lip */}
          <mesh position={[0, 1.45, 0]}>
            <cylinderGeometry args={[1.2, 1.15, 0.35, 48, 1, true]} />
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

          {/* Smooth Rounded Glass Lip Ring */}
          <mesh position={[0, 1.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.038, 16, 48]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.08} metalness={0.05} />
          </mesh>

          {/* Solid Heavy Base (Crystal Tapri Base) */}
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.82, 0.76, 0.3, 16]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.93}
              transparent={true}
              roughness={0.06}
              ior={1.54}
              thickness={0.95}
            />
          </mesh>

          {/* Modern Sleek Glass Handle */}
          <mesh position={[1.18, 0.5, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.55, 0.075, 16, 32, Math.PI * 0.95]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.94}
              transparent={true}
              roughness={0.05}
              ior={1.52}
              thickness={0.5}
            />
          </mesh>
        </group>

        {/* 2. SPICED CHAI LIQUID INSIDE */}
        <mesh ref={teaLiquidRef} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.08, 0.78, 1.7, 40]} />
          <meshStandardMaterial
            color={selectedFlavorColor}
            emissive={selectedFlavorColor}
            emissiveIntensity={0.35}
            roughness={0.18}
            metalness={0.05}
            transparent={true}
            opacity={0.96}
          />
        </mesh>

        {/* 3. GOLDEN CARAMEL FOAM CREMA TOP SURFACE */}
        <mesh ref={frothSurfaceRef} position={[0, 1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.07, 36]} />
          <meshStandardMaterial
            color="#DFAF62"
            roughness={0.45}
            metalness={0.05}
          />
        </mesh>

        {/* 4. RISING VOLUMETRIC STEAM PARTICLES */}
        <points ref={steamGroupRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={steamCount}
              array={steamData.pos}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.45}
            map={steamTex}
            transparent={true}
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#FFF8ED"
          />
        </points>

        {/* 5. FLOATING & EXPLODING BOTANICAL SPICES ORBIT */}
        <group ref={botanicalsGroupRef}>
          {/* Cardamom Pod */}
          <CardamomModel position={[1.6, 0.3, 0.5]} rotation={[0.4, 0.8, -0.3]} scale={0.9} />
          {/* Cinnamon Bark Quill */}
          <CinnamonModel position={[-1.5, 0.6, 0.7]} rotation={[0.6, -0.4, 0.5]} scale={0.85} />
          {/* Fresh Sun-Dried Ginger Slice */}
          <GingerModel position={[0.8, -0.6, 1.4]} rotation={[0.8, 0.2, 0.4]} scale={0.9} />
          {/* 8-Pointed Star Anise */}
          <StarAniseModel position={[-1.2, -0.4, -1.1]} rotation={[0.3, 1.2, -0.5]} scale={0.8} />
          {/* Whole Clove */}
          <CloveModel position={[1.4, 1.1, -0.6]} rotation={[-0.5, 0.7, 0.3]} scale={1.1} />
          {/* Assam Whole Black Leaf */}
          <TeaLeafModel position={[-0.4, 1.5, 1.1]} rotation={[0.2, -0.8, 0.6]} scale={1.0} />
          <TeaLeafModel position={[0.7, -1.2, -0.8]} rotation={[-0.6, 0.4, -0.2]} scale={0.85} />
        </group>
      </group>

      {/* Ground Contact Shadow for grounding */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.4}
        scale={6}
        blur={2.4}
        far={4}
        color="#392317"
      />
    </>
  );
}

// ==========================================
// 6. MAIN EXPORTED COMPONENT WITH PINNED SCROLL
// ==========================================
export default function TCupMasterCinematicExperience() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState('masala');
  const [webglError, setWebglError] = useState(false);

  const flavorPalettes = {
    masala: { color: '#8C461E', name: 'Kota Shahi Masala Chai' },
    chocolate: { color: '#3A1E11', name: 'Dark Velvet Chocolate Chai' },
    kesar: { color: '#B57422', name: 'Artisanal Kashmiri Kesar' },
    adrak: { color: '#783A16', name: 'Zesty Adrak Tulsi Kadak' }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Master GSAP ScrollTrigger timeline pinned for 6 full viewport heights (600vh)
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-cream-100">
      {/* Sticky Viewport Container (h-screen fixed during pin) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Ambient Warm Radial Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-tea-light/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-tea-caramel/10 rounded-full blur-3xl pointer-events-none" />

        {/* ---------------------------------------------------- */}
        {/* PERSISTENT 3D WEBGL CANVAS LAYER */}
        {/* ---------------------------------------------------- */}
        {!webglError ? (
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 5.4], fov: 42 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              onError={() => setWebglError(true)}
            >
              {/* Studio Warm Editorial Lighting */}
              <ambientLight intensity={0.9} color="#FFF8ED" />
              <directionalLight
                position={[5, 8, 5]}
                intensity={1.8}
                color="#FFFDF8"
                castShadow
              />
              <directionalLight
                position={[-5, 3, -3]}
                intensity={1.2}
                color="#C98B4B"
              />
              <pointLight
                position={[0, -1.8, -2]}
                intensity={1.4}
                color="#DFAF62"
              />

              {/* Master 3D Scene */}
              <MasterTeaCupScene
                scrollProgress={scrollProgress}
                isExploded={isExploded}
                isOrbitMode={isOrbitMode}
                selectedFlavorColor={flavorPalettes[selectedFlavor].color}
              />

              {/* Free Orbit Mode when user toggles 360 inspect */}
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
        ) : (
          /* WebGL Fallback */
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80"
              alt="Teamood Glass Chai"
              className="w-96 h-96 object-cover rounded-3xl shadow-elevated"
            />
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* NARRATIVE HTML OVERLAYS SYNCHRONIZED WITH SCROLL */}
        {/* ---------------------------------------------------- */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none flex flex-col justify-between py-8">
          {/* Top Telemetry / Scene Progress Breadcrumbs */}
          <div className="flex items-center justify-between text-xs font-semibold text-tea-brown/70 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tea-caramel animate-pulse" />
              <span>
                {scrollProgress < 0.18
                  ? 'Scene 1 • Hero Entrance'
                  : scrollProgress < 0.38
                  ? 'Scene 2 • The Heritage Journey'
                  : scrollProgress < 0.58
                  ? 'Scene 3 • The Golden Kettle Pour'
                  : scrollProgress < 0.78
                  ? 'Scene 4 • Botanical Deconstruction'
                  : scrollProgress < 0.90
                  ? 'Scene 5 • 360° Signature Profile'
                  : 'Scene 6 • Transition'}
              </span>
            </div>

            {/* Scroll Progress Meter Bar */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[10px] text-tea-dark/60">Scroll Synced 3D</span>
              <div className="w-32 h-1.5 bg-tea-caramel/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-tea-caramel rounded-full transition-all duration-75"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-tea-brown font-bold w-9 text-right">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* ==================================================== */}
          {/* SCENE 1 OVERLAY (0.00 -> 0.18): HERO ENTRANCE */}
          {/* ==================================================== */}
          <div
            className={`transition-all duration-700 max-w-xl space-y-6 ${
              scrollProgress < 0.16
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cream-50 border border-tea-caramel/30 text-tea-brown text-xs font-semibold tracking-wide shadow-soft">
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

            {/* CTAs */}
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

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-tea-caramel/15 grid grid-cols-3 gap-4">
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

          {/* ==================================================== */}
          {/* SCENE 2 OVERLAY (0.18 -> 0.38): CUP MOVEMENT & STORY */}
          {/* ==================================================== */}
          <div
            className={`transition-all duration-700 max-w-lg space-y-5 ${
              scrollProgress >= 0.18 && scrollProgress < 0.36
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-300 text-tea-brown text-xs font-bold uppercase tracking-wider">
              <span>Our Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark leading-tight">
              Every Sip Has <span className="text-tea-caramel italic">A Story.</span>
            </h2>

            <p className="text-tea-dark/80 text-base leading-relaxed">
              At Teamood Cafe, we bridge the heartwarming nostalgia of traditional roadside tapris with the comfort and sophistication of modern cafe culture. Born in Kota, Rajasthan, we set out to craft a haven where students studying for competitive exams, families, and creative minds could pause and rejuvenate.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3 text-sm text-tea-dark/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single-Estate Assam CTC selected for golden body & malty finish</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-tea-dark/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pure earthen Rajasthani kulhads baked in artisan wood kilns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-tea-dark/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Stone-pounded green cardamom, cinnamon & fresh ginger</span>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* SCENE 3 OVERLAY (0.38 -> 0.58): TEA POURING */}
          {/* ==================================================== */}
          <div
            className={`transition-all duration-700 max-w-lg ml-auto space-y-5 text-right ${
              scrollProgress >= 0.38 && scrollProgress < 0.56
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
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

            <div className="inline-grid grid-cols-2 gap-4 text-left p-4 rounded-2xl bg-cream-50/90 border border-tea-caramel/25 shadow-soft">
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

          {/* ==================================================== */}
          {/* SCENE 4 OVERLAY (0.58 -> 0.78): INGREDIENT REVEAL */}
          {/* ==================================================== */}
          <div
            className={`transition-all duration-700 max-w-xl mx-auto text-center space-y-5 ${
              scrollProgress >= 0.58 && scrollProgress < 0.78
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-300 text-tea-brown text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-tea-caramel" />
              <span>Botanical Deconstruction</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark leading-tight">
              Six Sacred <span className="text-tea-caramel italic">Indian Spices.</span>
            </h2>

            <p className="text-tea-dark/80 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Hover around the 3D orbit to explore our certified single-origin botanicals sourced directly from smallholder farms across Kerala, Kashmir, and Assam.
            </p>

            {/* Quick interactive spice chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { name: 'Idukki Cardamom', note: 'Fragrance' },
                { name: 'Kerala Cinnamon', note: 'Warmth' },
                { name: 'Sun-Dried Ginger', note: 'Zest' },
                { name: 'Star Anise', note: 'Sweet' },
                { name: 'Whole Cloves', note: 'Brisk' },
                { name: 'Assam CTC Leaf', note: 'Body' }
              ].map((spice, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-cream-50/95 border border-tea-caramel/25 shadow-xs text-xs font-medium text-tea-dark flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tea-caramel" />
                  <strong className="text-tea-brown">{spice.name}</strong>
                  <span className="text-[10px] text-tea-dark/60 font-mono">({spice.note})</span>
                </div>
              ))}
            </div>

            {/* Explode Layer Toggle Button */}
            <button
              onClick={() => setIsExploded(!isExploded)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-50 hover:bg-cream-200 border border-tea-caramel/30 text-xs font-bold text-tea-brown shadow-soft transition"
            >
              <Layers className="w-3.5 h-3.5 text-tea-caramel" />
              <span>{isExploded ? 'Reassemble Cup' : 'Explode 3D Layers'}</span>
            </button>
          </div>

          {/* ==================================================== */}
          {/* SCENE 5 OVERLAY (0.78 -> 0.90): 360° GLAMOUR SHOT */}
          {/* ==================================================== */}
          <div
            className={`transition-all duration-700 max-w-lg space-y-5 ${
              scrollProgress >= 0.78 && scrollProgress < 0.90
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Rotate3d className="w-3.5 h-3.5 text-amber-700" />
              <span>360° Product Showcase</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark leading-tight">
              {flavorPalettes[selectedFlavor].name}
            </h2>

            <p className="text-tea-dark/80 text-sm leading-relaxed">
              Warm amber tones, crystal glass refraction, and silky crema foam. Rotate and switch between our legendary creations crafted daily at our Kota cafe.
            </p>

            {/* Flavor Switcher Pills */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold text-tea-dark/60 block">
                Select 3D Blend:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'masala', label: 'Shahi Masala' },
                  { id: 'chocolate', label: 'Velvet Chocolate' },
                  { id: 'kesar', label: 'Kashmiri Kesar' },
                  { id: 'adrak', label: 'Zesty Adrak' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFlavor(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                      selectedFlavor === f.id
                        ? 'bg-tea-brown text-cream-50'
                        : 'bg-cream-50 hover:bg-cream-200 text-tea-dark border border-tea-caramel/25'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 360 Drag Orbit Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setIsOrbitMode(!isOrbitMode)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-soft ${
                  isOrbitMode
                    ? 'bg-tea-caramel text-cream-50'
                    : 'bg-cream-50 hover:bg-cream-200 text-tea-brown border border-tea-caramel/30'
                }`}
              >
                <Rotate3d className="w-4 h-4" />
                <span>{isOrbitMode ? 'Lock Scroll Timeline' : 'Enable 360° Mouse Orbit'}</span>
              </button>
            </div>
          </div>

          {/* ==================================================== */}
          {/* SCENE 6 OVERLAY (0.90 -> 1.00): TRANSITION TO MENU */}
          {/* ==================================================== */}
          <div
            className={`transition-all duration-700 max-w-xl mx-auto text-center space-y-4 ${
              scrollProgress >= 0.90
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <span className="text-xs uppercase tracking-widest text-tea-caramel font-bold">
              The Journey Continues
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-tea-dark">
              Step Into Our Sanctuary
            </h2>
            <p className="text-tea-dark/80 text-sm max-w-md mx-auto">
              Scroll down to explore our complete handcrafted cafe creations, packaged tea blends, and Kota heritage story.
            </p>
            <ChevronDown className="w-6 h-6 text-tea-caramel mx-auto animate-bounce pt-2" />
          </div>

          {/* Bottom Floating Scroll Prompt */}
          <div className="flex items-center justify-between text-xs text-tea-dark/60 font-medium pt-4">
            <span className="hidden sm:inline">Crafted in Kota, Rajasthan</span>
            <div className="flex items-center gap-1.5 mx-auto sm:mx-0 animate-pulse text-tea-brown">
              <span>Scroll down to control cinematic 3D journey</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">100% Light Themed Luxury</span>
          </div>
        </div>
      </div>
    </div>
  );
}
