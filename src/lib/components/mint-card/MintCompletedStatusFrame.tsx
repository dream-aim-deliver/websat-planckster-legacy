import { IconSuccess } from "..";
import { formatNumber } from "../../utils/tokenUtils";
import { LightFrame } from "../layouts/LightFrame";
import { NavLink } from "../nav-link";

/**
 * Props for the MintCompletedStatusFrame component.
 */
export interface MintCompletedStatusFrameProps {
  /**
   * The short name of the token.
   */
  tokenShortName: string;

  /**
   * The amount of tokens minted.
   */
  amountMinted: number;

  /**
   * The timestamp of the minting.
   */
  timestamp: string;

  /**
   * The link to the explorer for more details.
   */
  explorerLink: string;
}

export const MintCompletedStatusFrame = (
  props: MintCompletedStatusFrameProps,
) => {
  const formattedAmountMinted = formatNumber(props.amountMinted);
  return (
    <LightFrame className="w-full items-center gap-4 text-wrap text-base-colors/neutral-400">
      <IconSuccess size={12} />
      <div className="w-full font-gluten font-bold relative text-lg tracking-[-0.04em] leading-[18px] inline-block font-heading-h5 text-text-primary text-center overflow-auto whitespace-normal">
        You minted {formattedAmountMinted} {props.tokenShortName}
      </div>
      <div className="w-full flex flex-row items-center justify-center text-left text-base font-varela gap-4">
        <label>{props.timestamp}</label>
      </div>
      <NavLink
        variant="small"
        label="View in Explorer"
        url={props.explorerLink}
      />
    </LightFrame>
  );
};
