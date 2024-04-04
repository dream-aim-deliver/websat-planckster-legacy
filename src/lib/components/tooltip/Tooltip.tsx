import { IconTooltip } from "..";
/**
 * Represents the props for the Tooltip component.
 * @interface TooltipProps
 * @property {string} content - The content to be displayed in the tooltip.
 */
export interface TooltipProps {
  /**
   * The title of the tooltip that is displayed in the collapsed view.
   */
  title?: string;
  /**
   * The content to be displayed in the tooltip.
   */
  content?: string;
}

/**
 * @param {TooltipProps} props - The properties of the tooltip.
 * @returns
 */
export const Tooltip = ({ title, content }: TooltipProps) => {
  const titleSection = (
    <div className="w-full text-left text-sm text-text-secondary font-varela">
      {title}
    </div>
  );

  return (
    <div className="flex flex-row items-center gap-1">
      {title && titleSection}
      <div
        className="
            relative
            before:content-[attr(data-tip)]
            before:absolute
            before:left-1/2 before:-top-3
            before:px-3 before:py-5
            before:w-max before:max-w-xs
            before:-translate-x-1/2 before:-translate-y-full
            before:rounded-3xl
            before:bg-base-colors/neutral-50 before:text-text-secondary
            before:box-border before:overflow-hidden
            before:items-start before:justify-start
            before:text-left before:font-varela before:text-sm
            before:border-solid before:border-2 before:border-base-colors/neutral-200
            before:opacity-0
            before:transition-all
            hover:before:opacity-100 hover:after:opacity-100
            "
        data-tip={content}
      >
        <div className="flex flex-row items-center justify-start gap-[2px] opacity-30 hover:opacity-100">
          <IconTooltip size={4} />
        </div>
      </div>
    </div>
  );
};
