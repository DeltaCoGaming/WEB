// app/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Peeps from "@/components/main/Partners/Peeps";
import Footer from "../../../components/home/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Peeps />
      <Footer />
    </Background>
  );
}
