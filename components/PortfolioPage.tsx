import { ViewTransition } from "react";
import LocaleHandler from "@/components/layout/LocaleHandler";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VelocityPaperTape from "@/components/animations/VelocityPaperTape";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PressPlateZone from "@/components/sections/PressPlateZone";
import ExperienceSection from "@/components/sections/ExperienceSection";
import OpenSourceSection from "@/components/sections/OpenSourceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function PortfolioPage() {
  return (
    <>
      <LocaleHandler />
      <Navbar />

      <ViewTransition
        enter={{
          "folio-forward": "folio-forward",
          "folio-back": "folio-back",
          default: "none",
        }}
        exit={{
          "folio-forward": "folio-forward",
          "folio-back": "folio-back",
          default: "none",
        }}
        default="none"
      >
        <main id="main-content">
          <HeroSection />
          <VelocityPaperTape />
          <ProjectsSection />
          <PressPlateZone />
          <ExperienceSection />
          <OpenSourceSection />
          <ContactSection />
        </main>
      </ViewTransition>

      <Footer />
    </>
  );
}
