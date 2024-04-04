import { twMerge } from "tailwind-merge";

export const primary = twMerge(
  `text-3xl bg-primary text-white`,
  `hover:bg-blue-700`,
);

export const secondary = twMerge(`bg-gray-500 text-white`, `hover:bg-gray-700`);
