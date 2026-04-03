import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100">
      <Navbar />
      <main className="flex-1 p-6 sm:p-8 pt-20 sm:pt-24">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">About Page</h1>
        <p className="max-w-md text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600 dark:text-zinc-400 font-[family-name:var(--font-kanit)">
          Placeholder Right now.
        </p>
      </main>
      <Footer />
    </div>
  );
}
