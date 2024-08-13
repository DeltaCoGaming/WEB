// app/components/Games/arma3.tsx

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

const serverItems = [
  {
    id: "zeus",
    title: "Zeus Ops Server",
    description: "Experience dynamic, mission-based gameplay crafted by skilled Game Masters.",
    icon: <Crosshair className="w-8 h-8 text-[#d6c8a6]" />,
    details: [
      "Scheduled operations every Wednesday and Saturday",
      "Custom-made missions with evolving storylines",
      "Active Zeus presence for real-time mission adjustments",
      "Balanced mod list for immersion and performance",
      "Mix of PvE and occasional PvP elements"
    ],
    extendedInfo: `Our Zeus Ops server offers a unique, curated gameplay experience. Skilled Game Masters (Zeus) create and control missions in real-time, providing challenging and unpredictable scenarios. Whether you're infiltrating enemy compounds, conducting rescue operations, or defending strategic positions, each mission is crafted to test your tactical skills and teamwork.

    The server features a carefully selected mod list that enhances realism without compromising performance. From advanced ballistics to improved AI behavior, every mod is chosen to create an immersive battlefield experience.

    Join us for our scheduled operations or hop in for impromptu missions. With a mix of cooperative and adversarial gameplay, there's always something exciting happening on the Zeus Ops server.`,
    features: [
      {
        icon: <Target className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Diverse Mission Types",
        description: "From stealth operations to large-scale battles, experience a wide range of military scenarios."
      },
      {
        icon: <Mountain className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Dynamic Environments",
        description: "Missions span various terrains and weather conditions, keeping gameplay fresh and challenging."
      },
      {
        icon: <Shield className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Community-Focused",
        description: "Regular players can apply to become part of our Zeus team and create missions for others."
      }
    ]
  },
  {
    id: "lib",
    title: "Liberation 24/7 Server",
    description: "Engage in a persistent, open-world campaign to liberate Altis from enemy forces.",
    icon: <Clock className="w-8 h-8 text-[#d6c8a6]" />,
    details: [
      "24/7 uptime for continuous play",
      "Progressive map liberation with persistent progress",
      "Dynamic economy and base-building systems",
      "Cooperative gameplay with AI teammates",
      "Regular server events and challenges"
    ],
    extendedInfo: `The Liberation 24/7 server offers a persistent, open-world experience where your actions have lasting impacts. Work together with other players to liberate the entire island of Altis from enemy occupation. This server runs continuously, allowing you to contribute to the war effort whenever you have time to play.

    Start by securing small villages and gradually work your way up to major cities and military installations. Manage resources, build and upgrade bases, and coordinate with other players to push back the enemy forces. The dynamic AI adapts to your strategies, ensuring the challenge remains fresh as you progress.

    With our custom modifications to the Liberation framework, you'll experience unique events, side missions, and periodic challenges that keep the gameplay exciting and rewarding.`,
    features: [
      {
        icon: <Bomb className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Dynamic Warfare",
        description: "Enemy forces respond to your actions, launching counterattacks and adapting their strategies."
      },
      {
        icon: <Cog className="w-6 h-6 text-[#d6c8a6]" />,
        title: "In-depth Logistics",
        description: "Manage supply lines, resources, and base upgrades to support your liberation efforts."
      },
      {
        icon: <Users className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Flexible Gameplay",
        description: "Drop in solo with AI teammates or coordinate with other players for larger operations."
      }
    ]
  },
  {
    id: "sog",
    title: "SOG Prairie Fire 24/7 Server",
    description: "Immerse yourself in the Vietnam War with authentic gameplay and missions.",
    icon: <Map className="w-8 h-8 text-[#d6c8a6]" />,
    details: [
      "Authentic Vietnam War setting using the SOG Prairie Fire DLC",
      "Mix of historical operations and free-play gameplay",
      "Period-correct weapons, vehicles, and equipment",
      "Dynamic weather system and day/night cycle",
      "Hardcore mode available for ultimate realism"
    ],
    extendedInfo: `Step into the Vietnam War era with our SOG Prairie Fire 24/7 server. This server is dedicated to providing an immersive and historically accurate experience of the conflict in Southeast Asia. Using the official SOG Prairie Fire DLC, players can engage in both scripted missions based on historical operations and free-play scenarios across the lush, unforgiving landscapes of Vietnam and Cambodia.

    Experience the war from multiple perspectives, whether as US Special Forces, MACV-SOG operatives, or PAVN/NVA forces. Our server features a rotating mission set that includes covert operations, large-scale battles, and everything in between.

    The attention to detail extends to every aspect of the game, from the period-correct weapons and vehicles to the authentic radio chatter and sound effects. Our custom scripts enhance the vanilla SOG Prairie Fire experience, adding dynamic events, improved AI behavior, and additional challenges.`,
    features: [
      {
        icon: <Target className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Historical Operations",
        description: "Participate in missions based on real Vietnam War operations and battles."
      },
      {
        icon: <Mountain className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Authentic Environment",
        description: "Navigate dense jungles, rice paddies, and historically accurate maps of Vietnam and Cambodia."
      },
      {
        icon: <Shield className="w-6 h-6 text-[#d6c8a6]" />,
        title: "Immersive Experience",
        description: "Optional hardcore mode with limited HUD and increased difficulty for ultimate realism."
      }
    ]
  }
];

const ServerCard = ({ server }) => {
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
            {server.details.map((detail, index) => (
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
                <li>Launch Arma 3 through Steam</li>
                <li>Go to the Multiplayer browser</li>
                <li>Search for "Delta CO {server.title}" in the server list</li>
                <li>Ensure you have the required mods installed (see our Discord for the mod list)</li>
                <li>Click "Join" and enjoy the game!</li>
              </ol>
              <p className="mt-4">For more detailed instructions or help with mod installation, please visit our Discord server.</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const Arma3Servers = () => {
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
          Delta CO Arma 3 Servers
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

export default Arma3Servers;