import React, { useMemo, useState } from 'react';
import { Search, ShoppingBag, Flame, ArrowUpRight, Coffee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PublicPageHero from '../../components/common/PublicPageHero';

const fallbackImage = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85';
export default function Menu() {
  const { menuItems = [], addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = useMemo(() => ['All', ...new Set(menuItems.map(item => item.category).filter(Boolean))], [menuItems]);
  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    return categoryMatch && (!q || item.name.toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q));
  });
  return <main className="min-h-screen bg-[#FFFDF6] pb-20 text-[#292316]">
    <PublicPageHero eyebrow="Freshly brewed to order" title="Find your" accent="favourite flavour." description="From comforting classic chai to special blends and cafe favourites, discover something that fits your mood. Every menu item comes with its own flavour story." image="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=90" imageAlt="Tea served in a warm cafe setting" />
    <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-5 rounded-3xl border border-[#292316]/10 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#A87908]">Explore the menu</p><h2 className="mt-1 text-2xl font-black">What are you in the mood for?</h2></div>
        <div className="relative w-full md:max-w-sm"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#292316]/40" size={18}/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search chai, coffee or snacks..." className="w-full rounded-full border border-[#292316]/15 bg-[#FFFDF6] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#D9A514]"/></div>
      </div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">{categories.map(cat=><button key={cat} onClick={()=>setSelectedCategory(cat)} className={`whitespace-nowrap rounded-full px-5 py-3 text-xs font-black transition ${selectedCategory===cat?'bg-[#292316] text-white':'border border-[#292316]/15 bg-white text-[#292316]/70 hover:border-[#D9A514]'}`}>{cat}</button>)}</div>
      {filteredItems.length ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filteredItems.map((item,index)=><article key={item.id} className="group overflow-hidden rounded-[1.7rem] border border-[#292316]/10 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative aspect-[5/4] overflow-hidden bg-[#F4E9CE]"><img src={item.image || fallbackImage} alt={item.name} loading="lazy" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=fallbackImage;}} className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/>{item.isPopular&&<span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#D9A514] px-3 py-2 text-[9px] font-black uppercase tracking-wider text-[#292316]"><Flame size={12}/> Crowd favourite</span>}<span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-black text-[#292316]">₹{item.price}</span></div>
        <div className="p-6"><p className="text-[9px] font-black uppercase tracking-[.2em] text-[#A87908]">{item.category}</p><h3 className="mt-2 text-2xl font-black">{item.name}</h3><p className="mt-3 min-h-[54px] text-sm leading-6 text-[#292316]/60">{item.description || 'Freshly prepared at Teamood Cafe.'}</p><div className="mt-6 flex items-center justify-between border-t border-[#292316]/10 pt-5"><span className="text-[10px] font-bold uppercase tracking-wider text-[#292316]/45">{item.status || 'Fresh daily'}</span><button onClick={()=>addToCart(item,1)} className="inline-flex items-center gap-2 rounded-full bg-[#292316] px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-[#A87908]"><ShoppingBag size={14}/> Add to order</button></div></div>
      </article>)}</div> : <div className="mt-12 rounded-3xl border border-dashed border-[#292316]/20 bg-white p-12 text-center"><Coffee className="mx-auto text-[#A87908]" size={30}/><p className="mt-4 font-bold">No menu items found.</p><p className="mt-2 text-sm text-[#292316]/55">Try another category or search term.</p></div>}
    </section>
  </main>;
}
