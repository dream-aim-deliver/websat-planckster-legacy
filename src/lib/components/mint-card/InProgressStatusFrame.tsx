import { IconHourglass } from "..";
import { LightFrame } from "../layouts/LightFrame";

/**
 * Props for the InProgressStatusFrameProps component.
 */
export interface InProgressStatusFrameProps {
  /**
   * The title of the message.
   */
  title: string;
  /**
   * A message to display to the user.
   */
  message: string;
}

/**
 * Displays a message when the user is minting tokens.
 * @param props {@link InProgressStatusFrameProps}
 */
export const InProgressStatusFrame = (props: InProgressStatusFrameProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 font-varela text-base text-text-secondary">
      <LightFrame className="w-full items-center gap-4">
        <IconHourglass size={12} />
        <div className="font-heading-h5 relative inline-block w-full overflow-auto whitespace-normal text-center font-gluten text-lg font-bold leading-[18px] tracking-[-0.04em] text-text-primary">
          {props.title}
        </div>
        <div className="flex w-full flex-row items-center justify-center text-center">
          <p className="text-center">{props.message}</p>
        </div>
        <div className="flex w-full flex-row items-center justify-center text-center">
          <p className="text-center">Do not refresh this page!</p>
        </div>
      </LightFrame>
    </div>
  );
};
