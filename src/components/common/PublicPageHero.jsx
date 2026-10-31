import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function PublicPageHero({ eyebrow, title, accent, description, image, imageAlt = 'Teamood Cafe experience', imageSide = 'right' }) {
  const copy = (
    <div className="relative z-10 space-y-5 animate-[pageRise_.8s_ease_both]">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A514]/40 bg-[#D9A514]/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#F1C84B]">
        <Sparkles size={13} /> {eyebrow}
      </div>
      <h1 className="max-w-2xl text-5xl font-black uppercase leading-[.9] tracking-[-.065em] text-white sm:text-6xl lg:text-7xl">
        {title} {accent && <span className="font-serif font-medium italic normal-case text-[#D9A514]">{accent}</span>}
      </h1>
      <p className="max-w-xl text-sm leading-8 text-white/70 sm:text-base">{description}</p>
      <div className="flex items-center gap-2 pt-1 text-[10px] font-bold uppercase tracking-[.2em] text-[#E8C45D]">
        <span className="h-px w-10 bg-[#D9A514]" /> Made for your mood
      </div>
    </div>
  );
  const visual = (
    <div className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-black/25 sm:min-h-[380px]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#211B0D]/75 via-[#211B0D]/10 to-transparent" />
      <div className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md"><ArrowUpRight size={20} /></div>
      <div className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-white backdrop-blur-md">Teamood · Kota</div>
    </div>
  );
  return (
    <section className="relative isolate overflow-hidden bg-[#292316] py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 opacity-[.12]" style={{backgroundImage:'radial-gradient(#F8E9B5 1px,transparent 1px)',backgroundSize:'30px 30px'}} />
      <div className="absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-[#D9A514]/20 blur-[100px]" />
      <div className={`mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 ${imageSide === 'left' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {copy}{visual}
      </div>
    </section>
  );
}
