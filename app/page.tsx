import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-black text-zinc-100 font-sans">
      <Navbar />
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-zinc-100 sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center sm:items-start sm:text-left px-2 w-full sm:w-auto">
          <h1 className="max-w-xs sm:max-w-sm md:max-w-md text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-7 sm:leading-8 md:leading-10 tracking-tight text-zinc-100 font-[family-name:var(--font-kanit)]">
            Welcome! ยินดีต้อนรับ!
          </h1>
          <p className="max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-zinc-200 font-[family-name:var(--font-kanit)]">
            Welcome to my personal website! But unfortunately, it's still a work in progress. Come back later!
          </p>
          <p className="max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-zinc-200 font-[family-name:var(--font-kanit)]">
            เว็บไซต์ส่วนตัวยังอยู่ในระหว่างการพัฒนา โปรดกลับมาใหม่ในภายหลัง.
          </p>
          <p className="max-w-xs sm:max-w-sm md:max-w-md text-xs sm:text-sm md:text-base lg:text-xl leading-5 sm:leading-6 md:leading-7 lg:leading-8 text-zinc-600 dark:text-zinc-400">
            <span className="font-[family-name:var(--font-geist-pixel-square)]">Visit my bio: </span><a href="https://haunt.gg/fumi" className="text-blue-500 hover:underline font-[family-name:var(--font-geist-pixel-square)]">Here</a>
          </p>
        </div>

        <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-md aspect-[340/220] shrink-0 mt-4 sm:mt-0">
          <iframe
            className="w-full h-full rounded-lg border-none"
            title="Discord user embed"
            sandbox="allow-scripts"
            src="https://widgets.vendicated.dev/user?id=969088519161139270&theme=dark&banner=true&full-banner=true&rounded-corners=true&discord-icon=true&badges=false&guess-nitro=false&"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
