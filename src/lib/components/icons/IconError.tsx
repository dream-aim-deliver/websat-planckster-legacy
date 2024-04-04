import icon from "@/assets/icons/error.svg";
import Image from "next/image";

/**
 * IconError
 * @description Component for displaying error icon.
 * @return {JSX.Element} - Rendered IconError component.
 * @usage <IconError />
 * @status Complete
 */
export const IconError = ({ size = 40 }: { size?: number }) => {
  const finalSize = size ? `h-${size} w-${size}` : "h-6";
  return <Image src={icon} alt="error.svg" className={finalSize} />;
};
