import create from "zustand";

interface SortState {
  sortBy: string;
  sortOrder: "asc" | "desc";
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  applySort: () => void;
}

export const useSortStore = create<SortState>((set) => ({
  sortBy: "date",
  sortOrder: "asc",
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  applySort: () => {
    // Assuming `applySort` function applies the sorting and calls `onSort` callback
    // with sortBy and sortOrder.
    set((state) => {
      // Access state.sortBy and state.sortOrder
      // get to replaDo not force onSort with the actual function
      // onSort(state.sortBy, state.sortOrder);
      return state;
    });
  },
}));
