import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  is_sign_in: boolean;
  is_admin: boolean;
  user_name: string;
  user_profile: number;
  user_tutorial: number;
  access_token: string;
  refresh_token: string;
  setToken: ({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) => void;
  setUserInfo: ({
    is_admin,
    is_sign_in,
    access_token,
    refresh_token,
    user_name,
    user_profile,
    user_tutorial,
  }: {
    is_admin: boolean;
    is_sign_in: boolean;
    access_token: string;
    refresh_token: string;
    user_name: string;
    user_profile: number;
    user_tutorial: number;
  }) => void;
  setTempToken: ({ access_token }: { access_token: string }) => void;
}

export const useAuthStorage = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        is_admin: false,
        is_sign_in: false,
        user_name: "",
        user_profile: 0,
        user_tutorial: 0,
        access_token: "",
        refresh_token: "",
        setToken: ({ access_token, refresh_token }) =>
          set((state) => ({
            access_token: access_token,
            refresh_token: refresh_token,
          })),
        setUserInfo: ({
          is_admin,
          is_sign_in,
          access_token,
          refresh_token,
          user_name,
          user_profile,
          user_tutorial,
        }) =>
          set((state) => ({
            is_admin: is_admin,
            is_sign_in: true,
            access_token,
            refresh_token,
            user_name,
            user_profile,
            user_tutorial,
          })),
        setTempToken: ({ access_token }) =>
          set((state) => ({
            is_admin: false,
            is_sign_in: false,
            user_name: "",
            user_profile: 0,
            user_tutorial: 0,
            access_token: access_token,
          })),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
