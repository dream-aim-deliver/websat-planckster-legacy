import { type IconProps, generateClassesForIcon } from "./Icon";

/**
 * @param props {@link IconProps}
 */
export const IconCaretUp = (props: IconProps) => {
  return (
    <svg
      className={generateClassesForIcon(props)}
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.3775 7.68457C1.52109 7.68457 1.10424 6.63845 1.72595 6.04946L4.91409 3.02912C5.52308 2.45218 6.47692 2.45218 7.08591 3.02912L10.274 6.04946C10.8958 6.63845 10.4789 7.68457 9.6225 7.68457L2.3775 7.68457Z" />
    </svg>
  );
};
