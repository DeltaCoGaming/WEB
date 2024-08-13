// app/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Peeps from "../../components/Partners/Peeps";

import Footer from "../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Peeps />
      <Footer />
    </Background>
  );
}
