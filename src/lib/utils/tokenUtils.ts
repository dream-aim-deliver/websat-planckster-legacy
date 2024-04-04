import { type BigNumber, ethers } from "ethers";

/**
 * Formats a number with the appropriate thousand separators and decimal places.
 * @param number - The number to format.
 * @returns The formatted number as a string.
 */
export const formatNumber = (number: number) => {
  return Intl.NumberFormat(`en-US`).format(number);
};

/**
 * Converts a number from human-readable format to token format.
 * @param prTokens - The number in human-readable format.
 * @returns The number in token format.
 */
export const fromHumanReadableNumber = (prTokens: number) => {
   return ethers.utils.parseEther(prTokens.toString());
}

/**
 * Converts a number from token format to human-readable format.
 * @param prTokens - The number in token format.
 * @returns The number in human-readable format.
 */
export const toHumanReadableNumber = (prTokens: BigNumber) => {
  return Number(ethers.utils.formatEther(prTokens.toString()));
}