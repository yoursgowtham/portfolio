import {
  Code, Palette, Database, Cloud, Smartphone, Cpu, Server,
  Brain, Wrench, Globe, Zap, BookOpen, type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { useContent } from "@/lib/content-store";

export const SKILL_ICONS: Record<string, LucideIcon> = {
  Code, Palette, Database, Cloud, Smartphone, Cpu,
  Server, Brain, Wrench, Globe, Zap, BookOpen,
};

export const SKILL_ICON_NAMES = Object.keys(SKILL_ICONS);

export function Skills() {
  const { data } = useContent();

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-glow tracking-widest uppercase">
              Skills
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Tools I use <span className="text-gradient">to build</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.map((s, i) => {
            const Icon = SKILL_ICONS[s.icon] ?? Code;
            return (
              <Reveal key={s.id} delay={i * 80}>
                <div className="group relative glass rounded-2xl p-6 card-hover h-full overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-primary mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={22} className="text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1">
                      {s.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {s.desc}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out group-hover:shadow-glow"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-primary-glow tabular-nums">
                        {s.level}%
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
