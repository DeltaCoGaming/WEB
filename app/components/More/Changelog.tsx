"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Tag, AlertCircle, Bug, Zap, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the structure for a changelog item
type ChangelogItem = {
  id: string;
  version: string;
  date: string;
  changes: {
    type: "feature" | "improvement" | "bugfix";
    description: string;
  }[];
};

// Sample changelog data - easily modifiable
const changelogData: ChangelogItem[] = [
  {
    id: "1",
    version: "2.1.0",
    date: "2024-06-15",
    changes: [
      {
        type: "feature",
        description:
          "Introduced new Zeus Mission Editor with advanced AI integration.",
      },
      {
        type: "improvement",
        description: "Enhanced vehicle physics for more realistic handling.",
      },
      {
        type: "bugfix",
        description: "Fixed rare crash when loading large custom maps.",
      },
    ],
  },
  {
    id: "2",
    version: "2.0.5",
    date: "2024-05-01",
    changes: [
      {
        type: "improvement",
        description: "Optimized performance for large-scale battles.",
      },
      {
        type: "bugfix",
        description:
          "Resolved issue with incorrect weapon attachments on certain models.",
      },
    ],
  },
  {
    id: "3",
    version: "2.0.0",
    date: "2024-04-01",
    changes: [
      {
        type: "feature",
        description: "Launched Community Mod Integration system.",
      },
      {
        type: "feature",
        description: 'Introduced new campaign: "Operation Stormbreaker".',
      },
      {
        type: "improvement",
        description: "Completely revamped user interface for better usability.",
      },
    ],
  },
  // Add more items as needed
];

// Change type icons and colors
const changeTypeConfig = {
  feature: {
    icon: <Sparkles className="w-4 h-4" />,
    color: "text-blue-400",
    label: "New Feature",
  },
  improvement: {
    icon: <Zap className="w-4 h-4" />,
    color: "text-yellow-400",
    label: "Improvement",
  },
  bugfix: {
    icon: <Bug className="w-4 h-4" />,
    color: "text-green-400",
    label: "Bug Fix",
  },
};

const Changelog = () => {
  const [filter, setFilter] = useState("all");
  const changeTypes = ["All", "Features", "Improvements", "Bug Fixes"];

  const filteredData = changelogData
    .map((item) => ({
      ...item,
      changes: item.changes.filter(
        (change) =>
          filter === "all" ||
          (filter === "features" && change.type === "feature") ||
          (filter === "improvements" && change.type === "improvement") ||
          (filter === "bug fixes" && change.type === "bugfix"),
      ),
    }))
    .filter((item) => item.changes.length > 0);

  return (
    <div className="bg-black text-white min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Delta CO Changelog
        </motion.h1>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-[#1a1a1a] border-[#d6c8a6]">
            {changeTypes.map((type) => (
              <TabsTrigger
                key={type}
                value={type.toLowerCase()}
                onClick={() => setFilter(type.toLowerCase())}
                className="text-[#d6c8a6] data-[state=active]:bg-[#d6c8a6] data-[state=active]:text-black"
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[#1a1a1a] border-[#d6c8a6] hover:border-[#f0e6ce] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#d6c8a6] flex items-center justify-between">
                      <span>Version {item.version}</span>
                      <Badge variant="outline" className="text-[#d6c8a6]">
                        <Calendar className="w-4 h-4 mr-2" />
                        {item.date}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {item.changes.map((change, index) => (
                        <li key={index} className="flex items-start">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span
                                  className={`mr-2 ${changeTypeConfig[change.type].color}`}
                                >
                                  {changeTypeConfig[change.type].icon}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{changeTypeConfig[change.type].label}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <span className="text-[#a09274]">
                            {change.description}
                          </span>
                        </li>
                      ))}
                    </ul>
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
          <h2 className="text-3xl font-bold text-[#d6c8a6] mb-4">
            Stay Informed
          </h2>
          <p className="text-[#a09274] mb-8">
            Want to be notified about future updates? Join our mailing list for
            the latest changelog entries.
          </p>
          <Button
            variant="outline"
            className="text-[#d6c8a6] border-[#d6c8a6] hover:bg-[#d6c8a6] hover:text-black"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Subscribe to Updates
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Changelog;
