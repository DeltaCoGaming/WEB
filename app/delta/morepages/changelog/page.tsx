// app/delta/morepages/roadmap/page.tsx

import Navbar from "../../../components/Navbar";
import Background from "../../../components/Background";
import Changelog from "../../../components/More/Changelog";
import Footer from "../../../components/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Changelog />
      <Footer />
    </Background>
  );
}
