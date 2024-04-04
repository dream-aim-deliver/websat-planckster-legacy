import { twMerge } from "tailwind-merge";
import { primaryStyles, secondaryStyles } from "./Button.styles";

/**
 * Props for the button component or the ButtonViewModel
 */
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant: "primary" | "secondary";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional disabled state
   */
  disabled?: boolean;
}

/**
 * This is the button component
 */
export const Button = ({
  variant = "primary",
  label,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  let containerClasses = "";
  let buttonClasses = "";
  if (variant === "primary") {
    containerClasses = twMerge(primaryStyles, "cursor-pointer");
  }
  if (variant === "secondary") {
    containerClasses = twMerge(secondaryStyles, "cursor-pointer");
    // Add padding to secondary buttons
    buttonClasses = twMerge(buttonClasses, "px-12");
  }

  return (
    <div
      className={containerClasses}
      aria-disabled={disabled}
      onClick={disabled ? () => {} : onClick}
    >
      <div
        aria-disabled={disabled}
        role="button"
        className={buttonClasses}
        {...props}
      >
        {label}
      </div>
    </div>
  );
};
