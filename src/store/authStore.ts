import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  id: string;
  setId: (id: string) => void;
}

export const useAuthStorage = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        id: "testid",
        setId: (id) => set((state) => ({ id: state.id })),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
