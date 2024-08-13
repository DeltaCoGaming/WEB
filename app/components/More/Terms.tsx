// app/components/More/Terms.tsx

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Shield, UserPlus, MessageSquare, Ban, FileText, List, Calendar, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const tosItems = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: "By joining and participating in our Discord server, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not join or use our server.",
    icon: <Shield className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Essential for participation"
  },
  {
    id: "rules",
    title: "2. Server Rules",
    content: "All members must adhere to our server rules, which include but are not limited to: being respectful to others, no hate speech or discrimination, no spamming, and no sharing of inappropriate content. Violation of these rules may result in warnings, mutes, kicks, or bans.",
    icon: <AlertTriangle className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Guiding principles for behavior"
  },
  {
    id: "conduct",
    title: "3. User Conduct",
    content: "Users are expected to maintain a positive and constructive attitude. Harassment, bullying, or any form of abusive behavior towards other members will not be tolerated. We encourage open and respectful dialogue, and any disputes should be resolved amicably or brought to the attention of moderators.",
    icon: <UserPlus className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Expected behavior standards"
  },
  {
    id: "content",
    title: "4. Content Sharing",
    content: "Users are responsible for the content they share. Do not share copyrighted material without permission, personal information of others, or any content that violates Discord's Terms of Service. We encourage sharing of original content and ideas that contribute positively to our community.",
    icon: <MessageSquare className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Guidelines for sharing"
  },
  {
    id: "moderation",
    title: "5. Moderation",
    content: "Our moderators have the right to remove content and users that violate these terms or disrupt the server. Moderator decisions are final, but you may appeal through the designated channels if you believe a mistake was made. We strive for fair and consistent moderation to maintain a healthy community environment.",
    icon: <Ban className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Enforcement of rules"
  },
  {
    id: "privacy",
    title: "6. Privacy and Data Protection",
    content: "We respect your privacy and handle personal data in accordance with our Privacy Policy. By using our server, you consent to the collection and use of information as outlined in the policy. We implement reasonable security measures to protect user data.",
    icon: <Info className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Data handling practices"
  }
];

const TableOfContents = ({ items, onItemClick }) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold mb-4 text-[#d6c8a6]">Table of Contents</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <Button
            variant="ghost"
            onClick={() => onItemClick(item.id)}
            className="w-full justify-start text-[#d6c8a6] hover:text-white hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            {item.title}
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

const FullDocument = ({ items }) => (
  <div className="space-y-6">
    {items.map((item) => (
      <div key={item.id}>
        <h3 className="text-xl font-bold mb-2 text-[#d6c8a6]">{item.title}</h3>
        <p>{item.content}</p>
      </div>
    ))}
  </div>
);

const TermsOfService = () => {
  const [activeTab, setActiveTab] = useState("full");
  const [activeAccordionItem, setActiveAccordionItem] = useState(null);
  const lastUpdated = "2024-08-12";

  const handleTableOfContentsClick = (id) => {
    setActiveTab("full");
    setActiveAccordionItem(id);
  };

  return (
    <div className="bg-black text-white py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Delta CO Terms of Service
        </motion.h2>
        <Card className="bg-[#1a1a1a] border-[#d6c8a6]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#d6c8a6]">Please read these terms carefully</CardTitle>
            <CardDescription className="text-[#a09274] flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Last Updated: {lastUpdated}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="toc" className="flex items-center">
                  <List className="w-4 h-4 mr-2" />
                  Table of Contents
                </TabsTrigger>
                <TabsTrigger value="full" className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Full Terms
                </TabsTrigger>
              </TabsList>
              <TabsContent value="toc">
                <TableOfContents items={tosItems} onItemClick={handleTableOfContentsClick} />
              </TabsContent>
              <TabsContent value="full">
                <ScrollArea className="h-[60vh] pr-4">
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full"
                    value={activeAccordionItem}
                    onValueChange={setActiveAccordionItem}
                  >
                    {tosItems.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AccordionTrigger className="text-[#d6c8a6]">
                                <div className="flex items-center">
                                  {item.icon}
                                  <span className="ml-2">{item.title}</span>
                                </div>
                              </AccordionTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <AccordionContent className="text-white">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center mt-4">
                    <Badge variant="outline" className="text-[#d6c8a6]">
                      Version 1.2
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-[#d6c8a6]">
                          <FileText className="w-4 h-4 mr-2" />
                          View Full Document
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#1a1a1a] text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-[#d6c8a6]">Full Terms of Service</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] pr-4">
                          <FullDocument items={tosItems} />
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;