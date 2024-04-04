import { twMerge } from "tailwind-merge";

/**
 * A light frame component that wraps its children with a rounded rectangle background, border, and padding.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be wrapped by the light frame.
 * @param {string} [props.className] - Additional CSS class name(s) to apply to the light frame.
 * @returns {JSX.Element} The rendered light frame component.
 */
export const LightFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        [
          "relative",
          "w-full",
          "rounded-3xl",
          "bg-base-colors/neutral-50",
          "box-border",
          "flex",
          "flex-col",
          "p-4",
          "gap-y-4", // Add this class to increase vertical space between children
          "text-base-colors/neutral-900",
          "border-[1px]",
          "border-solid",
          "border-base-colors/neutral-200",
          `${className}`,
        ].join(" "),
      )}
    >
      {children}
    </div>
  );
};
