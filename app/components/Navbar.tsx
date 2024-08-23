"use client";
import React, { useState } from "react";
import {
  Gamepad2,
  Menu,
  X,
  Bell,
  Play,
  Github,
  Globe,
  Users,
  Shield,
  Store,
  LogIn,
  Swords,
  Skull,
  Blocks,
  MoreHorizontal,
  MessageSquare,
  Calendar,
  Trophy,
  Users2,
  Activity,
  FileText,
  Lock,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const menuItems = [
  {
    title: "Games",
    icon: Swords,
    items: [
      { name: "Arma 3", icon: Globe, href: "/delta/games/arma3" },
      { name: "Project Zomboid", icon: Skull, href: "/delta/games/pz" },
      { name: "Minecraft", icon: Blocks, href: "/minecraft" },
      { name: "More ...", icon: MoreHorizontal, href: "/delta/more" },
    ],
  },
  {
    title: "Community",
    icon: Users,
    items: [
      { name: "Forums", icon: MessageSquare, href: "/forums" },
      { name: "Events", icon: Calendar, href: "/delta/morepages/events" },
      { name: "Leaderboards", icon: Trophy, href: "/leaderboards" },
      { name: "Partners", icon: Users2, href: "/delta/partners" },
    ],
  },
  {
    title: "Other",
    icon: MoreHorizontal,
    items: [
      { name: "Status", icon: Activity, href: "/delta/status" },
      { name: "Terms of Service", icon: FileText, href: "/delta/tos" },
      { name: "Privacy Policy", icon: Lock, href: "/delta/privacy" },
      { name: "More", icon: Info, href: "/delta/more" },
    ],
  },
  {
    title: "Store",
    icon: Store,
    items: [{ name: "Login", icon: LogIn, href: "/login" }],
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        y: { stiffness: 1000 },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  const listVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 50,
    },
    open: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <nav className="bg-transparent py-4 px-6 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-[#d6c8a6]" />
          <span className="text-2xl font-bold text-[#d6c8a6]">DELTA CO</span>
          <span className="text-sm text-white bg-gray-700 px-2 py-1 rounded">
            v1.0.0
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems.map((item, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger className="text-white hover:text-[#d6c8a6] transition-colors duration-200 bg-transparent focus:outline-none flex items-center space-x-1">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2c2c2c] border-[#3a3a3a]">
                {item.items.map((subItem, subIndex) => (
                  <a href={subItem.href} key={subIndex}>
                    <DropdownMenuItem className="text-white hover:text-[#d6c8a6] hover:bg-[#3a3a3a] cursor-pointer flex items-center space-x-2">
                      <subItem.icon className="h-4 w-4" />
                      <span>{subItem.name}</span>
                    </DropdownMenuItem>
                  </a>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {/* Notification Bell */}
          <button className="text-white hover:text-[#d6c8a6] transition-colors duration-200">
            <Bell className="h-6 w-6" />
          </button>

          {/* GitHub Icon */}
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#d6c8a6] transition-colors duration-200"
          >
            <Github className="h-6 w-6" />
          </a>

          {/* Play Now Button */}
          <a
            href="https://your-external-game-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d6c8a6] text-black px-4 py-2 rounded-full hover:bg-[#c0b494] transition-colors duration-200 flex items-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Play Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#2c2c2c] z-50 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-[#3a3a3a]">
                <a href="/" className="flex items-center space-x-2">
                  <Gamepad2 className="h-8 w-8 text-[#d6c8a6]" />
                  <span className="text-2xl font-bold text-[#d6c8a6]">
                    DELTA CO
                  </span>
                  <span className="text-sm text-white bg-gray-700 px-2 py-1 rounded">
                    v1.0.0
                  </span>
                </a>
                <motion.button
                  onClick={toggleMobileMenu}
                  className="text-white focus:outline-none"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <motion.div variants={listVariants} className="flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  {menuItems.map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="text-white hover:text-[#d6c8a6] transition-colors duration-200 px-4 py-2 flex items-center space-x-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            {item.items.map((subItem, subIndex) => (
                              <a href={subItem.href} key={subIndex}>
                                <motion.li
                                  variants={itemVariants}
                                  className="text-white hover:text-[#d6c8a6] hover:bg-[#3a3a3a] cursor-pointer py-2 px-6 flex items-center space-x-2"
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.name}</span>
                                </motion.li>
                              </a>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
              <div className="p-4 border-t border-[#3a3a3a] flex justify-between items-center">
                <button className="text-white hover:text-[#d6c8a6] transition-colors duration-200">
                  <Bell className="h-6 w-6" />
                </button>
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#d6c8a6] transition-colors duration-200"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://your-external-game-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#d6c8a6] text-black px-4 py-2 rounded-full hover:bg-[#c0b494] transition-colors duration-200 flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Play Now</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
