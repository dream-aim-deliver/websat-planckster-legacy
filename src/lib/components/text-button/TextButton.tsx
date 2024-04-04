import { twMerge } from "tailwind-merge";

/**
 * The props for the TextButton component.
 * @interface TextButtonProps
 */
export interface TextButtonProps {
  /**
   * The text to be displayed in the button.
   */
  text: string;
  /**
   * The size variant of the button */
  size: "small" | "medium";
  /**
   * The disabled state of the button.
   */
  disabled?: boolean;
  /**
   * The onClick event handler for the button.
   */
  onClick: () => void;
}

/**
 * The TextButton component.
 */
export const TextButton = ({
  text,
  size,
  disabled,
  onClick,
}: TextButtonProps) => {
  return (
    <div
      className={twMerge(
        "h-full relative w-full",
        "flex flex-row items-center justify-start",
        "text-right font-gluten",
        size === "small" ? "text-xs" : "text-base",
        "text-base-colors/brand-600",
        "hover:text-base-colors/brand-400",
        "active:text-base-colors/brand-700",
        "cursor-default",
        "aria-disabled:opacity-40",
        "aria-disabled:pointer-events-none",
        "transition-all",
        "cursor-pointer",
      )}
      role="button"
      aria-disabled={disabled}
    >
      <div
        className="relative tracking-[-0.04em] leading-[12px]"
        aria-disabled={disabled}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};
