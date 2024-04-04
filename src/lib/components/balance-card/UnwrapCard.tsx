import React from "react";
import {
  Button,
  Heading,
  HeadingVariant,
  IconButtonClose,
  InProgressStatusFrame,
  InputAssetAmountWithLabel,
  Label,
  Modal,
} from "..";

import { LightFrame } from "../layouts/LightFrame";
import { type Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { formatNumber } from "~/lib/utils/tokenUtils";

/**
 * Props for the UnwrapModal component
 */
export interface UnwrapCardProps {
  /**
   * The amount to be unwrapped
   */
  amountToUnwrap: Signal<number>;
  /**
   * The wrapped balance i.e. Maximum amount that can be unwrapped
   */
  wrappedBalance: number;
  /**
   * The fee for unwrapping
   */
  fee: number;
  /**
   * The network currency
   * @example "ETH"
   */
  networkCurrency: string;
  /**
   * The short name of the token
   */
  tokenShortName: string;
  /**
   * The icon for the token
   */
  icon: React.ReactNode;
  /**
   * Callback function when the modal is closed
   */
  onClose?: () => void;
  /**
   * Callback function when unwrapping is triggered
   */
  onUnwrap: () => void;
  /**
   * The status message populated during the unwrapping process
   */
  SUnwrapStatusMessage: Signal<string>;
  /**
   * The view of the unwrap card
   */
  SUnwrapCardView: Signal<"unwrapping" | "default" | "unwrapping-ended">;
  SUnwrapEndedStatusFrame: Signal<React.ReactNode>;
}

export const UnwrapCard = ({
  amountToUnwrap,
  wrappedBalance,
  fee,
  networkCurrency,
  tokenShortName,
  icon,
  onClose,
  onUnwrap,
  SUnwrapStatusMessage,
  SUnwrapCardView: SunwrapCardView,
  SUnwrapEndedStatusFrame,
}: UnwrapCardProps) => {
  useSignals();
  const wrappedTokenName = `W${tokenShortName.toUpperCase()}`;
  const amountAfterUnwrapping = amountToUnwrap.value;
  const defaultView = (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <div className="relative flex w-full flex-row justify-between">
        <Heading title="Unwrap" variant={HeadingVariant.H4} />
        <div className="ml-auto">
          <IconButtonClose size={4} onClick={onClose ? onClose : () => {}} />
        </div>
      </div>
      <InputAssetAmountWithLabel
        label="Amount to unwrap"
        maxAmount={wrappedBalance}
        amount={amountToUnwrap}
        tokenShortName={tokenShortName}
        icon={icon}
        errorMessage={
          amountToUnwrap.value > wrappedBalance
            ? "Unwrap more than what ya got?"
            : ""
        }
      />
      <LightFrame className="w-full font-varela text-text-secondary">
        <div className="flex flex-row items-baseline justify-between self-stretch">
          <div className="relative leading-[14px]">Unwrap amount</div>
          <Label
            label={`${formatNumber(amountToUnwrap.value)} ${wrappedTokenName}`}
            variant="medium"
          />
        </div>
        <div className="flex flex-row items-baseline justify-between self-stretch">
          <div className="relative leading-[14px]">Unwrapping fee</div>
          <Label label={`${fee} ${networkCurrency}`} variant="medium" />
        </div>
        <div className="flex flex-row items-baseline justify-between self-stretch">
          <div className="relative leading-[14px]">You will receive</div>
          <Label
            label={`${formatNumber(amountAfterUnwrapping)} ${tokenShortName}`}
            variant="medium"
          />
        </div>
        <Button
          label={`Unwrap ${formatNumber(amountToUnwrap.value)} ${wrappedTokenName}`}
          variant="primary"
          onClick={onUnwrap}
        />
      </LightFrame>
    </div>
  );

  const unwrappingView = (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <div className="relative flex w-full flex-row justify-between">
        <Heading title="Unwrapping" variant={HeadingVariant.H4} />
        <div className="ml-auto">
          <IconButtonClose
            size={4}
            onClick={
              onClose
                ? onClose
                : () => {
                    SunwrapCardView.value = "default";
                  }
            }
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <LightFrame className="w-full items-center gap-4">
          <div className="font-heading-h5 relative inline-block w-full overflow-auto whitespace-normal text-center font-gluten text-lg font-bold leading-[18px] tracking-[-0.04em] text-text-primary">
            <InProgressStatusFrame
              title={`Unwrapping ${formatNumber(amountToUnwrap.value)} W${tokenShortName}`}
              message={SUnwrapStatusMessage.value}
            />
          </div>
        </LightFrame>
      </div>
    </div>
  );

  const unwrappingEndedView = (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <div className="relative flex w-full flex-row justify-between">
        <Heading title="Unwrapping" variant={HeadingVariant.H4} />
        <div className="ml-auto">
          <IconButtonClose
            size={4}
            onClick={
              onClose
                ? onClose
                : () => {
                    SunwrapCardView.value = "default";
                  }
            }
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {SUnwrapEndedStatusFrame.value}
      </div>
    </div>
  );
  return (
    <Modal>
      {SunwrapCardView.value === "default" && defaultView}
      {SunwrapCardView.value === "unwrapping" && unwrappingView}
      {SunwrapCardView.value === "unwrapping-ended" && unwrappingEndedView}
    </Modal>
  );
};
