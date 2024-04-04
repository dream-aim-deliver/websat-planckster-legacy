import { type Signal, useSignal, effect } from "@preact/signals-react";
import { useMemo } from "react";
import {
  InProgressStatusFrame,
  MintCard,
  MintCompletedStatusFrame,
  MintEnabledStatusFrame,
  MintErrorStatusFrame,
  type ToastProps,
} from "~/lib";
import type MintCardViewModel from "~/lib/infrastructure/view-models/MintCardViewModel";
import Web3Gateway from "~/lib/infrastructure/gateways/web3";
import MintCardPresenter from "~/lib/infrastructure/presenters/MintCardPresenter";
import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import IndexerGateway from "~/lib/infrastructure/gateways/indexer";
import { type TChainConfig } from "~/lib/infrastructure/config/chains";
import { MintWarningStatusFrame } from "~/lib/components/mint-card/MintWarningStatusFrame";
import { type Chain } from "thirdweb";
import { formatNumber } from "~/lib/utils/tokenUtils";
import { type Account, type Wallet } from "thirdweb/wallets";
import { type MintResponseModel, mint } from "./controllers/MintController";

export const RalphMintCard = ({
  toasts,
  activeNetwork,
  connectedWallet,
  connectedAccount,
  connectedWalletNetwork: connectedWalletNetwork,
}: {
  activeNetwork: Signal<TChainConfig>;
  toasts: Signal<ToastProps[]>;
  /**
   * The connected wallet
   */
  connectedWallet?: Wallet;
  /**
   * The connected account
   */
  connectedAccount?: Account;
  /**
   * Connected Wallet's Network
   */
  connectedWalletNetwork: Chain | undefined;
}) => {
  // Signals
  const SdisableMinting = useSignal<boolean>(true);
  const SisMinting = useSignal<boolean>(false);
  const SStatusMessage = useSignal<string>("");
  if (!connectedWallet || !connectedAccount || !connectedWalletNetwork) {
    SdisableMinting.value = true;
  }

  const indexerHost = env.NEXT_PUBLIC_INDEXER_URL;
  const indexerGateway = new IndexerGateway(indexerHost);
  const web3Gateway = new Web3Gateway();
  const mintCardPresenter = new MintCardPresenter(
    indexerGateway,
    connectedAccount?.address,
  );
  const { data, isLoading, isError } = useQuery<MintCardViewModel>({
    queryKey: ["MintCard"],
    queryFn: async () => {
      const viewModel = await mintCardPresenter.present();
      return viewModel;
    },
    refetchInterval: 500,
  });

  // Status Frame Content Signals
  const statusFrame = useSignal<React.ReactNode>(<></>);
  const mintEnabledStatusFrame = useSignal<React.ReactNode>(<></>);

  // Effect to enable or disable minting
  effect(() => {
    if (!connectedWallet || !connectedAccount || !connectedWalletNetwork) {
      SdisableMinting.value = true;
      return;
    }
    if (!data || isLoading) {
      SdisableMinting.value = true;
      return;
    }
    if (isError) {
      SdisableMinting.value = true;
      return;
    }
    if (!data.status) {
      SdisableMinting.value = true;
      return;
    }
    if (data.status === "success") {
      if(data.data.mintedPercentage.value >=100) {
        SdisableMinting.value = true;
        return;
      }
      if(data.data.allocation.value === 0) {
        SdisableMinting.value = true;
        return;
      }
      SdisableMinting.value = false;
      return;
    }
    if (SisMinting.value) {
      SdisableMinting.value = true;
      return;
    }
    return true;
  });

  // Effect to update/disable the MintEnabledStatusFrame
  effect(() => {
    if (!data || isLoading) {
      mintEnabledStatusFrame.value = <></>;
      return;
    }
    if (data?.status !== "success") {
      mintEnabledStatusFrame.value = <></>;
      return;
    }
    if (SisMinting.value) {
      mintEnabledStatusFrame.value = <></>;
      return;
    }
    if (SdisableMinting.value) {
      mintEnabledStatusFrame.value = <></>;
      return;
    }
    if(data.data.allocation.value === 0) {
      mintEnabledStatusFrame.value = <></>;
      // SdisableMinting.value = true; // TODO: remove this line later
      return;
    }
    mintEnabledStatusFrame.value = (
      <MintEnabledStatusFrame
        eligibleAmount={data.data.allocation.value}
        expectedReturn={data.data.allocation.value}
        fee={activeNetwork.value.mintingFee}
        feeCurrency={activeNetwork.value.networkCurrency}
        tokenShortName="PR" // TODO: hardcoded value
      />
    );
  });
  
  const onMint = () => {
    if (!data || data.status !== "success") {
      SdisableMinting.value = true;
      return;
    }
    const amount = data.data.allocation.value;
    if (!amount) {
      SdisableMinting.value = true;

      return;
    }
    if (!connectedWalletNetwork || !connectedAccount || !connectedWallet) {
      SdisableMinting.value = true;
      statusFrame.value = (
        <MintErrorStatusFrame
          error={`Oh Snap!`}
          message={`Couldn't detect a connected wallet`} // TODO: Please use one of the recommended wallets.
        />
      );
      return;
    }
    if (connectedWalletNetwork?.id !== activeNetwork.value.chainId) {
      SdisableMinting.value = true;
      statusFrame.value = (
        <MintErrorStatusFrame
          error={`Oh Snap!`}
          message={`You are on the wrong network pal. wallet: ${connectedWalletNetwork?.id} !== network: ${activeNetwork.value.chainId}`} // TODO: Please use one of the recommended wallets.
        />
      );
      return;
    }
    SdisableMinting.value = true;
    SisMinting.value = true;

    const formattedIsMintingAmount = formatNumber(amount);
    const token = "PR"; // TODO: This is a hardcoded value. This should be dynamic

    statusFrame.value = (
      <InProgressStatusFrame
        message={SStatusMessage.value}
        title={`${formattedIsMintingAmount} ${token} are being minted!`}
      />
    );
    mint(
      amount,
      SStatusMessage,
      activeNetwork.value,
      web3Gateway,
      indexerGateway,
      connectedWallet,
      connectedAccount,
      token,
      statusFrame,
    )
      .then(async (response: MintResponseModel) => {
        console.log(`[Mint Status]: ${JSON.stringify(response)}`);
        if (response.status === "success") {
          statusFrame.value = (
            <MintCompletedStatusFrame
              tokenShortName={token}
              amountMinted={response.amountMinted ?? data.data.allocation.value}
              explorerLink={`${response.explorerLink}`}
              timestamp={`${response.timestamp}`}
            />
          );
        } else if (response.status === "warning") {
          statusFrame.value = (
            <MintWarningStatusFrame message={response.message} error={""} />
          );
        }
      })
      .catch((error: MintResponseModel) => {
        console.log(
          `[Mint Status]: Error minting ${formattedIsMintingAmount} ${token}. ${JSON.stringify(error)}`,
        );
        statusFrame.value = (
          <MintErrorStatusFrame
            error={`Oh Snap!`}
            message={`Couldn't mint ${formattedIsMintingAmount} ${token}`} // TODO: Please use one of the recommended wallets.
          />
        );
      })
      .finally(() => {
        SisMinting.value = false;
      });
  };

  const mintCardViewModel: {
    mintedPercentage: number;
    mintLimit: number;
    totalSupply: number;
    totalMinted: number;
  } = useMemo(() => {
    const defaultData = {
      mintedPercentage: 0,
      mintLimit: 0,
      totalSupply: 0,
      totalMinted: 0,
    };

    // Add your logic here to create the MintCardViewModel object
    if (!data || isLoading) {
      // TODO: add a toast here
      return defaultData;
    }
    if (isError) {
      // TODO: add error card
      return defaultData;
    }
    if (!data.status) {
      // TODO: add a toast here
      return defaultData;
    }
    if (data.status === "success") {
      return {
        mintedPercentage: data.data.mintedPercentage.value ?? 0,
        mintLimit: data.data.mintLimit.value ?? 0,
        totalSupply: data.data.totalSupply.value ?? 0,
        totalMinted: data.data.totalMinted.value ?? 0,
      };
    } else {
      // add error card
      return defaultData;
    }
  }, [data, isError, isLoading]);
  return (
    <MintCard
      mintedPercentage={mintCardViewModel.mintedPercentage}
      mintLimit={mintCardViewModel.mintLimit}
      totalSupply={mintCardViewModel.totalSupply}
      totalMinted={mintCardViewModel.totalMinted}
      mintingFee={10} // TODO: add the minting fee
      mintingDisabled={SdisableMinting.value}
      tokenShortName="PR" // TODO: hardcoded
      isMinting={SisMinting}
      onMint={onMint}
    >
      {statusFrame.value}
      {mintEnabledStatusFrame.value}
    </MintCard>
  );
};
