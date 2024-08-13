// app/components/Games/projectzomboid.tsx

// app/components/Games/projectzomboid.tsx

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sword, Crosshair, Clock, Map, Calendar, Users, ChevronDown, ChevronUp, Target, Mountain, Bomb, Shield, Cog } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ServerItem = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  details: string[];
  extendedInfo: string;
  features: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
};

const serverItems: ServerItem[] = [
  {
    id: "pz_main",
    title: "Project Zomboid Main Server",
    description: "Survive the zombie apocalypse with friends in a persistent, sandbox world.",
    icon: <Crosshair className="w-8 h-8 text-[#d6c8a6]" />,
    details: [
      "Persistent world with 24/7 uptime",
      "Survival-focused gameplay with dynamic events",
      "PvE and PvP zones for varied gameplay experiences",
      "Regular server events and community challenges",
      "Custom mods to enhance the gameplay experience"
    ],
    extendedInfo: `Our Project Zomboid Main Server offers a challenging and immersive survival experience. Set in a persistent world, players must gather resources, build safehouses, and fend off hordes of zombies while dealing with the harsh realities of the apocalypse.

    The server is divided into PvE and PvP zones, allowing players to choose the type of gameplay that suits their style. Whether you prefer working together to survive or engaging in risky PvP encounters, there's something for everyone.

    We regularly host server-wide events and community challenges that add an extra layer of excitement to the survival experience. With our custom mods, you'll find unique gameplay mechanics that aren't available in the base game.`,
    features: [
      {
        icon: <Target className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Dynamic Events",
        description: "Experience random zombie hordes, supply drops, and other events that keep you on your toes."
      },
      {
        icon: <Mountain className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Custom Mods",
        description: "Enhance your survival with unique mods created by our community."
      },
      {
        icon: <Shield className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Community-Driven",
        description: "Join a friendly and active community of survivors and share your experiences."
      }
    ]
  },
  // Placeholder for future servers
  {
    id: "pz_future_1",
    title: "Project Zomboid Server 2 (Coming Soon)",
    description: "A new experience for Project Zomboid enthusiasts.",
    icon: <Clock className="w-8 h-8 text-[#d6c8a6]" />,
    details: [
      "Exciting new features",
      "More information coming soon"
    ],
    extendedInfo: `Stay tuned for more details about this server. We're working on something special for our community.`,
    features: [
      {
        icon: <Cog className="w-6 h-6 text-[#d6c8a6]" />,
        title: "New Features",
        description: "This server will bring fresh challenges and gameplay mechanics."
      }
    ]
  },
];

const ServerCard = ({ server }: { server: ServerItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-[#1a1a1a] border-[#d6c8a6] hover:border-[#f0e6ce] transition-colors duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-[#d6c8a6] flex items-center">
            {server.icon}
            <span className="ml-2">{server.title}</span>
          </CardTitle>
          <Badge variant="outline" className="text-[#d6c8a6]">Online</Badge>
        </div>
        <CardDescription className="text-[#a09274]">{server.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-white mb-4">{server.extendedInfo}</p>
          <h4 className="text-xl font-bold text-[#d6c8a6] mb-2">Key Features:</h4>
          <ul className="list-disc pl-5 space-y-1 text-white mb-4">
            {server.details.map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {server.features.map((feature, index) => (
              <div key={index} className="bg-[#2a2a2a] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {feature.icon}
                  <h5 className="text-[#d6c8a6] font-bold ml-2">{feature.title}</h5>
                </div>
                <p className="text-white text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-[#d6c8a6]" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
          {isExpanded ? 'Less Info' : 'More Info'}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-[#d6c8a6] text-black hover:bg-[#f0e6ce]">
              <Sword className="mr-2 h-4 w-4" />
              Join Server
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#d6c8a6]">Join {server.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="mb-4">To join this server, follow these steps:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Launch Project Zomboid through Steam</li>
                <li>Go to the Multiplayer browser</li>
                <li>Search for &quot;Delta CO {server.title}&quot; in the server list</li>
                <li>Ensure you have the required mods installed (see our Discord for the mod list)</li>
                <li>Click &quot;Join&quot; and enjoy the game!</li>
              </ol>
              <p className="mt-4">For more detailed instructions or help with mod installation, please visit our Discord server.</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const ProjectZomboidServers = () => {
  const lastUpdated = "2024-08-12";

  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Delta CO Project Zomboid Servers
        </motion.h2>
        <div className="grid grid-cols-1 gap-8">
          {serverItems.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex justify-between items-center mt-8">
          <div className="text-[#a09274] flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Last Updated: {lastUpdated}
          </div>
          <Button variant="outline" className="text-[#d6c8a6]">
            <Users className="mr-2 h-4 w-4" />
            Join Our Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectZomboidServers;
