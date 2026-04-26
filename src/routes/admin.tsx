import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft, LogOut, Plus, Trash2, Save, RefreshCw, Lock,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  useContent,
  type Skill,
  type Certification,
  type Project,
  type SocialLink,
} from "@/lib/content-store";
import { ADMIN_PASSWORD, isAdminAuthed, setAdminAuthed } from "@/lib/admin-auth";
import { SKILL_ICON_NAMES } from "@/components/Skills";
import { platformOrder, socialMeta } from "@/lib/social-icons";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Aradhyula Gowtham" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      {authed ? (
        <Dashboard
          onLogout={() => {
            setAdminAuthed(false);
            setAuthed(false);
            toast.success("Logged out");
          }}
        />
      ) : (
        <LoginCard
          onSuccess={() => {
            setAdminAuthed(true);
            setAuthed(true);
          }}
        />
      )}
    </div>
  );
}

function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
      toast.success("Welcome back");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-hero">
      <div className="w-full max-w-md glass rounded-2xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-primary">
            <Lock size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="text-sm text-muted-foreground">
              Enter the admin password
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-input/60 border border-border text-foreground outline-none transition-all duration-300 focus:border-primary focus:shadow-glow"
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
          >
            Sign in
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-glow transition-colors"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
        </form>
        <p className="mt-6 text-xs text-muted-foreground">
          Default password: <code className="text-primary-glow">admin123</code> — change it in <code>src/lib/admin-auth.ts</code>.
        </p>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data, update, reset, newId } = useContent();
  const [tab, setTab] = useState<"skills" | "certs" | "projects" | "socials">("skills");

  return (
    <div>
      <header className="border-b border-border/60 sticky top-0 z-30 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg glass transition-all hover:scale-110 hover:shadow-glow"
              aria-label="Back"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="font-display text-xl font-bold">
              <span className="text-gradient">Admin</span> Panel
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm("Reset all content to defaults?")) {
                  reset();
                  toast.success("Content reset to defaults");
                }
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm transition-all hover:shadow-glow hover:scale-105"
            >
              <RefreshCw size={14} /> Reset
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-glow hover:scale-105"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-3 flex gap-2 overflow-x-auto">
          {(
            [
              ["skills", "Skills"],
              ["certs", "Certifications"],
              ["projects", "Projects"],
              ["socials", "Social Links"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                tab === key
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "glass hover:scale-105 hover:shadow-glow text-foreground/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {tab === "skills" && (
          <SkillsEditor
            items={data.skills}
            onAdd={() =>
              update((d) => ({
                ...d,
                skills: [
                  ...d.skills,
                  { id: newId(), name: "New Skill", desc: "Description", level: 70, icon: "Code" },
                ],
              }))
            }
            onChange={(id, patch) =>
              update((d) => ({
                ...d,
                skills: d.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
              }))
            }
            onDelete={(id) =>
              update((d) => ({ ...d, skills: d.skills.filter((s) => s.id !== id) }))
            }
          />
        )}

        {tab === "certs" && (
          <CertsEditor
            items={data.certifications}
            onAdd={() =>
              update((d) => ({
                ...d,
                certifications: [
                  ...d.certifications,
                  { id: newId(), name: "New Certification", issuer: "Issuer", url: "https://" },
                ],
              }))
            }
            onChange={(id, patch) =>
              update((d) => ({
                ...d,
                certifications: d.certifications.map((c) =>
                  c.id === id ? { ...c, ...patch } : c
                ),
              }))
            }
            onDelete={(id) =>
              update((d) => ({
                ...d,
                certifications: d.certifications.filter((c) => c.id !== id),
              }))
            }
          />
        )}

        {tab === "projects" && (
          <ProjectsEditor
            items={data.projects}
            onAdd={() =>
              update((d) => ({
                ...d,
                projects: [
                  ...d.projects,
                  {
                    id: newId(),
                    title: "New Project",
                    desc: "Short description",
                    tags: [],
                    liveUrl: "",
                    repoUrl: "",
                    image: "",
                  },
                ],
              }))
            }
            onChange={(id, patch) =>
              update((d) => ({
                ...d,
                projects: d.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
              }))
            }
            onDelete={(id) =>
              update((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }))
            }
          />
        )}

        {tab === "socials" && (
          <SocialsEditor
            items={data.socials}
            onChange={(id, patch) =>
              update((d) => ({
                ...d,
                socials: d.socials.map((s) => (s.id === id ? { ...s, ...patch } : s)),
              }))
            }
            onAddMissing={() => {
              update((d) => {
                const present = new Set(d.socials.map((s) => s.platform));
                const additions: SocialLink[] = platformOrder
                  .filter((p) => !present.has(p))
                  .map((p) => ({ id: newId(), platform: p, url: "" }));
                return { ...d, socials: [...d.socials, ...additions] };
              });
              toast.success("Added any missing platforms");
            }}
          />
        )}
      </main>
    </div>
  );
}

/* ---------- Section editors ---------- */

function SectionShell({
  title, description, onAdd, addLabel = "Add", children,
}: {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {onAdd && (
          <button
            onClick={() => {
              onAdd();
              toast.success("Added");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-glow hover:scale-105"
          >
            <Plus size={14} /> {addLabel}
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
      <p className="mt-6 text-xs text-muted-foreground inline-flex items-center gap-2">
        <Save size={12} /> Changes save automatically to this browser.
      </p>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-lg bg-input/60 border border-border text-foreground outline-none transition-all focus:border-primary focus:shadow-glow ${props.className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 rounded-lg bg-input/60 border border-border text-foreground outline-none transition-all focus:border-primary focus:shadow-glow resize-none ${props.className ?? ""}`}
    />
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={() => {
        if (confirm("Delete this item?")) {
          onClick();
          toast.success("Deleted");
        }
      }}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-destructive/40 text-destructive text-sm transition-all hover:bg-destructive/10 hover:scale-105"
    >
      <Trash2 size={14} /> Delete
    </button>
  );
}

function SkillsEditor({
  items, onAdd, onChange, onDelete,
}: {
  items: Skill[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <SectionShell title="Skills" onAdd={onAdd} addLabel="Add Skill">
      {items.map((s) => (
        <div key={s.id} className="glass rounded-xl p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Name</FieldLabel>
              <TextInput
                value={s.name}
                onChange={(e) => onChange(s.id, { name: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <TextInput
                value={s.desc}
                onChange={(e) => onChange(s.id, { desc: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Icon</FieldLabel>
              <select
                value={s.icon}
                onChange={(e) => onChange(s.id, { icon: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-input/60 border border-border text-foreground outline-none transition-all focus:border-primary focus:shadow-glow"
              >
                {SKILL_ICON_NAMES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Level: {s.level}%</FieldLabel>
              <input
                type="range"
                min={0}
                max={100}
                value={s.level}
                onChange={(e) => onChange(s.id, { level: Number(e.target.value) })}
                className="w-full accent-[color:var(--primary)]"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <DeleteButton onClick={() => onDelete(s.id)} />
          </div>
        </div>
      ))}
    </SectionShell>
  );
}

function CertsEditor({
  items, onAdd, onChange, onDelete,
}: {
  items: Certification[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Certification>) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <SectionShell
      title="Certifications"
      description="Each certification is clickable on the site — set the URL to the verification link."
      onAdd={onAdd}
      addLabel="Add Certification"
    >
      {items.map((c) => (
        <div key={c.id} className="glass rounded-xl p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Name</FieldLabel>
              <TextInput
                value={c.name}
                onChange={(e) => onChange(c.id, { name: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Issuer</FieldLabel>
              <TextInput
                value={c.issuer}
                onChange={(e) => onChange(c.id, { issuer: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Verification URL</FieldLabel>
              <TextInput
                type="url"
                placeholder="https://..."
                value={c.url}
                onChange={(e) => onChange(c.id, { url: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <DeleteButton onClick={() => onDelete(c.id)} />
          </div>
        </div>
      ))}
    </SectionShell>
  );
}

function ProjectsEditor({
  items, onAdd, onChange, onDelete,
}: {
  items: Project[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Project>) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <SectionShell title="Projects" onAdd={onAdd} addLabel="Add Project">
      {items.map((p) => (
        <div key={p.id} className="glass rounded-xl p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Title</FieldLabel>
              <TextInput
                value={p.title}
                onChange={(e) => onChange(p.id, { title: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Tags (comma separated)</FieldLabel>
              <TextInput
                value={p.tags.join(", ")}
                onChange={(e) =>
                  onChange(p.id, {
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <TextArea
                rows={3}
                value={p.desc}
                onChange={(e) => onChange(p.id, { desc: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Live URL</FieldLabel>
              <TextInput
                type="url"
                placeholder="https://..."
                value={p.liveUrl}
                onChange={(e) => onChange(p.id, { liveUrl: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel>Repository URL</FieldLabel>
              <TextInput
                type="url"
                placeholder="https://github.com/..."
                value={p.repoUrl}
                onChange={(e) => onChange(p.id, { repoUrl: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Image URL (optional — falls back to default)</FieldLabel>
              <TextInput
                type="url"
                placeholder="https://..."
                value={p.image}
                onChange={(e) => onChange(p.id, { image: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <DeleteButton onClick={() => onDelete(p.id)} />
          </div>
        </div>
      ))}
    </SectionShell>
  );
}

function SocialsEditor({
  items, onChange, onAddMissing,
}: {
  items: SocialLink[];
  onChange: (id: string, patch: Partial<SocialLink>) => void;
  onAddMissing: () => void;
}) {
  const ordered = platformOrder
    .map((p) => items.find((s) => s.platform === p))
    .filter((s): s is SocialLink => Boolean(s));
  const missing = platformOrder.filter(
    (p) => !items.some((s) => s.platform === p)
  );

  return (
    <SectionShell
      title="Social & Contact Links"
      description="Set the URL for each platform. For Gmail, enter your email or a mailto: link."
      onAdd={missing.length > 0 ? onAddMissing : undefined}
      addLabel="Add Missing Platforms"
    >
      {ordered.map((s) => {
        const meta = socialMeta[s.platform];
        const Icon = meta.icon;
        return (
          <div key={s.id} className="glass rounded-xl p-5 flex items-center gap-4 flex-wrap">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${meta.color}`}>
              <Icon size={18} className="text-white" />
            </div>
            <div className="font-semibold w-32">{meta.label}</div>
            <div className="flex-1 min-w-[240px]">
              <TextInput
                placeholder={
                  s.platform === "gmail"
                    ? "you@example.com or mailto:you@example.com"
                    : "https://..."
                }
                value={s.url}
                onChange={(e) => onChange(s.id, { url: e.target.value })}
              />
            </div>
          </div>
        );
      })}
    </SectionShell>
  );
}
