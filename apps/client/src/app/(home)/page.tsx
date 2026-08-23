import HeroSection from "@/components/HeroSection";
import FAQ from "@/features/home/components/FAQ";
import { FeatureSlider } from "@/features/home/components/Features";
import Footer from "@/features/home/components/Footer";
import Header from "@/features/home/components/Header";
export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto space-y-16 overflow-hidden p-3">
      <Header />
      <HeroSection />
      <FeatureSlider />
      <FAQ />
      <Footer />
    </main>
  );
}
