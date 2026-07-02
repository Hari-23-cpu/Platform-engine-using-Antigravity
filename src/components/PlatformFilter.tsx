import { useInfluencerStore } from "@/store/useInfluencerStore";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

export function PlatformFilter() {
  const { platform, setPlatform, searchQuery, setSearchQuery } = useInfluencerStore();

  return (
    <div className="mb-6 w-full max-w-md mx-auto px-4">
      <div className="flex gap-2 justify-center mb-4">
        {PLATFORMS.map((p) => {
          const isSelected = platform === p;

          // 🛠️ Convert to standard string and lowercase to safely prevent ts(2367)
          const currentPlatform = String(p).toLowerCase();

          let hoverStyles = "";
          if (currentPlatform === "instagram") {
            hoverStyles = "hover:bg-[#aa3bff] hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(170,59,255,0.4)]";
          } else if (currentPlatform === "youtube") {
            hoverStyles = "hover:bg-[#ff0000] hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]";
          } else if (currentPlatform === "tiktok") {
            hoverStyles = "hover:bg-[#00f2ea] hover:text-black hover:border-transparent hover:shadow-[0_0_20px_rgba(0,242,234,0.5)]";
          }

          return (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`px-4 py-2 text-sm font-semibold border rounded-lg transition-all duration-250 cubic-bezier(0.16,1,0.3,1) hover:-translate-y-0.5 cursor-pointer ${isSelected
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
                : `bg-white/5 text-white border-white/10 ${hoverStyles}`
                }`}
            >
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${getPlatformLabel(platform)} creators by name, username or handle...`}
          className="w-full border border-white/10 bg-white/5 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder-gray-400"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-sm cursor-pointer font-bold"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
