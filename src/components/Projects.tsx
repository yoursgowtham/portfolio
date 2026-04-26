import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "./Reveal";
import { useContent } from "@/lib/content-store";
import p1 from "@/assets/project1.jpg";
import p2 from "@/assets/project2.jpg";
import p3 from "@/assets/project3.jpg";
import p4 from "@/assets/project4.jpg";

const fallbackImgs = [p1, p2, p3, p4];

export function Projects() {
  const { data } = useContent();

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-glow tracking-widest uppercase">
              Projects
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Recent <span className="text-gradient">work</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((p, i) => {
            const img = p.image && p.image.length > 0 ? p.image : fallbackImgs[i % fallbackImgs.length];
            return (
              <Reveal key={p.id} delay={i * 100}>
                <article className="group relative glass rounded-2xl overflow-hidden card-hover h-full">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={img}
                      alt={p.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-end justify-end p-5 gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target={p.liveUrl !== "#" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          aria-label="View live"
                          className="p-3 rounded-full bg-gradient-primary text-primary-foreground hover:scale-110 hover:shadow-glow transition-all duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target={p.repoUrl !== "#" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          aria-label="View code"
                          className="p-3 rounded-full glass hover:scale-110 hover:shadow-glow transition-all duration-300"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground/80 border border-border transition-colors hover:border-primary/50 hover:text-primary-glow"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
