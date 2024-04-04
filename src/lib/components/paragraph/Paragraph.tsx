import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * ViewModel for paragraph component.
 */
export interface ParagraphProps {
  /**
   * The variant of the paragraph. Accepts "medium".
   */
  variant?: "medium";
  /**
   * The content of the Paragraph. Can be text or other components.
   */
  children: ReactNode;
}

/**
 * This is a paragraph component that accepts text or other components as its children.
 * @param {ParagraphProps} props - The properties of the paragraph.
 */
export const Paragraph = ({ children }: ParagraphProps) => {
  const classes = twMerge([
    "relative",
    "text-base",
    "leading-[160%]",
    "font-varela",
    "text-text-primary",
    "text-left",
  ]);
  return <p className={classes}>{children}</p>;
};
