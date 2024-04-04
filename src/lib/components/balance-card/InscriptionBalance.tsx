import React from "react";
import { Tooltip, Label, Button } from "..";
import { LightFrame } from "../layouts/LightFrame";

/**
 * Renders a Inscription Balance section of Balance Card Primary Variant.
 */
export const InscriptionBalance = ({
  inscriptionBalance,
  tokenShortName,
  onClick,
}: {
  inscriptionBalance: number;
  tokenShortName: string;
  onClick: () => void;
}) => {
  const inscriptionBalanceString =
    Intl.NumberFormat(`en-US`).format(inscriptionBalance);
  return (
    <LightFrame className="w-full flex flex-col items-center justify-center">
      <div className="w-full relative flex flex-col items-center justify-start gap-[8px]">
        <Tooltip
          title="Inscription"
          content={`The amount of ${tokenShortName} you have minted.`}
        />
        <div className="flex flex-row items-center space-x-2">
          <Label label={inscriptionBalanceString} variant="medium" />
          <Label label={tokenShortName} variant="medium" />
        </div>
      </div>
      <Button label="Wrap" variant="secondary" onClick={onClick} />
    </LightFrame>
  );
};
