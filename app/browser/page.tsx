import { Suspense } from "react";
import BrowserContent from "./BrowserContent";

export default function Browser() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen items-stretch font-[family-name:var(--font-geist-pixel-square)]" />
      }
    >
      <BrowserContent />
    </Suspense>
  );
}
