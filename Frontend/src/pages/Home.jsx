import Navbar from "../components/Navbar";
import { Hero } from "../components/Home/hero";
import { Features } from "../components/Home/features";
import { Cta } from "../components/Home/cta";
import { SiteFooter } from "../components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
