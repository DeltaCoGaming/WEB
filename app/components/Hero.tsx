/* eslint-disable react/no-unescaped-entities */

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, Users, Server, Globe, Gamepad, Twitch, Github, Disc2, Youtube } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Image from 'next/image';

const HeroCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-16 px-4 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-4 text-[#d6c8a6]">
            Delta Co Gaming
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white">Tactical. Intense. Unforgettable.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
          <FeatureCard 
            icon={Gamepad} 
            title="Epic Gameplay" 
            description="Experience unmatched tactical action across multiple platforms."
          />
          <FeatureCard 
            icon={Users} 
            title="Thriving Community" 
            description="Join a passionate group of gamers from around the world."
          />
          <FeatureCard 
            icon={Server} 
            title="24/7 Dedicated Servers" 
            description="Enjoy seamless gameplay on our high-performance servers."
          />
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[#d6c8a6] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-12 text-black flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Join the Elite</h2>
              <p className="text-base md:text-lg mb-6 md:mb-8">
                Dive into intense tactical gameplay, innovative custom modes, and a community that values skill and teamwork. Whether you're a veteran or a rookie, there's a place for you in Delta Co.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <FeatureItem icon={Globe} text="Connect with players worldwide" />
                <FeatureItem icon={Monitor} text="Custom game modes and mods" />
                <FeatureItem icon={Users} text="Regular events and tournaments" />
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-black text-white font-bold py-3 px-6 rounded-full text-base transition duration-300 flex items-center justify-center mb-10"
              >
                Join Our Discord
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
              <div className="flex justify-center space-x-4 mt-6">
                <SocialIcon icon={Twitch} handle="@DeltaCoGaming" color="#1DA1F2" />
                <SocialIcon icon={Github} handle="@deltacoofficial" color="#E1306C" />
                <SocialIcon icon={Disc2} handle="DeltaCoGaming" color="#4267B2" />
              </div>
            </div>
            <div className="relative h-64 md:h-auto md:w-1/2">
              <Image 
                src="/Your paragraph text logo.png" 
                alt="Delta Co Gaming Action" 
                layout="fill" 
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#d6c8a6]">Featured Games</h3>
                  <p className="text-sm md:text-base text-white">Arma 3, Project Zomboid, DayZ, Ready or Not, and more!</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <motion.div 
        whileHover={{ scale: 1.05 }}
        className="bg-[#d6c8a6] p-6 md:p-8 rounded-2xl shadow-lg text-black"
    >
        <Icon className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-black" />
        <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm md:text-base">{description}</p>
    </motion.div>
);

const FeatureItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <div className="flex items-center text-black">
        <Icon className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
        <span className="text-base md:text-lg">{text}</span>
    </div>
);

const SocialIcon = ({ icon: Icon, handle, color }: { icon: any, handle: string, color: string }) => (
  <HoverCard>
    <HoverCardTrigger>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex flex-col items-center text-black cursor-pointer"
      >
        <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1" />
        <span className="text-xs">{handle}</span>
      </motion.div>
    </HoverCardTrigger>
    <HoverCardContent className="w-60" style={{ backgroundColor: color, color: 'white' }}>
      <div className="flex justify-between space-x-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{handle}</h4>
          <p className="text-sm">
            Follow us on {Icon.name} for the latest updates, events, and community highlights!
          </p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default HeroCard;
