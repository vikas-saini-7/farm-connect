import { create } from "zustand";

interface Certificate {
  title: string;
  issuedBy: string;
  issuedOn: string;
  certificateUrl: string;
}

interface Location {
  title: string;
  latitude: number;
  longitude: number;
}

interface Review {
  // Add review properties when needed
}

interface Profile {
  username: string;
  email: string;
  category: string;
  certificate: Certificate;
  contactNumber: string;
  createdAt: string;
  isOnboarded: boolean;
  location: Location;
  reviews: Review[];
  role: string;
  updatedAt: string;
}

interface ProfileStore {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

export const useProfile = create<ProfileStore>((set) => ({
  profile: null,
  isLoading: true,
  error: null,
  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch("/api/profile");
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      set({ profile: data.data, isLoading: false });
      // console.log(data.data);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
