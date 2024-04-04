import { type IconProps, generateClassesForIcon } from "./Icon";

/**
 * IconCaretDown
 * @usage <IconCaretDown />
 */
export const IconCaretDown = (props: IconProps) => {
  return (
    <svg
      className={generateClassesForIcon(props)}
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.6225 3C10.4789 3 10.8958 4.04612 10.274 4.63511L7.08591 7.65545C6.47692 8.23239 5.52308 8.23239 4.91409 7.65545L1.72595 4.63511C1.10424 4.04612 1.52109 3 2.3775 3H9.6225Z" />
    </svg>
  );
};
