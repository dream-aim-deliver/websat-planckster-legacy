import { useSignal, type Signal } from "@preact/signals-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { env } from "~/env";
import { BalanceCard, IconSuccess, type ToastProps } from "~/lib";
import { RalphLogo } from "~/lib/components/ralph-logo";
import { type TChainConfig } from "~/lib/infrastructure/config/chains";
import IndexerGateway from "~/lib/infrastructure/gateways/indexer";
import Web3Gateway from "~/lib/infrastructure/gateways/web3";
import BalanceCardPresenter from "~/lib/infrastructure/presenters/BalanceCardPresenter";
import type BalanceCardViewModel from "~/lib/infrastructure/view-models/BalanceCardViewModel";
import { claim, wrap } from "./controllers/WrapController";
import { type Chain, toHex } from "thirdweb";
import { type Account, type Wallet } from "thirdweb/wallets";
import { type BaseErrorViewModel } from "~/lib/infrastructure/view-models/base";
import { unwrap } from "./controllers/UnwrapController";
import { LightFrame } from "~/lib/components/layouts/LightFrame";
import { NavLink } from "~/lib/components/nav-link";

export const RalphBalaceCard = ({
  toasts,
  activeNetwork,
  connectedWallet,
  connectedAccount,
  connectedWalletNetwork,
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
  const indexerHost = env.NEXT_PUBLIC_INDEXER_URL;
  const indexerGateway = new IndexerGateway(indexerHost);

  const web3Gateway = new Web3Gateway();

  const balanceCardPresenter = new BalanceCardPresenter(
    indexerGateway,
    web3Gateway,
    connectedAccount?.address ?? "",
    connectedWalletNetwork?.id ?? 0,
    activeNetwork,
  );
  const { data, isLoading, isError } = useQuery<BalanceCardViewModel>({
    queryKey: ["BalanceCard"],
    queryFn: async () => {
      if (!connectedWallet || !connectedAccount || !connectedWalletNetwork) {
        return {
          status: "error",
          title: "Wallet not connected!",
          message: "Could not fetch balance data. Please connect your wallet.",
        } as BaseErrorViewModel;
      }
      if (
        toHex(connectedWalletNetwork.id) !== toHex(activeNetwork.value.chainId)
      ) {
        return {
          status: "error",
          title: "Network Error",
          message: `Please connect your wallet to the correct network. Expected ${activeNetwork.value.name} but connected to ${connectedWalletNetwork.name}`,
        } as BaseErrorViewModel;
      }
      const viewModel = await balanceCardPresenter.present();
      // console.log(`[Balance View Model]: ${JSON.stringify(viewModel)}`);
      return viewModel;
    },
    refetchInterval: 500,
  });
  const amountToWrap = useSignal<number>(0);
  const amountToUnwrap = useSignal<number>(0);

  const SWrapStatusMessage = useSignal<string>("");
  const SUnwrapStatusMessage = useSignal<string>("");
  const SClaimStatusMessage = useSignal<string>("");
  const SWrapCardView = useSignal<"wrapping" | "claiming" | "default">(
    "default",
  );
  const SUnwrapCardView = useSignal<
    "unwrapping" | "default" | "unwrapping-ended"
  >("default");
  const SUnwrapEndedStatusFrame = useSignal<React.ReactNode>(<></>);
  const onUnwrap = () => {
    if (!connectedAccount || !connectedWallet || !connectedWalletNetwork) {
      toasts.value.push({
        message: "Please connect your wallet",
        title: "Wall-E.T.",
        status: "error",
      });
      return;
    }
    if (
      toHex(activeNetwork.value.chainId) !== toHex(connectedWalletNetwork.id)
    ) {
      toasts.value = [
        {
          message: "Please connect to the correct network",
          title: "Network Error",
          status: "error",
        },
      ];
      return;
    }
    if (
      !data ||
      isLoading ||
      isError ||
      !data.status ||
      data.status !== "success"
    ) {
      toasts.value.push({
        message: "Tryin' to unwrap, but something went wrong!",
        title: "Try again later",
        status: "error",
      });
      return;
    }
    if (data.data.wrappedBalance.value === 0) {
      toasts.value.push({
        message: "You have no PR to unwrap",
        title: "No PR",
        status: "error",
      });
      return;
    }
    SUnwrapCardView.value = "unwrapping";
    unwrap(
      web3Gateway,
      amountToUnwrap.value,
      connectedWallet,
      connectedAccount,
      activeNetwork.value,
      SUnwrapStatusMessage,
    )
      .then(async (result) => {
        SUnwrapStatusMessage.value = "All's good in the hood!";
        SUnwrapCardView.value = "unwrapping-ended";
        SUnwrapEndedStatusFrame.value = (
          <LightFrame className="w-full items-center gap-4 text-wrap text-base-colors/neutral-400">
            <IconSuccess size={12} />
            <div className="font-heading-h5 relative inline-block w-full overflow-auto whitespace-normal text-center font-gluten text-lg font-bold leading-[18px] tracking-[-0.04em] text-text-primary">
              {`Unwrapping's all wrapped up!`}
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-4 text-left font-varela text-base">
              <label>{result.data.timestamp}</label>
            </div>
            <NavLink
              variant="small"
              label="View in Explorer"
              url={result.data.explorerLink}
            />
          </LightFrame>
        );
        // wait 15 seconds
        await new Promise((resolve) => setTimeout(resolve, 15000));
        // TODO: add toast
      })
      .catch(async (error) => {
        console.error("[UNWRAP] Unwrap failed", error);
        SUnwrapStatusMessage.value = error;
        toasts.value.push({
          message: `Get in touch. We can work this out!`,
          title: "Unwrap failed!",
          status: "error",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      })
      .finally(() => {
        SUnwrapCardView.value = "default";
      });
  };

  const onClaim = () => {
    if (!connectedAccount || !connectedWallet || !connectedWalletNetwork) {
      toasts.value.push({
        message: "Please connect your wallet",
        title: "Wall-E.T.",
        status: "error",
      });
      return;
    }
    if (
      toHex(activeNetwork.value.chainId) !== toHex(connectedWalletNetwork.id)
    ) {
      toasts.value = [
        {
          message: "Please connect to the correct network",
          title: "Network Error",
          status: "error",
        },
      ];
      return;
    }
    if (
      !data ||
      isLoading ||
      isError ||
      !data.status ||
      data.status !== "success"
    ) {
      toasts.value.push({
        message: "Tryin' to claim, but something went wrong!",
        title: "Try again later",
        status: "error",
      });
      return;
    }

    if (data.data.claimableInscriptions.value === 0) {
      toasts.value.push({
        message: "You have no PR to claim",
        title: "No PR",
        status: "error",
      });
      return;
    }

    SWrapCardView.value = "claiming";

    claim(
      web3Gateway,
      data.data.claimableInscriptions.value,
      connectedWallet,
      connectedAccount,
      activeNetwork.value,
      SClaimStatusMessage,
    )
      .then(async (result) => {
        if (result) {
          SWrapStatusMessage.value = "All's good in the hood!";
          // wait 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          toasts.value.push({
            message: `You claimed' ${data.data.claimableInscriptions.value} PR!`,
            title: "You own it!",
            status: "success",
          });
        }
      })
      .catch(async (error) => {
        console.error("[CLAIM] Claim failed", error);
        SWrapStatusMessage.value = error;
        toasts.value.push({
          message: `Get in touch and we can work this out!`,
          title: "Claim failed!",
          status: "error",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      })
      .finally(() => {
        SWrapCardView.value = "default";
      });
  };

  const onWrap = () => {
    SWrapCardView.value = "wrapping";
    // check wallet
    if (!connectedAccount || !connectedWallet || !connectedWalletNetwork) {
      toasts.value.push({
        message: "Please connect your wallet",
        title: "Wall-E.T.",
        status: "error",
      });
      return;
    }
    if (
      toHex(activeNetwork.value.chainId) !== toHex(connectedWalletNetwork.id)
    ) {
      toasts.value = [
        {
          message: "Please connect to the correct network",
          title: "Network Error",
          status: "error",
        },
      ];
      return;
    }
    wrap(
      web3Gateway,
      amountToWrap.value,
      connectedWallet,
      connectedAccount,
      activeNetwork.value,
      SWrapStatusMessage,
    )
      .then(async (result) => {
        if (result) {
          SWrapStatusMessage.value =
            "Looking good! Come back later to claim your PRs!";
          // wait 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          toasts.value.push({
            message: `You wrapd' ${amountToWrap.value} PR, like its hot!`,
            title: "It's a wrap!",
            status: "success",
          });
        }
      })
      .catch(async (error) => {
        console.error("[WRAP] Wrap failed", error);
        SWrapStatusMessage.value = "Shit happens! Try again later";
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toasts.value.push({
          message: `You wrapd' ${amountToWrap.value} PR, like its hot!`,
          title: "It's a wrap!",
          status: "error",
        });
      })
      .finally(() => {
        SWrapCardView.value = "default";
      });
  };
  const balanceCardViewModel: {
    inscriptionBalance: number;
    wrappedBalance: number;
    fee: number;
    claimableInscriptions: number;
    tokenShortName: string;
    icon: React.ReactNode;
  } = useMemo(() => {
    const defaultData = {
      inscriptionBalance: 0,
      wrappedBalance: 0,
      fee: 0, // TODO: hardcoded value
      claimableInscriptions: 0,
      tokenShortName: "PR", // TODO: hardcoded value,
      icon: <RalphLogo variant="icon" />, // TODO: hardcoded value,
    };
    if (!data || isLoading) {
      return defaultData;
    }
    if (isError) {
      return defaultData;
    }
    if (!data.status) {
      return defaultData;
    }
    if (data.status === "error") {
      return defaultData;
    }
    if (data.status === "success") {
      return {
        inscriptionBalance: data.data.inscriptionBalance.value ?? 0,
        wrappedBalance: data.data.wrappedBalance.value ?? 0,
        fee: data.data.fee.value ?? 0,
        claimableInscriptions: data.data.claimableInscriptions.value ?? 0,
        tokenShortName: "PR", // TODO: hardcoded value,
        icon: <RalphLogo variant="icon" />, // TODO: hardcoded value,
      };
    }
    return defaultData;
  }, [data, isLoading, isError]);
  
  return (
    <BalanceCard
      inscriptionBalance={balanceCardViewModel.inscriptionBalance}
      wrappedBalance={balanceCardViewModel.wrappedBalance}
      claimableAmount={balanceCardViewModel.claimableInscriptions}
      fee={activeNetwork.value.wrappingFee} // TODO: split into wrapping and unwrapping fee
      networkCurrency={activeNetwork.value.networkCurrency}
      tokenShortName={balanceCardViewModel.tokenShortName}
      icon={balanceCardViewModel.icon}
      onWrap={onWrap}
      onUnwrap={onUnwrap}
      onClaim={onClaim}
      amountToWrap={amountToWrap}
      amountToUnwrap={amountToUnwrap}
      SWrapStatusMessage={SWrapStatusMessage}
      SWrapCardView={SWrapCardView}
      SClaimStatusMessage={SClaimStatusMessage}
      SUnwrapStatusMessage={SUnwrapStatusMessage}
      SUnwrapCardView={SUnwrapCardView}
      SUnwrapEndedStatusFrame={SUnwrapEndedStatusFrame}
    />
  );
};
