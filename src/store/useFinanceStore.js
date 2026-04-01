
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTransactions } from "../data/mockData";

const defaultFilters = {
  search: "",
  type: "All",
  category: "All",
  sort: "date_desc",
};

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      role: "viewer",
      theme: "dark",
      filters: defaultFilters,
      selectedTransaction: null,

      setRole: (role) => set({ role }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      setSelectedTransaction: (transaction) =>
        set({ selectedTransaction: transaction }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      updateTransaction: (id, patch) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...patch } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      seedDemoData: () => set({ transactions: initialTransactions }),
    }),
    {
      name: "finance-dashboard-store",
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
      }),
    }
  )
);