import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useInfluencerStore } from "@/store/useInfluencerStore";

const PLACEHOLDER_AVATAR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2E4YTViNyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz48L3N2Zz4=";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  useEffect(() => {
    if (!username) return;

    let active = true;
    setLoaded(false);
    loadProfileByUsername(username).then((data) => {
      if (active) {
        setProfileData(data);
        setLoaded(true);
        if (data?.data?.user_profile?.picture) {
          setImgSrc(data.data.user_profile.picture);
        }
      }
    });

    return () => {
      active = false;
    };
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p className="text-red-500 font-semibold mb-4">Invalid profile username</p>
        <Link to="/" className="text-blue-600 underline">Back to Search</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading details...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);

  const handleToggleSelect = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  const handleImgError = () => {
    setImgSrc(PLACEHOLDER_AVATAR);
  };

  return (
    <Layout title={user.fullname || `@${user.username}`}>
      <Link
        to="/"
        className="font-display text-sm font-semibold tracking-wide text-[#c084fc] hover:text-[#f472b6] transition-all duration-200 ease-in-out mb-6 inline-block hover:translate-x-[-2px] drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]"
      >
        ← Back to search
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-left max-w-2xl mx-auto border border-[var(--border)] rounded-2xl p-6 bg-[var(--bg)] shadow-sm">
        <img
          src={imgSrc || PLACEHOLDER_AVATAR}
          onError={handleImgError}
          className="w-24 h-24 rounded-full border border-[var(--border)] object-cover shadow-sm flex-shrink-0"
          alt={user.username || user.handle}
        />
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-[var(--text-h)] flex items-center gap-1.5">
            @{user.username || user.handle}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-500 font-medium">{user.fullname}</p>
          <p className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
            Platform: {platform}
          </p>

          {user.description && (
            <p className="mt-4 text-sm text-gray-700 leading-relaxed border-t border-[var(--border)] pt-3">
              {user.description}
            </p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
              <div className="text-gray-400 text-xs font-semibold">Followers</div>
              <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                {formatFollowers(user.followers)}
              </div>
            </div>
            <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
              <div className="text-gray-400 text-xs font-semibold">Engagement Rate</div>
              <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
                <div className="text-gray-400 text-xs font-semibold">Posts</div>
                <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                  {user.posts_count}
                </div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
                <div className="text-gray-400 text-xs font-semibold">Avg Likes</div>
                <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                  {formatFollowers(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
                <div className="text-gray-400 text-xs font-semibold">Avg Comments</div>
                <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                  {formatFollowers(user.avg_comments)}
                </div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
                <div className="text-gray-400 text-xs font-semibold">Avg Views</div>
                <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                  {formatFollowers(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border border-[var(--border)] p-3 rounded-xl bg-[var(--bg)]">
                <div className="text-gray-400 text-xs font-semibold">Engagements</div>
                <div className="font-bold text-[var(--text-h)] text-lg mt-0.5">
                  {formatFollowers(user.engagements)}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[var(--border)] text-sm font-semibold rounded-lg hover:bg-[var(--accent-bg)] hover:border-[var(--accent)] text-[var(--text-h)] transition-all cursor-pointer"
              >
                View on platform →
              </a>
            )}

            <button
              type="button"
              onClick={handleToggleSelect}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${isSelected
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[var(--accent)] hover:bg-purple-700 text-white"
                }`}
            >
              {isSelected ? "Remove from List" : "Add to List"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
