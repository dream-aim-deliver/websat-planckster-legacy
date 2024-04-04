import { type IconProps, generateClassesForIcon } from "./Icon";

/**
 * IconMooseHorn
 * @usage <IconMooseHorn />
 */
export const IconMooseHorn = (props: IconProps) => {
  return (
    <svg
      className={generateClassesForIcon(props)}
      viewBox="0 0 19 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.9929 11.798C4.861 11.4941 6.30774 10.8609 7.00573 10.2785C9.26468 8.40437 8.43978 6.66958 9.79769 7.04946C11.1302 7.42934 11.1302 8.91088 12.0186 9.32875C13.0973 9.83526 11.7648 4.87147 12.8435 5.21337C13.8587 5.52993 13.9856 8.03715 15.5085 8.69561C16.841 9.26544 14.6709 2.79479 16.5238 4.20035C18.3639 5.59325 20.9655 11.1648 16.6507 12.6844C12.3358 14.2039 5.93971 14.6471 3.83306 14.5838C1.67563 14.5205 -0.316809 12.0386 1.9929 11.798Z"
      />
    </svg>
  );
};
