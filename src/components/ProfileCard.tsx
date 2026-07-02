import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { formatFollowers } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

const PLACEHOLDER_AVATAR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2E4YTViNyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz48L3N2Zz4=";

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();
  const [imgSrc, setImgSrc] = useState(profile.picture);

  useEffect(() => {
    setImgSrc(profile.picture);
  }, [profile.picture]);

  const isSelected = selectedProfiles.some((p) => p.user_id === profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username || profile.handle}?platform=${platform}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  const handleImgError = () => {
    setImgSrc(PLACEHOLDER_AVATAR);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 border border-[var(--border)] mb-3 cursor-pointer hover:bg-[var(--accent-bg)] w-full max-w-2xl rounded-xl transition-all duration-200"
      data-search={searchQuery}
    >
      <img
        src={imgSrc}
        onError={handleImgError}
        className="w-16 h-16 rounded-full border border-[var(--border)] object-cover flex-shrink-0"
        alt={profile.username || profile.handle || "Influencer profile"}
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-bold text-[var(--text-h)] flex items-center gap-1.5 truncate">
          @{profile.username || profile.handle}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 truncate">{profile.fullname}</div>
        <div className="text-xs text-gray-400 mt-1 font-medium">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
      <button
        type="button"
        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer flex-shrink-0 ${
          isSelected
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-[var(--accent)] hover:bg-purple-700 text-white"
        }`}
        onClick={handleButtonClick}
      >
        {isSelected ? "Remove" : "Add to List"}
      </button>
    </div>
  );
}
