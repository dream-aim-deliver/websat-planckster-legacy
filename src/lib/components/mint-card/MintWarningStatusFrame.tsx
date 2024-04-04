import { IconWarning } from "..";
import { LightFrame } from "../layouts/LightFrame";
import { NavLink } from "../nav-link";

/**
 * Props for the MintWarningStatusFrame component.
 */
export interface MintWarningStatusFrameProps {
  error: string;
  message: string;
  explorerLink?: string;
}

/**
 * Displays an error message when the user is on the wrong network.
 * @param props {@link MintWarningStatusFrameProps }
 */
export const MintWarningStatusFrame = (props: MintWarningStatusFrameProps) => {
  return (
    <LightFrame className="w-full items-center gap-4 text-wrap text-base-colors/neutral-400">
      <IconWarning size={12} />
      <div className="font-heading-h5 relative inline-block w-full overflow-auto whitespace-normal text-center font-gluten text-lg font-bold leading-[18px] tracking-[-0.04em] text-text-primary">
        {props.error}
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-4 text-left font-varela text-base">
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
