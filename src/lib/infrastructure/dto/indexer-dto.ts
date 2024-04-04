import { type BaseDTO } from "./base";

export type GetAllMintedSuccessDTO = {
    total_minted: number;
}
export type GetAllMintedDTO = BaseDTO<GetAllMintedSuccessDTO>;

export type GetAllocationLimitSSuccessDTO = {
    "total_mintable": number,
    "max_per_mint": number,
    "total_allocations": number,
    "address_count": number
}

export type GetAllocationLimitDTO = BaseDTO<GetAllocationLimitSSuccessDTO>;


export type GetAllocationForAddressSuccessDTO = {
    "address": string,
    "allocation_amount": number,
}

export type GetAllocationForAddressDTO = BaseDTO<GetAllocationForAddressSuccessDTO>;


/**
 * Represents the DTO (Data Transfer Object) for a successful inscription retrieval.
 */
export type GetInscriptionSuccessDTO = {
    tx_hash: string,
    block_number: number,
    sender: string,
    timestamp: number,
    p: string,
    op: string,
    tick: string,
    receiver: string,
    amount: number,
    valid: number
}

export type GetInscriptionStatusDTO = BaseDTO<GetInscriptionSuccessDTO>;


export type GetLatestBlockSuccessDTO = {
    latest_block: number
}

export type GetLatestBlockDTO = BaseDTO<GetLatestBlockSuccessDTO>;

export type GetBalanceForAccountSuccessDTO = {
    balance: number
}

export type GetBalanceForAccountDTO = BaseDTO<GetBalanceForAccountSuccessDTO>;

export type GetTotalMintedForAccountSuccessDTO = {
    minted: number
}

export type GetTotalMintedForAccountDTO = BaseDTO<GetTotalMintedForAccountSuccessDTO>;
