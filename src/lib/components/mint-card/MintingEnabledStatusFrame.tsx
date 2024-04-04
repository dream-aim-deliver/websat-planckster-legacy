import { IconSuccess, Label } from "..";
import { formatNumber } from "../../utils/tokenUtils";
import { LightFrame } from "../layouts/LightFrame";

/**
 * Props for the MintingEnabledFrame component.
 * @param eligibleAmount The amount of tokens the user is eligible to mint.
 * @param expectedReturn The amount of tokens the user will receive.
 * @param fee The minting fee.
 * @param feeCurrency The currency of the minting fee.
 * @param tokenShortName The short name of the token.
 */
export interface MintEnabledStatusFrameProps {
  eligibleAmount: number;
  expectedReturn: number;
  fee: number;
  feeCurrency: string;
  tokenShortName: string;
}
export const MintEnabledStatusFrame = (props: MintEnabledStatusFrameProps) => {
  const formatedEligibleAmount = formatNumber(props.eligibleAmount);
  const formattedExpectedReturn = formatNumber(props.expectedReturn);
  return (
    <LightFrame className="w-full items-center gap-4 text-left text-base font-varela text-text-secondary">
      <IconSuccess size={12} />
      <div className="w-full font-gluten font-bold relative text-lg tracking-[-0.04em] leading-[18px] inline-block font-heading-h5 text-text-primary text-center overflow-auto whitespace-normal">
        {`You're eligible to mint ${formatedEligibleAmount} ${props.tokenShortName}`}
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <label>{`You'll receive`}</label>
        <Label
          label={`${formattedExpectedReturn} ${props.tokenShortName}`}
          variant="medium"
        />
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <label>Minting Fee</label>
        <Label label={`${props.fee} ${props.feeCurrency}`} variant="medium" />
      </div>
    </LightFrame>
  );
};
