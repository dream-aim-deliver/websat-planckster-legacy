export interface CardProps {
  children: React.ReactNode;
  className?: string; // needed for the custom Toast animation
}

export const Card = ({ children }: CardProps) => {
  return (
    <div
      className={[
        "w-full",
        "h-auto",
        "relative",
        "rounded-tl-none",
        "rounded-tr-2xl",
        "rounded-b-2xl",
        "bg-base-colors/neutral-100",
        "flex",
        "flex-col",
        "col-span-1",
        "items-start",
        "justify-start",
        "box-border",
        "p-6",
        "gap-[8px]",
        "w-max[440px]",
        "shadow-lg"
      ].join(" ")}
      >
      <div className="flex flex-col items-start w-full p-0 z-[1]">
        {children}
      </div>
    </div>
  );
};
