import { twMerge } from "tailwind-merge";

/**
 * The props for the IconButton component.
 * @interface IconButtonProps
 */
export interface IconButtonProps {
  /**
   * The TailwindCSS height and width of the button */
  size: number;
  /**
   * The disabled state of the button.
   */
  disabled?: boolean;
  /**
   * The default background color of the button. Use TailwindCSS color classes.
   */
  defaultBackgroundColor?: string;
  /**
   * The background color of the button on hover. Use TailwindCSS color classes.
   */
  onHoverBackgroundColor?: string;
  /**
   * The background color of the button on press. Use TailwindCSS color classes.
   */
  onPressBackgroundColor?: string;
  /**
   * The onClick event handler for the button.
   */
  onClick: () => void;
}

export const generateClassesForIconButton = (props: IconButtonProps) => {
  return twMerge(
    `hover:${props.onHoverBackgroundColor}`,
    `active:${props.onPressBackgroundColor}`,
    "cursor-pointer",
    "aria-disabled:opacity-40",
    "aria-disabled:pointer-events-none",
    "transition-all",
  );
};
