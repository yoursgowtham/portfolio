import { useEffect, useState, useCallback } from "react";

export type Skill = {
  id: string;
  name: string;
  desc: string;
  level: number;
  icon: string; // lucide icon name
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  tags: string[]; // comma separated in form
  liveUrl: string;
  repoUrl: string;
  image: string; // url
};

export type SocialLink = {
  id: string;
  platform:
    | "instagram"
    | "leetcode"
    | "linkedin"
    | "codechef"
    | "gmail"
    | "github";
  url: string; // full url, or email for gmail
};

export type ContentData = {
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  socials: SocialLink[];
};

const STORAGE_KEY = "portfolio_content_v1";

const uid = () => Math.random().toString(36).slice(2, 10);

export const defaultContent: ContentData = {
  skills: [
    { id: uid(), name: "Frontend", desc: "React, TS, Next.js", level: 92, icon: "Code" },
    { id: uid(), name: "Backend", desc: "Node, Python, REST APIs", level: 85, icon: "Database" },
    { id: uid(), name: "DSA / Problem Solving", desc: "C++, Java, competitive programming", level: 88, icon: "Cpu" },
    { id: uid(), name: "UI / UX", desc: "Figma, design systems", level: 78, icon: "Palette" },
    { id: uid(), name: "Cloud & DevOps", desc: "AWS, Docker, CI/CD", level: 75, icon: "Cloud" },
    { id: uid(), name: "Mobile", desc: "React Native, Expo", level: 70, icon: "Smartphone" },
  ],
  certifications: [
    { id: uid(), name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", url: "#" },
    { id: uid(), name: "Meta Front-End Developer", issuer: "Coursera / Meta", url: "#" },
    { id: uid(), name: "Google Data Analytics", issuer: "Google", url: "#" },
    { id: uid(), name: "Problem Solving (Intermediate)", issuer: "HackerRank", url: "#" },
  ],
  projects: [
    {
      id: uid(),
      title: "Analytics Dashboard",
      desc: "Real-time data visualization platform with drag-and-drop widgets and websocket feeds.",
      tags: ["React", "D3.js", "WebSocket"],
      liveUrl: "#",
      repoUrl: "#",
      image: "",
    },
    {
      id: uid(),
      title: "Mood Journal App",
      desc: "Mobile journaling experience with generative gradients responding to emotions.",
      tags: ["React Native", "Expo"],
      liveUrl: "#",
      repoUrl: "#",
      image: "",
    },
    {
      id: uid(),
      title: "Lumen Commerce",
      desc: "Headless e-commerce storefront with sub-second product pages and AI search.",
      tags: ["Next.js", "Shopify"],
      liveUrl: "#",
      repoUrl: "#",
      image: "",
    },
    {
      id: uid(),
      title: "Nova Chat",
      desc: "AI assistant UI with streaming responses, tool-calling, and a clean thread view.",
      tags: ["TypeScript", "OpenAI"],
      liveUrl: "#",
      repoUrl: "#",
      image: "",
    },
  ],
  socials: [
    { id: uid(), platform: "instagram", url: "#" },
    { id: uid(), platform: "leetcode", url: "#" },
    { id: uid(), platform: "linkedin", url: "#" },
    { id: uid(), platform: "codechef", url: "#" },
    { id: uid(), platform: "gmail", url: "mailto:hello@example.com" },
    { id: uid(), platform: "github", url: "#" },
  ],
};

function loadContent(): ContentData {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<ContentData>;
    return {
      skills: parsed.skills ?? defaultContent.skills,
      certifications: parsed.certifications ?? defaultContent.certifications,
      projects: parsed.projects ?? defaultContent.projects,
      socials: parsed.socials ?? defaultContent.socials,
    };
  } catch {
    return defaultContent;
  }
}

function saveContent(data: ContentData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("portfolio-content-updated"));
}

export function useContent() {
  const [data, setData] = useState<ContentData>(defaultContent);

  useEffect(() => {
    setData(loadContent());
    const handler = () => setData(loadContent());
    window.addEventListener("portfolio-content-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("portfolio-content-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const update = useCallback((updater: (d: ContentData) => ContentData) => {
    setData((prev) => {
      const next = updater(prev);
      saveContent(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    saveContent(defaultContent);
    setData(defaultContent);
  }, []);

  return { data, update, reset, newId: uid };
}
