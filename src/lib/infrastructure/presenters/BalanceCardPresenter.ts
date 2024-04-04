import { type Signal, signal } from "@preact/signals-react";
import type BalanceCardViewModel from "../view-models/BalanceCardViewModel";
import type IndexerGateway from "../gateways/indexer";
import { type TChainConfig } from "../config/chains";
import type Web3Gateway from "../gateways/web3";

export default class BalanceCardPresenter {
  public inscriptionBalance: Signal<number>;
  public wrappedBalance: Signal<number>;
  public fee: Signal<number>;
  public claimableInscriptions: Signal<number>;

  private indexer: IndexerGateway;
  private web3Gateway: Web3Gateway;

  private walletAddress: string;
  private walletChainId: number;
  private activeNetwork: Signal<TChainConfig>;

  constructor(
    indexer: IndexerGateway,
    web3Gateway: Web3Gateway,
    walletAddress: string,
    walletChainID: number,
    activeNetwork: Signal<TChainConfig>,
  ) {
    this.activeNetwork = activeNetwork;
    this.inscriptionBalance = signal(0);
    this.wrappedBalance = signal(0);
    this.fee = signal(0.00123); // TODO: Not wired up
    this.claimableInscriptions = signal(0);

    this.indexer = indexer;
    this.web3Gateway = web3Gateway;

    this.walletAddress = walletAddress;
    this.walletChainId = walletChainID;
  }

  async __presentInscriptionBalance() {
    this.inscriptionBalance.value = 0;

    const latestBlock = await this.indexer.getLatestBlock();
    if (!latestBlock.success) {
      return;
    }
    const balanceForAccount = await this.indexer.getBalanceForAccount(
      this.walletAddress,
      latestBlock.data.latest_block,
    );
    if (!balanceForAccount.success) {
      this.inscriptionBalance.value = 0;
      return;
    }
    this.inscriptionBalance.value = balanceForAccount.data.balance;
  }

  async __presentWrappedBalance() {
    this.wrappedBalance.value = 0;
    if (
      !this.walletChainId ||
      !this.walletAddress ||
      !this.activeNetwork.value
    ) {
      return;
    }
    const wrappedBalance = await this.web3Gateway.getPRTokenBalance(
      this.activeNetwork.value,
      this.walletAddress,
    );
    if (!wrappedBalance.success) {
      return;
    }
    this.wrappedBalance.value = wrappedBalance.data.balance;
  }
  async __presentClaimableInscriptions() {
    this.claimableInscriptions.value = 0;
    const claimableBalance = await this.web3Gateway.fetchClaimableAmount(
      this.activeNetwork.value,
      this.walletAddress,
    );
    if (!claimableBalance.success) {
      return;
    }
    this.claimableInscriptions.value =
      claimableBalance.data.amount;
  }

  async present(): Promise<BalanceCardViewModel> {
    await this.__presentInscriptionBalance();
    await this.__presentClaimableInscriptions();
    await this.__presentWrappedBalance();
    return {
      status: "success",
      data: {
        inscriptionBalance: this.inscriptionBalance,
        wrappedBalance: this.wrappedBalance,
        fee: this.fee,
        claimableInscriptions: this.claimableInscriptions,
      },
    };
  }
}
