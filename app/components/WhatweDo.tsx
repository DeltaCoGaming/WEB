'use client';

import React, { useState, useEffect } from 'react';
import { Server, Users, Hammer, Gamepad2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="bg-black text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.h2 
          className="text-6xl md:text-7xl font-bold text-center mb-16 text-[#d6c8a6] relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          What We Do
        </motion.h2>
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {items.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d6c8a6] relative group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-8 relative z-10">
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <item.icon className="w-12 h-12 text-[#d6c8a6] mr-4" />
                  <h3 className="text-3xl font-bold text-[#d6c8a6]">{item.title}</h3>
                </motion.div>
                <p className="text-white text-xl mb-6">{item.description}</p>
                <motion.button
                  className="flex items-center text-[#d6c8a6] hover:text-white transition-colors duration-300"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ChevronRight className="w-6 h-6 ml-2" />
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
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhatWeDo;