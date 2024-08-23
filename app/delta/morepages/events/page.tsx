// app/delta/morepages/roadmap/page.tsx

// app/delta/more/page.tsx - for the main more page (roadmap, docs, etc.)

import Navbar from "../../../components/Navbar";
import Background from "../../../components/Background";
import Calendar from "@/components/main/more-comps/Calendar"
import Footer from "../../../../components/home/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
        <Calendar />
      <Footer />
    </Background>
  );
}