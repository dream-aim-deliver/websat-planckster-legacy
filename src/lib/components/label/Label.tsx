import { twMerge } from "tailwind-merge";

/**
 * ViewModel for label component.
 * @typedef {Object} LabelProps
 */
export interface LabelProps {
  /**
   * The variant of the label. Accepts "small" or "medium".
   */
  variant: "small" | "medium";
  /**
   * The text of the label.
   */
  label: string;
}

/**
 * Label component.
 * This is a label component that can be used to display text with different styles based on the variant.
 * @param {LabelProps} props - The properties of the label.
 */
export const Label = ({ variant, label }: LabelProps) => {
  const classes = twMerge([
    "relative",
    "text-sm",
    "leading-[14px]",
    "font-varela",
    variant === "small" ? "text-sm" : "",
    variant === "medium" ? "text-base" : "",
    "text-text-primary",
    "text-left",
    "break-all",
  ]);
  return <div className={classes}>{label}</div>;
};
