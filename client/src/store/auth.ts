import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import { User } from '../types/types';

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  setAuthenticated: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
  user: User | null | undefined;
  setUserData: (value: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    authenticated: false,
    loading: true,
    setAuthenticated: (value) =>
      set({
        authenticated: value,
      }),
    setLoading: (value) =>
      set({
        loading: value,
      }),
    user: undefined,
    setUserData: (value) => {
      set({
        user: value,
      });
    },
  }))
);
