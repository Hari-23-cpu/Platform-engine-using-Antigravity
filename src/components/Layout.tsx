import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="w-full min-h-screen text-white antialiased selection:bg-purple-500/30">
      <div className="max-w-[1126px] mx-auto min-h-screen flex flex-col p-6 relative z-10">
        
        {/* Top Header Block with Fade-In Up Animation */}
        <header className="mb-6 animate-[fadeInUp_0.6s_ease-out_both]">
          <span className="block font-mono text-[11px] tracking-[0.2em] uppercase text-purple-400">
            Platform Engine
          </span>
          <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-white mt-2">
            {title || "Find Influencers"}
          </h1>
        </header>

        {/* Main Content Area with Slight Animation Delay */}
        <main className="w-full animate-[fadeInUp_0.6s_ease-out_0.15s_both]">
          {children}
        </main>

      </div>
    </div>
  );
}