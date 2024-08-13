// app/page.tsx

import Navbar from "./components/Navbar";
import Background from "./components/Background";
import HeroSection from "./components/Hero";
import WhatWeDo from "./components/WhatweDo";
import ChatWidget from "./components/Chat/Widget"
import Footer from "./components/Footer";

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
