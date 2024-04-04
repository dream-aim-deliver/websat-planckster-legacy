import { type IconProps, generateClassesForIcon } from "./Icon";

/**
 * IconTwitter
 * @usage <IconTwitter />
 */
export const IconTwitter = (props: IconProps) => {
  return (
    <svg
      className={generateClassesForIcon(props)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.8175 2.9375H17.75L12.6975 8.72875L9.22895 4.13081C8.66205 3.37933 7.77531 2.9375 6.83398 2.9375H4.02052C3.19272 2.9375 2.72338 3.88582 3.22543 4.54399L9.56125 12.85L2.395 21.0625H5.46375L10.995 14.725L14.9283 19.8819C15.4957 20.6259 16.3779 21.0625 17.3136 21.0625H19.9928C20.8182 21.0625 21.2882 20.1191 20.7911 19.4602L14.1175 10.615L20.8175 2.9375Z" />
    </svg>
  );
};
