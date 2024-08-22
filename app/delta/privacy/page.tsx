// app/delta/Privacy/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Privacy from "../../components/More/Privacy";
import Footer from "../../../components/home/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Privacy />
      <Footer />
    </Background>
  );
}
