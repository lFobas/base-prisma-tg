import { create } from "zustand";
import { iUser } from "./types/user";
import { iClient, IClientView } from "./types/client";

// Типи для фільтра
interface FilterStore {
  checkedActive: boolean;
  checkedUsilok: boolean;
  selectedAdres: string;
  dataCl: IClientView[]; // бажано типізувати, наприклад: `RecordType[]`

  changeActive: () => void;
  changeUsilok: () => void;
  selectAdres: (adres: string) => void;
  selectDataCl: (data: any[]) => void; // також бажано типізувати
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  checkedActive: false,
  checkedUsilok: false,
  selectedAdres: "",
  dataCl: [],

  changeActive: () => set((state) => ({ checkedActive: !state.checkedActive })),
  changeUsilok: () => set((state) => ({ checkedUsilok: !state.checkedUsilok })),
  selectAdres: (adres) => set({ selectedAdres: adres }),
  selectDataCl: (data) => set({ dataCl: data }),
}));




interface UserStore {
  user: iUser | null;
  users: iUser[];

  initUser: (data: iUser) => void;
  setUsers: (newUsers: iUser[]) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  users: [],

  initUser: (data) => set({ user: data }),
  setUsers: (newUsers) => set({ users: newUsers }),
}));
