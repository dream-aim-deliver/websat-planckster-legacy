import { IconCaretDown, IconCaretUp } from "~/lib/components/icons";

export interface DropdownTriggerProps {
  title: string;
  variant: "small" | "large";
  expanded: boolean;
  selectedOption?: string;
  defaultColor?: string;
  onHoverColor?: string;
  icon: React.ReactNode;
}

export const DropdownTrigger = ({
  variant,
  expanded,
  title,
  icon,
  selectedOption,
}: DropdownTriggerProps) => {
  const smallTrigger = (
    <div
      className={[
        "relative rounded-[54px]",
        "box-border",
        "w-full h-10",
        "flex flex-row items-center justify-start",
        "py-2.5 px-2",
        "border-t-[1px] border-solid border-r-[1px] border-b-[3px] border-l-[1px]",
        `border-text-inverted`,
        `text-text-inverted`,
        `hover:border-text-primary`,
        `hover:text-text-primary`,
        "transition-all",
      ].join(" ")}
    >
      <div
        className={`flex flex-row items-center justify-start hover:text-text-primary`}
      >
        <div className="w-[25px] relative h-[25px] overflow-hidden shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );

  const largeTrigger = (
    <div
      className={[
        "relative",
        "w-full",
        "flex",
        "flex-row",
        "items-center",
        "justify-start",
        "gap-[6px]",
        "font-varela",
        `text-text-inverted`,
        `border-text-inverted`,
        `hover:border-text-primary`,
      ].join(" ")}
    >
      <div className={"relative leading-[14px]"}>{title}</div>
      <div
        className={[
          "cursor-pointer",
          "w-full relative rounded-[54px]",
          "box-border",
          "h-10",
          "flex flex-row items-center justify-between",
          "py-2.5 px-4",
          "text-left",
          "font-gluten",
          "border-t-[1px]",
          "border-solid",
          "border-r-[1px]",
          "border-b-[3px]",
          "border-l-[1px]",
          `hover:text-text-primary`,
          `hover:border-text-primary`,
          "transition-all",
        ].join(" ")}
      >
        <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
          <div className="w-[25px] relative h-[25px] overflow-hidden shrink-0">
            {icon}
          </div>
          <b className="relative tracking-[-0.04em] leading-[16px]">
            {selectedOption}
          </b>
        </div>
        <div className="flex flex-row w-3 h-relative ml-2 items-center">
          {expanded && <IconCaretUp size={4} />}
          {!expanded && <IconCaretDown size={4} />}
        </div>
      </div>
    </div>
  );
  return <div>{variant == "small" ? smallTrigger : largeTrigger}</div>;
};
