import { useEffect, useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact Me" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass" : "py-5 bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-xl font-bold text-gradient transition-transform duration-300 hover:scale-110"
        >
          &lt;AG/&gt;
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-sm font-medium text-foreground/80"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            aria-label="Admin"
            className="p-2 rounded-full glass transition-all duration-300 hover:scale-110 hover:shadow-glow hover:border-primary/60 hover:-translate-y-0.5 group"
          >
            <Shield
              size={16}
              className="text-foreground/70 group-hover:text-primary-glow transition-colors"
            />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Hire Me
          </a>
        </div>

        <button
          className="md:hidden text-foreground p-2 transition-transform hover:scale-110"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass mt-3 mx-6 rounded-xl p-6 animate-fade-in">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="nav-link text-foreground/80 font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="nav-link text-foreground/80 font-medium inline-flex items-center gap-2"
              >
                <Shield size={14} /> Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
