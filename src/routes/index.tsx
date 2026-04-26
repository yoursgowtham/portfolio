import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aradhyula Gowtham — Software Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Aradhyula Gowtham — software developer building fast, reliable, and elegant web experiences.",
      },
      { property: "og:title", content: "Aradhyula Gowtham — Software Developer Portfolio" },
      {
        property: "og:description",
        content: "Software developer building fast, reliable, and elegant digital products.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

