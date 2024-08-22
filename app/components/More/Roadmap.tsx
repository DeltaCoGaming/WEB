'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
  date: string;
  category: string;
};

const statusConfig = {
  'planned': { icon: <Circle className="w-4 h-4" />, color: 'text-blue-400' },
  'in-progress': { icon: <Clock className="w-4 h-4" />, color: 'text-yellow-400' },
  'completed': { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-400' }
};

const Roadmap = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapItem[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_ROADMAP_URL;

    if (!apiUrl) {
      console.error("The ROADMAP_URL environment variable is not defined.");
      return;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch roadmap data.");
        }
        return response.json();
      })
      .then((data) => setRoadmapData(data))
      .catch((error) => console.error("Error fetching roadmap data:", error));
  }, []);

  const categories = ['All', ...Array.from(new Set(roadmapData.map(item => item.category)))];

  const filteredData = roadmapData.filter(item => 
    filter === 'all' || item.category.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="bg-black text-white min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Delta CO Roadmap
        </motion.h1>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-[#1a1a1a] border-[#d6c8a6]">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category.toLowerCase()}
                onClick={() => setFilter(category.toLowerCase())}
                className="text-[#d6c8a6] data-[state=active]:bg-[#d6c8a6] data-[state=active]:text-black"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[#1a1a1a] border-[#d6c8a6] hover:border-[#f0e6ce] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#d6c8a6] flex items-center justify-between">
                      <span>{item.title}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className={`${statusConfig[item.status].color} flex items-center`}>
                              {statusConfig[item.status].icon}
                              <span className="ml-1 capitalize">{item.status}</span>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current status: {item.status}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#a09274] mb-4">{item.description}</p>
                    <div className="flex items-center text-[#d6c8a6]">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Separator className="my-16 bg-[#d6c8a6]" />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[#d6c8a6] mb-4">Stay Updated</h2>
          <p className="text-[#a09274] mb-8">Want to know when these features go live? Join our mailing list for the latest updates.</p>
          <Button variant="outline" className="text-[#d6c8a6] border-[#d6c8a6] hover:bg-[#d6c8a6] hover:text-black">
            <AlertCircle className="mr-2 h-4 w-4" />
            Subscribe to Updates
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;
