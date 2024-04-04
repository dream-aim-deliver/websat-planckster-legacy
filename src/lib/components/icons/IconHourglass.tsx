import icon from "@/assets/icons/hourglass.svg";
import Image from "next/image";

export const IconHourglass = ({ size = 40 }: { size?: number }) => {
  const finalSize = size ? `h-${size} w-${size}` : "h-6";
  return <Image src={icon} alt="hourglass.svg" className={finalSize} />;
};
