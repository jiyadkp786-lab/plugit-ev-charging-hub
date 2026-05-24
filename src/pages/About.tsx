import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, Shield, Eye } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { label: 'Gigawatt Hours Deployed', value: '45.2+', icon: Globe },
    { label: 'Countries Covered', value: '82', icon: Award },
    { label: 'Vehicles Sold Worldwide', value: '1.2M+', icon: Shield },
    { label: 'Carbon Emissions Offset', value: '8.4M Tons', icon: Eye },
  ];

  const milestones = [
    {
      year: '2018',
      title: 'FOUNDATION',
      subtitle: 'The Sustainable Spark',
      desc: 'Plug It was formed by engineers dedicated to building a zero-emissions ecosystem. The first designs of modular vehicle chassis and high-density cell architecture are born.',
    },
    {
      year: '2020',
      title: 'BATTERY BREAKTHROUGH',
      subtitle: 'Grid Autonomy and Storage',
      desc: 'Released the first-generation home storage solutions. Enabling homeowners to store solar excess and provide complete backup power during grid failures.',
    },
    {
      year: '2022',
      title: 'MODELING THE FUTURE',
      subtitle: 'Sedan and SUV Deployments',
      desc: 'Launched the Model 3 and Model Y, bringing hyper-performance and minimalist high-fidelity luxury vehicles to the global consumer market.',
    },
    {
      year: '2024',
      title: 'CYBER AGE',
      subtitle: 'Uncompromising Exoskeleton Utility',
      desc: 'Introduced Cybertruck: a stainless-steel geometric pickup with massive payload capacities, off-grid output options, and bullet-resistant steel armor.',
    },
    {
      year: '2026',
      title: 'COMPLETE HARMONY',
      subtitle: 'Autonomous Micro-grids & Autopilot v4',
      desc: 'Integrating humanoid industrial manufacturing, virtual power plant grids, and full autonomous driving features to realize the sustainable transport ecosystem.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6">
      {/* Immersive Header */}
      <div className="max-w-4xl mx-auto text-center mt-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.25em] text-white/50 uppercase font-semibold">
            Our Mission & Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.1em] uppercase text-white mt-2">
            Accelerating Autonomy
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-white/60 tracking-wider font-light mt-4 leading-relaxed">
            PLUG IT is not just an automotive company. We are a hardware, software, and energy conglomerate aiming to transition the world to complete clean energy grid independence and zero-emission transportation.
          </p>
        </motion.div>
      </div>

      {/* Futuristic Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center shadow-md hover:border-white/20 transition-all duration-300 group"
            >
              <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs text-white/40 tracking-wider uppercase mt-2 font-medium">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-xs tracking-[0.25em] text-white/40 uppercase mb-16 font-semibold">
          Ecosystem Milestones
        </h2>

        {/* Roadmap Timeline */}
        <div className="relative border-l border-white/10 pl-6 md:pl-12 ml-4 md:ml-20 flex flex-col gap-12">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline indicator node */}
              <div className="absolute -left-[32px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-white/20 group-hover:border-white transition-all duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300" />
              </div>

              {/* Date badge */}
              <div className="md:absolute md:-left-[150px] md:top-0 md:text-right md:w-24 mb-2 md:mb-0">
                <span className="text-sm font-extrabold tracking-widest text-white/30 group-hover:text-white transition-colors duration-300">
                  {milestone.year}
                </span>
              </div>

              {/* Timeline Info Card */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/15 transition-all duration-300 hover:shadow-lg">
                <span className="text-xs font-bold tracking-widest text-white/50">
                  {milestone.subtitle}
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-wider text-white mt-1 uppercase">
                  {milestone.title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 font-light mt-3 leading-relaxed">
                  {milestone.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
