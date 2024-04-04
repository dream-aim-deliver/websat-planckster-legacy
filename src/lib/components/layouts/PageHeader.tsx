import { twMerge } from "tailwind-merge";
import { RalphLogo } from "../ralph-logo";
import { DropdownTrigger, IconClose, IconMenu, IconNetworkBase } from "..";
import { type Signal } from "@preact/signals-react";
import { Menu } from "./Menu";
import { useSignals } from "@preact/signals-react/runtime";

export interface SupportedNetworkProps {
  name: string;
  chainId: number;
  icon: React.ReactNode;
}

export interface PageHeaderProps {
  networks: SupportedNetworkProps[];
  activeNetwork: SupportedNetworkProps;
  onNetworkChange: (network: SupportedNetworkProps) => void;
  menuOpenSignal: Signal<boolean>;
}
export const PageHeader = (props: PageHeaderProps) => {
  useSignals();
  return (
    <div
      className={twMerge(
        "relative flex w-full flex-row items-center justify-between",
        "text-left font-gluten",
        "text-[23.64px]",
        "text-text-inverted ",
        "gap-[16px]",
      )}
    >
      <div
        id="header-content-sm"
        className="flex w-full flex-row items-center justify-between gap-[16px] xl:hidden"
      >
        <div className="flex flex-row items-center justify-start gap-[9px]">
          <RalphLogo variant="full-horizontal" />
        </div>
        <div id="header-content-sm-network-menu" className="flex">
          <div
            id="menu-small"
            className="flex flex-row items-start justify-start p-2"
          >
            {!props.menuOpenSignal.value ? (
              <div className="flex cursor-pointer flex-row gap-4">
                {/* TODO: Implement network change and dropdown content */}
                <div onClick={() => props.onNetworkChange(props.activeNetwork)}>
                  <DropdownTrigger
                    title=""
                    variant="small"
                    expanded={true}
                    selectedOption={props.activeNetwork.name}
                    icon={<IconNetworkBase />}
                  />
                </div>
                <div
                  className="cursor-pointer hover:text-text-primary"
                  onClick={() => {
                    props.menuOpenSignal.value = true;
                  }}
                >
                  <IconMenu size={10} />
                </div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => {
                    props.menuOpenSignal.value = false;
                  }}
                  className="cursor-pointer text-text-inverted hover:text-text-primary"
                >
                  <IconClose />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="header-content-xl"
        className="hidden w-full flex-row items-start justify-between xl:flex"
      >
        <div className="flex flex-row items-center justify-start gap-[9px]">
          <RalphLogo variant="full-horizontal" />
        </div>
        <div className="ml-40 mr-40 flex flex-row items-center justify-between text-base">
          <Menu />
        </div>
        {/* TODO: Implement network change and dropdown content */}
        <div
          className="cursor-pointer"
          onClick={() => props.onNetworkChange(props.activeNetwork)}
        >
          <DropdownTrigger
            title=""
            variant="large"
            expanded={false}
            selectedOption={props.activeNetwork.name}
            icon={<IconNetworkBase />}
          />
        </div>
      </div>
    </div>
  );
};
