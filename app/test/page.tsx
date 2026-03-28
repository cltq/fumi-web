import DynamicIslandNav from "../components/DynamicIslandNav";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <DynamicIslandNav />
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-semibold mb-4">Test Page</h1>
        <p className="max-w-xl text-center text-xl">
          Placeholder Right now.
        </p>
      </main>
    </div>
  );
}