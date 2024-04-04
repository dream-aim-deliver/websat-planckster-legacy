import React from "react";
import { useFilterStore } from "./filter.logic";

interface FilterProps {
  onApplyFilter: (startDate: Date, endDate: Date) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Filter: React.FC<FilterProps> = ({ onApplyFilter }) => {
  const { startDate, endDate, setStartDate, setEndDate, applyFilter } =
    useFilterStore();

  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate ? startDate.toISOString().split("T")[0] : ""}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate ? endDate.toISOString().split("T")[0] : ""}
        onChange={(e) => setEndDate(new Date(e.target.value))}
      />
      <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
