// app/components/Status/Infra.tsx

'use client';
import React, { useState, useEffect } from 'react';
import { Activity, Clock, Server, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton"

const statusItems = [
  { icon: Server, title: "Server Health", key: "server_health" },
  { icon: Clock, title: "Ping Time", key: "ping_time_ms", unit: "ms" },
  { icon: Activity, title: "Ping Status", key: "ping_status" },
  { icon: HardDrive, title: "Platform", key: "platform" },
];

const SkeletonStatusItem = () => (
  <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-[#d6c8a6] p-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Skeleton className="w-10 h-10 mr-4 bg-[#2a2a2a]" />
        <Skeleton className="h-8 w-40 bg-[#2a2a2a]" />
      </div>
      <Skeleton className="h-6 w-20 bg-[#2a2a2a]" />
    </div>
  </div>
);

const InfraStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/v2/infra/status');
        if (!response.ok) throw new Error('Failed to fetch status');
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Infrastructure Status
        </motion.h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[...Array(4)].map((_, index) => (
              <SkeletonStatusItem key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {statusItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-[#d6c8a6]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <item.icon className="w-10 h-10 text-[#d6c8a6] mr-4" />
                        <h3 className="text-2xl font-bold text-[#d6c8a6]">{item.title}</h3>
                      </div>
                      <div className="text-white text-lg">
                        {item.key === "platform" ? (
                          <div>
                            <p>{status.platform}</p>
                          </div>
                        ) : (
                          <p>
                            {status[item.key]}
                            {item.unit && <span className="text-sm ml-1">{item.unit}</span>}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-12 bg-[#1a1a1a] rounded-2xl p-8 border border-[#d6c8a6]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-[#d6c8a6] mb-4">Last Updated</h3>
              <p className="text-white">{new Date(status.timestamp).toLocaleString()}</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfraStatus;