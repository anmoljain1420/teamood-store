import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  Flame,
  Layers,
  Zap
} from 'lucide-react';

// ----------------------------------------------------------------------
// 1. 3D CANISTER (3D Tea Packaging) FOR PRODUCT REVEAL (Yellow & Black)
// ----------------------------------------------------------------------
function PackagingCanister3D({ flavorColor = "#FFE600", label = "ROYAL MASALA" }) {
  const canisterRef = useRef();

  useFrame((state) => {
    if (!canisterRef.current) return;
    const time = state.clock.getElapsedTime();
    const { pointer } = state;
    canisterRef.current.rotation.y = time * 0.4 + pointer.x * 0.7;
    canisterRef.current.rotation.x = pointer.y * 0.35;
  });

  return (
    <group ref={canisterRef}>
      {/* Main Tin Canister Body - Matte Black */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 2.8, 36]} />
        <meshPhysicalMaterial
          color="#0F0F0F"
          roughness={0.25}
          metalness={0.7}
          clearcoat={0.9}
        />
      </mesh>

      {/* Glossy Electric Yellow Brand Label Wrap */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 1.8, 36]} />
        <meshPhysicalMaterial
          color={flavorColor}
          emissive={flavorColor}
          emissiveIntensity={0.25}
          roughness={0.15}
          clearcoat={1.0}
        />
      </mesh>

      {/* Gold Top Rim */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[1.14, 1.14, 0.12, 36]} />
        <meshStandardMaterial color="#FFB800" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Tin Lid Cap */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[1.05, 1.12, 0.2, 36]} />
        <meshStandardMaterial color="#050505" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Gold Bottom Rim */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[1.14, 1.14, 0.1, 36]} />
        <meshStandardMaterial color="#FFB800" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Orbiting Golden Star Particles */}
      <Float speed={3.2} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[1.6, 0.8, 0.5]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color="#FFE600" />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[-1.7, -0.6, 0.6]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshBasicMaterial color="#FFB800" />
        </mesh>
      </Float>
    </group>
  );
}

// ----------------------------------------------------------------------
// 2. 3D INTERACTIVE INGREDIENT SPOTLIGHT STAGE
// ----------------------------------------------------------------------
function IngredientStage3D({ selectedIngredient }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = time * 0.45;
  });

  return (
    <group ref={group}>
      {selectedIngredient === 'tea' && (
        <group scale={2.2}>
          <mesh rotation={[0.4, 0.3, 0.2]}>
            <torusGeometry args={[0.65, 0.25, 12, 24, Math.PI * 1.3]} />
            <meshStandardMaterial color="#FFE600" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh rotation={[-0.2, -0.4, 0.5]} scale={0.7}>
            <torusGeometry args={[0.5, 0.2, 12, 24, Math.PI * 1.3]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      )}

      {selectedIngredient === 'cardamom' && (
        <group scale={2.2}>
          <mesh scale={[0.45, 0.9, 0.45]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshPhysicalMaterial color="#FFE600" roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh scale={[0.48, 0.92, 0.18]}>
            <sphereGeometry args={[0.8, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {selectedIngredient === 'ginger' && (
        <group scale={2.0}>
          <mesh scale={[0.7, 1.1, 0.6]}>
            <dodecahedronGeometry args={[0.7, 1]} />
            <meshStandardMaterial color="#FFB800" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh scale={[0.4, 0.6, 0.4]} position={[0.5, 0.4, 0.2]}>
            <dodecahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="#FFE600" roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      )}

      {selectedIngredient === 'saffron' && (
        <group scale={2.2}>
          <mesh rotation={[0.3, 0.5, 0.2]}>
            <torusGeometry args={[0.8, 0.08, 16, 64]} />
            <meshBasicMaterial color="#FF9900" />
          </mesh>
          <mesh rotation={[-0.4, 0.2, -0.3]}>
            <torusGeometry args={[0.65, 0.06, 16, 64]} />
            <meshBasicMaterial color="#FFE600" />
          </mesh>
          <mesh position={[0, 0, 0]} scale={0.4}>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color="#FFB800" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
      )}

      {selectedIngredient === 'cocoa' && (
        <group scale={2.0}>
          <mesh scale={[0.8, 0.8, 0.8]}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshPhysicalMaterial color="#1A1A1A" roughness={0.2} metalness={0.6} clearcoat={1.0} />
          </mesh>
          <mesh scale={[0.82, 0.82, 0.82]}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshBasicMaterial color="#FFE600" wireframe transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      {/* Orbiting Stardust */}
      <Float speed={3.5} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[1.8, 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#FFE600" />
        </mesh>
      </Float>
      <Float speed={2.8} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[-1.7, -0.7, 0.5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </Float>
    </group>
  );
}

// ----------------------------------------------------------------------
// 3. MAIN STORYTELLING CONTAINER COMPONENT
// ----------------------------------------------------------------------
export default function FlavorScrollStory3D() {
  const [activeStoryStage, setActiveStoryStage] = useState(1);
  const [selectedIngredient, setSelectedIngredient] = useState('tea');
  const [activeCombo, setActiveCombo] = useState('masala-fire');

  const stages = [
    {
      id: 1,
      title: "01. Kinetic Spark",
      subtitle: "Molecular Flavour Shockwave",
      desc: "Where energy collides. Single-estate Assam tea leaves energized with whole spices, creating an electric sensory surge.",
      tag: "Volt Energy",
      badgeColor: "badge-yellow"
    },
    {
      id: 2,
      title: "02. Botanical Vault",
      subtitle: "Whole Pure Spices",
      desc: "Sourced from pristine origins: malty Upper Brahmaputra Assam CTC, Idukki green cardamom, and high-altitude ginger.",
      tag: "Pure Terroir",
      badgeColor: "badge-yellow"
    },
    {
      id: 3,
      title: "03. Flavour Alchemy",
      subtitle: "Dynamic Mood Transformations",
      desc: "Witness raw spices forge into crave-worthy flavor spectrums: from fiery Kadak Masala to opulent Kashmiri Kesar.",
      tag: "Alchemy",
      badgeColor: "badge-yellow"
    },
    {
      id: 4,
      title: "04. Product Reveal",
      subtitle: "Matte Black & Yellow Caddy",
      desc: "Take the signature Teamood taste home. Luxury double-sealed canisters locking in whole-spice aroma and brisk malty liquor.",
      tag: "Retail Lineup",
      badgeColor: "badge-yellow"
    }
  ];

  const ingredientDetails = {
    tea: {
      name: "Single-Estate Assam Black CTC",
      origin: "Upper Brahmaputra Valley, Assam",
      notes: "Heavy malty backbone, intense golden-red liquor, and natural caramel sweetness with zero astringency.",
      color: "#FFE600"
    },
    cardamom: {
      name: "Grade-A Green Cardamom",
      origin: "Idukki Hills, Kerala",
      notes: "Intense fragrant eucalyptus sweetness, hand-crushed at peak volatility to release vital spice oils.",
      color: "#FFE600"
    },
    ginger: {
      name: "Mountain Sun-Dried Adrak",
      origin: "Wayanad, Kerala",
      notes: "Crisp spicy punch that ignites the palate and powers instant cognitive alertness.",
      color: "#FFB800"
    },
    saffron: {
      name: "Certified Mongra Saffron",
      origin: "Pampore, Kashmir",
      notes: "Royal golden threads releasing rich floral notes and imparting an opulent amber tint.",
      color: "#FF9900"
    },
    cocoa: {
      name: "Dutch Processed Cocoa Nibs",
      origin: "Single-Origin Artisanal Cacao",
      notes: "Deep velvety roasted chocolate folded seamlessly into steaming chai for a dessert sensation.",
      color: "#FFFFFF"
    }
  };

  const comboOptions = [
    {
      id: "masala-fire",
      name: "Kota Shahi Masala",
      color: "#FFE600",
      headline: "The Fiery Rush of Real Whole Spices",
      desc: "Crushed ginger, black pepper, cloves, and cinnamon slow-boiled with farm milk."
    },
    {
      id: "royal-saffron",
      name: "Kashmiri Kesar Elaichi",
      color: "#FFB800",
      headline: "Opulent Saffron & Crushed Cardamom",
      desc: "Certified Mongra saffron threads giving an aromatic royal golden brew."
    },
    {
      id: "velvet-cocoa",
      name: "Velvet Dark Chocolate",
      color: "#FFFFFF",
      headline: "Kota's Cult Favorite Dessert Chai",
      desc: "Pure cocoa nibs whipped directly into spiced tea for an unforgettable treat."
    },
    {
      id: "iced-peach",
      name: "Electric Peach Cooler",
      color: "#D4FF00",
      headline: "Cold Brewed High-Velocity Tea",
      desc: "Steeped black tea infused with natural peach nectar and sparkling mountain sprigs."
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow/10 border border-yellow/40 text-yellow text-xs font-mono font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-yellow" />
            <span>KINETIC 3D JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Explore The Flavour <span className="text-yellow underline decoration-yellow decoration-4">Architecture</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            Immerse yourself in our four-stage sensory journey. Tap through the stages below to witness how Teamood transforms tea craft into high-energy culture.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#141414] border border-yellow/20 shadow-glow-yellow self-start">
          {stages.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStoryStage(st.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                activeStoryStage === st.id
                  ? 'bg-yellow text-black shadow-glow-yellow scale-105'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Stage {st.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage Display Card */}
      <div className="rounded-3xl bg-[#111111] border border-yellow/20 shadow-elevated overflow-hidden p-6 sm:p-10 lg:p-12">
        {/* STAGE 1: FLAVOUR EXPLOSION */}
        {activeStoryStage === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-yellow">STAGE 01 • SENSORY AWAKENING</span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                Not Just Tea. <br />
                <span className="text-yellow font-editorial italic font-normal text-4xl sm:text-5xl">
                  It's An Explosion of Mood.
                </span>
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Traditional chai can be dusty and dated. At Teamood, we engineer each brew as a layered sensory surge: opening with bright aromatic spice notes, flowing into velvety sweetness, and lingering with brisk Assam depth.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-black/60 border border-yellow/30">
                  <span className="text-2xl font-extrabold font-display text-yellow block">100%</span>
                  <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Whole Farm Spices</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/60 border border-yellow/30">
                  <span className="text-2xl font-extrabold font-display text-yellow block">Zero</span>
                  <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Brown Clichés</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveStoryStage(2)}
                  className="px-6 py-3.5 rounded-full bg-yellow text-black font-extrabold text-sm inline-flex items-center gap-2 hover:bg-white transition shadow-glow-yellow group"
                >
                  <span>Explore Stage 2: Ingredients</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow/15 via-[#181818] to-black flex items-center justify-center p-6 border border-yellow/30">
              <div className="text-center space-y-4 max-w-sm">
                <div className="w-24 h-24 rounded-full bg-yellow mx-auto flex items-center justify-center shadow-glow-yellow animate-float">
                  <Sparkles className="w-12 h-12 text-black" />
                </div>
                <h4 className="font-display font-bold text-xl text-yellow">
                  Kinetic Energy Core
                </h4>
                <p className="text-xs text-white/75">
                  Interlocking 3D quantum geometries spinning in real-time, reacting to pointer coordinates and device dynamics.
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-black border border-yellow/40 text-[11px] font-mono font-bold text-yellow">
                    High Metallic Shaders
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black border border-yellow/40 text-[11px] font-mono font-bold text-yellow">
                    1200+ Particles
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: INGREDIENT UNIVERSE */}
        {activeStoryStage === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="badge-yellow">STAGE 02 • BOTANICAL VAULT</span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Inspect 3D <br />
                <span className="text-yellow">Pure Ingredients</span>
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Tap each ingredient button below to inspect its 3D procedural specimen, explore its single-estate provenance, and discover its vital flavor chemistry.
              </p>

              {/* Ingredient Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'tea', label: 'Assam Leaf' },
                  { id: 'cardamom', label: 'Elaichi Pod' },
                  { id: 'ginger', label: 'Mountain Adrak' },
                  { id: 'saffron', label: 'Kesar Threads' },
                  { id: 'cocoa', label: 'Dark Cocoa' },
                ].map((ing) => (
                  <button
                    key={ing.id}
                    onClick={() => setSelectedIngredient(ing.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedIngredient === ing.id
                        ? 'bg-yellow text-black shadow-glow-yellow scale-105'
                        : 'bg-black/60 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {ing.label}
                  </button>
                ))}
              </div>

              {/* Selected Ingredient Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-yellow/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-yellow text-lg">
                    {ingredientDetails[selectedIngredient].name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow/10 text-yellow border border-yellow/40">
                    Sourced Direct
                  </span>
                </div>
                <p className="text-xs font-mono text-white/60">
                  📍 Origin: {ingredientDetails[selectedIngredient].origin}
                </p>
                <p className="text-xs text-white/80 leading-relaxed pt-1">
                  "{ingredientDetails[selectedIngredient].notes}"
                </p>
              </div>

              <button
                onClick={() => setActiveStoryStage(3)}
                className="px-6 py-3 rounded-full bg-yellow text-black font-extrabold text-sm inline-flex items-center gap-2 hover:bg-white transition shadow-glow-yellow group"
              >
                <span>Next: Flavour Alchemy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3D Ingredient Canvas */}
            <div className="lg:col-span-7 h-[380px] sm:h-[450px] rounded-2xl bg-gradient-to-b from-[#181818] via-[#0D0D0D] to-black relative border border-yellow/30 overflow-hidden">
              <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 6, 4]} intensity={2.2} color="#FFFFFF" />
                <pointLight position={[-4, -3, 3]} intensity={1.5} color="#FFE600" />
                <IngredientStage3D selectedIngredient={selectedIngredient} />
              </Canvas>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 border border-yellow/40 text-yellow text-[11px] font-mono font-bold">
                ⚡ 3D SPECIMEN VIEWER
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: FLAVOUR TRANSFORMATION */}
        {activeStoryStage === 3 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="badge-yellow">STAGE 03 • FLAVOUR ALCHEMY</span>
                <h3 className="text-3xl font-display font-extrabold text-white mt-2">
                  Signature Flavour Spectrum
                </h3>
              </div>

              {/* Combo Pills */}
              <div className="flex flex-wrap gap-2">
                {comboOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCombo(c.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      activeCombo === c.id
                        ? 'bg-yellow text-black shadow-glow-yellow scale-105'
                        : 'bg-black/60 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Combo Showcase */}
            {(() => {
              const current = comboOptions.find(c => c.id === activeCombo) || comboOptions[0];
              return (
                <div className="p-8 rounded-3xl bg-black/80 border border-yellow/40 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-yellow text-black">
                      {current.name}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      {current.headline}
                    </h4>
                    <p className="text-white/80 text-base leading-relaxed">
                      {current.desc}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                      <Link
                        to="/menu"
                        className="px-6 py-3 rounded-full bg-yellow text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition shadow-glow-yellow inline-flex items-center gap-2"
                      >
                        <span>View On Menu</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setActiveStoryStage(4)}
                        className="text-xs font-mono font-bold text-yellow hover:text-white transition underline"
                      >
                        Explore Retail Lineup →
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-yellow/20 via-black to-[#181818] border border-yellow/40 flex flex-col items-center justify-center p-6 text-center shadow-glow-yellow">
                      <Zap className="w-10 h-10 text-yellow mb-2 animate-bounce" />
                      <span className="font-display font-bold text-yellow text-sm">Balanced Energy</span>
                      <span className="text-[11px] text-white/70 mt-1">
                        Formulated for instant focus & sustained refreshment.
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* STAGE 4: PRODUCT CANISTER REVEAL */}
        {activeStoryStage === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="badge-yellow">STAGE 04 • RETAIL PACKAGING REVEAL</span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Interactive 3D <br />
                <span className="text-yellow">Matte Black Canister</span>
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Move your cursor across the 3D canister to inspect the double-sealed airtight lid, embossed gold accents, and UV-barrier black metal body.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white/90">
                    Airtight double-lid preserves whole spice essential oils
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white/90">
                    Available in 250g, 500g and Luxury Collector 4-Tin Boxes
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white/90">
                    Shipped nationwide directly to your doorstep
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 rounded-full bg-yellow text-black font-extrabold text-sm inline-flex items-center gap-2 hover:bg-white transition shadow-glow-yellow group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Packaged Blends</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/franchise"
                  className="px-5 py-3.5 rounded-full bg-transparent border-2 border-yellow text-yellow font-bold text-sm hover:bg-yellow hover:text-black transition"
                >
                  Franchise Desk
                </Link>
              </div>
            </div>

            {/* 3D Canister Canvas */}
            <div className="lg:col-span-7 h-[400px] sm:h-[480px] rounded-2xl bg-gradient-to-b from-[#181818] via-[#0A0A0A] to-black relative border border-yellow/30 overflow-hidden">
              <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={45} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[6, 8, 5]} intensity={2.2} color="#FFFFFF" />
                <pointLight position={[-4, -3, 3]} intensity={1.5} color="#FFE600" />
                <PackagingCanister3D flavorColor="#FFE600" />
              </Canvas>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 border border-yellow/40 text-yellow text-[11px] font-mono font-bold">
                🎯 CURSOR REACTIVE 3D CANISTER
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/90 text-yellow text-[10px] font-mono font-bold border border-yellow/30">
                DRAG OR MOVE MOUSE TO ROTATE
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
