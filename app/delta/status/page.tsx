// app/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Infra from "../../components/Status/Infra";
import Games from "../../components/Status/Games";
import Footer from "../../../components/home/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Infra />
        <Games />
      <Footer />
    </Background>
  );
}
