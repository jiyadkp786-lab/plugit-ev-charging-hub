import React from 'react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: string) => {
    if (pageId === 'home') {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageId === 'chargers') {
      setActivePage('home');
      setTimeout(() => {
        const chargersSec = document.getElementById('dc-charger-section');
        chargersSec?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (pageId === 'stations') {
      setActivePage('home');
      setTimeout(() => {
        const fsdSec = document.getElementById('fsd-section');
        fsdSec?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (pageId === 'business') {
      setActivePage('home');
      setTimeout(() => {
        const fsdSec = document.getElementById('fsd-section');
        fsdSec?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Information */}
        <div className="flex flex-col items-center md:items-start max-w-sm">
          <span className="font-sans text-lg font-bold tracking-[0.25em] text-white">
            PLUG<span className="text-white/60 font-light">IT</span>
          </span>
          <p className="text-white/40 text-xs tracking-wider mt-2 text-center md:text-left">
            Accelerating the transition to sustainable mobility.
          </p>
          <div className="text-white/60 text-xs md:text-sm tracking-wide mt-4 flex flex-col items-center md:items-start gap-2">
            <p className="text-center md:text-left">
              <span className="font-bold text-white/80">Address:</span> 10/1744, 1st Floor, Suite # 1139, Sowbhagya building, Athani, Kakkanad, Ernakulam, Kerala, 682030
            </p>
            <p>
              <span className="font-bold text-white/80">Contact:</span> +91 8943573519
            </p>
            <p>
              <span className="font-bold text-white/80">Email:</span> <a href="mailto:addusindia@gmail.com" className="hover:underline hover:text-white transition-colors">addusindia@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/50">
          <button
            onClick={() => handleLinkClick('home')}
            className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('chargers')}
            className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Chargers
          </button>
          <button
            onClick={() => handleLinkClick('stations')}
            className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Stations
          </button>
          <button
            onClick={() => handleLinkClick('business')}
            className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Business Solutions
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Legal Details */}
        <div className="text-center md:text-right text-xs text-white/30 tracking-wider">
          <p>© {currentYear} PLUG IT INC. ALL RIGHTS RESERVED.</p>
          <p className="mt-1">PRIVACY & LEGAL | RECALLS | CAREERS</p>
        </div>
      </div>
    </footer>
  );
};
