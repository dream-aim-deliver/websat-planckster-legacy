import { type IconProps, generateClassesForIcon } from "./Icon";

/**
 * IconExternalLink
 * @description External link icon
 * @usage <IconExternalLink />
 */
export const IconExternalLink = ({ size }: { size?: number }) => {
  const props: IconProps = {
    size: size ?? 12,
  };
  return (
    <svg
      className={generateClassesForIcon(props)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_20_2500)">
        <path d="M11.1867 3.87402H7.47232C3.34547 3.87402 0 7.21949 0 11.3463V16.15C0 20.2768 3.34547 23.6223 7.47232 23.6223H12.276C16.4028 23.6223 19.7483 20.2768 19.7483 16.15V12.5364L15.3918 16.893C15.0567 18.3033 13.7888 19.3524 12.276 19.3524H7.47232C5.70367 19.3524 4.2699 17.9186 4.2699 16.15L4.2699 11.3463C4.2699 9.78784 5.38319 8.48936 6.8579 8.2028L11.1867 3.87402Z" />
        <path d="M15.2096 0.989966C13.8953 1.16589 13.3522 2.77163 14.2898 3.70925L15.6798 5.09925L11.3395 9.43959C10.4536 10.3254 10.4536 11.7617 11.3395 12.6476C12.2254 13.5334 13.6616 13.5334 14.5475 12.6476L18.8878 8.30723L20.0892 9.50866C21.0269 10.4463 22.6326 9.90315 22.8085 8.58888L23.5194 3.27826C23.7528 1.53428 22.2642 0.0456491 20.5202 0.279095L15.2096 0.989966Z" />
      </g>
      <defs>
        <clipPath id="clip0_20_2500">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
};
