import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { AnimalCarousel } from "../components/landing/AnimalCarousel";
import { CategoriesSection } from "../components/landing/CategoriesSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { CTASection } from "../components/landing/CTASection";
import { Footer } from "../components/landing/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AnimalCarousel />
      <CategoriesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
