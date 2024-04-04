import { twMerge } from "tailwind-merge";
import { PageFooter } from "./PageFooter";
import { PageHeader, type SupportedNetworkProps } from "./PageHeader";
import { Menu, Toast, type ToastProps } from "..";
import { useSignal, useSignals } from "@preact/signals-react/runtime";
import { type Signal } from "@preact/signals-react";
import { SUPPORTED_CHAINS, type TChainConfig } from "~/lib/infrastructure/config/chains";
export const PageTemplate = ({
  children,
  toasts,
  activeNetwork,
  supportedNetworks
}: {
  children: React.ReactNode;
  toasts: Signal<ToastProps[]>;
  activeNetwork: Signal<TChainConfig>;
  supportedNetworks: TChainConfig[];
}) => {
  useSignals();
  const menuOpenSignal = useSignal<boolean>(false);
  const handleNetworkChange = (network: SupportedNetworkProps) => {
    // const newChain = (SUPPORTED_CHAINS as TChainConfig[]).find((chain) => chain.chainId === network.chainId);
    // if (newChain) {
    //   activeNetwork.value = newChain;
    // }
    // TODO: Network change failed!
    toasts.value.push({
      status: "success",
      title: `Use ${activeNetwork.value.name} Network`,
      message: `Ralph's coming to more chains soon!`,
      isPermanent: false,
    });
  }
  return (
    <div
      className={twMerge(
        "relative h-full min-h-screen w-screen",
        "flex w-full flex-col justify-between gap-12 self-stretch",
        "bg-base-colors/neutral-600",
        "box-border",
        "px-4 pb-6 pt-2",
        "overflow-x-hidden",
      )}
    >
      <PageHeader // TODO: Receive as a signal
        networks={(supportedNetworks).map((chain) => ({
          name: chain.name,
          chainId: chain.chainId,
          icon: chain.icon,
        }))}
        activeNetwork={{
          name: activeNetwork.value.name,
          chainId: activeNetwork.value.chainId,
          icon: activeNetwork.value.icon,
        }}
        onNetworkChange={handleNetworkChange}
        menuOpenSignal={menuOpenSignal}
      />
      <div
        id="content-container"
        className="grid-col-3 xl:grid-col-2 grid items-center justify-center gap-[16px] xl:grid xl:divide-y"
      >
        {menuOpenSignal.value && <Menu />}
        {children}
      </div>
      <div className="flex flex-row items-center justify-center gap-[16px]">
        <PageFooter menuOpenSignal={menuOpenSignal} />
      </div>

      <div className="fixed bottom-4 right-4 z-50 ml-4 flex flex-col gap-3">
        {toasts.value.map((toast, index) => (
          <Toast
            key={index}
            status={toast.status}
            title={toast.title}
            message={toast.message}
            isPermanent={toast.isPermanent}
          />
        ))}
      </div>
    </div>
  );
};
