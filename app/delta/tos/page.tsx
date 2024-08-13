// app/delta/tos/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import TermsOfService from "../../components/More/Terms";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <TermsOfService />
      <Footer />
    </Background>
  );
}
