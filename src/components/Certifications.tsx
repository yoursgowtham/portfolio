import { Award, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { useContent } from "@/lib/content-store";

export function Certifications() {
  const { data } = useContent();

  return (
    <section id="certifications" className="py-32 relative">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-glow tracking-widest uppercase">
              Certifications
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Verified <span className="text-gradient">credentials</span>
            </h2>
          </div>
        </Reveal>

        {data.certifications.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No certifications yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.certifications.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <a
                  href={c.url || "#"}
                  target={c.url && c.url !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative glass rounded-2xl p-6 card-hover h-full overflow-hidden flex flex-col"
                >
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start justify-between mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-primary transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Award size={22} className="text-primary-foreground" />
                    </div>
                    <ExternalLink
                      size={18}
                      className="text-muted-foreground transition-all duration-300 group-hover:text-primary-glow group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>

                  <h3 className="relative font-display font-bold text-lg mb-1 group-hover:text-gradient transition-all">
                    {c.name}
                  </h3>
                  <p className="relative text-sm text-muted-foreground">
                    {c.issuer}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
