import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

export interface InfluencerStore {
  selectedProfiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  clearProfiles: () => void;
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
}

export const useInfluencerStore = create<InfluencerStore>()(
  persist(
    (set) => ({
      selectedProfiles: [],
      platform: "instagram",
      searchQuery: "",
      addProfile: (profile) =>
        set((state) => {
          const exists = state.selectedProfiles.some(
            (p) => p.user_id === profile.user_id
          );
          if (exists) return state;
          return { selectedProfiles: [...state.selectedProfiles, profile] };
        }),
      removeProfile: (userId) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        })),
      clearProfiles: () => set({ selectedProfiles: [] }),
      setPlatform: (platform) => set({ platform, searchQuery: "" }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
    }),
    {
      name: "influencer-select-store",
    }
  )
);
