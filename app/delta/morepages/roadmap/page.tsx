// app/delta/morepages/roadmap/page.tsx

// app/delta/more/page.tsx - for the main more page (roadmap, docs, etc.)

import Navbar from "../../../components/Navbar";
import Background from "../../../components/Background";
import Roadmap from "../../../components/More/Roadmap";
import Footer from "../../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Roadmap />
      <Footer />
    </Background>
  );
}
