// app/components/Status/Games.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Server, Users, Signal, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const gameConfigs = {
  arma3: {
    name: "Arma 3",
    endpoint: "/v2/battlemetrics/arma3/servers",
  },
  // Add more games here in the future
};

const ServerCard = ({ server, gameIcon }) => (
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
    <div className="absolute top-2 right-2 text-2xl" title={gameConfigs[server.game].name}>{gameIcon}</div>
  </motion.div>
);

const GameServersStatus = () => {
  const [servers, setServers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          return [game, data.map(server => ({ ...server, game }))];
        });
        const results = await Promise.all(gamePromises);
        setServers(Object.fromEntries(results));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const filteredServers = Object.entries(servers).reduce((acc, [game, gameServers]) => {
    acc[game] = gameServers.filter(server => 
      server.server_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return acc;
  }, {});

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

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
        {Object.entries(filteredServers).map(([game, gameServers]) => (
          <div key={game}>
            <h3 className="text-3xl font-bold mb-8 text-[#d6c8a6]">{gameConfigs[game].name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {gameServers.map((server, index) => (
                <ServerCard key={index} server={server} gameIcon={gameConfigs[game].icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameServersStatus;