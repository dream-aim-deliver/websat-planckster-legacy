import { IconError } from "..";
import { LightFrame } from "../layouts/LightFrame";
import { NavLink } from "../nav-link";

/**
 * Props for the MintErrorStatusFrame component.
 */
export interface MintErrorStatusFrameProps {
  error: string;
  message: string;
  explorerLink?: string;
}

/**
 * Displays an error message when the user is on the wrong network.
 * @param props {@link MintErrorStatusFrameProps}
 */
export const MintErrorStatusFrame = (props: MintErrorStatusFrameProps) => {
  return (
    <LightFrame className="w-full items-center gap-4 text-wrap text-base-colors/neutral-400">
      <IconError size={12} />
      <div className="w-full font-gluten font-bold relative text-lg tracking-[-0.04em] leading-[18px] inline-block font-heading-h5 text-text-primary text-center overflow-auto whitespace-normal">
        {props.error}
      </div>
      <div className="w-full flex flex-row items-center justify-center text-left text-base font-varela gap-4">
        <label>{props.message}</label>
      </div>
      {props.explorerLink && (
        <NavLink
          variant="small"
          label="View in Explorer"
          url={props.explorerLink}
        />
      )}
    </LightFrame>
  );
};
