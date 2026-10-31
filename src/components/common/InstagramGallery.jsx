import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export default function InstagramGallery() {
  const posts = [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
      caption: "Steaming hot Kota Shahi Chai in our custom clay ceramics 🫖✨ #TeamoodVibes",
      likes: "1.4k",
      comments: "84"
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
      caption: "Pure Green Elaichi tea harvested from the hills of Idukki 🌿 #EstatePurity",
      likes: "2.1k",
      comments: "112"
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      caption: "Afternoon sunburst lemon iced tea over hand-carved ice 🍋🧊 #SummerChai",
      likes: "980",
      comments: "47"
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
      caption: "Hibiscus blush infused with Egyptian dried roselle petals 🌺 #HerbalInfusion",
      likes: "1.7k",
      comments: "93"
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
      caption: "Late evening deep conversations at our Kota flagship lounge 🤍 #MeetAtTeamood",
      likes: "3.2k",
      comments: "205"
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80",
      caption: "Whole leaf loose tea tins packed for tea lovers across India 📦🍃 #BrewAtHome",
      likes: "1.2k",
      comments: "61"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3B8C8] text-[#1D3D2C] text-xs font-mono font-bold mb-3">
              <Instagram className="w-3.5 h-3.5 text-[#1D3D2C]" />
              <span>@TEAMOODOFFICIAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
              Moments from our Community
            </h2>
          </div>

          <a
            href="https://www.instagram.com/teamoodofficial/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-[#1D3D2C]/15 hover:bg-[#1D3D2C] hover:text-white transition text-xs font-bold font-mono text-[#1D3D2C] shadow-soft"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* 6 Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/teamoodofficial/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#1D3D2C]/10 shadow-soft block"
            >
              <img
                src={post.image}
                alt="Teamood Instagram Post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay with likes & comments */}
              <div className="absolute inset-0 bg-[#1D3D2C]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-[#FAFAF2]">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#F5D36F]" />
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] line-clamp-2 text-white/90 font-medium">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#F5D36F]">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-[#F5D36F]" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
