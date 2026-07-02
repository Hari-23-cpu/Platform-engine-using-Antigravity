import type { ProfileDetailResponse, SearchData } from "@/types";
import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

// Type-cast JSON data to match the SearchData schema
const instagram = instagramData as unknown as SearchData;
const youtube = youtubeData as unknown as SearchData;
const tiktok = tiktokData as unknown as SearchData;

// Collect all index accounts to search for fallbacks
const allSearchAccounts = [
  ...instagram.accounts,
  ...youtube.accounts,
  ...tiktok.accounts,
];

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  if (!username) return null;

  const target = username.toLowerCase();

  // 1. Try to load from dedicated profiles folder (case-insensitive check)
  const matchingKey = Object.keys(profileModules).find((key) => {
    const filenameWithExt = key.split("/").pop() || "";
    const filename = filenameWithExt.replace(/\.json$/i, "");
    return filename.toLowerCase() === target;
  });

  if (matchingKey) {
    const loader = profileModules[matchingKey];
    const result = await loader();
    const data = (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  }

  // 2. Fallback: Search inside search-list datasets if profile.json is missing
  const matchedAccount = allSearchAccounts.find((item) => {
    const p = item.account.user_profile;
    return (
      (p.username && p.username.toLowerCase() === target) ||
      (p.handle && p.handle.toLowerCase() === target)
    );
  });

  if (matchedAccount) {
    const profile = matchedAccount.account.user_profile;
    return {
      cached: false,
      data: {
        success: true,
        user_profile: {
          ...profile,
          username: profile.username || profile.handle || "",
          description: `This is a preview profile generated from ${matchedAccount.account.audience_source || "search"} data. No extended description available.`,
        },
      },
    };
  }

  return null;
}
