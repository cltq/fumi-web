import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-8 bg-white dark:bg-black sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12">
        <div className="flex flex-col items-center gap-4 sm:gap-6 text-center sm:items-start sm:text-left px-2">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Image
              className="dark:invert w-16 sm:w-[100px]"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <span className="text-lg sm:text-2xl font-light text-zinc-400">+</span>
            <div className="bg-black rounded p-0.5 sm:p-1">
              <Image
                src="/react.gif"
                alt="React logo"
                width={28}
                height={28}
                className="w-7 h-7 sm:w-9 sm:h-9"
                unoptimized
              />
            </div>
          </div>
          <h1 className="max-w-xs text-2xl sm:text-3xl font-semibold leading-8 sm:leading-10 tracking-tight text-black dark:text-zinc-50 font-[family-name:var(--font-kanit)]">
            Welcome! ยินดีต้อนรับ!
          </h1>
          <p className="max-w-md text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600 dark:text-zinc-400 font-[family-name:var(--font-kanit)]">
            Welcome to my personal website! But unforetauately, it's still a work in progress. เว็บไซต์ส่วนตัวยังอยู่ในระหว่างการพัฒนา โปรดกลับมาใหม่ในภายหลัง.
          </p>
          <p className="max-w-md text-base sm:text-xl leading-7 sm:leading-8 text-zinc-600 dark:text-zinc-400">
            <span className="font-[family-name:var(--font-geist-pixel-square)]">Visit my bio: </span><a href="https://haunt.gg/fumi" className="text-blue-500 hover:underline font-[family-name:var(--font-geist-pixel-square)]">Here</a>
          </p>
        </div>
        
        <div className="w-full max-w-[280px] sm:max-w-sm aspect-[340/220] shrink-0">
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
