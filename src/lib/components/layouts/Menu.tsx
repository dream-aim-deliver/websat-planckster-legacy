import { IconTwitter, IconTelegram } from "..";
import { NavLink } from "../nav-link";

export const Menu = () => {
  return (
    <div className="flex xl:flex-row flex-col items-center justify-center mb-8 gap-4 xl:shrink z-50">
      <NavLink
        variant="medium"
        label="Website"
        url="https://ralphthemoose.com/"
        className="text-text-inverted"
      />
      <NavLink
        variant="medium"
        label="Twitter"
        url="https://twitter.com/RalphTheMoose"
        icon={<IconTwitter />}
        className="text-text-inverted"
      />
      <NavLink
        variant="medium"
        label="Telegram"
        url="https://t.me/RalphTheMoose"
        icon={<IconTelegram />}
        className="text-text-inverted"
      />
      <NavLink
        variant="medium"
        label="Farm"
        url="https://app.elk.finance/farms/all/"
        className="text-text-inverted"
      />
       <NavLink
        variant="medium"
        label="ElkDex"
        url="https://app.elk.finance/swap/8453/ETH/PR"
        // icon={<IconElk size={4} />}
        className="text-text-inverted"
      />
       <NavLink
        variant="medium"
        label="UniSwap"
        url="https://app.uniswap.org/swap"
        className="text-text-inverted"
      />
    </div>
  );
};
