import icon from "@/assets/icons/success.svg";
import Image from "next/image";

/**
 * IconSuccess
 * @usage <IconSuccess />
 */
export const IconSuccess = ({ size }: { size?: number }) => {
  const finalSize = size ? `h-${size} w-${size}` : "h-40 w-40";
  return <Image src={icon} alt="success" className={finalSize} />;
};
