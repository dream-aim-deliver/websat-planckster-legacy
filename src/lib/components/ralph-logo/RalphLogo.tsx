import logo from "@/assets/ralph-logo.svg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
export interface RalphLogoProps {
  variant: "icon" | "full-vertical" | "full-horizontal";
}

export const RalphLogo = ({ variant }: RalphLogoProps) => {
  const ralphIcon = (
    <Image
      className={twMerge("max-w-full overflow-hidden object-contain")}
      alt="ralph"
      src={logo}
    />
  );
  const ralphText = (
    <div
      className={
        "object-fill text-2xl font-semibold font-gluten text-base-colors/neutral-900 dark:text-base-colors/neutral-50 text-center p-0"
      }
    >
      <div className="leading-[1.1]">
        <span className="tracking-[-0.02em]">R</span>
        <span className="tracking-[-0.06em]">a</span>
        <span className="tracking-[-0.17em]">l</span>
        <span className="tracking-[-0.06em]">p</span>
        <span className="tracking-[-0.04em]">h</span>
      </div>
    </div>
  );
  const footerText = (
    <div
      className={twMerge(
        " relative text-xs font-semibold font-gluten",
        "text-base-colors/neutral-900 dark:text-base-colors/neutral-50",
        "text-left inline-flex justify-center items-center",
        "space-x-2",
        "leading-snug",
      )}
    >
      <div className="tracking-widest leading-snug">
        <span className="tracking-widest">T</span>
        <span className="tracking-widest">H</span>
        <span className="tracking-widest">E</span>
      </div>
      <div className="tracking-widest leading-snug">
        <span>M</span>
        <span>O</span>
        <span>O</span>
        <span>S</span>
        <span>E</span>
      </div>
    </div>
  );
  return (
    <div
      className={twMerge(
        "h-full w-full items-center relative object-contain",
        variant === "full-vertical" && "flex flex-col",
        variant === "full-horizontal" && "flex flex-row",
      )}
    >
      <div className="items-center">{ralphIcon}</div>
      {variant !== "icon" && (
        <div className="flex flex-col justify-center items-center">
          {ralphText}
          {footerText}
        </div>
      )}
    </div>
  );
};
