'use client';


import React, { useState } from 'react';
import { Server, Users, Hammer, Gamepad2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    icon: Server,
    title: "Game Hosting",
    description: "We provide top-tier server infrastructure for seamless gaming experiences across various titles.",
    details: "Our dedicated servers ensure low latency, high uptime, and robust security for all your favorite games.",
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "We forge alliances with gaming communities and developers to create unique experiences.",
    details: "From exclusive events to custom content, our partnerships bring fresh excitement to your gaming sessions.",
  },
  {
    icon: Hammer,
    title: "Custom Mods",
    description: "Our team develops bespoke mods that enhance and extend your favorite games.",
    details: "Whether it's new maps for Arma 3 or game-changing mechanics for Minecraft, we've got you covered.",
  },
  {
    icon: Gamepad2,
    title: "Popular Games",
    description: "We stay on top of trending games, ensuring our community always has something new to explore.",
    details: "From battle royales to MMORPGs, we support a wide range of popular titles and emerging gems.",
  },
];

const WhatWeDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-[#d6c8a6]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <item.icon className="w-10 h-10 text-[#d6c8a6] mr-4" />
                  <h3 className="text-2xl font-bold text-[#d6c8a6]">{item.title}</h3>
                </div>
                <p className="text-white text-lg mb-6">{item.description}</p>
                <motion.button
                  className="flex items-center text-[#d6c8a6] hover:text-white transition-colors duration-300"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#2a2a2a] p-8"
                  >
                    <p className="text-white text-lg">{item.details}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;