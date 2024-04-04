import { BigNumber } from "ethers";
import {
  type GetAllocationLimitDTO,
  type GetAllMintedDTO,
  type GetAllocationForAddressDTO,
  type GetInscriptionStatusDTO,
  type GetLatestBlockDTO,
  type GetBalanceForAccountDTO,
  type GetTotalMintedForAccountDTO,
} from "../dto/indexer-dto";
import { toHumanReadableNumber } from "~/lib/utils/tokenUtils";
import { type BaseDTO } from "../dto/base";

export default class IndexerGateway {
  constructor(private indexer_url: string) {
    this.indexer_url = indexer_url;
  }

  async _call<T>(endpoint: string, method?: string, body?: object): Promise<T> {
    const response = await fetch(`${this.indexer_url}/${endpoint}`, {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      return data as T;
    } else {
      return {
        status: "error",
        msg: "Error fetching data from the indexer.",
      } as T;
    }
  }

  __transformStringToNumber(data: string): number {
    try {
      return toHumanReadableNumber(BigNumber.from(data));
    } catch (e) {
      console.log("Error transforming string to number", data, e);
      return 0;
    }
  }

  async ping(): Promise<boolean> {
    const response = await this._call<BaseDTO<null>>("ping");
    console.log("ping response", response); // TODO: remove
    return response.success;
  }
  async getAllMinted(): Promise<GetAllMintedDTO> {
    const response = await this._call<
      BaseDTO<{
        total_minted: string;
      }>
    >("all_minted");
    if (response.success) {
      const total_minted = this.__transformStringToNumber(
        response.data.total_minted,
      );
      return {
        success: true,
        data: {
          total_minted,
        },
      };
    }
    return response;
  }

  async getAllocationLimits(): Promise<GetAllocationLimitDTO> {
    const response = await this._call<
      BaseDTO<{
        total_mintable: string;
        max_per_mint: string;
        total_allocations: string;
        address_count: string;
      }>
    >("allocation_limits");
    if (response.success) {
      const data = response.data;
      const total_mintable = this.__transformStringToNumber(
        data.total_mintable,
      );
      const max_per_mint = this.__transformStringToNumber(data.max_per_mint);
      const total_allocations = this.__transformStringToNumber(
        data.total_allocations,
      );
      const address_count = this.__transformStringToNumber(data.address_count);
      // console.log("data", max_per_mint, total_mintable, total_allocations, address_count); // TODO: remove
      return {
        success: true,
        data: {
          total_mintable,
          max_per_mint,
          total_allocations,
          address_count,
        },
      };
    }
    return response;
  }

  async getAllocationForAddress(
    address: string,
  ): Promise<GetAllocationForAddressDTO> {
    const response = await this._call<
      BaseDTO<{
        address: string;
        allocation_amount: string;
      }>
    >(`allocation/${address}`);
    if (response.success) {
      const data = response.data;
      const allocation_amount = this.__transformStringToNumber(
        data.allocation_amount,
      );
      return {
        success: true,
        data: {
          address: data.address,
          allocation_amount: allocation_amount,
        },
      };
    }
    return response;
  }

  async getTotalMintedForAccount(
    address: string,
  ): Promise<GetTotalMintedForAccountDTO> {
    const response = await this._call<
      BaseDTO<{
        minted: string;
      }>
    >(`minted/${address}`);
    if (response.success) {
      const data = response.data;
      const minted = this.__transformStringToNumber(data.minted);
      return {
        success: true,
        data: {
          minted: minted,
        },
      };
    }
    return response;
  }

  async getInscriptionStatus(txHash: string): Promise<GetInscriptionStatusDTO> {
    const response = await this._call<
      BaseDTO<{
        tx_hash: string;
        block_number: number;
        sender: string;
        timestamp: number;
        p: string;
        op: string;
        tick: string;
        receiver: string;
        amount: string;
        valid: number;
      }>
    >(`inscriptions/${txHash}`);
    if (response.success) {
      const data = response.data;
      const amount = this.__transformStringToNumber(data.amount);
      return {
        success: true,
        data: {
          tx_hash: data.tx_hash,
          block_number: data.block_number,
          sender: data.sender,
          timestamp: data.timestamp,
          p: data.p,
          op: data.op,
          tick: data.tick,
          receiver: data.receiver,
          amount: amount,
          valid: data.valid,
        },
      };
    }
    return response;
  }

  async getLatestBlock(): Promise<GetLatestBlockDTO> {
    const response = await this._call<GetLatestBlockDTO>("latest_block");
    return response;
  }

  async getBalanceForAccount(
    address: string,
    latestBlock?: number,
  ): Promise<GetBalanceForAccountDTO> {
    if (latestBlock) {
      const response = await this._call<
        BaseDTO<{
          balance: string;
        }>
      >(`balances/${address}?block=${latestBlock}`);
      if (response.success) {
        const data = response.data;
        const balance = this.__transformStringToNumber(data.balance);
        return {
          success: true,
          data: {
            balance: balance,
          },
        };
      }
      return response;
    }
    const response = await this._call<
      BaseDTO<{
        balance: string;
      }>
    >(`balances/${address}`);
    if (response.success) {
      const data = response.data;
      const balance = this.__transformStringToNumber(data.balance);
      return {
        success: true,
        data: {
          balance: balance,
        },
      };
    }
    return response;
  }
}
