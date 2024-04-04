import { type Signal, useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { BalanceCardPrimaryVariant } from "./BalanceCardPrimary";
import { WrapCard } from "./WrapCard";
import { UnwrapCard } from "./UnwrapCard";

enum BalanceCardVariants {
  VARIANT_PRIMARY = "primary_variant",
  VARIANT_WRAP = "wrap_variant",
  VARIANT_UNWRAP = "unwrap_variant",
}
/**
 * Props for the BalanceCard component.
 */
export interface BalanceCardProps {
  /**
   * The balance of the inscription.
   */
  inscriptionBalance: number;
  /**
   * The wrapped amount.
   */
  wrappedBalance: number;
  /**
   * The claimable amount.
   */
  claimableAmount: number;
  /**
   * The short name of the token.
   */
  tokenShortName: string;
  /**
   * The icon for the token.
   */
  icon: React.ReactNode;
  /**
   * The transaction fee for wrapping and unwrapping.
   */
  fee: number;
  /**
   * The network currency.
   */
  networkCurrency: string;
  /**
   * Callback function when wrapping is triggered. It should open the wrapping modal.
   */
  onWrap: () => void;
  /**
   * Callback function when unwrapping is triggered. It should open the unwrapping modal.
   */
  onUnwrap: () => void;

  /**
   * Callback function when claiming is triggered. It should open the claiming modal.
   */
  onClaim: () => void;
  /**
   * The amount to wrap, populated by the wrap modal.
   */
  amountToWrap: Signal<number>;
  /**
   * The amount to unwrap, populated by the unwrap modal.
   */
  amountToUnwrap: Signal<number>;
  /**
   * SWrapStatusMessage: The status message populated during the wrapping process.
   */
  SWrapStatusMessage: Signal<string>;
  /**
   * SClaimStatusMessage: The status message populated during the claiming process.
   */
  SClaimStatusMessage: Signal<string>;
  /**
   * SWrapCardView: The view of the wrap card.
   */
  SWrapCardView: Signal<"wrapping" | "claiming" | "default">;
  /**
   * SUnwrapStatusMessage: The status message populated during the unwrapping process.
   */
  SUnwrapStatusMessage: Signal<string>;
  /**
   * SunwrapCardView: The view of the unwrap card.
   */
  SUnwrapCardView: Signal<"unwrapping" | "default" | "unwrapping-ended">;
  /**
   * SUnwrapEndedStatusFrame: The status frame displayed after unwrapping is completed.
   */
  SUnwrapEndedStatusFrame: Signal<React.ReactNode>;
}

/**
 * Renders a balance card component.
 */
export const BalanceCard = (props: BalanceCardProps) => {
  useSignals();
  const activeVariant = useSignal<BalanceCardVariants>(
    BalanceCardVariants.VARIANT_PRIMARY,
  );
  const returnToPrimaryVariant = () => {
    activeVariant.value = BalanceCardVariants.VARIANT_PRIMARY;
  };
  const showWrapVariant = () => {
    activeVariant.value = BalanceCardVariants.VARIANT_WRAP;
  };
  const showUnwrapVariant = () => {
    activeVariant.value = BalanceCardVariants.VARIANT_UNWRAP;
  };
  return (
    <div className="w-full border-none">

      <BalanceCardPrimaryVariant
        showWrapVariant={showWrapVariant}
        showUnwrapVariant={showUnwrapVariant}
        {...props}
      ></BalanceCardPrimaryVariant>

      {activeVariant.value === BalanceCardVariants.VARIANT_WRAP && (
        <WrapCard
          onClose={returnToPrimaryVariant}
          {...props}
        ></WrapCard>
      )}
      
      {activeVariant.value === BalanceCardVariants.VARIANT_UNWRAP && (
        <UnwrapCard
          onClose={returnToPrimaryVariant}
          {...props}
        ></UnwrapCard>
      )}
    </div>
  );
};
