'use client';

import React, { useState, useEffect } from 'react';
import { Server, Users, Signal, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";

type GameConfig = {
  name: string;
  endpoint: string;
};

type GameConfigs = {
  [key: string]: GameConfig;
};

type ServerInfo = {
  server_name: string;
  status: string;
  players: number;
  game: string;
};

const gameConfigs: GameConfigs = {
  arma3: {
    name: "Arma 3",
    endpoint: "/v2/battlemetrics/arma3/servers",
  },
  projectzomboid: {
    name: "Project Zomboid",
    endpoint: "/v2/battlemetrics/projectzomboid/servers",
  },
  minecraft: {
    name: "Minecraft",
    endpoint: "/v2/battlemetrics/minecraft/servers",
  },
  // Add more games here in the future
};

type ServerCardProps = {
  server: ServerInfo;
};

const ServerCard: React.FC<ServerCardProps> = ({ server }) => (
  <motion.div 
    className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-[#d6c8a6] p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center mb-4">
      <Server className="w-6 h-6 text-[#d6c8a6] mr-2" />
      <h3 className="text-xl font-bold text-[#d6c8a6] truncate">{server.server_name}</h3>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Signal className={`w-4 h-4 ${server.status === 'online' ? 'text-green-500' : 'text-red-500'} mr-2`} />
        <span className="text-white capitalize">{server.status}</span>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 text-[#d6c8a6] mr-2" />
        <span className="text-white">{server.players}</span>
      </div>
    </div>
  </motion.div>
);

const SkeletonServerCard = () => (
  <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-[#d6c8a6] p-6">
    <div className="flex items-center mb-4">
      <Skeleton className="w-6 h-6 mr-2 bg-[#2a2a2a]" />
      <Skeleton className="h-6 w-3/4 bg-[#2a2a2a]" />
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Skeleton className="w-4 h-4 mr-2 bg-[#2a2a2a]" />
        <Skeleton className="h-4 w-16 bg-[#2a2a2a]" />
      </div>
      <div className="flex items-center">
        <Skeleton className="w-4 h-4 mr-2 bg-[#2a2a2a]" />
        <Skeleton className="h-4 w-8 bg-[#2a2a2a]" />
      </div>
    </div>
  </div>
);

const GameServersStatus: React.FC = () => {
  const [servers, setServers] = useState<{ [key: string]: ServerInfo[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);
      setError(null);
      try {
        const gamePromises = Object.entries(gameConfigs).map(async ([game, config]) => {
          const response = await fetch(`http://127.0.0.1:8000${config.endpoint}`);
          if (!response.ok) throw new Error(`Failed to fetch ${game} servers`);
          const data = await response.json();
          return [game, data.map((server: ServerInfo) => ({ ...server, game }))];
        });
        const results = await Promise.all(gamePromises);
        setServers(Object.fromEntries(results));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const filteredServers = Object.entries(servers).reduce<{ [key: string]: ServerInfo[] }>((acc, [game, gameServers]) => {
    acc[game] = gameServers.filter(server => 
      server.server_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return acc;
  }, {});

  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Delta Co Game Servers
        </motion.h2>
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search servers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-[#d6c8a6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c8a6]"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#d6c8a6]" />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(6)].map((_, index) => (
              <SkeletonServerCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
          Object.entries(filteredServers).map(([game, gameServers]) => (
            <div key={game}>
              <h3 className="text-3xl font-bold mb-8 text-[#d6c8a6]">{gameConfigs[game].name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {gameServers.map((server, index) => (
                  <ServerCard key={index} server={server} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameServersStatus;
