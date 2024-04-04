"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { IconExternalLink, IconExternalLinkSmall } from "..";

/**
 * ViewModel for link component.
 * @typedef {Object} NavLinkProps
 */
/**
 * Props for the NavLink component.
 */
export interface NavLinkProps {
  /**
   * The variant of the link. Accepts "small" or "medium".
   */
  variant: "small" | "medium";
  /**
   * The text of the link.
   */
  label: string;
  /**
   * The icon of the link.
   */
  icon?: React.ReactNode;
  /**
   * The url of the link.
   */
  url: string;
  /**
   * The default color class for the link.
   * @deprecated Use className instead.
   */
  defaultColorClass?: string;
  /**
   * The color class for the link on hover.
   * @deprecated Use className instead.
   */
  onHoverColorClass?: string;
  /**
   * The color class for the link on click.
   * @deprecated Use className instead.
   */
  onClickColorClass?: string;
  /**
   * The TailwindCSS styles for the link.
   */
  className?: string;
}

/**
 * Link component. [CLIENT_SIDE ONLY]
 * This is a link component that can be used to display text links.
 * @param {NavLink} props - The properties of the link.
 */
export const NavLink = ({
  variant,
  label,
  icon,
  url,
  className,
}: NavLinkProps) => {
  const openLink = () => {
    window.open(url, "_blank");
  };
  const classes = twMerge([
    "flex flex-row items-center justify-start gap-2",
    "cursor-pointer",
    "relative",
    "tracking-[-0.04em]",
    "leading-[16px]",
    "font-gluten",
    "transform",
    "transition-all",
    "duration-200",
    "ease-in-out",
    variant === "small" ? "text-xs" : "",
    variant === "medium" ? "text-base" : "",
    "text-left",
    "font-bold",
    "hover:scale-110",
    className ?? "",
  ]);

  return (
    <div role="link" className={classes} onClick={openLink}>
      <div className={icon ? "block" : "hidden"}>{icon}</div>
      <div className="flex flex-row items-start justify-start gap-[2px] p-1">
        {label}
        <div className={url ? "block" : "hidden"}>
          {variant === "medium" && <IconExternalLink size={4} />}
          {variant === "small" && <IconExternalLinkSmall size={4} />}
        </div>
      </div>
    </div>
  );
};
