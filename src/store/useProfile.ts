import { create } from 'zustand'

interface Profile {
  id: string;
  username: string;
  email: string;
  // add other profile fields as needed
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
      const response = await fetch('/api/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      set({ profile: data.data, isLoading: false });
      console.log(data.data)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));