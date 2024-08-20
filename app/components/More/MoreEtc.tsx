// app/components/More/MoreEtc.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText, Map, Clock, Book, Github } from 'lucide-react';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const links = [
  { title: 'Roadmap', description: 'See our future plans and upcoming features', icon: <Map className="w-6 h-6" />, href: '/delta/morepages/roadmap' },
  { title: 'Changelog', description: 'Track our latest updates and improvements', icon: <Clock className="w-6 h-6" />, href: '/changelog' },
  { title: 'Documentation', description: 'Comprehensive guides and API references', icon: <Book className="w-6 h-6" />, href: '/docs' },
  { title: 'GitHub', description: 'Check out our open-source projects', icon: <Github className="w-6 h-6" />, href: 'https://github.com/deltaco' },
  { title: 'Terms of Service', description: 'Read our terms and conditions', icon: <FileText className="w-6 h-6" />, href: '/terms' },
  { title: 'Privacy Policy', description: 'Learn about our data practices', icon: <FileText className="w-6 h-6" />, href: '/privacy' },
];

const MorePage = () => {
  return (
    <div className="bg-black text-white min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          More Resources
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {links.map((link, index) => (
            <motion.div key={index} variants={item}>
              <Link href={link.href} passHref>
                <Card className="bg-[#1a1a1a] border-[#d6c8a6] hover:border-[#f0e6ce] transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#d6c8a6] flex items-center">
                      {link.icon}
                      <span className="ml-2">{link.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#a09274]">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="my-16 bg-[#d6c8a6]" />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[#d6c8a6] mb-4">Need More Help?</h2>
          <p className="text-[#a09274] mb-8">Our community is always here to assist you. Join our Discord server for real-time support and discussions.</p>
          <Button variant="outline" className="text-[#d6c8a6] border-[#d6c8a6] hover:bg-[#d6c8a6] hover:text-black">
            <ExternalLink className="mr-2 h-4 w-4" />
            Join Our Discord
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MorePage;