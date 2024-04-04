/* eslint-disable @typescript-eslint/no-unsafe-call */
import { twMerge } from "tailwind-merge";

/**
 * Props for Icon component
 * @private
 */
export interface IconProps {
  /**
   * Additional TailwindCSS classes to apply to the icon.
   */
  classNames?: string;
  /**
   * The fill color for the icon.
   */
  fill?: string;
  /**
   * The height and width of the icon in Tailwind CSS.
   */
  size?: number;
}

/**
 * A helper function to generate the final TailwindCSS classes to apply to the icon's svg element based on its props.
 * @param classNames Additional TailwindCSS classes to apply to the icon's svg element.
 * @param size The height and width of the icon in Tailwind CSS.
 * @param fill The fill color for the icon.
 * @returns The final TailwindCSS classes to apply to the icon's svg element.
 */
export const generateClassesForIcon = ({
  classNames,
  fill,
  size,
}: IconProps) => {
  const finalSize = size ? `h-${size} w-${size}` : "h-6 w-6";
  return twMerge(
    `${finalSize}`,
    "fill-current",
    `text-${fill}`,
    `${classNames}`,
  );
};
