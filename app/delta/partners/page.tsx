// app/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";

import Footer from "../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />

      <Footer />
    </Background>
  );
}
