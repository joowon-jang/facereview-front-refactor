import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  id: string;
  access_token: string;
  refresh_token: string;
  setId: (id: string) => void;
  setToken: ({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) => void;
}

export const useAuthStorage = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        id: "testid",
        access_token: "",
        refresh_token: "",
        setId: (id) => set((state) => ({ id: id })),
        setToken: ({ access_token, refresh_token }) =>
          set((state) => ({
            access_token: access_token,
            refresh_token: refresh_token,
          })),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
