import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import GitHubSection from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Terminal from "@/components/features/Terminal";
import AIAssistant from "@/components/features/AIAssistant";

export default function Home() {
  return (
    <main className="min-h-screen surface-bg text-theme transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GitHubSection />
      <Contact />
      <Footer />
      <Terminal />
      <AIAssistant />
    </main>
  );
}
