import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Coffee, Heart, Leaf, Sparkles, Star } from 'lucide-react';
import PublicPageHero from '../../components/common/PublicPageHero';

const milestones = [
  { year: '2020', phase: 'The first pour', title: 'A Kota beginning', text: 'Teamood began with a simple belief: chai is more than a drink. It is the pause between busy hours, the start of conversations and a familiar comfort.', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85', side: 'left' },
  { year: '2022', phase: 'Finding our flavour', title: 'A signature takes shape', text: 'We focused on building a distinctive tea experience through carefully prepared blends, comforting classics and flavours made for different moods.', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85', side: 'right' },
  { year: '2024', phase: 'More than a cup', title: 'A place to come together', text: 'The cafe experience grew around the things that matter: welcoming spaces, familiar faces, good conversations and something delicious to share.', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85', side: 'left' },
  { year: '2026', phase: 'The next chapter', title: 'Taking the mood forward', text: 'We continue to build the Teamood experience with thoughtful hospitality, a growing menu and new ways for tea lovers to connect with us.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85', side: 'right' }
];

function JourneyItem({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: .2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <article ref={ref} className={`relative grid items-center gap-8 py-10 transition-all duration-1000 lg:grid-cols-2 lg:gap-16 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${index % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
    <div className="group relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-[#292316]/10">
      <img src={item.image} alt={item.title} loading="lazy" className="h-[280px] w-full object-cover transition duration-1000 group-hover:scale-110 sm:h-[360px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#292316]/70 to-transparent" />
      <span className="absolute bottom-6 left-6 font-serif text-6xl font-bold text-white/90">{item.year}</span>
      <span className="absolute right-5 top-5 rounded-full bg-[#D9A514] px-4 py-2 text-[9px] font-black uppercase tracking-[.18em] text-[#292316]">Chapter {String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="relative">
      <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-[#A87908]"><span className="h-px w-8 bg-[#A87908]" />{item.phase}</div>
      <h2 className="max-w-xl text-4xl font-black uppercase leading-[.92] tracking-[-.06em] text-[#292316] sm:text-6xl">{item.title}</h2>
      <p className="mt-6 max-w-lg text-sm leading-8 text-[#292316]/65">{item.text}</p>
      <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#292316]"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#D9A514]"><ArrowUpRight size={17}/></span> A story still being brewed</div>
    </div>
  </article>;
}

export default function About() {
  return <main className="min-h-screen bg-[#FFFDF6] text-[#292316]">
    <PublicPageHero eyebrow="Our story & philosophy" title="Born in Kota." accent="Brewed for every mood." description="Tea is never just a beverage. It is the fuel for conversations, the pause in a busy day and the comfort of something familiar. This is the Teamood story." image="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=90" imageAlt="A freshly brewed cup of tea" />
    <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-12">
      {[{icon:Coffee,title:'The craft',desc:'Thoughtful tea, carefully prepared and served fresh.'},{icon:Heart,title:'The feeling',desc:'A welcoming place for friends, families and everyday pauses.'},{icon:Leaf,title:'The promise',desc:'A consistent cafe experience built around flavour and hospitality.'}].map((x)=><div key={x.title} className="rounded-3xl border border-[#292316]/10 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#D9A514]/20 text-[#A87908]"><x.icon size={22}/></div><h3 className="mt-6 text-2xl font-black">{x.title}</h3><p className="mt-3 text-sm leading-7 text-[#292316]/60">{x.desc}</p></div>)}
    </section>
    <section className="bg-[#292316] px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]"><div><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#D9A514]">The Teamood philosophy</p><h2 className="mt-4 max-w-3xl font-serif text-4xl italic leading-tight sm:text-6xl">“A good cup makes room for a good moment.”</h2></div><div className="grid h-24 w-24 place-items-center rounded-full border border-[#D9A514]/50 text-[#D9A514]"><Sparkles size={34}/></div></div></section>
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><div className="mb-8 max-w-2xl"><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#A87908]">The journey so far</p><h2 className="mt-3 text-5xl font-black uppercase tracking-[-.07em] sm:text-7xl">Milestones, <span className="font-serif italic font-medium normal-case text-[#A87908]">not just dates.</span></h2><p className="mt-5 text-sm leading-7 text-[#292316]/60">Every chapter adds a little more flavour to the story. Scroll through the moments that shaped Teamood.</p></div><div className="relative"><div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D9A514] to-transparent lg:block"/>{milestones.map((item,index)=><JourneyItem key={item.year} item={item} index={index}/>)}</div></div></section>
    <section className="bg-[#D9A514] px-5 py-16 text-center"><div className="mx-auto max-w-3xl"><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#292316]/70">Your chapter starts here</p><h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-6xl">Come make a memory.</h2><a href="/menu" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#292316] px-8 py-4 text-xs font-black uppercase tracking-wider text-white">Explore our menu <ArrowUpRight size={16}/></a></div></section>
  </main>;
}
