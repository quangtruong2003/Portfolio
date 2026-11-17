import { MetadataRoute } from "next";
import { PROJECTS } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://quangtruong.dev",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...PROJECTS.map((project) => ({
      url: `https://quangtruong.dev/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
