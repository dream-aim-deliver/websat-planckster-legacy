import React from "react";
import { twMerge } from "tailwind-merge";
import { type IconButtonProps, IconClose } from "..";

/**
 * The CloseIconButton component.
 */
export const IconButtonClose = ({
  disabled,
  defaultBackgroundColor = "base-colors/brand-600",
  onHoverBackgroundColor = "base-colors/brand-400",
  onPressBackgroundColor = "base-colors/brand-700",
  onClick,
  size = 4,
}: IconButtonProps) => {
  const classNames = twMerge(
    `hover:${onHoverBackgroundColor}`,
    `active:${onPressBackgroundColor}`,
    "cursor-pointer",
    "aria-disabled:opacity-40",
    "aria-disabled:pointer-events-none",
    "transition-all",
  );
  return (
    <div
      className={twMerge(
        "h-full relative w-full",
        "flex flex-row items-center justify-start",
        `text-${defaultBackgroundColor}`,
        `hover:text-${onHoverBackgroundColor}`,
        `active:text-${onPressBackgroundColor}`,
        "cursor-default",
        "aria-disabled:opacity-40",
        "aria-disabled:pointer-events-none",
        "transition-all",
      )}
      role="button"
      aria-disabled={disabled}
      onClick={onClick}
    >
      <IconClose size={size} classNames={classNames} />
    </div>
  );
};
