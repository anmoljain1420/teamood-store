import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Layers, RotateCcw, Sparkles, Check, Info } from 'lucide-react';

function ExplodedCupGeometry({ explosionProgress, activeLayer, onSelectLayer }) {
  const groupRef = useRef();
  const glassRef = useRef();
  const liquidRef = useRef();
  const cremaRef = useRef();
  const baseRef = useRef();
  const spicesRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }

    const ep = explosionProgress; // 0 to 1

    // 1. Glass Wall shifts upward & left
    if (glassRef.current) {
      glassRef.current.position.y = 0.5 + ep * 0.9;
      glassRef.current.position.x = -ep * 0.4;
      glassRef.current.rotation.z = ep * 0.12;
    }

    // 2. Liquid Core stays centered with slight scale
    if (liquidRef.current) {
      liquidRef.current.position.y = 0.45;
      liquidRef.current.scale.setScalar(1 + ep * 0.05);
    }

    // 3. Crema froth lifts high above liquid
    if (cremaRef.current) {
      cremaRef.current.position.y = 1.35 + ep * 0.75;
      cremaRef.current.position.x = ep * 0.25;
    }

    // 4. Base shifts downward
    if (baseRef.current) {
      baseRef.current.position.y = -0.5 - ep * 0.65;
    }

    // 5. Spices orbit expands radially
    if (spicesRef.current) {
      spicesRef.current.scale.setScalar(1 + ep * 0.95);
      spicesRef.current.position.y = ep * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* 1. LAYER: TRANSPARENT GLASS CYLINDER */}
      <group
        ref={glassRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('glass');
        }}
      >
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.15, 0.82, 1.85, 24, 1, true]} />
          <meshPhysicalMaterial
            color={activeLayer === 'glass' ? '#DFAF62' : '#FFFFFF'}
            transmission={0.95}
            transparent={true}
            roughness={0.04}
            ior={1.52}
            thickness={0.55}
            clearcoat={1.0}
            emissive={activeLayer === 'glass' ? '#C98B4B' : '#000000'}
            emissiveIntensity={activeLayer === 'glass' ? 0.4 : 0}
          />
        </mesh>
        {/* Rounded Glass Rim */}
        <mesh position={[0, 0.94, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.038, 12, 36]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.08} metalness={0.1} />
        </mesh>
      </group>

      {/* 2. LAYER: SPICED CHAI LIQUID CORE */}
      <mesh
        ref={liquidRef}
        position={[0, 0.45, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('liquid');
        }}
      >
        <cylinderGeometry args={[1.08, 0.78, 1.68, 32]} />
        <meshStandardMaterial
          color={activeLayer === 'liquid' ? '#C98B4B' : '#8C461E'}
          emissive="#5C260D"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.05}
          transparent={true}
          opacity={0.95}
        />
      </mesh>

      {/* 3. LAYER: GOLDEN CREMA FROTH DISK */}
      <mesh
        ref={cremaRef}
        position={[0, 1.32, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('crema');
        }}
      >
        <circleGeometry args={[1.07, 32]} />
        <meshStandardMaterial
          color={activeLayer === 'crema' ? '#FFF8ED' : '#DFAF62'}
          roughness={0.4}
          metalness={0.05}
          emissive={activeLayer === 'crema' ? '#DFAF62' : '#000000'}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 4. LAYER: HEAVY CRYSTAL GLASS BASE */}
      <mesh
        ref={baseRef}
        position={[0, -0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('base');
        }}
      >
        <cylinderGeometry args={[0.82, 0.76, 0.32, 16]} />
        <meshPhysicalMaterial
          color={activeLayer === 'base' ? '#DFAF62' : '#FFFFFF'}
          transmission={0.92}
          transparent={true}
          roughness={0.08}
          ior={1.54}
          thickness={0.8}
        />
      </mesh>

      {/* 5. LAYER: ORBITING BOTANICAL SPICES */}
      <group
        ref={spicesRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer('spices');
        }}
      >
        {/* Cardamom Pod */}
        <mesh position={[1.4, 0.4, 0.4]} scale={[0.16, 0.28, 0.16]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#6B8849" roughness={0.6} />
        </mesh>
        {/* Cinnamon Bark */}
        <mesh position={[-1.4, 0.7, 0.5]} rotation={[0.4, 0.6, 0.3]}>
          <cylinderGeometry args={[0.07, 0.08, 0.9, 10, 1, true]} />
          <meshStandardMaterial color="#7D3F1D" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
        {/* Sliced Ginger */}
        <mesh position={[0.7, -0.4, 1.3]} scale={[0.24, 0.06, 0.28]}>
          <cylinderGeometry args={[1, 0.9, 0.8, 12]} />
          <meshStandardMaterial color="#E8C37B" roughness={0.5} />
        </mesh>
        {/* Star Anise */}
        <mesh position={[-1.1, -0.3, -1.0]} scale={0.16}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#5C2C15" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

export default function TeaCupExploded3D() {
  const [explosionProgress, setExplosionProgress] = useState(0.65);
  const [activeLayer, setActiveLayer] = useState('glass');

  const layersInfo = {
    glass: {
      title: 'Fluted Crystal Glass Body',
      subtitle: 'Faceted Heat-Treated Tapri Glass',
      desc: 'Formed with 12 fluted facets in the lower section that offer a secure heat-resistant grip. The upper cylindrical lip provides a smooth surface for drinking and showcases the rich amber hue of the tea.',
      specs: 'Thickness: 4mm • Thermal Shock Resistant • High Optical Transmission'
    },
    liquid: {
      title: 'Spiced CTC Tea Core',
      subtitle: 'Single-Estate Assam Golden Infusion',
      desc: 'Brewed to a deep caramel-amber liquor using high-elevation Assam CTC tea leaves simmered with fresh whole milk. Deeply malty, brisk, and comforting.',
      specs: 'Steep Temp: 96°C • Boiling Time: 4.5 Mins • 100% Farm Whole Milk'
    },
    crema: {
      title: 'Golden Aerated Crema Froth',
      subtitle: 'Micro-Foam Top Surface',
      desc: 'Created exclusively by pouring the hot chai from a height of two feet using spun-brass ketlis. The aeration breaks surface tension, releasing volatile essential oils and crafting a velvety foam head.',
      specs: 'Natural Aeration • Zero Emulsifiers • High-Pour Drop'
    },
    base: {
      title: 'Weighted Crystal Base',
      subtitle: 'Heavy Glass Thermodynamic Foot',
      desc: 'Designed with a dense crystal base that lowers the cup’s centre of gravity, preventing accidental spills in bustling cafe environments while retaining heat at the core.',
      specs: 'Solid Molded Glass • 32% Weighted Base • Table Grip'
    },
    spices: {
      title: 'Hand-Crushed Botanical Spices',
      subtitle: 'Cardamom, Cinnamon, Ginger & Cloves',
      desc: 'Crushed moments before brewing using traditional heavy stone mortars. Coarsely cracked rather than powdered to allow a clean, non-gritty extraction with crystal-clear aromatic top notes.',
      specs: 'Stone-Pounded • Single-Origin • Kerala & Rajasthan'
    }
  };

  const current = layersInfo[activeLayer] || layersInfo.glass;

  return (
    <div className="rounded-3xl bg-cream-100/90 border border-tea-caramel/25 p-6 sm:p-8 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left 3D Canvas Column */}
      <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] rounded-2xl bg-cream-50/80 border border-tea-caramel/15 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.1} color="#FFF8ED" />
          <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFFDF8" />
          <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#DFAF62" />

          <ExplodedCupGeometry
            explosionProgress={explosionProgress}
            activeLayer={activeLayer}
            onSelectLayer={(l) => setActiveLayer(l)}
          />

          <ContactShadows position={[0, -2.0, 0]} opacity={0.45} scale={5} blur={2.4} color="#392317" />
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.5} />
        </Canvas>

        {/* 3D Orbit & Click Helper Overlay */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cream-50/90 backdrop-blur-md border border-tea-caramel/20 text-[10px] font-bold text-tea-brown shadow-xs flex items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3 h-3 text-tea-caramel" />
          <span>Click any 3D layer or drag to rotate</span>
        </div>

        {/* Quick Quick Assembly Toggle */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setExplosionProgress(explosionProgress > 0.1 ? 0 : 0.85)}
            className="px-3 py-1.5 rounded-xl bg-cream-50/95 hover:bg-cream-200 border border-tea-caramel/25 text-xs font-bold text-tea-brown shadow-soft transition flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-tea-caramel" />
            <span>{explosionProgress > 0.1 ? 'Assemble Glass' : 'Explode View'}</span>
          </button>
        </div>
      </div>

      {/* Right Controls & Educational Breakdown Column */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-tea-brown text-[11px] font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3 h-3 text-tea-caramel" />
            <span>Interactive Deconstruction</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-tea-dark">
            {current.title}
          </h3>
          <p className="text-xs text-tea-caramel font-semibold uppercase tracking-wider mt-0.5">
            {current.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-tea-dark/80 leading-relaxed">
          {current.desc}
        </p>

        {/* Specs Pill */}
        <div className="p-3.5 rounded-2xl bg-cream-50 border border-tea-caramel/20 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-tea-dark/60 tracking-wider">
            Material & Craftsmanship:
          </p>
          <p className="text-xs font-semibold text-tea-brown mt-0.5">
            {current.specs}
          </p>
        </div>

        {/* Layer Selector Tabs */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-tea-dark/70 block">
            Inspect Individual Layer:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'glass', label: '1. Glass' },
              { id: 'liquid', label: '2. Tea Liquid' },
              { id: 'crema', label: '3. Crema' },
              { id: 'base', label: '4. Base' },
              { id: 'spices', label: '5. Spices' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition shadow-xs text-center ${
                  activeLayer === layer.id
                    ? 'bg-tea-brown text-cream-50'
                    : 'bg-cream-50 hover:bg-cream-200 text-tea-dark border border-tea-caramel/20'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Explosion Range Slider */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs text-tea-dark font-medium">
            <span>Assembled</span>
            <span className="font-mono text-tea-brown font-bold">
              {Math.round(explosionProgress * 100)}% Exploded
            </span>
            <span>Deconstructed</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explosionProgress}
            onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
            className="w-full accent-tea-caramel cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
