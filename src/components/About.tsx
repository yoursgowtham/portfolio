import { Coffee, Code2, Rocket } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { Reveal } from "./Reveal";

const stats = [
  { icon: Code2, value: "5+", label: "Years Coding" },
  { icon: Rocket, value: "40+", label: "Projects Shipped" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
];

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-glow tracking-widest uppercase">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              The story <span className="text-gradient">behind the code</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-10 items-center">
          <Reveal className="md:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={profileImg}
                  alt="Aradhyula Gowtham portrait"
                  width={768}
                  height={768}
                  loading="lazy"
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-3" delay={150}>
            <div className="glass rounded-2xl p-8 card-hover">
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                I'm Aradhyula Gowtham — a software developer who loves turning
                complex problems into clean, well-engineered solutions. From
                full-stack web apps to algorithmic challenges, I enjoy building
                things that work great and look even better.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not shipping code, you'll find me grinding on
                competitive programming, exploring new tech stacks, or
                contributing to open source.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                {stats.map((s) => (
                  <div key={s.label} className="text-center group/stat">
                    <s.icon
                      size={22}
                      className="mx-auto mb-2 text-primary-glow transition-transform duration-300 group-hover/stat:scale-125 group-hover/stat:rotate-12"
                    />
                    <div className="font-display text-2xl font-bold text-gradient">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
