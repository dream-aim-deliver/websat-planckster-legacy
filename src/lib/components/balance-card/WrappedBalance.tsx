import { Tooltip, Label, Button } from "..";
import { LightFrame } from "../layouts/LightFrame";

/**
 * Renders a Wrapped Balance section of Balance Card Primary Variant.
 */
export const WrappedBalance = ({
  wrappedBalance: wrappedBalance,
  tokenShortName,
  onClick,
}: {
  wrappedBalance: number;
  tokenShortName: string;
  onClick: () => void;
}) => {
  const wrappedTokenName = `W${tokenShortName.toUpperCase()}`;
  const wrappedBalanceString =
    Intl.NumberFormat(`en-US`).format(wrappedBalance);
  return (
    <LightFrame className="w-full">
      <div className="w-full relative flex flex-col items-center justify-start gap-[8px]">
        <Tooltip
          title="Wrapped"
          content={`The ${wrappedTokenName} you have in your wallet.`}
        />
        <div className="flex flex-row items-center space-x-2">
          <Label label={wrappedBalanceString} variant="medium" />
          <Label label={wrappedTokenName} variant="medium" />
        </div>
      </div>
      <div className="w-full">
        <Button label="Unwrap" onClick={onClick} variant="secondary" />
      </div>
    </LightFrame>
  );
};
