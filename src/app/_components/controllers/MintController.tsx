import { type Signal } from "@preact/signals-react";
import { type Account, type Wallet } from "thirdweb/wallets";
import { InProgressStatusFrame } from "~/lib";
import { type TChainConfig } from "~/lib/infrastructure/config/chains";
import { type MintResponseDTO } from "~/lib/infrastructure/dto/web3-dto";
import type IndexerGateway from "~/lib/infrastructure/gateways/indexer";
import type Web3Gateway from "~/lib/infrastructure/gateways/web3";
import { formatNumber } from "~/lib/utils/tokenUtils";
import { MintWarningStatusFrame } from "~/lib/components/mint-card/MintWarningStatusFrame";


export const pollIndexer = async (
  indexerGateway: IndexerGateway,
  transactionHash: string,
  numAttempts: number,
  mintingAmount: number,
  tokenShortName: string,
  statusFrame: Signal<React.ReactNode>,
) => {
  for (let i = 0; i < numAttempts; i++) {
    const inscriptionStatus =
      await indexerGateway.getInscriptionStatus(transactionHash);
    console.log(`[Inscription Status]: ${i}/${numAttempts}`, inscriptionStatus);
    if (inscriptionStatus.success) {
      return inscriptionStatus;
    }
    const formattedIsMintingAmount = formatNumber(mintingAmount);
    statusFrame.value = (
      <InProgressStatusFrame
        message={`Looking for your transaction. Attempt ${i}/${numAttempts}.`}
        title={`${formattedIsMintingAmount} ${tokenShortName} are being minted!`}
      />
    );
    // Wait for 0.5 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(
    `Transaction not detected by indexer after ${numAttempts} attempts.`,
  );
};
export type MintResponseModel = {
  status: 'success' | 'error' | 'warning';
  message: string;
  transactionHash?: string;
  timestamp?: string;
  amountMinted?: number;
  tokenShortName?: string;
  explorerLink?: string;
}

export const mint = async (
  amount: number,
  SStatusMessage: Signal<string>,
  chain: TChainConfig,
  web3Gateway: Web3Gateway,
  indexerGateway: IndexerGateway,
  connectedWallet: Wallet,
  connectedAccount: Account,
  tokenShortName: string,
  statusFrame: Signal<React.ReactNode>,
): Promise<MintResponseModel> => {
 
  const mintResponseDTO: MintResponseDTO = await web3Gateway.sendMintTransaction(
    amount, // TODO: cleanup
    chain,
    connectedWallet,
    connectedAccount,
    SStatusMessage,
  );

  if (!mintResponseDTO.success) {
    return Promise.reject({
      status: 'error',
      message: mintResponseDTO.msg,
    });
  }

  // Poll the indexer for transaction hash
  const maxAttempts = 120;
  try {
    const inscriptionStatusDTO = await pollIndexer(
      indexerGateway,
      mintResponseDTO.data.txHash,
      maxAttempts,
      amount, // TODO: should be human readable
      tokenShortName,
      statusFrame,
    );
    if (!inscriptionStatusDTO.success) {
      statusFrame.value = (
        <MintWarningStatusFrame
          error="Come back later!"
          message={`Ralph is still looking for your transaction.`}
          explorerLink={mintResponseDTO.data.explorerLink}
        />
      );
      return Promise.reject({
        status: 'warning',
        message: 'Transaction not detected by indexer after 60 attempts.',
      });
    } else {
      if (inscriptionStatusDTO.data.valid === 0) {

        return Promise.reject({
          status: 'error',
          message: 'Transaction failed. Try again or get in touch?',
          ...inscriptionStatusDTO,
          
        });
      } else {
        return Promise.resolve({
          status: 'success',
          message: 'Transaction successful',
          transactionHash: mintResponseDTO.data.txHash,
          timestamp: mintResponseDTO.data.timestamp,
          amountMinted: mintResponseDTO.data.amountMinted,
          tokenShortName: mintResponseDTO.data.tokenShortName,
          explorerLink: mintResponseDTO.data.explorerLink,
        });
      }
    }
  } catch (e) {
    console.error(e);
    return Promise.reject({
      status: 'error',
      message: 'Something went wrong!. Try again or get in touch?',
    });
  }
};
