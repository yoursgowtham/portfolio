import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { useContent } from "@/lib/content-store";
import { socialMeta, platformOrder } from "@/lib/social-icons";

export function Contact() {
  const { data } = useContent();

  // Order socials by canonical platform order; only show those with a url
  const ordered = platformOrder
    .map((p) => data.socials.find((s) => s.platform === p))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send. Try again.");
      }
    } catch {
      setStatus("Failed to send. Try again.");
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-glow tracking-widest uppercase">
              Contact Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Let's <span className="text-gradient">connect</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Find me on your favorite platform — I'm always open to interesting
              projects, collabs, and conversations.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
          {ordered.map((s, i) => {
            const meta = socialMeta[s.platform];
            const Icon = meta.icon;
            const href =
              s.platform === "gmail" && !s.url.startsWith("mailto:")
                ? `mailto:${s.url}`
                : s.url;
            return (
              <Reveal key={s.id} delay={i * 60}>
                <a
                  href={href || "#"}
                  target={s.platform === "gmail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={meta.label}
                  className="group relative block glass rounded-2xl p-6 card-hover overflow-hidden"
                >
                  <div
                    className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}
                  />
                  <div className="relative flex flex-col items-center text-center">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${meta.color} mb-3 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-glow`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="font-semibold text-foreground/90 group-hover:text-primary-glow transition-colors">
                      {meta.label}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-card/80 p-8 rounded-2xl shadow-glow flex flex-col gap-6 border border-border backdrop-blur-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-primary-glow">Name</label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-surface/60 border-primary-glow focus-visible:ring-primary-glow"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-primary-glow">Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-surface/60 border-primary-glow focus-visible:ring-primary-glow"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-medium text-primary-glow">Message</label>
            <Textarea
              name="message"
              id="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-surface/60 border-primary-glow focus-visible:ring-primary-glow"
            />
          </div>
          <Button type="submit" className="w-full text-lg font-bold shadow-glow bg-gradient-to-r from-primary-glow to-accent-glow hover:from-accent-glow hover:to-primary-glow transition-all duration-300">
            Send
          </Button>
          {status && <div className="text-center text-sm mt-2 text-primary-glow animate-fade-in">{status}</div>}
        </form>
      </div>
    </section>
  );
}
