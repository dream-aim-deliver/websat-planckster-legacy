export interface DropdownItemProps {
  selected?: boolean;
  title: string;
  onClick: () => void;
}

export const DropdownItem = ({
  selected,
  title,
  onClick,
}: DropdownItemProps) => {
  return (
    <div
      className={[
        "self-stretch",
        "h-10",
        "flex",
        "flex-row",
        "items-center",
        "justify-start",
        "py-2",
        "px-4",
        "box-border",
        "border-solid",
        "hover:border-[1px]",
        "hover:rounded-[999px]",
        "hover:border-base-colors/neutral-500",
        "active:border-base-colors/neutral-900",
        selected ? "text-base-colors/brand-600" : "text-text-secondary",
      ].join(" ")}
      onClick={onClick}
    >
      <b className="relative tracking-[-0.04em] leading-[16px]">{title}</b>
    </div>
  );
};
