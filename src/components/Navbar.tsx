import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navbar Links exactly like the reference image
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'chargers', label: 'Chargers' },
    { id: 'stations', label: 'Stations' },
    { id: 'business', label: 'Business Solutions' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === 'home') {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageId === 'chargers') {
      if (activePage === 'home') {
        const chargersSec = document.getElementById('dc-charger-section');
        chargersSec?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActivePage('home');
        setTimeout(() => {
          const chargersSec = document.getElementById('dc-charger-section');
          chargersSec?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (pageId === 'stations') {
      if (activePage === 'home') {
        const fsdSec = document.getElementById('fsd-section');
        fsdSec?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActivePage('home');
        setTimeout(() => {
          const fsdSec = document.getElementById('fsd-section');
          fsdSec?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (pageId === 'business') {
      if (activePage === 'home') {
        const fsdSec = document.getElementById('fsd-section');
        fsdSec?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActivePage('home');
        setTimeout(() => {
          const fsdSec = document.getElementById('fsd-section');
          fsdSec?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full h-16 z-50 bg-white border-b border-neutral-100 flex items-center"
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center">
        {/* Tesla Wordmark Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center group cursor-pointer focus:outline-none"
          aria-label="Plugit EV Homepage"
        >
          <span
            style={{ fontFamily: "'Ethnocentric', sans-serif", fontWeight: 700 }}
            className="text-base md:text-lg tracking-[0.12em] text-neutral-900"
          >
            PLUG IT<span className="text-[#1a55cc] ml-1">EV</span>
          </span>
        </button>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="px-4 py-1.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer text-neutral-900 hover:bg-black/5"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Desktop Action Icons */}
        <div className="flex items-center gap-1">
          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md transition-colors duration-300 focus:outline-none cursor-pointer text-neutral-900 hover:bg-black/5"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 top-[64px] bg-white z-40 transition-all duration-500 lg:hidden flex flex-col justify-between p-8 border-t border-neutral-100 ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-center mt-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-2xl font-light tracking-widest py-2 border-b border-neutral-100 transition-all duration-300 text-neutral-800 hover:text-black"
            >
              {link.label}
            </button>
          ))}

        </nav>

        <div className="text-center text-neutral-400 text-xs tracking-wider mb-6">
          <p>© 2026 PLUG IT INC. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </header>
  );
};
