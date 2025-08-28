import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  params: Promise<{ slug: string }>;
};

type ImageSource = Parameters<typeof urlFor>[0];

type Project = {
  title: string;
  subtitle?: string;
  description?: string;
  image?: ImageSource;
  slug?: { current: string };
  gallery?: (string | ImageSource)[];
  technologies?: string[];
  url?: string;
};

const query = `*[_type == "project" && slug.current == $slug][0]{ title, subtitle, description, slug, image, gallery, technologies, url }`;

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(query, { slug });

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Case study not found</h1>
          <p className="mt-3 text-white/70">
            This case study is not available yet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-5 py-2 rounded-full bg-white text-black"
          >
            Back home
          </Link>
        </div>
      </main>
    );
  }

  const gallery =
    project.gallery && project.gallery.length ? project.gallery : [];

  const technologies =
    project.technologies && project.technologies.length
      ? project.technologies
      : ["Figma", "Next.js", "React", "Tailwind"]; // fallback badges

  return (
    <main className="bg-black text-white">
      <header className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24">
        <h1 className="mt-4 text-[9vw] md:text-5xl font-extrabold tracking-tight">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mt-2 text-white/60 max-w-2xl">{project.subtitle}</p>
        )}
        {project.description && (
          <p className="mt-4 text-white/70 max-w-2xl">{project.description}</p>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white text-black font-semibold shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.25)] transition-shadow"
          >
            Visit project
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M7 17L17 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        )}
      </header>

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 mt-8 md:mt-10">
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          {project.image ? (
            <Image
              src={urlFor(project.image).url()}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50">
              No cover image
            </div>
          )}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-24">
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            ⭐ Project Gallery
          </h2>
          {gallery.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5"
                >
                  {typeof img === "string" ? (
                    <Image
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={urlFor(img).url()}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
              No gallery images yet.
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h4 className="font-semibold text-lg">Technologies Used</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
