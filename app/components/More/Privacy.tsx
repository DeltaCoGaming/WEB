'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, UserPlus, Database, Lock, Eye, FileText, List, Calendar, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PrivacyItem = {
  id: string;
  title: string;
  content: string;
  icon: JSX.Element;
  tooltip: string;
};

const privacyItems: PrivacyItem[] = [
  {
    id: "collection",
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, participate in discussions, or contact us for support. This may include your username, email address, and any other information you choose to provide.",
    icon: <Database className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Types of data we gather"
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    content: "We use the information we collect to operate and improve our Discord server, provide customer support, and communicate with you. This includes using data to personalize your experience, protect against fraud and abuse, and comply with legal obligations.",
    icon: <Eye className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Purpose of data collection"
  },
  {
    id: "sharing",
    title: "3. Information Sharing and Disclosure",
    content: "We do not sell your personal information. We may share information with third-party service providers who perform services on our behalf, or when required by law. We may also share aggregated or de-identified information that cannot reasonably be used to identify you.",
    icon: <UserPlus className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "How data is shared"
  },
  {
    id: "security",
    title: "4. Data Security",
    content: "We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic storage system is completely secure, and we cannot guarantee absolute security.",
    icon: <Lock className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Measures to protect your data"
  },
  {
    id: "rights",
    title: "5. Your Rights and Choices",
    content: "You may update, correct, or delete your account information at any time by contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those messages. Note that you may still receive administrative messages related to our services.",
    icon: <Shield className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Control over your information"
  },
  {
    id: "changes",
    title: "6. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our Discord server. You are advised to review this Privacy Policy periodically for any changes.",
    icon: <Info className="w-6 h-6 text-[#d6c8a6]" />,
    tooltip: "Policy updates"
  }
];

type TableOfContentsProps = {
  items: PrivacyItem[];
  onItemClick: (id: string) => void;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, onItemClick }) => (
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

type FullDocumentProps = {
  items: PrivacyItem[];
};

const FullDocument: React.FC<FullDocumentProps> = ({ items }) => (
  <div className="space-y-6">
    {items.map((item) => (
      <div key={item.id}>
        <h3 className="text-xl font-bold mb-2 text-[#d6c8a6]">{item.title}</h3>
        <p>{item.content}</p>
      </div>
    ))}
  </div>
);

const PrivacyPolicy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("full");
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | null>(null);
  const lastUpdated = "2024-08-12";

  const handleTableOfContentsClick = (id: string) => {
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
          Delta CO Privacy Policy
        </motion.h2>
        <Card className="bg-[#1a1a1a] border-[#d6c8a6]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#d6c8a6]">Your privacy is important to us</CardTitle>
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
                  Full Policy
                </TabsTrigger>
              </TabsList>
              <TabsContent value="toc">
                <TableOfContents items={privacyItems} onItemClick={handleTableOfContentsClick} />
              </TabsContent>
              <TabsContent value="full">
                <ScrollArea className="h-[60vh] pr-4">
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full"
                    value={activeAccordionItem ?? undefined}
                    onValueChange={(value) => setActiveAccordionItem(value)}
                  >
                    {privacyItems.map((item) => (
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
                      Version 1.1
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
                          <DialogTitle className="text-2xl font-bold text-[#d6c8a6]">Full Privacy Policy</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] pr-4">
                          <FullDocument items={privacyItems} />
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

export default PrivacyPolicy;
