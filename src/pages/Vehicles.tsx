import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check } from 'lucide-react';

// Import images
import modelSImg from '../assets/images/model-s.png';
import model3Img from '../assets/images/model-3.png';
import modelYImg from '../assets/images/model-y.png';
import cybertruckImg from '../assets/images/cybertruck.png';

interface VehiclesProps {
  addToCart: (item: { id: string; name: string; price: number; image: string; details: string }) => void;
  setActivePage: (page: string) => void;
}

export const Vehicles: React.FC<VehiclesProps> = ({ addToCart }) => {
  const vehicles = [
    {
      id: 'model-s',
      name: 'Model S Plaid',
      basePrice: 89990,
      image: modelSImg,
      specs: {
        range: '359 mi',
        acceleration: '1.99 s',
        topSpeed: '200 mph',
        peakPower: '1,020 hp',
      },
      paints: [
        { name: 'Pearl White Multi-Coat', hex: '#f0f0f0', filter: 'brightness(1.1) contrast(1.0)', price: 0 },
        { name: 'Solid Black', hex: '#111111', filter: 'brightness(0.35) contrast(1.15) grayscale(1)', price: 1500 },
        { name: 'Ultra Red', hex: '#b71c1c', filter: 'hue-rotate(345deg) saturate(2.2) brightness(0.7) contrast(1.05)', price: 2500 },
        { name: 'Deep Blue Metallic', hex: '#0d47a1', filter: 'hue-rotate(195deg) saturate(2.0) brightness(0.7) contrast(1.05)', price: 1500 },
        { name: 'Stealth Grey', hex: '#546e7a', filter: 'hue-rotate(180deg) saturate(0.2) brightness(0.6) contrast(1.1)', price: 1000 },
      ],
      wheels: [
        { name: '21" Arachnid Wheels', price: 4500, type: 'Performance' },
        { name: '19" Tempest Wheels', price: 0, type: 'Standard' },
      ],
    },
    {
      id: 'model-3',
      name: 'Model 3 Performance',
      basePrice: 47490,
      image: model3Img,
      specs: {
        range: '296 mi',
        acceleration: '2.9 s',
        topSpeed: '163 mph',
        peakPower: '510 hp',
      },
      paints: [
        { name: 'Stealth Grey', hex: '#546e7a', filter: 'brightness(0.9) grayscale(0.5)', price: 0 },
        { name: 'Pearl White Multi-Coat', hex: '#f0f0f0', filter: 'brightness(1.2) saturate(0.2)', price: 1000 },
        { name: 'Solid Black', hex: '#111111', filter: 'brightness(0.4) contrast(1.1) grayscale(1)', price: 1500 },
        { name: 'Deep Blue Metallic', hex: '#0d47a1', filter: 'hue-rotate(190deg) saturate(1.8) brightness(0.8)', price: 1000 },
        { name: 'Ultra Red', hex: '#b71c1c', filter: 'hue-rotate(340deg) saturate(2.4) brightness(0.75)', price: 2000 },
      ],
      wheels: [
        { name: '20" Warp Wheels', price: 0, type: 'Performance' },
        { name: '19" Nova Wheels', price: 1500, type: 'Sport' },
      ],
    },
    {
      id: 'model-y',
      name: 'Model Y Performance',
      basePrice: 51490,
      image: modelYImg,
      specs: {
        range: '279 mi',
        acceleration: '3.5 s',
        topSpeed: '155 mph',
        peakPower: '456 hp',
      },
      paints: [
        { name: 'Pearl White Multi-Coat', hex: '#f0f0f0', filter: 'brightness(1.1) contrast(1.0)', price: 0 },
        { name: 'Solid Black', hex: '#111111', filter: 'brightness(0.35) contrast(1.15) grayscale(1)', price: 1500 },
        { name: 'Ultra Red', hex: '#b71c1c', filter: 'hue-rotate(345deg) saturate(2.2) brightness(0.7) contrast(1.05)', price: 2500 },
        { name: 'Deep Blue Metallic', hex: '#0d47a1', filter: 'hue-rotate(195deg) saturate(2.0) brightness(0.7) contrast(1.05)', price: 1500 },
        { name: 'Stealth Grey', hex: '#546e7a', filter: 'hue-rotate(180deg) saturate(0.2) brightness(0.6) contrast(1.1)', price: 1000 },
      ],
      wheels: [
        { name: '21" Überturbine Wheels', price: 0, type: 'Performance' },
        { name: '20" Induction Wheels', price: 2000, type: 'Sport' },
      ],
    },
    {
      id: 'cybertruck',
      name: 'Cybertruck Cyberbeast',
      basePrice: 99990,
      image: cybertruckImg,
      specs: {
        range: '320 mi',
        acceleration: '2.6 s',
        topSpeed: '130 mph',
        peakPower: '845 hp',
      },
      paints: [
        { name: 'Tactical Stainless Steel', hex: '#9e9e9e', filter: 'brightness(1.0)', price: 0 },
        { name: 'Satin Stealth Black Wrap', hex: '#212121', filter: 'brightness(0.35) contrast(1.1) grayscale(1)', price: 6500 },
        { name: 'Satin Ceramic White Wrap', hex: '#eceff1', filter: 'brightness(1.2) contrast(0.9) grayscale(0.5)', price: 6500 },
        { name: 'Satin Military Green Wrap', hex: '#4e5d4c', filter: 'hue-rotate(90deg) saturate(0.8) brightness(0.4)', price: 6500 },
        { name: 'Satin Crimson Red Wrap', hex: '#880e4f', filter: 'hue-rotate(330deg) saturate(1.8) brightness(0.5)', price: 6500 },
      ],
      wheels: [
        { name: '20" Cyber Wheels with Covers', price: 0, type: 'Tough-Terrain' },
        { name: '20" Core Wheels', price: -1000, type: 'Standard' },
      ],
    },
  ];

  // Active configurations
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentVehicle = vehicles[selectedIdx];
  const [selectedPaintIdx, setSelectedPaintIdx] = useState(0);
  const [selectedWheelIdx, setSelectedWheelIdx] = useState(0);
  const [fsdSelected, setFsdSelected] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const currentPaint = currentVehicle.paints[selectedPaintIdx] || currentVehicle.paints[0];
  const currentWheel = currentVehicle.wheels[selectedWheelIdx] || currentVehicle.wheels[0];

  const handleModelChange = (idx: number) => {
    setSelectedIdx(idx);
    setSelectedPaintIdx(0);
    setSelectedWheelIdx(0);
    setFsdSelected(false);
  };

  const totalPrice =
    currentVehicle.basePrice +
    currentPaint.price +
    currentWheel.price +
    (fsdSelected ? 8000 : 0);

  const handleOrder = () => {
    const details = `${currentPaint.name}, ${currentWheel.name}${
      fsdSelected ? ', Full Self-Driving Suite' : ''
    }`;
    addToCart({
      id: `${currentVehicle.id}-${selectedPaintIdx}-${selectedWheelIdx}-${fsdSelected}`,
      name: currentVehicle.name,
      price: totalPrice,
      image: currentVehicle.image,
      details,
    });
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start mt-6">
        {/* Left Column: Visualizer */}
        <div className="flex-1 w-full flex flex-col justify-center items-center lg:sticky lg:top-28">
          <div className="relative w-full h-[300px] md:h-[480px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white/2 to-transparent border border-white/5 shadow-2xl">
            {/* Visualizer Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.06),transparent_70%)]" />
            
            {/* Vehicle Rendering with dynamic filter tint */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentVehicle.id}-${selectedPaintIdx}`}
                src={currentVehicle.image}
                alt={currentVehicle.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-h-[85%] max-w-[90%] object-contain select-none z-10 transition-all duration-700"
                style={{ filter: currentPaint.filter }}
              />
            </AnimatePresence>

            {/* Glowing accents */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-white/20 blur-xl rounded-full opacity-60 z-0" />
          </div>

          {/* Dynamic Specs Bar */}
          <div className="w-full grid grid-cols-4 gap-4 mt-8 px-4 text-center">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                {currentVehicle.specs.range}
              </span>
              <span className="text-[10px] md:text-xs text-white/50 tracking-wider uppercase mt-1">
                Range (Est.)
              </span>
            </div>
            <div className="border-l border-white/10 flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                {currentVehicle.specs.acceleration}
              </span>
              <span className="text-[10px] md:text-xs text-white/50 tracking-wider uppercase mt-1">
                0-60 mph
              </span>
            </div>
            <div className="border-l border-white/10 flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                {currentVehicle.specs.topSpeed}
              </span>
              <span className="text-[10px] md:text-xs text-white/50 tracking-wider uppercase mt-1">
                Top Speed
              </span>
            </div>
            <div className="border-l border-white/10 flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1">
                {currentVehicle.specs.peakPower}
              </span>
              <span className="text-[10px] md:text-xs text-white/50 tracking-wider uppercase mt-1">
                Peak Power
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-8 bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl shadow-xl">
          {/* Model Switcher */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold">
              Select Model
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {vehicles.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => handleModelChange(idx)}
                  className={`py-3 px-2 rounded-xl border text-center transition-all duration-300 focus:outline-none cursor-pointer text-sm font-medium ${
                    selectedIdx === idx
                      ? 'border-white bg-white/5 text-white'
                      : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  {v.name.split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Paint Swatches */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
                Paint Color
              </h2>
              <span className="text-xs font-semibold text-white/80">
                {currentPaint.price === 0 ? 'Included' : `+$${currentPaint.price.toLocaleString()}`}
              </span>
            </div>
            <p className="text-sm font-light text-white/90 mb-4">{currentPaint.name}</p>
            <div className="flex gap-3">
              {currentVehicle.paints.map((paint, idx) => (
                <button
                  key={paint.name}
                  onClick={() => setSelectedPaintIdx(idx)}
                  className={`w-9 h-9 rounded-full border-2 relative flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
                    selectedPaintIdx === idx
                      ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'border-transparent hover:border-white/30'
                  }`}
                  style={{ backgroundColor: paint.hex }}
                  title={paint.name}
                >
                  {selectedPaintIdx === idx && (
                    <Check className={`h-4 w-4 ${paint.hex === '#f0f0f0' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Wheels Configuration */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
                Wheel Upgrades
              </h2>
              <span className="text-xs font-semibold text-white/80">
                {currentWheel.price === 0 ? 'Included' : `${currentWheel.price > 0 ? '+' : ''}$${currentWheel.price.toLocaleString()}`}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {currentVehicle.wheels.map((wheel, idx) => (
                <button
                  key={wheel.name}
                  onClick={() => setSelectedWheelIdx(idx)}
                  className={`flex justify-between items-center p-3 rounded-xl border text-left transition-all duration-300 focus:outline-none cursor-pointer text-sm font-medium ${
                    selectedWheelIdx === idx
                      ? 'border-white bg-white/5 text-white'
                      : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{wheel.name}</span>
                  <span className="text-xs text-white/40">{wheel.type}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Full Self-Driving Option */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Full Self-Driving
              </h2>
              <span className="text-xs font-semibold text-white/80">+$8,000</span>
            </div>
            <button
              onClick={() => setFsdSelected(!fsdSelected)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer focus:outline-none ${
                fsdSelected
                  ? 'border-white bg-white/5 text-white'
                  : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Autopilot Navigation & Automation</span>
                <span className="text-xs text-white/40">Includes Auto Lane Change & Autopark</span>
              </div>
              <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors duration-300 ${
                fsdSelected ? 'bg-white border-white' : 'border-white/20'
              }`}>
                {fsdSelected && <Check className="h-3.5 w-3.5 text-black" />}
              </div>
            </button>
          </div>

          {/* Total & Order */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <span className="text-white/60 text-sm font-light">Custom Price</span>
              <span className="text-3xl font-bold tracking-tight text-white">
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleOrder}
              className="btn-glow w-full py-4 rounded-xl text-sm font-semibold tracking-wider bg-white text-black hover:bg-white/95 active:scale-98 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] focus:outline-none cursor-pointer"
            >
              Order Customized {currentVehicle.name.split(' ')[0]}
            </button>

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs font-medium text-emerald-400 mt-2"
              >
                Added to order cart successfully!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
