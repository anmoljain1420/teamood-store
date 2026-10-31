import React, { useState, useEffect } from 'react';
import teamoodLogo from '../assets/images.png';

import { Outlet, Link, useLocation } from 'react-router-dom';

import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  MapPin,
  Instagram,
  ExternalLink,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { useApp } from '../context/AppContext';

export default function PublicLayout() {
  const { cart } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  const totalCartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu after navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Menu & Cafe', path: '/menu' },
    { name: 'Shop Tea', path: '/shop' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF6] text-[#292316] font-sans selection:bg-[#D9A514]/30">

      {/* ==========================================
          TOP ANNOUNCEMENT BAR
      ========================================== */}

      <div className="relative z-50 bg-[#292316] text-[#FFFDF6] text-xs py-2.5 px-4 border-b border-[#D9A514]/25">

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">

            <span className="inline-block w-2 h-2 shrink-0 rounded-full bg-[#D9A514] animate-pulse" />

            <span className="font-medium tracking-wide truncate">
              Kota Flagship Lounge: Aerodrome Circle • Authentic Handcrafted Kulhad Chai
            </span>

          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 text-white/80">

            <a
              href="https://www.instagram.com/teamoodofficial/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E5B323] flex items-center gap-1.5 transition"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@teamoodofficial</span>
            </a>

            <span className="text-white/25">|</span>

            <Link
              to="/admin/login"
              className="text-[#E5B323] hover:text-white flex items-center gap-1.5 font-semibold transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

          </div>

        </div>
      </div>


      {/* ==========================================
          MAIN NAVIGATION
      ========================================== */}

      <header
        className={`
          sticky top-0 z-40 w-full
          transition-all duration-300
          ${
            isScrolled
              ? 'bg-[#FFFDF6]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(41,35,22,0.09)] py-3'
              : 'bg-[#FFFDF6] py-4 sm:py-5 border-b border-[#D9A514]/20'
          }
        `}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* OFFICIAL TEAMOOD LOGO */}

          <Link
            to="/"
            className="flex items-center shrink-0 group"
          >

            <div className="bg-[#292316] rounded-xl px-3 py-2 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.03]">

              <img
                src={teamoodLogo}
                alt="Teamood Cafe"
                className="h-9 sm:h-10 w-auto max-w-[145px] sm:max-w-[165px] object-contain"
              />

            </div>

          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">

            {navLinks.map((link) => {

              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    relative py-2 text-sm font-semibold
                    tracking-wide transition-colors duration-300
                    ${
                      isActive
                        ? 'text-[#A87508]'
                        : 'text-[#443A28] hover:text-[#B88912]'
                    }
                  `}
                >

                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D9A514]" />
                  )}

                </Link>
              );

            })}

          </nav>


          {/* NAVIGATION ACTIONS */}

          <div className="flex items-center gap-2 sm:gap-3">

            {/* CART */}

            <Link
              to="/cart"
              className="
                relative p-2.5 sm:p-3
                rounded-xl
                bg-white
                hover:bg-[#F7EACB]
                border border-[#D9A514]/30
                text-[#443516]
                transition-all duration-300
                shadow-sm
                flex items-center justify-center
              "
              title="Shopping Cart"
            >

              <ShoppingBag className="w-5 h-5" />

              {totalCartCount > 0 && (
                <span className="
                  absolute -top-1.5 -right-1.5
                  bg-[#D9A514]
                  text-[#292316]
                  font-bold text-xs
                  w-5 h-5 rounded-full
                  flex items-center justify-center
                  shadow-sm
                ">
                  {totalCartCount}
                </span>
              )}

            </Link>


            {/* FRANCHISE CTA */}

            <Link
              to="/franchise"
              className="
                hidden sm:inline-flex
                items-center gap-2
                px-4 xl:px-5 py-3
                rounded-xl
                bg-[#292316]
                hover:bg-[#49391C]
                text-white
                text-xs font-bold
                uppercase tracking-wider
                transition-all duration-300
                shadow-md hover:shadow-lg
              "
            >

              <span>Partner With Us</span>

              <ArrowRight className="w-4 h-4 text-[#E5B323]" />

            </Link>


            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                lg:hidden p-2.5
                rounded-xl
                bg-white
                hover:bg-[#F7EACB]
                border border-[#D9A514]/30
                text-[#292316]
                transition
              "
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >

              {mobileMenuOpen
                ? <X className="w-6 h-6" />
                : <MenuIcon className="w-6 h-6" />
              }

            </button>

          </div>

        </div>


        {/* ==========================================
            MOBILE DROPDOWN MENU
        ========================================== */}

        {mobileMenuOpen && (

          <div className="
            lg:hidden
            absolute top-full left-0 right-0
            bg-[#FFFDF6]
            border-t border-[#D9A514]/20
            border-b border-[#D9A514]/30
            px-5 sm:px-8 py-6
            shadow-[0_15px_30px_rgba(41,35,22,0.12)]
            animate-in slide-in-from-top-2 duration-300
          ">

            <div className="flex flex-col gap-2">

              {navLinks.map((link) => {

                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      flex items-center justify-between
                      py-3 px-2
                      border-b border-[#D9A514]/15
                      text-sm font-semibold
                      transition-colors
                      ${
                        isActive
                          ? 'text-[#A87508]'
                          : 'text-[#443A28] hover:text-[#B88912]'
                      }
                    `}
                  >

                    <span>{link.name}</span>

                    <ArrowRight
                      className={`w-4 h-4 ${
                        isActive
                          ? 'text-[#D9A514]'
                          : 'text-[#443A28]/40'
                      }`}
                    />

                  </Link>
                );

              })}


              {/* MOBILE FRANCHISE BUTTON */}

              <div className="pt-4">

                <Link
                  to="/franchise"
                  className="
                    w-full flex items-center justify-center gap-2
                    py-3.5 px-4
                    rounded-xl
                    bg-[#292316]
                    hover:bg-[#49391C]
                    text-white
                    font-bold text-sm
                    transition
                  "
                >
                  Become a Franchise Partner
                  <ArrowRight className="w-4 h-4 text-[#E5B323]" />
                </Link>

              </div>


              {/* MOBILE ADMIN LINK */}

              <Link
                to="/admin/login"
                className="
                  flex items-center justify-center gap-2
                  py-3 mt-1
                  rounded-xl
                  border border-[#D9A514]/40
                  text-[#66501F]
                  hover:bg-[#F7EACB]
                  font-semibold text-xs
                  transition
                "
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Management Portal
              </Link>

            </div>

          </div>

        )}

      </header>


      {/* ==========================================
          PAGE CONTENT
      ========================================== */}

      <main className="flex-1">
        <Outlet />
      </main>


      {/* ==========================================
          DARK LUXURY FOOTER
      ========================================== */}

      <footer className="
        relative
        bg-[#292316]
        text-[#FFFDF6]
        border-t border-[#D9A514]/35
        pt-16 sm:pt-20
        pb-8
        overflow-hidden
      ">

        {/* DECORATIVE BACKGROUND */}

        <div className="
          absolute -top-32 -right-24
          w-[420px] h-[420px]
          rounded-full
          bg-[#D9A514]/[0.07]
          blur-[100px]
          pointer-events-none
        " />

        <div className="
          absolute -bottom-40 -left-32
          w-[400px] h-[400px]
          rounded-full
          bg-[#B87932]/[0.10]
          blur-[100px]
          pointer-events-none
        " />


        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* FOOTER MAIN GRID */}

          <div className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-10 lg:gap-8
            pb-14
            border-b border-white/15
          ">


            {/* BRAND COLUMN */}

            <div className="lg:col-span-2 space-y-5">

              <Link
                to="/"
                className="inline-flex items-center"
              >

                <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3">

                  <img
                    src={teamoodLogo}
                    alt="Teamood Cafe"
                    className="h-11 sm:h-12 w-auto max-w-[180px] object-contain"
                  />

                </div>

              </Link>


              <p className="text-white/65 text-sm leading-7 max-w-sm">
                More than just chai. It’s a whole mood. Experience the warmth
                of Indian tea tradition, comforting flavours, handcrafted
                bites, and unforgettable cafe vibes in Kota, Rajasthan.
              </p>


              {/* SOCIAL ICONS */}

              <div className="flex items-center gap-3 pt-1">

                <a
                  href="https://www.instagram.com/teamoodofficial/"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-11 h-11 rounded-full
                    bg-white/10
                    border border-white/15
                    flex items-center justify-center
                    text-[#E5B323]
                    hover:bg-[#D9A514]
                    hover:text-[#292316]
                    hover:border-[#D9A514]
                    transition-all duration-300
                  "
                  title="Follow Teamood on Instagram"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>


                <a
                  href="https://www.google.com/search?q=teamood+kota+google+business+profile"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-11 h-11 rounded-full
                    bg-white/10
                    border border-white/15
                    flex items-center justify-center
                    text-[#E5B323]
                    hover:bg-[#D9A514]
                    hover:text-[#292316]
                    hover:border-[#D9A514]
                    transition-all duration-300
                  "
                  title="Find us on Google"
                >
                  <MapPin className="w-4.5 h-4.5" />
                </a>


                <a
                  href="tel:+919829000000"
                  className="
                    w-11 h-11 rounded-full
                    bg-white/10
                    border border-white/15
                    flex items-center justify-center
                    text-[#E5B323]
                    hover:bg-[#D9A514]
                    hover:text-[#292316]
                    hover:border-[#D9A514]
                    transition-all duration-300
                  "
                  title="Call Teamood Cafe"
                >
                  <Phone className="w-4.5 h-4.5" />
                </a>

              </div>

            </div>


            {/* TEAMOOD PROMISE */}

            <div className="space-y-4">

              <h4 className="font-serif text-lg font-bold text-white">
                The Teamood Feeling
              </h4>

              <div className="w-10 h-[2px] bg-[#D9A514]" />

              <p className="text-sm text-white/60 leading-7">
                Thoughtful tea, comforting flavours and a welcoming place
                for conversations in Kota.
              </p>

              <Link
                to="/about"
                className="
                  inline-flex items-center gap-2
                  text-xs font-bold
                  text-[#E5B323]
                  hover:text-white
                  transition
                "
              >
                Discover Our Story
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

            </div>


            {/* QUICK LINKS */}

            <div className="space-y-4">

              <h4 className="font-serif text-lg font-bold text-white">
                Explore
              </h4>

              <div className="w-10 h-[2px] bg-[#D9A514]" />

              <ul className="space-y-3 text-sm text-white/65">

                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#E5B323] transition"
                  >
                    Our Story
                  </Link>
                </li>

                <li>
                  <Link
                    to="/menu"
                    className="hover:text-[#E5B323] transition"
                  >
                    Cafe Menu
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop"
                    className="hover:text-[#E5B323] transition"
                  >
                    Packaged Tea Shop
                  </Link>
                </li>

                <li>
                  <Link
                    to="/franchise"
                    className="hover:text-[#E5B323] transition"
                  >
                    Franchise Inquiry
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#E5B323] transition"
                  >
                    Visit & Contact Us
                  </Link>
                </li>

              </ul>

            </div>


            {/* LOCATION */}

            <div className="space-y-4">

              <h4 className="font-serif text-lg font-bold text-white">
                Kota Flagship
              </h4>

              <div className="w-10 h-[2px] bg-[#D9A514]" />

              <p className="text-sm text-white/65 leading-7">
                Aerodrome Circle, Near Student Hub
                <br />
                Kota, Rajasthan 324007
                <br />
                Open Everyday: 7:00 AM – 11:30 PM
              </p>

              <a
                href="https://www.google.com/search?q=teamood+kota+google+business+profile"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-xs font-semibold
                  text-[#E5B323]
                  hover:text-white
                  transition
                "
              >
                <span>Find Us on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>

          </div>


          {/* FOOTER BOTTOM BAR */}

          <div className="
            pt-7
            flex flex-col
            md:flex-row
            items-center justify-between
            gap-5
            text-xs
            text-white/45
          ">

            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Teamood Cafe.
              All Rights Reserved. Crafted for tea lovers in Kota & beyond.
            </p>


            <div className="
              flex flex-wrap
              items-center justify-center
              gap-x-4 gap-y-2
            ">

              <Link
                to="/about"
                className="hover:text-[#E5B323] transition"
              >
                Brand Heritage
              </Link>

              <span className="text-white/20">•</span>

              <Link
                to="/franchise"
                className="hover:text-[#E5B323] transition"
              >
                Franchise Terms
              </Link>

              <span className="text-white/20">•</span>

              <Link
                to="/admin/login"
                className="
                  text-[#E5B323]
                  hover:text-white
                  font-semibold
                  transition
                "
              >
                Staff & Admin Login
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}