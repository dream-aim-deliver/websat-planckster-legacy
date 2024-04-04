import React from "react";
import { useSortStore } from "./sort.logic";

interface SortProps {
  onSort: (sortBy: string, sortOrder: "asc" | "desc") => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sort: React.FC<SortProps> = ({ onSort }) => {
  const { sortBy, sortOrder, setSortBy, setSortOrder, applySort } =
    useSortStore();

  return (
    <div>
      <label htmlFor="sortBy">Sort By:</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date">Date</option>
        <option value="name">Name</option>
        {/* Add more options as needed */}
      </select>
      <label htmlFor="sortOrder">Sort Order:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={applySort}>Apply Sort</button>
    </div>
  );
};

export default Sort;
