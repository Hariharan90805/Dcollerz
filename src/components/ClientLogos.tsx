import React from 'react';
import { motion } from 'motion/react';
import { Store, Building2, Coffee, Building, GraduationCap, Utensils, Hotel, Car } from 'lucide-react';

export const ClientLogos: React.FC = () => {
  const clients = [
    { name: 'Elite Real Estate', icon: Building2 },
    { name: 'City Hospital', icon: Building },
    { name: 'Sri Krishna Sweets', icon: Coffee },
    { name: 'Global Academy', icon: GraduationCap },
    { name: 'Bistro 29', icon: Utensils },
    { name: 'Hosur Grand Hotel', icon: Hotel },
    { name: 'Prime Motors', icon: Car },
    { name: 'Retail Mart', icon: Store },
  ];

  // Duplicate for infinite scroll effect
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 bg-neutral-950 border-b border-neutral-800 overflow-hidden relative" id="client-logos">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-500">
          Trusted by growing businesses across Krishnagiri & Tamil Nadu
        </p>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30
          }}
          className="flex items-center gap-16 px-8"
        >
          {marqueeItems.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div key={idx} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Icon className="w-6 h-6 text-neutral-400" />
                <span className="text-sm font-bold text-neutral-400 uppercase tracking-wide">
                  {client.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
