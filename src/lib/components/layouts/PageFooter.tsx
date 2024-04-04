import { twMerge } from "tailwind-merge";
import { RalphLogo } from "../ralph-logo";
import { IconMooseHorn } from "..";
import { type Signal } from "@preact/signals-react";

export const PageFooter = ({
  menuOpenSignal,
}: {
  menuOpenSignal: Signal<boolean>;
}) => {
  return (
    <div
      className={twMerge(
        "relative flex w-full flex-col items-center justify-center",
        "gap-[16px]",
        "text-left font-varela text-text-inverted",
        "text-sm",
      )}
    >
       <div className="relative flex w-full flex-col items-center justify-center text-center font-varela mb-8 mt-16">
        {`Ralph's UI may take a few seconds to update balances due to relayer response delays (around 5-6 seconds). Rest assured, your funds are safe, just give it a moment to catch up. Thank you for your patience!`}
      </div>
      {!menuOpenSignal.value && (
        <div className="items-center">
          <RalphLogo variant="icon" />
        </div>
      )}
     
      <div className="flex flex-row items-start justify-start gap-[4px]">
        <div className="relative leading-[14px]">{`Crafted with `}</div>
        <div className="h-full self-stretch">
          <IconMooseHorn size={4} />
        </div>
        <div className="relative leading-[14px]">by the Ralph team</div>
      </div>
    </div>
  );
};
