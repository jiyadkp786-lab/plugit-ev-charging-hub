import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Volume2, VolumeX, MapPin, CreditCard, TrendingUp, Compass, Star, Maximize2 } from 'lucide-react';
import { Footer } from '../components/Footer';

// Import images
import modelYHeroImg from '../assets/images/model-y-hero.png';

interface HomeProps {
  setActivePage: (page: string) => void;
  setShopCategory?: (category: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  // Horizontal slider state for Model Y section
  const [modelYSlide, setModelYSlide] = useState(0);
  const [activeChargerIdx, setActiveChargerIdx] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync state with DOM property to fix React muted attribute bug
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  const reviewsData = [
    {
      id: 1,
      name: 'Sharanya',
      avatar: 'SH',
      location: 'Chennai',
      vehicle: 'EV SUV Owner',
      rating: 5,
      comment: 'The Plugit App is a lifesaver. Finding fast chargers on my highway trips is incredibly fast, and the real-time availability has been 100% accurate every single time.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Sidhaarth',
      avatar: 'SI',
      location: 'Bengaluru',
      vehicle: 'EV Sedan Owner',
      rating: 5,
      comment: 'Charging has never been this smooth. I just plug in, the app detects the dispenser, and it bills automatically. Truly a world-class premium charging experience in India.',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Niyas',
      avatar: 'NY',
      location: 'Mumbai',
      vehicle: 'Compact EV Owner',
      rating: 5,
      comment: 'Installed the Plugit Home Charger and it works flawlessly with the app’s scheduler. I schedule charging during off-peak hours and save 35% on my monthly electricity bills!',
      date: '3 weeks ago'
    },
    {
      id: 4,
      name: 'Joe',
      avatar: 'JO',
      location: 'Chennai',
      vehicle: 'Fleet Logistics Manager',
      rating: 4,
      comment: 'Their commercial charging network uptime is amazing. As a fleet manager, the RFID integration and real-time dashboard tracking save us hours of logistics overhead every week.',
      date: '2 months ago'
    }
  ];



  const sections = [
    {
      id: 'model-y',
      type: 'carousel',
      slides: [
        {
          image: modelYHeroImg,
          title: 'Model Y',
          subtitle: '0% APR Available',
          subtitleClass: 'underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer',
          subtitleAction: () => setActivePage('vehicles'),
          primaryBtn: 'Order Now',
          secondaryBtn: 'Learn More',
          primaryBtnClass: 'bg-[#3e6ae1] hover:bg-[#3258c3] text-white shadow-lg shadow-[#3e6ae1]/20',
          secondaryBtnClass: 'bg-white hover:bg-white/90 text-black',
          cropClass: 'scale-[1.18] -translate-y-[1.5%]',
        }
      ],
      primaryAction: () => setActivePage('vehicles'),
      secondaryAction: () => setActivePage('contact'),
    },
    {
      id: 'fsd-section',
      type: 'video-split',
      title: 'Full Self-Driving',
    },
    {
      id: 'dc-charger-section',
      type: 'dc-charger',
      title: 'DC Charger CCS2',
    },
    {
      id: 'charging-guide',
      type: 'video',
      videoSrc: '/ev-guide-video.mp4',
      title: 'EV Charging Guide',
      subtitle: 'A Guide to EV Charging Plugs',
      description: 'How Tesla’s Charger is Becoming the New Standard',
      primaryBtn: 'Unmute',
      secondaryBtn: 'Learn More',
      primaryBtnClass: 'bg-white text-black hover:bg-white/90',
      secondaryBtnClass: 'bg-black/60 text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm',
      primaryAction: () => {},
      secondaryAction: () => setActivePage('about'),
    },

    {
      id: 'plugit-app',
      type: 'app-section',
      title: 'Plugit® App Is All You Need',
    },
    {
      id: 'reviews',
      type: 'reviews-section',
      title: 'Love from our EV users',
    },
    {
      id: 'footer-section',
      type: 'footer',
      title: 'Footer',
    },
  ];

  return (
    <div className="scroll-container w-full bg-[#050505] text-white">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={section.type === 'carousel' ? 'carousel-section' : 'scroll-section'}
        >
          
          {/* RENDER HORIZONTAL CAROUSEL SECTION (MODEL Y) */}
          {section.type === 'carousel' ? (
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={modelYSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full overflow-hidden"
                >
                  {/* Full bleed image aligned to the top to keep the logo visible */}
                  <img
                    src={section.slides![modelYSlide].image}
                    alt={section.slides![modelYSlide].title}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 scale-100"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Horizontal Navigation Arrows */}
              {section.slides!.length > 1 && (
                <>
                  <button
                    onClick={() => setModelYSlide((prev) => (prev === 0 ? section.slides!.length - 1 : prev - 1))}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/20 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-sm cursor-pointer focus:outline-none"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </button>

                  <button
                    onClick={() => setModelYSlide((prev) => (prev === section.slides!.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/20 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-sm cursor-pointer focus:outline-none"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </>
              )}

              {/* Slide Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-between items-center py-6 md:py-24 px-6 text-center">
                {/* Titles removed from carousel */}
                <div />

                {/* Dot Indicators */}
                {section.slides!.length > 1 && (
                  <div className="w-full max-w-md flex flex-col items-center gap-6">
                    {/* Horizontal Slide Dots */}
                    <div className="flex gap-2.5 mt-2">
                      {section.slides!.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setModelYSlide(dotIdx)}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                            modelYSlide === dotIdx ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/60'
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : section.type === 'video-split' ? (
            <div className="relative lg:absolute lg:inset-0 w-full bg-[#f4f4f4] text-neutral-900 flex flex-col justify-center items-center py-12 md:py-16 lg:py-10 px-5 sm:px-10 lg:px-16">
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left Column: Simple & Standard EV Infographics in a White Card Box */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex flex-col gap-5 text-left transition-all duration-500 bg-white border border-neutral-200/60 p-5 sm:p-8 rounded-2xl shadow-sm"
                >
                  <div>
                    <span className="text-xs tracking-[0.25em] text-[#1a55cc] font-semibold uppercase">
                      EV MARKET OPPORTUNITY
                    </span>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-950 mt-2 leading-tight">
                      India is Moving Towards Electric Mobility
                    </h2>
                  </div>

                  {/* 2x2 Grid of Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-8 mt-2 border-t border-neutral-200 pt-6">
                    
                    {/* Item 1: Market Growth & Future Adoption */}
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl sm:text-3xl font-semibold text-[#1a55cc] tracking-tight flex-shrink-0 w-[72px] text-left">
                        +68%
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-[13px] font-semibold text-neutral-900 tracking-wide">
                          CAGR Growth
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-relaxed">
                          Sales projected to exceed 16M EVs by 2030.
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Fuel Cost & EV Savings */}
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight flex-shrink-0 w-[72px] text-left">
                        10x
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-[13px] font-semibold text-neutral-900 tracking-wide">
                          Cost Savings
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-relaxed">
                          Running cost of ₹1.2/km is much cheaper than petrol.
                        </p>
                      </div>
                    </div>

                    {/* Item 3: Highway Travel Infrastructure */}
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight flex-shrink-0 w-[72px] text-left">
                        18.5k
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-[13px] font-semibold text-neutral-900 tracking-wide">
                          Corridors
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-relaxed">
                          Fast corridors enable seamless intercity travel.
                        </p>
                      </div>
                    </div>

                    {/* Item 4: Commercial EV Fleets */}
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl sm:text-3xl font-semibold text-[#10b981] tracking-tight flex-shrink-0 w-[72px] text-left">
                        80%
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-[13px] font-semibold text-neutral-900 tracking-wide">
                          Fleet Shift
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5 leading-relaxed">
                          Logistics networks transitioning rapidly to electric.
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* Right Column: Video - Landscape aspect-video */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative bg-black border border-neutral-200/50"
                >
                  <video
                    src="/branding-tips.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>

              </div>
            </div>
          ) : section.type === 'dc-charger' ? (() => {
            const chargersData = [
              {
                id: 'super-charger',
                tag: 'PLUGIT FLAGSHIP PRODUCT',
                title: 'EV Super Charger',
                subtitle: 'Flagship 120kW ultra-fast charging station built for high-throughput public networks.',
                image: '/super-charger.png',
                specs: [
                  { label: 'Power', value: '120kW Ultra-Fast' },
                  { label: 'Input', value: '3-Phase, 415V (+6% / -10%)' },
                  { label: 'Output', value: '200 – 1000 Vdc' },
                  { label: 'Current', value: '150A Max' },
                  { label: 'Connector', value: 'CCS2 (Single/Dual)' },
                  { label: 'Efficiency', value: '≥95%' },
                  { label: 'Power Factor', value: '≥0.98' },
                  { label: 'Display', value: 'TFT LCD (Optional 10")' },
                  { label: 'Backup', value: 'Battery > 60 mins', fullWidth: true },
                ]
              },
              {
                id: 'dc-charger',
                tag: 'COMMERCIAL INFRASTRUCTURE',
                title: 'DC Charger CCS2',
                subtitle: 'High-efficiency dual-gun fast charging station for commercial networks.',
                image: '/dc-charger.png',
                specs: [
                  { label: 'Power', value: '60kW Fast Charging' },
                  { label: 'Input', value: '3-Phase, 415V' },
                  { label: 'Output', value: '200 - 1000 Vdc' },
                  { label: 'Current', value: '150A Max' },
                  { label: 'Connector', value: 'CCS2 (Single/Dual)' },
                  { label: 'Efficiency', value: '≥95%' },
                  { label: 'Power Factor', value: '≥0.98' },
                  { label: 'Display', value: 'TFT Touchscreen (10" Opt)' },
                  { label: 'Backup', value: 'Battery > 60 mins', fullWidth: true },
                ]
              },
              {
                id: 'quick-charger',
                tag: 'COMPACT FAST CHARGING',
                title: 'EV Quick Charger',
                subtitle: 'Compact 30kW CCS2 charger — ideal for parking lots, malls & semi-public stations.',
                image: '/quick-charger.png',
                specs: [
                  { label: 'Power', value: '30kW Quick Charging' },
                  { label: 'Input', value: '3-Phase, 415V (+6% / -10%)' },
                  { label: 'Output', value: '200 – 1000 Vdc' },
                  { label: 'Current', value: '150A Max' },
                  { label: 'Connector', value: 'CCS2 (Single/Dual)' },
                  { label: 'Efficiency', value: '≥95%' },
                  { label: 'Power Factor', value: '≥0.98' },
                  { label: 'Display', value: 'TFT LCD (Optional 10")' },
                  { label: 'Backup', value: 'Battery > 60 mins', fullWidth: true },
                ]
              },
              {
                id: 'ac-charger',
                tag: 'COMMERCIAL & RESIDENTIAL',
                title: 'AC Charger Type-2',
                subtitle: 'Smart charging station with anti-theft design for home & work.',
                image: '/ac-charger.png',
                specs: [
                  { label: 'Power', value: '7.4 kW' },
                  { label: 'Input', value: '1-Phase (SG) / 3-Phase (DG)' },
                  { label: 'Outputs', value: '1 (Single) or 2 (Dual Gun)' },
                  { label: 'Connector', value: 'IEC 62196 Type-2' },
                  { label: 'Display', value: '4.3" HMI LCD (DG)' },
                  { label: 'Access', value: 'RFID + OCPP v1.6' },
                  { label: 'Mounting', value: 'Wall / Pole (Anti-theft)' },
                  { label: 'Ingress', value: 'IP55 / IK-08 / UL94 V-0' }
                ]
              },
              {
                id: 'home-charger',
                tag: 'HOME CHARGING',
                title: 'EV Home Charger',
                subtitle: 'Compact 3kW home charging solution with smart protection & WiFi — simply plug in and charge.',
                image: '/home-charger.png',
                specs: [
                  { label: 'Power', value: '3 kW' },
                  { label: 'Voltage', value: '230V AC Single Phase' },
                  { label: 'Connector', value: 'Type-2' },
                  { label: 'Protection', value: 'Smart Protection System' },
                  { label: 'Indicator', value: 'LED Status Indicator' },
                  { label: 'Connectivity', value: 'WiFi' },
                  { label: 'Mounting', value: 'Wall Mount Design' },
                  { label: 'Ingress', value: 'IP55' },
                ]
              }
            ];

            const currentCharger = chargersData[activeChargerIdx];

            return (
              <div className={`relative lg:absolute lg:inset-0 w-full text-neutral-900 flex flex-col justify-center items-center py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24 transition-colors duration-700 ${activeChargerIdx === 0 ? 'bg-[#f0f4ff]' : 'bg-white'}`}>

                {/* Super Charger: Animated background gradient orbs */}
                {activeChargerIdx === 0 && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#1a55cc]/30 to-[#3e6ae1]/10 blur-3xl pointer-events-none z-0"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="absolute right-[20%] bottom-[10%] w-[260px] h-[260px] rounded-full bg-[#3e6ae1]/20 blur-2xl pointer-events-none z-0"
                    />
                  </>
                )}

                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
                  
                  {/* Left Column: Specifications List */}
                  <div className="lg:col-span-6 flex flex-col gap-6 text-left h-full justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeChargerIdx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          {/* Flagship animated badge — only for Super Charger */}
                          {activeChargerIdx === 0 ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="inline-flex items-center gap-2 mb-2"
                            >
                              <span className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1a55cc] to-[#3e6ae1] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-lg shadow-[#1a55cc]/30">
                                <motion.span
                                  animate={{ opacity: [1, 0.4, 1] }}
                                  transition={{ duration: 1.2, repeat: Infinity }}
                                  className="w-1.5 h-1.5 bg-white rounded-full"
                                />
                                ⚡ PLUGIT FLAGSHIP
                              </span>
                            </motion.div>
                          ) : (
                            <span className="text-xs tracking-[0.25em] text-[#1a55cc] font-semibold uppercase">
                              {currentCharger.tag}
                            </span>
                          )}

                          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-950 mt-2 leading-tight">
                            {currentCharger.title}
                          </h2>
                          <p className="text-xs md:text-sm text-neutral-500 font-light mt-2 tracking-wide leading-relaxed min-h-[40px]">
                            {currentCharger.subtitle}
                          </p>
                        </div>

                        {/* Specifications Grid — staggered for Super Charger */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 border-t border-neutral-200 pt-6 max-h-[260px] md:max-h-none overflow-y-auto pr-1">
                          {currentCharger.specs.map((spec, i) => (
                            activeChargerIdx === 0 ? (
                              <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                                className={spec.fullWidth ? 'sm:col-span-2' : ''}
                              >
                                <span className="text-[10px] uppercase tracking-wider text-[#1a55cc]/70 font-semibold">{spec.label}</span>
                                <p className="text-sm font-bold text-neutral-900 mt-0.5">{spec.value}</p>
                              </motion.div>
                            ) : (
                              <div key={spec.label} className={spec.fullWidth ? 'sm:col-span-2' : ''}>
                                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">{spec.label}</span>
                                <p className="text-sm font-semibold text-neutral-900 mt-0.5">{spec.value}</p>
                              </div>
                            )
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => {
                          const whatsappUrl = `https://wa.me/918943573519?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(currentCharger.title)}.%20Please%20help%20me%20find%20and%20purchase%20this%20charger.`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className={`font-bold py-3.5 px-8 rounded-md text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none shadow-sm text-white text-center ${activeChargerIdx === 0 ? 'bg-gradient-to-r from-[#1a55cc] to-[#3e6ae1] hover:from-[#1648b8] hover:to-[#3258c3] shadow-[#1a55cc]/30 shadow-lg' : 'bg-[#171717] hover:bg-neutral-800'}`}
                      >
                        FIND A CHARGER
                      </button>
                      <button
                        onClick={() => setActivePage('contact')}
                        className="bg-white hover:bg-neutral-50 text-neutral-800 font-bold py-3.5 px-8 rounded-md text-xs tracking-wider uppercase border border-neutral-200 transition-all duration-300 cursor-pointer focus:outline-none shadow-sm text-center"
                      >
                        REQUEST QUOTE
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Charging Station Image with animations for Super Charger */}
                  <div className="lg:col-span-6 w-full h-[350px] md:h-[520px] flex items-center justify-center relative group">
                    {/* Mobile/Tablet Screen-edge Navigation Arrow (aligned with image center) */}
                    <button
                      onClick={() => setActiveChargerIdx((prev) => (prev === chargersData.length - 1 ? 0 : prev + 1))}
                      className="absolute right-[-8px] md:right-[-24px] top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3 rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-lg hover:bg-neutral-50 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none lg:hidden"
                      aria-label="Next Charger"
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeChargerIdx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="w-full h-full flex items-center justify-center relative"
                      >
                        {/* Super Charger: pulsing ring behind the image */}
                        {activeChargerIdx === 0 && (
                          <>
                            <motion.div
                              animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.35, 0.6, 0.35] }}
                              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute inset-[10%] rounded-full border-2 border-[#1a55cc]/40 z-0 pointer-events-none"
                            />
                            <motion.div
                              animate={{ scale: [0.9, 1.18, 0.9], opacity: [0.2, 0.4, 0.2] }}
                              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                              className="absolute inset-[5%] rounded-full border border-[#3e6ae1]/30 z-0 pointer-events-none"
                            />
                            {/* Floating energy orbs */}
                            {[
                              { top: '15%', left: '10%', delay: 0 },
                              { top: '75%', left: '15%', delay: 0.8 },
                              { top: '20%', right: '10%', delay: 1.4 },
                              { top: '70%', right: '12%', delay: 0.4 },
                            ].map((pos, i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
                                className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#1a55cc] to-[#3e6ae1] shadow-md shadow-[#1a55cc]/50 z-10 pointer-events-none"
                                style={{ top: pos.top, left: (pos as any).left, right: (pos as any).right }}
                              />
                            ))}
                            {/* Animated power badge at the top of the image */}
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                            >
                              <motion.div
                                animate={{ boxShadow: ['0 0 0px #1a55cc', '0 0 18px #1a55cc88', '0 0 0px #1a55cc'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-white border border-[#1a55cc]/30 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-md"
                              >
                                <motion.span
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 0.9, repeat: Infinity }}
                                  className="w-2 h-2 rounded-full bg-[#1a55cc] flex-shrink-0"
                                />
                                <span className="text-[10px] font-bold tracking-widest text-[#1a55cc] uppercase">120 kW Live</span>
                              </motion.div>
                            </motion.div>
                          </>
                        )}

                        <img
                          src={currentCharger.image}
                          alt={currentCharger.title}
                          className={`max-h-full max-w-full object-contain select-none z-10 transition-transform duration-700 ${activeChargerIdx === 0 ? 'scale-105 hover:scale-110 drop-shadow-2xl' : 'scale-110 hover:scale-115'}`}
                        />

                        {/* Ground shadow */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-neutral-950/5 blur-xl rounded-full opacity-60 z-0" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

                {/* Desktop Screen-edge Right Navigation Arrow */}
                <button
                  onClick={() => setActiveChargerIdx((prev) => (prev === chargersData.length - 1 ? 0 : prev + 1))}
                  className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-lg hover:bg-neutral-50 hover:shadow-xl active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
                  aria-label="Next Charger"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

              </div>
            );
          })() : section.type === 'app-section' ? (
            <div className="relative lg:absolute lg:inset-0 w-full bg-white text-neutral-900 flex flex-col justify-center items-center py-12 md:py-16 lg:py-12 px-6 md:px-12 lg:px-24">
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full lg:max-h-[85vh]">
                
                {/* Left Column: Mobile App Image Mockup */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 flex justify-center items-center h-full relative"
                >
                   <img
                    src="/plugit-app.png"
                    alt="Plugit App Mockup"
                    className="w-full h-auto max-h-[64vh] lg:max-h-[74vh] max-w-[500px] lg:max-w-none object-contain"
                  />
                </motion.div>

                {/* Right Column: App Features & Content */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 flex flex-col justify-center text-left"
                >
                  <span className="text-xs tracking-[0.25em] text-[#1a55cc] font-semibold uppercase">
                    MOBILE APP COMPANION
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-2 leading-tight">
                    Plugit® App Is All You Need
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-500 font-light mt-3 leading-relaxed max-w-lg">
                    Take full control of your EV charging. Find public charging stations, monitor your charging speeds, and manage payments — all from a single dashboard.
                  </p>

                  {/* App features grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-neutral-200 pt-6">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-[#1a55cc]/10 rounded-lg text-[#1a55cc]">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">Locate & Navigate</h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5">Find 50k+ chargers globally with live availability status.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-[#1a55cc]/10 rounded-lg text-[#1a55cc]">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">One-Click Payments</h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5">Pay instantly with secure credit cards, wallets or UPI.</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0">
                      <div className="p-2 bg-[#1a55cc]/10 rounded-lg text-[#1a55cc]">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">Real-Time Stats</h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5">Track charging speed, duration, battery level & cost.</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0">
                      <div className="p-2 bg-[#1a55cc]/10 rounded-lg text-[#1a55cc]">
                        <Compass className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">Smart Route Planner</h4>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5">Autoplan road trips with optimal charging stops.</p>
                      </div>
                    </div>
                  </div>


                </motion.div>

              </div>
            </div>
          ) : section.type === 'reviews-section' ? (
            <div className="relative lg:absolute lg:inset-0 w-full bg-white text-neutral-900 flex flex-col justify-between py-12 md:py-16">
              
              {/* Subtle decorative background glow */}
              <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] rounded-full bg-[#1a55cc]/3 blur-3xl pointer-events-none z-0" />
              <div className="absolute bottom-[20%] right-[20%] w-[320px] h-[320px] rounded-full bg-[#3e6ae1]/3 blur-3xl pointer-events-none z-0" />

              {/* Centered Header */}
              <div className="relative z-10 max-w-4xl w-full mx-auto px-6 text-center mt-2 md:mt-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-xs tracking-[0.25em] text-[#1a55cc] font-semibold uppercase">
                    CUSTOMER TESTIMONIALS
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-[0.15em] text-neutral-950 uppercase mt-2">
                    Love from our EV users
                  </h2>
                  
                  {/* Aggregate Rating Display */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="flex text-amber-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <div className="relative h-5 w-5 overflow-hidden">
                        <Star className="h-5 w-5 absolute top-0 left-0 text-neutral-200" />
                        <div className="overflow-hidden w-1/2 absolute top-0 left-0 h-full text-amber-400">
                          <Star className="h-5 w-5 fill-current" />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-neutral-900 ml-1">4.5 / 5.0 Rating</span>
                    <span className="text-xs text-neutral-400 border-l border-neutral-200 pl-2">10,000+ Happy Drivers</span>
                  </div>
                </motion.div>
              </div>

              {/* Infinite Horizontal Marquee Container */}
              <div className="relative w-full overflow-hidden my-auto py-6 mask-gradient-x z-10">
                <div className="flex gap-6 animate-marquee py-2">
                  {[...reviewsData, ...reviewsData, ...reviewsData].map((review, idx) => (
                    <div
                      key={idx}
                      className="w-[320px] md:w-[460px] flex-shrink-0 bg-neutral-50 border border-neutral-200/80 rounded-3xl p-6 md:p-8 text-left shadow-lg relative flex flex-col justify-between min-h-[210px] transition-transform duration-300 hover:scale-[1.02] hover:border-neutral-300"
                    >
                      <span className="absolute top-3 right-6 text-6xl md:text-7xl font-serif text-neutral-200/30 select-none pointer-events-none">“</span>
                      
                      {/* Reviewer star rating */}
                      <div className="flex text-amber-400 gap-0.5 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4.5 w-4.5 ${i < review.rating ? 'fill-current' : 'text-neutral-200'}`}
                          />
                        ))}
                      </div>

                      <p className="text-xs md:text-[15px] text-neutral-700 font-light leading-relaxed tracking-wide mb-6">
                        "{review.comment}"
                      </p>

                      {/* Reviewer Profile details */}
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1a55cc] to-[#3e6ae1] flex items-center justify-center font-bold text-xs text-white uppercase shadow-md shadow-[#1a55cc]/15">
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-bold text-neutral-950 tracking-wider">
                            {review.name} <span className="text-[11px] font-normal text-neutral-500 ml-1.5">• {review.location}</span>
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-[#1a55cc] tracking-widest mt-0.5 block">
                            {review.vehicle}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-light ml-auto">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative padding */}
              <div className="h-8 md:h-16" />
            </div>
          ) : section.type === 'video' ? (
            <div className="relative lg:absolute lg:inset-0 w-full h-[75vh] md:h-[85vh] lg:h-full bg-black overflow-hidden">
              <video
                ref={videoRef}
                src={section.videoSrc}
                autoPlay
                loop
                muted={videoMuted}
                playsInline
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50" />
              
              {/* Section Content */}
              <div className="relative z-10 h-full flex flex-col justify-between items-center py-12 md:py-24 px-6 text-center">
                {/* Headers */}
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 md:mt-12"
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.15em] text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {section.title}
                  </h1>
                  <p className="text-base md:text-lg font-light text-white/80 mt-2 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {section.subtitle}
                  </p>
                  {section.description && (
                    <p className="text-xs md:text-sm text-white/50 mt-2 tracking-wider">
                      {section.description}
                    </p>
                  )}
                </motion.div>

                {/* Call to Actions & Video Control Buttons */}
                <div className="w-full max-w-md flex flex-col items-center gap-6">
                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-4"
                  >
                    <button
                      onClick={() => setVideoMuted(!videoMuted)}
                      className={`btn-glow w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${
                        videoMuted 
                          ? 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10' 
                          : 'bg-[#1a55cc] text-white hover:bg-[#1a55cc]/90 shadow-lg shadow-[#1a55cc]/20'
                      }`}
                    >
                      {videoMuted ? (
                        <>
                          <VolumeX className="h-4 w-4" />
                          <span>UNMUTE AUDIO</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4" />
                          <span>MUTE AUDIO</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          // Unmute audio when opening full screen so they hear the voice
                          setVideoMuted(false);
                          videoRef.current.requestFullscreen().catch((err) => {
                            console.error("Error attempting to enable full-screen mode:", err);
                          });
                        }
                      }}
                      className="btn-glow w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-lg shadow-white/5"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span>FULL VIEW</span>
                    </button>

                    {section.secondaryBtn && (
                      <button
                        onClick={section.secondaryAction}
                        className={`w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                          section.secondaryBtnClass
                        }`}
                      >
                        {section.secondaryBtn}
                      </button>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ) : section.type === 'footer' ? (
            <div className="relative lg:absolute lg:inset-0 w-full bg-[#050505] text-white flex items-center justify-center py-12 lg:py-0">
              <Footer setActivePage={setActivePage} />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={(section as any).image}
                  alt={section.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
              </div>

              {/* Section Content */}
              <div className="relative z-10 h-full flex flex-col justify-between items-center py-24 px-6 text-center">
                {/* Headers */}
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 md:mt-12"
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.15em] text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {section.title}
                  </h1>
                  <p className="text-base md:text-lg font-light text-white/80 mt-2 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {section.subtitle}
                  </p>
                  {section.description && (
                    <p className="text-xs md:text-sm text-white/50 mt-1 tracking-wider">
                      {section.description}
                    </p>
                  )}
                </motion.div>

                {/* Call to Actions & Scroll Indicator */}
                <div className="w-full max-w-md flex flex-col items-center gap-6">
                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-4"
                  >
                    <button
                      onClick={section.primaryAction}
                      className={`btn-glow w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                        section.primaryBtnClass
                      }`}
                    >
                      {section.primaryBtn}
                    </button>
                    {section.secondaryBtn && (
                      <button
                        onClick={section.secondaryAction}
                        className={`w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                          section.secondaryBtnClass
                        }`}
                      >
                        {section.secondaryBtn}
                      </button>
                    )}
                  </motion.div>

                  {/* Scroll Hint (Only in first section) */}
                  {index === 0 && (
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-white/60 hover:text-white cursor-pointer mt-4"
                      onClick={() => {
                        const nextSection = document.querySelectorAll('section')[1];
                        nextSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <ChevronDown className="h-8 w-8" />
                    </motion.div>
                  )}
                </div>
              </div>
            </>
          )}

        </section>
      ))}
    </div>
  );
};
