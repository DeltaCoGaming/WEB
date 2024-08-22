'use client'

import React from "react"
import { Facebook, Twitter, Instagram, Youtube, Gamepad2, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="mt-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="border-t-2 border-[#d6c8a6] rounded-t-3xl pt-12 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div className="space-y-4 relative">
              <motion.h3 
                className="text-3xl font-bold text-[#d6c8a6] inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                DELTA CO <Gamepad2 className="ml-2 h-6 w-6" />
              </motion.h3>
              <p className="text-sm text-[#a09274]">
                Empowering gamers with top-tier hosting and innovative mods since 2023.
              </p>
              <motion.div 
                className="absolute -top-6 -left-6 w-24 h-24 bg-[#d6c8a6] rounded-full opacity-10"
                animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#d6c8a6] mb-4 flex items-center">
                <Zap className="mr-2 h-5 w-5" /> Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-[#a09274]">
                {["Home", "About Us", "Services", "Contact"].map((item, index) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <a href="#" className="hover:text-[#f0e6ce] transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#d6c8a6] mb-4 flex items-center">
                <Sparkles className="mr-2 h-5 w-5" /> Services
              </h4>
              <ul className="space-y-2 text-sm text-[#a09274]">
                {["Game Hosting", "Custom Mods", "Partnerships", "Community Events"].map((item, index) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <a href="#" className="hover:text-[#f0e6ce] transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#d6c8a6] mb-4">Connect</h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-[#a09274] hover:text-[#f0e6ce] transition-colors"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="w-full bg-[#d6c8a6] text-black hover:bg-[#f0e6ce]">
                  Join Our Community
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="mt-12 pt-8 border-t border-[#d6c8a6] text-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-xs text-[#a09274]">
              © 2024 DELTA CO. All rights reserved.
            </p>
            <motion.div 
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-16 h-16"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gamepad2 className="w-full h-full text-[#d6c8a6] opacity-20" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] pointer-events-none" />
    </footer>
  )
}

export default Footer