import LocaleHandler from "@/components/layout/LocaleHandler";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import OpenSourceSection from "@/components/sections/OpenSourceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function PortfolioPage() {
  return (
    <>
      <LocaleHandler />
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <OpenSourceSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
