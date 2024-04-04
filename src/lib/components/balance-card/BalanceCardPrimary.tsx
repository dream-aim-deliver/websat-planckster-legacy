import { Card, Heading, HeadingVariant } from "..";
import { InscriptionBalance } from "./InscriptionBalance";
import { WrappedBalance } from "./WrappedBalance";

/**
 * Props for the BalanceCardPrimaryVariant component.
 */
export interface BalanceCardPrimaryVariantProps {
  /**
   * The balance of the inscription.
   */
  inscriptionBalance: number;
  /**
   * The wrapped amount.
   */
  wrappedBalance: number;
  /**
   * The short name of the token.
   */
  tokenShortName: string;
  /**
   * Callback function when wrapping is triggered. It should open the wrapping modal.
   */
  showWrapVariant: () => void;
  /**
   * Callback function when unwrapping is triggered. It should open the unwrapping modal.
   */
  showUnwrapVariant: () => void;
}

/**
 * Renders a Primary Variant of the balance card component.
 * This is composed of the Inscription Balance and Wrapped Balance components.
 */
export const BalanceCardPrimaryVariant = ({
  inscriptionBalance,
  wrappedBalance,
  tokenShortName,
  showWrapVariant,
  showUnwrapVariant,
}: BalanceCardPrimaryVariantProps) => {
  return (
    <Card>
      <div className="w-full flex flex-col items-start justify-center gap-4">
        <Heading title="Balance" variant={HeadingVariant.H4} />
        <div className="w-full grid grid-cols-2 items-center justify-between gap-4">
          <InscriptionBalance
            inscriptionBalance={inscriptionBalance}
            tokenShortName={tokenShortName}
            onClick={showWrapVariant}
          />
          <WrappedBalance
            wrappedBalance={wrappedBalance}
            tokenShortName={tokenShortName}
            onClick={showUnwrapVariant}
          />
        </div>
      </div>
    </Card>
  );
};
