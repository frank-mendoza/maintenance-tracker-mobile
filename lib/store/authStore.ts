// lib/store/authStore.ts
import { create } from "zustand";
import { fetchCurrentUser, login, logout } from "../api/auth";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  restoreUser: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),

  restoreUser: async () => {
    const res = await fetchCurrentUser();
    if (res) {
      set({ user: res.user, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  handleLogin: async (email, password) => {
    set({ loading: true });
    await login(email, password); // cookie set automatically
    const res = await fetchCurrentUser(); // get user profile
    set({ user: res.user, loading: false });
  },

  handleLogout: async () => {
    await logout(); // clears cookie
    set({ user: null, loading: false });
  },
}));
