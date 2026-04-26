import { useContent } from "@/lib/content-store";
import { socialMeta, platformOrder } from "@/lib/social-icons";

export function Footer() {
  const { data } = useContent();

  const ordered = platformOrder
    .map((p) => data.socials.find((s) => s.platform === p))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <footer className="py-12 border-t border-border/60 relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-gradient font-semibold">Aradhyula Gowtham</span>. Crafted with care.
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {ordered.map((s) => {
            const meta = socialMeta[s.platform];
            const Icon = meta.icon;
            const href =
              s.platform === "gmail" && !s.url.startsWith("mailto:")
                ? `mailto:${s.url}`
                : s.url;
            return (
              <a
                key={s.id}
                href={href || "#"}
                target={s.platform === "gmail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={meta.label}
                className="group p-2.5 rounded-full glass transition-all duration-300 hover:scale-125 hover:shadow-glow hover:border-primary/60 hover:-translate-y-1"
              >
                <Icon
                  size={16}
                  className="text-foreground/80 group-hover:text-primary-glow transition-colors"
                />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
