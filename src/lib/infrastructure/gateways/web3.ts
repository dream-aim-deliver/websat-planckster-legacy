import {
  type ThirdwebClient,
  createThirdwebClient,
  estimateGas,
  prepareTransaction,
  sendTransaction,
  toWei,
  prepareContractCall,
  getContract,
} from "thirdweb";
import { env } from "~/env";
import {
  type GetWrappedBalanceDTO,
  type ClaimableDTO,
  type MintResponseDTO,
  type WrapDTO,
  type ClaimDTO,
  type UnwrapDTO,
} from "../dto/web3-dto";
import { type Signal } from "@preact/signals-react";
import { type TChainConfig } from "../config/chains";
import { BigNumber, ethers } from "ethers";
import RalphReservoirABI from "../abi/RalphReservoir.json";
import Ralph from "../abi/Ralph.json";
import { type Account, type Wallet } from "thirdweb/wallets";
import {
  fromHumanReadableNumber,
  toHumanReadableNumber,
} from "~/lib/utils/tokenUtils";

export default class Web3Gateway {
  private feeWalletAddress: string;
  private thirdWebClient: ThirdwebClient;
  constructor() {
    this.feeWalletAddress = env.NEXT_PUBLIC_FEE_WALLET_ADDRESS;
    this.thirdWebClient = createThirdwebClient({
      clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
  }

  __getWalletChainID = async (wallet: Wallet) => {
    const chain = wallet.getChain();
    return chain?.id;
  };

  __generateHexFromMintMessage = (amount: BigNumber): string => {
    const json = `{"p": "elkrc-404", "op": "mint", "tick": "PR", "amount": ${amount.toString()}}`;
    const hex = Buffer.from(json, "utf8").toString("hex");
    return hex;
  };

  __generateHexFromWrapMessage = (
    amount: BigNumber,
    ralphReservoirAddress: string,
  ): string => {
    const json = `{"p": "elkrc-404", "op": "transfer", "tick": "PR", "to": "${ralphReservoirAddress}", "amount": ${amount.toString()}}`;
    const hex = Buffer.from(json, "utf8").toString("hex");
    return hex;
  };

  async sendMintTransaction(
    humanReadableAmount: number,
    chain: TChainConfig,
    wallet: Wallet,
    account: Account,
    statusMessage: Signal<string>,
  ): Promise<MintResponseDTO> {
    const amount = fromHumanReadableNumber(humanReadableAmount);
    const message = this.__generateHexFromMintMessage(amount);
    const thirdWebClient = this.thirdWebClient;
    const thirdWebTx = prepareTransaction({
      to: `0x${this.feeWalletAddress}`,
      value: toWei("0.00123"),
      data: `0x${message}`,
      chain: chain.thirdWeb,
      client: thirdWebClient,
    });

    if (account.estimateGas) {
      const estimatedGas = await account.estimateGas(thirdWebTx);
      statusMessage.value = `Waiting for confirmation! Estimated Gas: ${estimatedGas.toString()}. Gas Limit: ${chain.gasLimit}`; // TODO: what is the correct format ?
    }
    const gas = await estimateGas({
      transaction: thirdWebTx,
    });
    statusMessage.value = `Estimated Gas: ${gas.toString()}. Gas Limit: ${chain.gasLimit}`; // TODO: what is the correct format ?
    try {
      const { transactionHash } = await sendTransaction({
        account: account,
        transaction: thirdWebTx,
      });
      const explorerLink = `${chain.explorerUrl}/tx/${transactionHash}`;
      const timestamp = new Date().toLocaleDateString();
      return {
        success: true,
        data: {
          amountMinted: toHumanReadableNumber(amount),
          timestamp: timestamp,
          explorerLink: explorerLink,
          tokenShortName: "PR",
          txHash: transactionHash,
        },
      };
    } catch (e) {
      console.error(e as Error);
      return {
        success: false,
        msg: "Transaction failed. Try again or get in touch?",
      };
    }
  }

  async fetchClaimableAmount(
    chain: TChainConfig,
    walletAddress: string,
  ): Promise<ClaimableDTO> {
    const provider = new ethers.providers.JsonRpcProvider(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.jsonRpcProvider,
    );
    const contract = new ethers.Contract(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.ralphReservoirAddress,
      RalphReservoirABI,
      provider,
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const claimable = await contract.claimable(walletAddress);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      // console.log(`[Claimable]: ${BigInt(claimable.toString())}`);
      return {
        success: true,
        data: {
          amount: toHumanReadableNumber(BigNumber.from(claimable)),
        },
      };
    } catch (e) {
      console.error(e as Error);
      return {
        success: false,
        msg: "Error fetching claimable balance",
      };
    }
  }

  async claimWrappedTokens(
    amount: number,
    wallet: Wallet,
    account: Account,
    chain: TChainConfig,
  ): Promise<ClaimDTO> {
    try {
      const amountToClaim = fromHumanReadableNumber(amount);
      const transaction = prepareContractCall({
        contract: getContract({
          client: this.thirdWebClient,
          address: chain.ralphReservoirAddress,
          chain: chain.thirdWeb,
        }),
        method: {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "claim",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        params: [BigInt(amountToClaim.toBigInt())],
      });

      const receipt = await sendTransaction({
        transaction: transaction,
        account: account,
      });
      console.log(`[Receipt]: ${JSON.stringify(receipt)}`);

      return {
        success: true,
        data: {},
      };
    } catch (e: unknown) {
      console.error(e as Error);
      return {
        success: false,
        msg: `Error claiming wrapped tokens: ${JSON.stringify(e)}`,
      };
    }
  }
  async getPRTokenBalance(
    chain: TChainConfig,
    walletAddress: string,
  ): Promise<GetWrappedBalanceDTO> {
    const provider = new ethers.providers.JsonRpcProvider(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.jsonRpcProvider,
    );

    const contract = new ethers.Contract(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.ralphTokenAddress,
      Ralph,
      provider,
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const balance = await contract.balanceOf(walletAddress);
      return {
        success: true,
        data: {
          balance: toHumanReadableNumber(BigNumber.from(balance)),
        },
      };
    } catch (e) {
      console.error(e as Error);
      return {
        success: false,
        msg: "Error fetching PR Token balance",
      };
    }
  }

  async sendWrapTransaction(
    amount: number,
    chain: TChainConfig,
    wallet: Wallet,
    account: Account,
    statusMessage: Signal<string>,
  ): Promise<WrapDTO> {
    const amountToWrap = fromHumanReadableNumber(amount);
    const message = this.__generateHexFromWrapMessage(
      amountToWrap,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.ralphReservoirAddress,
    );
    const thirdWebTx = prepareTransaction({
      to: `${chain.ralphReservoirAddress}`,
      chain: chain.thirdWeb,
      client: this.thirdWebClient,
      value: toWei("0.00123"),
      data: `0x${message}`,
    });

    const estimatedGas = await estimateGas({ transaction: thirdWebTx });
    statusMessage.value = `Estd Gas: ${estimatedGas.toString()}. Limit: ${chain.gasLimit}`; // TODO: what is the correct format ?

    try {
      const { transactionHash } = await sendTransaction({
        transaction: thirdWebTx,
        account: account,
      });
      statusMessage.value = `Wrapping ended!`;
      const timestamp = new Date().toLocaleDateString(); // TODO: check if this is okay or we should stick with the receipt timestamp
      const explorerLink = `${chain.explorerUrl}/tx/${transactionHash}`;
      return {
        success: true,
        data: {
          wrappedAmount: amount,
          timestamp: timestamp,
          explorerLink: explorerLink,
          tokenShortName: "PR",
          txHash: transactionHash,
        },
      };
    } catch (e) {
      console.error(e as Error);
      return {
        success: false,
        msg: "Transaction failed. Try again or get in touch?",
      };
    }
  }

  async checkSpendingAllowanceForRalphReservoir(
    chain: TChainConfig,
    walletAddress: string,
    humanReadableAmount: number,
  ): Promise<boolean> {
    const unwrapRequestAmount = fromHumanReadableNumber(humanReadableAmount);
    const provider = new ethers.providers.JsonRpcProvider(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.jsonRpcProvider,
    );
    const contract = new ethers.Contract(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      chain.ralphTokenAddress,
      Ralph,
      provider,
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const allowance = await contract.allowance(
        walletAddress,
        chain.ralphReservoirAddress,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return allowance.gt(BigInt(unwrapRequestAmount.toBigInt()));
    } catch (e) {
      console.error(e as Error);
      return false;
    }
  }

  async approveRalphReservoirToSpendPRToken(
    chain: TChainConfig,
    wallet: Wallet,
    account: Account,
    amount?: number,
  ): Promise<boolean> {
    try {
      // TODO: hardcoded value
      const bigAmount =
        amount ??
        `115792089237316195423570985008687907853269984665640564039457584007913129639935`;
      const transaction = prepareContractCall({
        contract: getContract({
          client: this.thirdWebClient,
          address: chain.ralphTokenAddress,
          chain: chain.thirdWeb,
        }),
        method: {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        params: [chain.ralphReservoirAddress, BigInt(bigAmount)],
      });

      const receipt = await sendTransaction({
        transaction: transaction,
        account: account,
      });
      console.log(`[Receipt]: ${JSON.stringify(receipt)}`);
      return true;
    } catch (e: unknown) {
      console.error(e as Error);
      return false;
    }
  }

  async unwrapPRToken(
    humanReadableAmount: number,
    chain: TChainConfig,
    wallet: Wallet,
    account: Account,
    statusMessage: Signal<string>,
  ): Promise<UnwrapDTO> {
    try {
      const amount = fromHumanReadableNumber(humanReadableAmount);
      const transaction = prepareContractCall({
        contract: getContract({
          client: this.thirdWebClient,
          address: chain.ralphReservoirAddress,
          chain: chain.thirdWeb,
        }),
        method: {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "unwrap",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        params: [BigInt(amount.toBigInt())],
        value: toWei("0.00123"), // TODO: hardcoded fee
        gas: BigInt(chain.gasLimit), // TODO: hardcoded gas limit
      });

      const estimatedGas = await estimateGas({
        transaction: transaction,
      });
      statusMessage.value = `Estimated Gas: ${estimatedGas.toString()}. Gas Limit: ${chain.gasLimit}`;
      const receipt = await sendTransaction({
        transaction: transaction,
        account: account,
      });
      console.log(`[Unwrap Receipt]: ${JSON.stringify(receipt)}`);
      const transactionHash = receipt.transactionHash;
      const explorerLink = `${chain.explorerUrl}/tx/${transactionHash}`;
      const timestamp = new Date().toLocaleDateString();

      return {
        success: true,
        data: {
          txHash: transactionHash,
          timestamp: timestamp,
          explorerLink: explorerLink,
          unwrappedAmount: toHumanReadableNumber(amount),
          tokenShortName: "PR", // TODO: hardcoded value
        },
      };
    } catch (e) {
      console.error(e as Error);
      return {
        success: false,
        msg: "Unwrapping failed. Try again or get in touch?",
      };
    }
  }
}
