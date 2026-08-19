import { create } from "zustand";

type AuthStore = {
  status: "authenticated" | "unAuthenticated" | "unknown";
  login: () => void;
  logout: () => void;
};
export const useAuthStore = create<AuthStore>((set) => ({
  status: "unknown",

  login: () =>
    set({
      status: "authenticated",
    }),

  logout: () =>
    set({
      status: "unAuthenticated",
    }),
}));
