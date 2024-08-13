// app/delta/tos/page.tsx

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import Terms from "../../components/More/Terms";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Terms />
      <Footer />
    </Background>
  );
}
