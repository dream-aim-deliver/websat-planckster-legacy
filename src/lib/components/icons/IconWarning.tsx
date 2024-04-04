import icon from "@/assets/icons/warning.svg";
import Image from "next/image";

/**
 * IconWarning
 * @usage <IconWarning />
 */
export const IconWarning = ({ size = 40 }: { size?: number }) => {
  const finalSize = size ? `h-${size} w-${size}` : "h-10 w-10";
  return <Image src={icon} alt="warning" className={finalSize} />;
};
