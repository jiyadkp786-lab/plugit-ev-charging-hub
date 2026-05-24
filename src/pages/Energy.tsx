import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Battery, Home as HomeIcon, Info } from 'lucide-react';

// Import images
import solarRoofImg from '../assets/images/solar-roof.png';
import powerwallImg from '../assets/images/powerwall.png';

interface EnergyProps {
  setActivePage: (page: string) => void;
}

export const Energy: React.FC<EnergyProps> = () => {
  // Simulator States
  const [sunIntensity, setSunIntensity] = useState(8.5); // kW solar production
  const [homeDemand, setHomeDemand] = useState(4.2); // kW home consumption
  const [batteryStateOfCharge, setBatteryStateOfCharge] = useState(72); // % battery charge
  const [gridInteraction, setGridInteraction] = useState(0); // kW from/to grid
  const [batteryFlow, setBatteryFlow] = useState(0); // kW battery flow (+ is charging, - is discharging)

  // Calculate energy flows whenever inputs change
  useEffect(() => {
    const netFlow = sunIntensity - homeDemand;
    let battFlow = 0;
    let gridFlow = 0;

    if (netFlow > 0) {
      // Surplus energy
      if (batteryStateOfCharge >= 100) {
        // Battery full, feed back to grid
        battFlow = 0;
        gridFlow = -netFlow; // negative grid flow means exporting
      } else {
        // Charge battery (max charge rate 5 kW)
        battFlow = Math.min(netFlow, 5);
        gridFlow = -(netFlow - battFlow);
      }
    } else {
      // Deficit energy
      const deficit = Math.abs(netFlow);
      if (batteryStateOfCharge <= 5) {
        // Battery empty, import from grid
        battFlow = 0;
        gridFlow = deficit;
      } else {
        // Discharge battery (max discharge rate 5 kW)
        battFlow = -Math.min(deficit, 5);
        gridFlow = deficit + battFlow; // remainder from grid
      }
    }

    setBatteryFlow(parseFloat(battFlow.toFixed(1)));
    setGridInteraction(parseFloat(gridFlow.toFixed(1)));
  }, [sunIntensity, homeDemand, batteryStateOfCharge]);

  // Simulate charging/discharging battery over time
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryStateOfCharge((prev) => {
        // 1 kW-hr flow changes SOC by around 0.1% every second in our fast-forward simulation
        const change = batteryFlow * 0.08;
        const nextSOC = prev + change;
        return Math.max(0, Math.min(100, parseFloat(nextSOC.toFixed(2))));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [batteryFlow]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6">
      {/* Energy Hero Intro */}
      <div className="max-w-7xl mx-auto text-center mt-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.25em] text-white/50 uppercase font-semibold">
            Clean Tech Infrastructure
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.1em] uppercase text-white mt-2">
            PLUG IT ENERGY
          </h1>
          <p className="max-w-xl mx-auto text-sm text-white/60 tracking-wider font-light mt-4">
            Power everything with clean, renewable energy. Generate solar power on your roof and store it with Powerwall for constant backup.
          </p>
        </motion.div>
      </div>

      {/* Interactive Simulator Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
        {/* Left Card: Simulator Controls */}
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Live Grid Simulator
              </h2>
            </div>

            {/* Slider 1: Solar Generation */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs tracking-wider">
                <span className="text-white/60 flex items-center gap-1">
                  <Sun className="h-4 w-4 text-amber-400" /> SOLAR GENERATION
                </span>
                <span className="font-semibold text-white">{sunIntensity} kW</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={sunIntensity}
                onChange={(e) => setSunIntensity(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[10px] text-white/40">Adjust the sun intensity to change solar generation.</span>
            </div>

            {/* Slider 2: Home Load */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs tracking-wider">
                <span className="text-white/60 flex items-center gap-1">
                  <HomeIcon className="h-4 w-4 text-sky-400" /> HOME ELECTRICAL LOAD
                </span>
                <span className="font-semibold text-white">{homeDemand} kW</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={homeDemand}
                onChange={(e) => setHomeDemand(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[10px] text-white/40">Change home electricity demand (appliances, heating).</span>
            </div>

            {/* Slider 3: Battery Charge Override */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs tracking-wider">
                <span className="text-white/60 flex items-center gap-1">
                  <Battery className="h-4 w-4 text-emerald-400" /> BATTERY STORAGE
                </span>
                <span className="font-semibold text-white">{Math.round(batteryStateOfCharge)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={batteryStateOfCharge}
                onChange={(e) => setBatteryStateOfCharge(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[10px] text-white/40">Manually override Powerwall charge state of charge.</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mt-6 text-xs text-white/40 flex gap-2">
            <Info className="h-4 w-4 flex-shrink-0" />
            <p>
              Powerwall dynamically balances energy. Surplus solar charges the battery first; once full, energy exports to the grid.
            </p>
          </div>
        </div>

        {/* Center Card: Live Animation Canvas */}
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center shadow-xl relative min-h-[350px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_75%)]" />

          {/* Interactive SVG Nodes & Flows */}
          <svg className="w-full h-full max-w-[340px] max-h-[340px] z-10 overflow-visible" viewBox="0 0 200 200">
            {/* Define Gradients & Markers */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting lines with dynamic animations */}
            {/* 1. Solar to Center */}
            <path d="M 100,25 L 100,100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            {sunIntensity > 0 && (
              <line
                x1="100" y1="25" x2="100" y2="100"
                stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6, 6"
                style={{ strokeDashoffset: -20, animation: 'flow 1s linear infinite' }}
              />
            )}

            {/* 2. Center to Home */}
            <path d="M 100,100 L 160,150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            {homeDemand > 0 && (
              <line
                x1="100" y1="100" x2="160" y2="150"
                stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6, 6"
                style={{ strokeDashoffset: -20, animation: 'flow 1.2s linear infinite' }}
              />
            )}

            {/* 3. Center to Battery */}
            <path d="M 100,100 L 40,150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            {batteryFlow !== 0 && (
              <line
                x1={batteryFlow > 0 ? '100' : '40'}
                y1={batteryFlow > 0 ? '100' : '150'}
                x2={batteryFlow > 0 ? '40' : '100'}
                y2={batteryFlow > 0 ? '150' : '100'}
                stroke="#34d399" strokeWidth="2.5" strokeDasharray="6, 6"
                style={{ strokeDashoffset: -20, animation: 'flow 0.8s linear infinite' }}
              />
            )}

            {/* 4. Center to Grid */}
            <path d="M 100,100 L 100,100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            {gridInteraction !== 0 && (
              <line
                x1={gridInteraction < 0 ? '100' : '100'}
                y1={gridInteraction < 0 ? '100' : '100'}
                x2={gridInteraction < 0 ? '100' : '100'}
                y2={gridInteraction < 0 ? '100' : '100'}
                stroke="#ffffff" strokeWidth="2"
              />
            )}

            {/* Dynamic particles flow css style */}
            <style>{`
              @keyframes flow {
                to {
                  stroke-dashoffset: -12;
                }
              }
            `}</style>

            {/* Central Junction */}
            <circle cx="100" cy="100" r="10" fill="#121212" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <circle cx="100" cy="100" r="4" fill="#ffffff" className="animate-pulse" />

            {/* Node 1: Solar (Top) */}
            <g transform="translate(100,25)">
              <circle cx="0" cy="0" r="22" fill="#181818" stroke={sunIntensity > 0 ? '#fbbf24' : 'rgba(255,255,255,0.1)'} strokeWidth="2" filter={sunIntensity > 0 ? 'url(#glow)' : ''} />
              <Sun className={`h-6 w-6 -translate-x-3 -translate-y-3 ${sunIntensity > 0 ? 'text-amber-400' : 'text-white/20'}`} />
            </g>

            {/* Node 2: Home (Bottom Right) */}
            <g transform="translate(160,150)">
              <circle cx="0" cy="0" r="22" fill="#181818" stroke="#38bdf8" strokeWidth="2" filter="url(#glow)" />
              <HomeIcon className="h-6 w-6 -translate-x-3 -translate-y-3 text-sky-400" />
            </g>

            {/* Node 3: Battery (Bottom Left) */}
            <g transform="translate(40,150)">
              <circle cx="0" cy="0" r="22" fill="#181818" stroke={batteryFlow > 0 ? '#34d399' : batteryFlow < 0 ? '#10b981' : 'rgba(255,255,255,0.1)'} strokeWidth="2" filter={batteryFlow !== 0 ? 'url(#glow)' : ''} />
              <Battery className={`h-6 w-6 -translate-x-3 -translate-y-3 ${batteryFlow > 0 ? 'text-emerald-400 animate-pulse' : batteryFlow < 0 ? 'text-teal-400' : 'text-white/40'}`} />
            </g>
          </svg>
        </div>

        {/* Right Card: Live Flow Data Readings */}
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 font-semibold">
              Power Grid Telemetry
            </h2>
            <div className="flex flex-col gap-4">
              {/* Reading 1: Solar */}
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-sm text-white/60">Solar Production</span>
                <span className="text-lg font-bold text-amber-400">+{sunIntensity} kW</span>
              </div>

              {/* Reading 2: Home usage */}
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-sm text-white/60">Home Load</span>
                <span className="text-lg font-bold text-sky-400">-{homeDemand} kW</span>
              </div>

              {/* Reading 3: Battery charging/discharging */}
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-sm text-white/60">Powerwall Status</span>
                <span className={`text-lg font-bold ${batteryFlow > 0 ? 'text-emerald-400' : batteryFlow < 0 ? 'text-teal-400' : 'text-white/40'}`}>
                  {batteryFlow > 0 ? `Charging (+${batteryFlow} kW)` : batteryFlow < 0 ? `Discharging (${batteryFlow} kW)` : 'Standby (0 kW)'}
                </span>
              </div>

              {/* Reading 4: Grid Export/Import */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-white/60">Public Grid Feedback</span>
                <span className={`text-lg font-bold ${gridInteraction > 0 ? 'text-rose-400' : gridInteraction < 0 ? 'text-emerald-400' : 'text-white/40'}`}>
                  {gridInteraction > 0 ? `Importing (+${gridInteraction} kW)` : gridInteraction < 0 ? `Exporting (${gridInteraction} kW)` : 'Balanced (0 kW)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-white/50">
              <span>Powerwall Battery Pack</span>
              <span>13.5 kWh capacity</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  batteryStateOfCharge < 20 ? 'bg-rose-500' : batteryFlow > 0 ? 'bg-emerald-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${batteryStateOfCharge}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Solar & Powerwall details */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/5">
        {/* Solar Roof Card */}
        <div className="flex flex-col gap-6">
          <div className="h-[240px] rounded-xl overflow-hidden border border-white/5 shadow-lg">
            <img src={solarRoofImg} alt="Solar Roof" className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Solar Roof & Panels</h2>
            <p className="text-sm text-white/60 font-light mt-3 leading-relaxed">
              Design a clean, beautiful energy source that blends beautifully with your roof tiles. With standard solar panels or custom solar tiles, generate maximum energy output during all seasons, even at low solar angles.
            </p>
          </div>
        </div>

        {/* Powerwall Card */}
        <div className="flex flex-col gap-6">
          <div className="h-[240px] rounded-xl overflow-hidden border border-white/5 shadow-lg">
            <img src={powerwallImg} alt="Powerwall" className="w-full h-full object-cover opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Powerwall Home Battery</h2>
            <p className="text-sm text-white/60 font-light mt-3 leading-relaxed">
              Powerwall is an integrated battery system that stores your solar energy for backup protection. During grid outages, Powerwall detects the outage automatically and takes over, providing power for days to keep your appliances running.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
