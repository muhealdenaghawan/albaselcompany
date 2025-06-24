import { Constants } from "@/constants/constants";
import Cookies from "js-cookie";
import { create } from "zustand";

export type TAuthAccount = {
  token: string;
  user: {
    id: 1;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    role: string;
    created_at: string;
  };
};

interface AuthState {
  auth: {
    account: TAuthAccount | null;
    setAccount: (accountData: TAuthAccount | null) => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  return {
    auth: {
      account: Cookies.get(Constants.ACCOUNT)
        ? (JSON.parse(Cookies.get(Constants.ACCOUNT) ?? "") as TAuthAccount)
        : null,
      setAccount: (dataAccount) => {
        Cookies.set(Constants.ACCOUNT, JSON.stringify(dataAccount));
        return set((state) => ({
          ...state,
          auth: { ...state.auth, account: dataAccount },
        }));
      },

      reset: () =>
        set((state) => {
          Cookies.remove(Constants.ACCOUNT);
          return {
            ...state,
            auth: { ...state.auth, account: null },
          };
        }),
    },
  };
});

// export const useAuth = () => useAuthStore((state) => state.auth)
