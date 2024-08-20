// app/delta/more/page.tsx - for the main more page (roadmap, docs, etc.)

// app/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import MoreEtc from "../../components/More/MoreEtc";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <MoreEtc />
      <Footer />
    </Background>
  );
}
