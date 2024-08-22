// app/page.tsx

import Navbar from "./components/Navbar";
import Background from "./components/Background";
import HeroSection from "./components/Hero";
import WhatWeDo from "./components/WhatweDo";
import Footer from "./components/Footer";
import ChatWidget from "@/components/main/chat/Chat-Widget";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <HeroSection />
      <WhatWeDo />
      <ChatWidget />
      <Footer />
    </Background>
  );
}
