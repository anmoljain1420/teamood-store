import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export default function SisterBrandsSpotlight(){return <section className="bg-[#292316] px-6 py-16 text-white"><div className="mx-auto max-w-5xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#D9A514]">The Teamood experience</p><h2 className="mt-3 text-4xl font-black">One mood. Many moments.</h2><Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D9A514]">Our story <ArrowRight size={16}/></Link></div></section>}
