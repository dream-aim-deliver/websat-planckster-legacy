import create from "zustand";

interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  setEndDate: (endDate: Date | null) => void;
  applyFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (startDate: Date | null) => set({ startDate }),
  setEndDate: (endDate: Date | null) => set({ endDate }),
  applyFilter: () => {
    // Assuming `applyFilter` function applies the filter and calls `onApplyFilter` callback
    // with start and end dates.
    set((state) => {
      // Access state.startDate and state.endDate
      // Do not forget to replace onApplyFilter with the actual function
      // onApplyFilter(state.startDate!, state.endDate!);
      return state; // Return the updated state
    });
  },
}));
