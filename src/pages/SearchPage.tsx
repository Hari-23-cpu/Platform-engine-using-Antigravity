import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { formatFollowers } from "@/utils/formatters";
import { Link } from "react-router-dom";

export function SearchPage() {
  const { platform, searchQuery, selectedProfiles, removeProfile, clearProfiles } = useInfluencerStore();

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  return (
    <Layout title="Find Influencers">
      {/* 1. ANIMATED SUB-HEADER TEXT */}
      <span className="block text-center text-xs font-semibold tracking-widest uppercase mb-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-fuchsia-400 bg-300% animate-gradient-text bg-clip-text text-transparent">
        Influencer Search
      </span>

      <p className="text-gray-400 mb-8 text-sm text-center font-medium">
        Browse top creators across social platforms
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center max-w-6xl mx-auto w-full px-4 mb-8">
        {/* Main Search Panel */}
        <div className="flex-1 w-full flex flex-col items-center">
          <PlatformFilter />

          <div className="w-full max-w-2xl text-left mb-2">
            <p className="text-xs text-gray-400">
              Showing {filtered.length} of {allProfiles.length} on {platform.toUpperCase()}
            </p>
          </div>

          <div className="w-full">
            <ProfileList
              profiles={filtered}
              platform={platform}
              searchQuery={searchQuery}
              onProfileClick={() => { }}
            />
          </div>
        </div>

        {/* 2. GLASSMORPHISM SIDEBAR */}
        <div className="w-full lg:w-80 border border-white/10 rounded-xl p-4 bg-white/[0.03] backdrop-blur-md shadow-2xl text-left lg:sticky lg:top-4">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
            <h3 className="font-bold text-white flex items-center gap-2 font-display">
              Selected List
              <span className="bg-purple-600/80 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {selectedProfiles.length}
              </span>
            </h3>
            {selectedProfiles.length > 0 && (
              <button
                type="button"
                onClick={clearProfiles}
                className="text-xs text-red-400 hover:text-red-500 font-semibold cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {selectedProfiles.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              <p>No influencers selected.</p>
              <p className="text-xs mt-1 text-gray-500">Click "Add to List" on a profile card to add.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
              {selectedProfiles.map((profile) => (
                <div
                  key={profile.user_id}
                  className="flex items-center gap-3 p-2.5 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/[0.07] transition-all duration-150 relative group"
                >
                  <img
                    src={profile.picture}
                    className="w-10 h-10 rounded-full border border-white/10 object-cover"
                    alt={profile.username || profile.handle}
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${profile.username || profile.handle}?platform=${platform}`}
                      className="font-semibold text-sm text-white hover:text-purple-400 block truncate"
                    >
                      @{profile.username || profile.handle}
                    </Link>
                    <span className="text-[10px] text-gray-400 font-medium block">
                      {formatFollowers(profile.followers)} followers
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProfile(profile.user_id)}
                    className="text-gray-400 hover:text-red-400 text-sm cursor-pointer p-1 rounded hover:bg-white/5 transition-colors"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
