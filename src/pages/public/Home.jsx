import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Star,
  CheckCircle2,
  Instagram,
  ChevronRight,
  Flame,
  Award,
  MoveUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const styles = `
@keyframes tm-float {
  0%,100% { transform:translateY(0) rotate(-3deg); }
  50% { transform:translateY(-15px) rotate(3deg); }
}
@keyframes tm-rise {
  from { opacity:0; transform:translateY(30px); }
  to { opacity:1; transform:translateY(0); }
}
@keyframes tm-cup-hover {
  0%,100% { transform:translateY(0) rotate(-1deg); }
  50% { transform:translateY(-10px) rotate(1deg); }
}
@keyframes tea-pour {
  0%, 5% {
    stroke-dashoffset:620;
    opacity:0;
  }
  12% { opacity:1; }
  45%, 52% {
    stroke-dashoffset:0;
    opacity:1;
  }
  92% {
    stroke-dashoffset:-620;
    opacity:1;
  }
  100% {
    stroke-dashoffset:-620;
    opacity:0;
  }
}
@keyframes tea-level {
  0%,100% { transform:scaleY(1); }
  45%,55% { transform:scaleY(.52); }
}
@keyframes tea-surface {
  0%,100% { transform:scaleX(1); }
  45%,55% { transform:scaleX(.9); }
}
@keyframes steam {
  0% { opacity:0; transform:translateY(10px); }
  30% { opacity:.65; }
  100% { opacity:0; transform:translateY(-35px); }
}

.tm-rise { animation:tm-rise .9s ease both; }
.tm-delay-1 { animation-delay:.15s; }
.tm-delay-2 { animation-delay:.3s; }
.tm-delay-3 { animation-delay:.45s; }

.tm-float { animation:tm-float 7s ease-in-out infinite; }

.tm-reveal {
  opacity:0;
  transform:translateY(25px);
  transition:opacity .8s ease,transform .8s ease;
}
.tm-reveal.tm-visible {
  opacity:1;
  transform:translateY(0);
}

.tm-card {
  transition:transform .5s ease,box-shadow .5s ease;
}
.tm-card:hover {
  transform:translateY(-8px);
  box-shadow:0 25px 50px #24182c20;
}

/* CUP STYLING */
.tm-cup-stage {
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  perspective:1200px;
}

.tm-cup-wrap {
  position: relative;
  width: min(88%, 420px);
  height: 360px;
  animation: tm-cup-hover 6s ease-in-out infinite;
}

.tm-saucer {
  position:absolute;
  z-index:1;
  bottom:10px;
  left:50%;
  width:86%;
  height:45px;
  transform:translateX(-50%) rotateX(67deg);
  border-radius:50%;
  background:linear-gradient(180deg,#fff9f0,#c7b6ad 55%,#8d777e);
  box-shadow:0 25px 35px #261b2d55;
}

.tm-handle {
  position:absolute;
  z-index:2;
  right:0;
  bottom:95px;
  width:32%;
  height:125px;
  border:20px solid #e8dcd5;
  border-left-color:#fffaf3;
  border-radius:50%;
  transform:rotate(5deg);
  box-shadow:inset -5px 0 8px #907a8055,5px 7px 12px #24182c44;
}

.tm-handle:after {
  content:"";
  position:absolute;
  inset:10px;
  border:2px solid #fffaf5;
  border-radius:50%;
}

.tm-body {
  position:absolute;
  z-index:3;
  left:8%;
  bottom:40px;
  width:72%;
  height:240px;
  overflow:visible;
  border:2px solid #fff9ef;
  border-radius:12% 12% 34% 34% / 12% 12% 22% 22%;
  background:linear-gradient(
    105deg,
    #fffdf8 0%,
    #e9ded5 18%,
    #fffaf3 38%,
    #cfc0ba 54%,
    #fffaf5 72%,
    #b9a8a8 100%
  );
  box-shadow:
    inset 12px 0 20px #ffffffb8,
    inset -16px -8px 24px #8b737b55,
    0 28px 35px #24182c55;
}

.tm-rim {
  position:absolute;
  z-index:5;
  top:-12px;
  left:-3%;
  width:106%;
  height:34px;
  border:2px solid #fffaf4;
  border-radius:50%;
  background:linear-gradient(
    180deg,#fffefa,#d9cbc3 45%,#fffaf3 75%,#b7a6a4
  );
  box-shadow:0 5px 10px #48334435;
}

.tm-liquid {
  position:absolute;
  z-index:4;
  left:3%;
  right:3%;
  bottom:5px;
  height:78%;
  transform-origin:bottom;
  animation:tea-level 4.8s ease-in-out infinite;
  border-radius:0 0 45% 45% / 0 0 18% 18%;
  background:linear-gradient(
    180deg,#d99a52 0%,#b96b35 38%,#874323 100%
  );
  box-shadow:inset 0 7px 12px #f7d39c88,inset 0 -8px 14px #60321f55;
}

.tm-liquid-surface {
  position:absolute;
  top:-8px;
  left:0;
  width:100%;
  height:18px;
  border-radius:50%;
  background:linear-gradient(180deg,#f4d39a,#c47a3e);
  animation:tea-surface 4.8s ease-in-out infinite;
}

.tm-cup-logo {
  position:absolute;
  z-index:7;
  left:34%;
  bottom:110px;
  color:#9c6c65;
  font-family:Georgia,serif;
  font-size:25px;
  font-style:italic;
  transform:rotate(-8deg);
  text-shadow:0 1px white;
}

/* Broad liquid stream */
.tm-tea-stream {
  position:absolute;
  z-index:6;
  left:-2%;
  top:-12px;
  width:105%;
  height:260px;
  overflow:visible;
  pointer-events:none;
  filter:drop-shadow(0 8px 8px #8d492b55);
}

.tm-tea-stream .main-stream {
  fill:none;
  stroke:url(#teaPourGradient);
  stroke-width:48;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-dasharray:620;
  stroke-dashoffset:620;
  animation:tea-pour 4.8s cubic-bezier(.45,0,.55,1) infinite;
}

.tm-tea-stream .stream-highlight {
  fill:none;
  stroke:#f9dcae;
  stroke-width:10;
  stroke-linecap:round;
  stroke-dasharray:620;
  stroke-dashoffset:620;
  animation:tea-pour 4.8s cubic-bezier(.45,0,.55,1) infinite;
  animation-delay:.04s;
}

.tm-steam {
  position:absolute;
  z-index:1;
  top:5px;
  left:40%;
  width:12px;
  height:45px;
  border-left:3px solid #fff4e8aa;
  border-radius:50%;
  filter:blur(1px);
  animation:steam 2.8s ease-out infinite;
}
.tm-steam.s2 { left:53%; animation-delay:.8s; }
.tm-steam.s3 { left:65%; animation-delay:1.5s; }

@media (max-width: 640px) {
  .tm-cup-wrap {
    width: min(88vw, 360px);
    height: 320px;
    transform-origin: center;
  }

  .tm-body {
    left: 8%;
    bottom: 35px;
    width: 72%;
    height: 205px;
  }

  .tm-handle {
    right: 0;
    bottom: 78px;
    width: 32%;
    height: 105px;
    border-width: 14px;
  }

  .tm-handle:after {
    inset: 8px;
  }

  .tm-saucer {
    bottom: 7px;
    width: 86%;
    height: 34px;
  }

  .tm-rim {
    height: 29px;
  }

  .tm-cup-logo {
    bottom: 95px;
    font-size: 20px;
  }

  .tm-liquid {
    height: 78%;
  }

  .tm-liquid-surface {
    height: 15px;
  }

  .tm-tea-stream {
    display: none;
  }

  .tm-steam {
    height: 35px;
  }
}

@media(prefers-reduced-motion:reduce) {
  .tm-float,.tm-rise,
  .tm-cup-wrap,.tm-liquid,.tm-tea-stream path,.tm-steam {
    animation:none !important;
  }
  .tm-reveal {
    opacity:1;
    transform:none;
  }
}
`;

function AnimatedStat({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <div ref={ref} className="group rounded-2xl border border-[#292316]/10 bg-white px-5 py-7 text-center shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl">
    <div className="font-serif text-4xl font-bold tracking-tight text-[#A87908] sm:text-5xl">{count.toLocaleString('en-IN')}{suffix}</div>
    <p className="mt-3 text-[10px] font-black uppercase tracking-[.2em] text-[#292316]/60">{label}</p>
    <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#D9A514] transition-all duration-500 group-hover:w-20" />
  </div>;
}

function Reveal({ children, className = '', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('tm-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`tm-reveal ${className}`} {...props}>
      {children}
    </div>
  );
}

export default function Home() {
  const {
    products = [],
    menuItems = [],
    testimonials = [],
    addToCart
  } = useApp();

  const signatureTeas = menuItems
    .filter(item => item.isPopular || item.category === 'Special Tea')
    .slice(0, 4);

  const featuredProducts = products
    .filter(product => product.published && product.featured)
    .slice(0, 4);

  return (
    <main className="overflow-hidden bg-white text-[#292316]">
      <style>{styles}</style>

      {/* HERO */}
      <section className="relative isolate min-h-0 overflow-hidden bg-[#292316] text-[#FFFDF6]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[.10]"
            style={{
              backgroundImage:'radial-gradient(#FFF8E6 1px,transparent 1px)',
              backgroundSize:'30px 30px'
            }}
          />
          <div className="absolute -left-48 -top-48 h-[650px] w-[650px] rounded-full bg-[#D9A514]/25 blur-[130px]" />
          <div className="absolute -bottom-64 right-[-8%] h-[650px] w-[650px] rounded-full bg-[#D9A514]/20 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid min-h-0 items-center gap-2 py-8 sm:py-10 lg:grid-cols-2">

            {/* HERO TEXT */}
            <div className="relative z-10 max-w-2xl">
<h1 className="tm-rise tm-delay-1 mt-0 text-[clamp(2.8rem,5.8vw,5.5rem)] font-black uppercase leading-[.9] tracking-[-.085em]">                Kota,<br />
                <span className="font-serif font-medium italic tracking-[-.07em] text-[#D9A514]">
                  your chai
                </span><br />
                moment.
              </h1>

              <p className="tm-rise tm-delay-2 mt-8 max-w-lg text-sm leading-8 text-white/70 sm:text-base">
                More than a cup of tea. It's a little pause, a familiar flavour, a place to catch up and a mood worth sharing. Welcome to Teamood Cafe, Kota — where every sip brings a little happiness.
              </p>

              <div className="tm-rise tm-delay-3 mt-9 flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D9A514] px-7 py-4 text-xs font-black uppercase tracking-wider text-[#292316] transition hover:-translate-y-1 hover:bg-white"
                >
                  Explore our menu
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-wider transition hover:border-[#D9A514] hover:text-[#D9A514]"
                >
                  Our story <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            {/* CUP ANIMATION */}
       <div className="relative mx-auto -mt-2 h-[350px] w-full max-w-[520px] sm:-mt-6 sm:h-[450px]">
              <div className="tm-cup-stage">
                <div className="tm-cup-wrap">
                  <span className="tm-steam" />
                  <span className="tm-steam s2" />
                  <span className="tm-steam s3" />

                  <div className="tm-saucer" />
                  <div className="tm-handle" />

                  <div className="tm-body">
                    <div className="tm-rim" />
                    <div className="tm-liquid">
                      <div className="tm-liquid-surface" />
                    </div>
                    <span className="tm-cup-logo">teamood</span>
                  </div>

                  <svg
                    className="tm-tea-stream"
                    viewBox="0 0 440 260"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="teaPourGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#F9DCA8" />
                        <stop offset="35%" stopColor="#D99A52" />
                        <stop offset="70%" stopColor="#B96B35" />
                        <stop offset="100%" stopColor="#874323" />
                      </linearGradient>
                    </defs>

                    <path
                      className="main-stream"
                      d="M105 190 C55 150 48 75 105 42 C160 5 260 5 320 45 C375 82 370 145 330 190"
                    />

                    <path
                      className="stream-highlight"
                      d="M105 190 C55 150 48 75 105 42 C160 5 260 5 320 45 C375 82 370 145 330 190"
                    />
                  </svg>
                </div>
              </div>

             <div className="tm-float absolute bottom-[8%] left-[3%] z-20 hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-xl sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#D9A514]">
                  Freshly brewed
                </p>
                <p className="mt-1 font-serif text-xl italic">
                  Made for your mood
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section className="relative z-10 bg-[#FFFDF6] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#A87908]">The Teamood feeling</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-.05em] text-[#292316] sm:text-4xl">Little moments. Big memories.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#292316]/55">Every cup is an invitation to slow down, catch up and enjoy the moment.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedStat value={150000} suffix="+" label="Cups enjoyed monthly" />
            <AnimatedStat value={28} suffix="+" label="Cafe locations" />
            <AnimatedStat value={4} suffix="" label="Signature brew steps" />
            <AnimatedStat value={2020} suffix="" label="Our Kota beginning" />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12">
        <Reveal className="relative">
          <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[#D9A514]" />

          <div className="tm-card relative overflow-hidden rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85"
              alt="Fresh chai being prepared"
              loading="lazy"
              className="h-[470px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#292316]/80 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#D9A514]">
                Our philosophy
              </p>
              <p className="mt-2 max-w-xs font-serif text-3xl italic">
                A little ritual. A lot of feeling.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="space-y-7">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#C3910B]">
            The Teamood story
          </p>

          <h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.07em] sm:text-7xl">
            Not just chai.<br />
            <span className="font-serif font-medium italic normal-case text-[#A87908]">
              A state of mind.
            </span>
          </h2>

          <p className="text-base leading-8 text-[#292316]/65">
            Teamood is about the moments that happen around a cup of chai. A quick break between busy days, a long conversation with friends, or simply finding your own little corner to relax. We bring tea, flavours and togetherness into one welcoming cafe experience in Kota.
          </p>

          <div className="space-y-4">
            {[
              ['Tea for every mood', 'From comforting masala chai to refreshing tea flavours.'],
              ['A place to connect', 'A welcoming spot for friends, conversations and everyday breaks.'],
              ['Flavours to enjoy', 'Pair your favourite drink with delicious cafe bites.']
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-4 border-b border-[#292316]/10 pb-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#A87908]" />
                <div>
                  <p className="font-black">{title}</p>
                  <p className="mt-1 text-sm text-[#292316]/55">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-3 rounded-full bg-[#292316] px-7 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#A87908]"
          >
            Discover our story <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* SIGNATURE MENU */}
      <section className="bg-[#D9A514] py-24 text-[#FFFDF6]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#292316]">
                A menu full of mood
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[.9] tracking-[-.07em] sm:text-7xl">
                Find your<br />new favourite<span className="text-white">.</span>
              </h2>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-wider text-[#292316]"
            >
              Explore full menu <ArrowUpRight size={17} />
            </Link>
          </Reveal>

          {signatureTeas.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {signatureTeas.map((item) => (
                <Reveal key={item.id}>
                  <article className="tm-card group rounded-[1.7rem] bg-white p-3 text-[#292316]">
                    <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.25rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <span className="absolute right-3 top-3 rounded-full bg-[#D9A514] px-3 py-2 text-sm font-black">
                        ₹{item.price}
                      </span>

                      {item.isPopular && (
                        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#292316] px-3 py-2 text-[9px] font-black uppercase text-white">
                          <Flame size={12} /> Popular
                        </span>
                      )}
                    </div>

                    <div className="px-2 pb-2 pt-4">
                      <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#A87908]">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-xl font-black">{item.name}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#292316]/60">
                        {item.description}
                      </p>

                      <Link
                        to="/menu"
                        className="mt-5 inline-flex items-center gap-2 border-t border-[#292316]/10 pt-4 text-[10px] font-black uppercase tracking-wider"
                      >
                        Discover <ChevronRight size={14} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/30 p-6 text-sm text-[#292316]">
              Signature menu items will appear here once added in the admin panel.
            </p>
          )}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#A87908]">
            More than a cafe
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase leading-[.9] tracking-[-.07em] sm:text-7xl">
            Come for chai.<br />
            <span className="font-serif font-medium italic normal-case text-[#A87908]">
              Stay for the vibe.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#292316]/60">
            Your space for quick breaks, long conversations, study sessions and spontaneous catch-ups in Kota.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-12">
          <Reveal className="group relative min-h-[450px] overflow-hidden rounded-[2rem] md:col-span-7">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
              alt="Cafe interior"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292316]/80 to-transparent" />
            <p className="absolute bottom-8 left-8 max-w-sm text-3xl font-black uppercase text-white">
              Your favourite corner of the day.
            </p>
          </Reveal>

          <div className="grid gap-5 md:col-span-5">
            <Reveal className="group relative min-h-[215px] overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=85"
                alt="Friends at a cafe"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292316]/80 to-transparent" />
              <p className="absolute bottom-6 left-6 text-xl font-black uppercase text-white">
                People. Stories. Chai.
              </p>
            </Reveal>

            <Reveal className="group relative min-h-[215px] overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"
                alt="Fresh bakery treats"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292316]/80 to-transparent" />
              <p className="absolute bottom-6 left-6 text-xl font-black uppercase text-white">
                Something tasty on the side.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#A87908]">
              Take the feeling home
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[.9] tracking-[-.07em] sm:text-7xl">
              Brew your mood<span className="text-[#A87908]">.</span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider"
          >
            Shop all teas <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        {featuredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Reveal key={product.id}>
                <article className="tm-card group rounded-[1.6rem] border border-[#292316]/10 bg-white p-3">
                  <div className="relative aspect-square overflow-hidden rounded-[1.2rem]">
                    <Link to={`/shop/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {product.bestseller && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#A87908] px-3 py-2 text-[9px] font-black uppercase text-white">
                        Bestseller
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 rounded-full bg-[#D9A514] px-3 py-2 text-xs font-black">
                      {product.weight}
                    </span>
                  </div>

                  <div className="px-2 pb-2 pt-4">
                    <div className="flex items-center gap-1 text-xs">
                      <Star size={13} className="fill-[#C3910B] text-[#C3910B]" />
                      <b>{product.rating}</b>
                      <span className="text-[#292316]/40">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <Link to={`/shop/${product.slug}`}>
                      <h3 className="mt-2 text-lg font-black">{product.name}</h3>
                    </Link>

                    <p className="mt-1 line-clamp-2 text-xs leading-6 text-[#292316]/55">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#292316]/10 pt-4">
                      <div>
                        <b className="text-xl">
                          ₹{product.discountPrice || product.price}
                        </b>
                        {product.discountPrice && (
                          <span className="ml-2 text-xs text-[#292316]/40 line-through">
                            ₹{product.price}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        aria-label={`Add ${product.name} to cart`}
                        className="grid h-11 w-11 place-items-center rounded-full bg-[#292316] text-white transition hover:bg-[#A87908]"
                      >
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[#292316]/10 p-6 text-sm text-[#292316]/60">
            Featured products will appear here once published in the admin panel.
          </p>
        )}
      </section>

      {/* FRANCHISE */}
      <section className="relative overflow-hidden bg-[#D9A514] py-16 text-[#292316] sm:py-20">
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <Reveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#292316]/25 bg-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em]">
              <Award size={14} /> Business opportunity
            </div>

            <h2 className="mt-8 text-6xl font-black uppercase leading-[.84] tracking-[-.08em] sm:text-8xl">
              Take the<br />mood to<br />your city<span className="text-white">.</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-[#292316]/75">
              Build a business with the Teamood family. Explore our cafe, kiosk and traditional tea-stall formats with support for setup, operations and training.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/franchise"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-wider text-[#292316] transition hover:bg-[#292316] hover:text-white"
              >
                Explore franchise <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="rounded-full border border-[#292316]/40 px-7 py-4 text-xs font-bold uppercase tracking-wider transition hover:bg-white/30"
              >
                Talk to our team
              </Link>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[320px] overflow-hidden rounded-[2rem] border-[8px] border-white/35 shadow-2xl shadow-[#292316]/15 sm:min-h-[440px]">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=90"
              alt="Warm and welcoming cafe interior"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292316]/70 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 text-white">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#F4D77A]">
                A place to belong
              </p>
              <p className="mt-2 max-w-sm font-serif text-3xl italic leading-tight sm:text-4xl">
                Good chai. Good people. Your city.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <Reveal className="mb-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#A87908]">
            Kind words, good people
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-[-.07em] sm:text-7xl">
            The chai circle<span className="text-[#A87908]">.</span>
          </h2>
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <Reveal key={t.id}>
                <article className="flex min-h-[270px] flex-col justify-between rounded-[1.7rem] bg-white p-7 shadow-sm">
                  <div>
                    <div className="flex gap-1 text-[#C3910B]">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    <p className="mt-6 font-serif text-xl leading-8 text-[#292316]/80">
                      “{t.comment}”
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[#292316]/10 pt-5">
                    <p className="font-black">{t.author}</p>
                    <p className="mt-1 text-xs text-[#292316]/50">
                      {t.role}{t.location ? ` · ${t.location}` : ''}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-[#292316]/60">
            Customer stories will appear here soon.
          </p>
        )}
      </section>

      {/* INSTAGRAM */}
      <section className="bg-[#D9A514] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.2em]">
                <Instagram size={14} /> @teamoodofficial
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase tracking-[-.07em] sm:text-7xl">
                On the gram<span className="text-white">.</span>
              </h2>
            </div>

            <a
              href="https://www.instagram.com/teamoodofficial/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider"
            >
              Follow along <MoveUpRight size={16} />
            </a>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              {
                img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=85',
                caption:'The perfect pour'
              },
              {
                img:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=85',
                caption:'Everyday rituals'
              },
              {
                img:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=85',
                caption:'Cafe moments'
              },
              {
                img:'https://images.unsplash.com/photo-1627881637126-b6b0c036329e?auto=format&fit=crop&w=700&q=85',
                caption:'Little joys'
              }
            ].map((post) => (
              <a
                key={post.caption}
                href="https://www.instagram.com/teamoodofficial/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-[1.4rem]"
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=85';
                  }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#292316]/75 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <span className="text-sm font-bold text-white">
                    {post.caption}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#292316] px-7 py-20 text-center text-white sm:px-14">
          <div className="tm-float pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border border-[#D9A514]/25" />
          <div className="tm-float pointer-events-none absolute -bottom-36 -left-16 h-80 w-80 rounded-full bg-[#A87908]/40 blur-2xl" />

          <Reveal className="relative mx-auto max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#D9A514]">
              Your mood is calling
            </p>

            <h2 className="mt-5 text-5xl font-black uppercase leading-[.9] tracking-[-.07em] sm:text-7xl">
              Make room for<br />
              <span className="font-serif font-medium italic normal-case text-[#D9A514]">
                a better mood.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/60">
              Drop by Teamood Cafe in Kota, explore the menu and find your new favourite tea moment.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/menu"
                className="rounded-full bg-[#D9A514] px-8 py-4 text-xs font-black uppercase tracking-wider text-[#292316] transition hover:bg-white"
              >
                Explore cafe menu
              </Link>

              <Link
                to="/shop"
                className="rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-wider transition hover:bg-white/10"
              >
                Shop tea packs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}