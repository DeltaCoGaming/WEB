// app/delta/games/arma3/page.tsx

// app/delta/Privacy/page.tsx

import Navbar from "../../../components/Navbar";
import Background from "../../../components/Background";
import Arma3 from "../../../components/Games/arma3";
import Footer from "../../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Arma3 />
      <Footer />
    </Background>
  );
}
