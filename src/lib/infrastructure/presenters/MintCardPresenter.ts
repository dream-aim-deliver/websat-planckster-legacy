import { type Signal, signal } from "@preact/signals-react";
import type MintCardViewModel from "../view-models/MintCardViewModel";
import type IndexerGateway from "../gateways/indexer";
import {
  type GetAllocationLimitDTO,
  type GetAllMintedDTO,
} from "../dto/indexer-dto";

export default class MintCardPresenter {
  public mintedPercentage: Signal<number>;
  public mintLimit: Signal<number>;
  public totalSupply: Signal<number>;
  public totalMinted: Signal<number>;
  public allocation: Signal<number>;
  private DEFAULT_ALLOCATION: Signal<number>;
  private indexer: IndexerGateway;
  private walletAddress: string | undefined;
  
  constructor(indexer: IndexerGateway, walletAddress: string | undefined) {
    this.mintLimit = signal(0);
    this.mintedPercentage = signal(0);
    this.totalSupply = signal(0);
    this.totalMinted = signal<number>(0);
    this.allocation = signal<number>(0);
    this.DEFAULT_ALLOCATION = signal<number>(0);
    this.indexer = indexer;
    this.walletAddress = walletAddress;
  }

  async __presentAllMinted() {
    const allMinted: GetAllMintedDTO = await this.indexer.getAllMinted();
    if (!allMinted.success) {
      return {
        status: "error",
        message: allMinted.msg,
      } as MintCardViewModel;
    } else if (allMinted.success) {
      this.totalMinted.value = allMinted.data.total_minted;
    }
  }

  async __presentTotalSupply() {
    this.totalSupply.value = 5000000; // TODO: hardcoded value
  }

  async __presentMintLimit() {
    const allocationLimits: GetAllocationLimitDTO =
      await this.indexer.getAllocationLimits();
    if (!allocationLimits.success) {
      return {
        status: "error",
        message: allocationLimits.msg,
      } as MintCardViewModel;
    } else {
      this.mintLimit.value = allocationLimits.data.total_mintable; // TODO: check if this is the correct value
      // this.DEFAULT_ALLOCATION.value =
      // allocationLimits.data.max_per_mint; // TODO: enable later
    }
  }

  async __presentMintPercentage() {
    this.mintedPercentage.value = parseFloat(
      ((this.totalMinted.value / this.mintLimit.value) * 100).toFixed(2),
    );
  }

  async __presentAllocationForAddress() {
    if (!this.walletAddress) {
      this.allocation.value = this.DEFAULT_ALLOCATION.value; // TODO: disable minting
      return;
    }
    const allocationForAcountDTO = await this.indexer.getAllocationForAddress(
      this.walletAddress,
    );
    if (!allocationForAcountDTO.success) {
      this.allocation.value = this.DEFAULT_ALLOCATION.value;
      return;
    }
    // TODO check balance, if balance is less than allocation, set allocation to (allocation - balance)
    const totalMintedDTO = await this.indexer.getTotalMintedForAccount(
      this.walletAddress,
    );
    if (!totalMintedDTO.success) {
      this.allocation.value = this.DEFAULT_ALLOCATION.value;
      return;
    }
    // TODO: check if this is the correct value
    if (
      totalMintedDTO.data.minted >=
      allocationForAcountDTO.data.allocation_amount
    ) {
      this.allocation.value = this.DEFAULT_ALLOCATION.value;
      return;
    } else {
      this.allocation.value =
        allocationForAcountDTO.data.allocation_amount - totalMintedDTO.data.minted;
      return;
    }
  }

  async present(): Promise<MintCardViewModel> {
    // present the view model
    await this.__presentAllMinted();
    await this.__presentTotalSupply();
    await this.__presentMintLimit();
    await this.__presentMintPercentage();
    await this.__presentAllocationForAddress();

    return {
      status: "success",
      data: {
        mintedPercentage: this.mintedPercentage,
        mintLimit: this.mintLimit,
        totalSupply: this.totalSupply,
        totalMinted: this.totalMinted,
        allocation: this.allocation,
      },
    } as MintCardViewModel;
  }
}
