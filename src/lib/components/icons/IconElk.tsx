import icon from "@/assets/icons/elk.svg";
import Image from "next/image";

/**
 * IconElk
 * @usage <IconElk />
 */
export const IconElk = ({ size }: { size: number }) => {
  const finalSize = size ? `h-${size} w-${size}` : "h-6 w-6";
  return (
    <Image
      src={icon}
      alt="elk.svg"
      className={`w-full relative ${finalSize} overflow-hidden`}
    />
  );
};
