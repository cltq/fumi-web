import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { technologies } from "../lib/technologies";

export const metadata = {
  title: "Technologies | Fumi",
  description: "All technologies used in Fumi's personal website",
};

const categoryLabels: Record<Technology["category"], string> = {
  framework: "Framework",
  language: "Language",
  library: "Library",
  tool: "Tool",
  deployment: "Deployment",
  font: "Font",
};

type Technology = (typeof technologies)[number];

export default function TechnologiesPage() {
  const grouped = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<Technology["category"], Technology[]>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-6 sm:p-8 pt-20 sm:pt-24 pb-32">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-8">Technologies</h1>
        <div className="w-full max-w-2xl space-y-8">
          {Object.entries(grouped).map(([category, techs]) => (
            <section key={category}>
              <h2 className="text-lg sm:text-xl font-medium mb-4 opacity-60">
                {categoryLabels[category as Technology["category"]]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800"
                    style={{ background: "rgba(255, 255, 255, 0.02)" }}
                  >
                    <h3 className="font-medium mb-1">{tech.name}</h3>
                    <p className="text-sm opacity-60">{tech.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
