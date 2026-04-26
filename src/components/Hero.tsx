import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-[120px] animate-glow-pulse"
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/30 blur-[140px] animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-glow opacity-60"
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles size={14} className="text-primary-glow" />
          <span className="text-xs font-medium text-foreground/80">
            Available for new projects
          </span>
        </div>

        <h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6 animate-slide-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          Hi, I'm <span className="text-gradient">Aradhyula Gowtham</span>
          <br />
          <span className="text-foreground/90">Software Developer</span>
        </h1>

        <p
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          I build fast, reliable, and beautifully crafted software — turning
          ideas into clean code and delightful user experiences.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            View Projects
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full glass font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-glow hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-primary-glow" />
        </div>
      </div>
    </section>
  );
}
