// app/delta/tos/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Ver from "../../components/Discord/ver";
import Footer from "../../../components/home/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Ver />
      <Footer />
    </Background>
  );
}
