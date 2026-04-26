import { Github, Instagram, Linkedin, Mail, Code2, Trophy, type LucideIcon } from "lucide-react";
import type { SocialLink } from "./content-store";

export const socialMeta: Record<
  SocialLink["platform"],
  { label: string; icon: LucideIcon; color: string }
> = {
  instagram: { label: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-500" },
  leetcode: { label: "LeetCode", icon: Code2, color: "from-yellow-500 to-orange-500" },
  linkedin: { label: "LinkedIn", icon: Linkedin, color: "from-sky-500 to-blue-600" },
  codechef: { label: "CodeChef", icon: Trophy, color: "from-amber-700 to-yellow-600" },
  gmail: { label: "Gmail", icon: Mail, color: "from-red-500 to-rose-500" },
  github: { label: "GitHub", icon: Github, color: "from-zinc-400 to-zinc-600" },
};

export const platformOrder: SocialLink["platform"][] = [
  "instagram",
  "leetcode",
  "linkedin",
  "codechef",
  "gmail",
  "github",
];
