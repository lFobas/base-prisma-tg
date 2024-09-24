import { create } from "zustand";

export const useFilterStore = create((set, get) => ({
  checkedActive: false,
  checkedUsilok: false,
  selectedAdres: "",
  dataCl: [],

  changeActive: () => set((state) => ({ checkedActive: !state.checkedActive })),
  changeUsilok: () => set((state) => ({ checkedUsilok: !state.checkedUsilok })),

  selectAdres: (adres) => set({ selectedAdres: adres }),

  selectDataCl: (data) => set({ dataCl: data }),
}));

export const useUserStore = create((set, get) => ({
  user: null,
  users: [],

  initUser: (data) => set({ user: data }),
  setUsers: (newUsers) => set({ users: newUsers }),
}));
