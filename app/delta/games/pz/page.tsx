// app/delta/games/arma3/page.tsx

// app/delta/Privacy/page.tsx

import Navbar from "../../../components/Navbar";
import Background from "../../../components/Background";
import ProjectZomboidServers from "../../../components/Games/Project";
import Footer from "../../../../components/home/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <ProjectZomboidServers />
      <Footer />
    </Background>
  );
}
