"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Project = {
  title: string;
  subtitle?: string;
  slug?: { current: string };
  description?: string;
  image?: any;
};
const query = `*[_type == "project"] | order(_createdAt desc){ title, subtitle, slug, description, image }`;

export default function ProjectsIndexPage() {
  const [data, setData] = useState<Project[]>([]);
  useEffect(() => {
    (async () => {
      const res = await client.fetch<Project[]>(query);
      setData(res || []);
    })();
  }, []);

  const items = useMemo(
    () =>
      data.map((p, i) => ({
        ...p,
        _slug:
          p.slug?.current ||
          p.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
          `project-${i}`,
      })),
    [data]
  );

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-20">
        <h1 className="text-[9vw] md:text-5xl font-extrabold tracking-tight">
          Case Studies
        </h1>
        <p className="mt-3 text-white/70">Selected work.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <Link
              key={c._slug + i}
              href={`/projects/${c._slug}`}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="relative aspect-[4/3]">
                {c.image ? (
                  <Image
                    src={urlFor(c.image).url()}
                    alt={c.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5" />
                )}
              </div>
              <div className="p-4">
                <h3 className="mt-1 font-semibold text-lg">{c.title}</h3>
                {c.subtitle && (
                  <p className="text-sm text-white/60">{c.subtitle}</p>
                )}
                {c.description && (
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
