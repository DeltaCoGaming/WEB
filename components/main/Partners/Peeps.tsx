'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Handshake } from 'lucide-react';

type Partner = {
  name: string;
  description: string;
  avatar: string;
  tags: string[];
  discordUrl: string;
};

const partners: Partner[] = [
  {
    name: "ISRC",
    description: "Description of Partner 1",
    avatar: "/path/to/avatar1.jpg",
    tags: ["Tag1", "Tag2"],
    discordUrl: "https://discord.gg/partner1"
  },
  {
    name: "MAD 1-1",
    description: "Description of Partner 2",
    avatar: "/path/to/avatar2.jpg",
    tags: ["Tag2", "Tag3"],
    discordUrl: "https://discord.gg/partner2"
  },
];

type PartnerCardProps = {
  partner: Partner;
};

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="bg-[#1a1a1a] border-[#d6c8a6]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={partner.avatar} alt={partner.name} />
          <AvatarFallback>{partner.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-bold text-[#d6c8a6]">{partner.name}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {partner.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-[#2a2a2a] text-[#d6c8a6]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-white mb-4">{partner.description}</p>
        <a
          href={partner.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-[#d6c8a6] text-black rounded-md hover:bg-[#c0b494] transition-colors"
        >
          <Handshake className="w-4 h-4 mr-2" />
          Join Discord
        </a>
      </CardContent>
    </Card>
  </motion.div>
);

const DiscordPartners: React.FC = () => {
  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Discord Partners
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscordPartners;
