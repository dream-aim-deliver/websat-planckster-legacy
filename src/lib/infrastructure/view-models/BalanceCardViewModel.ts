import { type Signal } from "@preact/signals-react";
import { type BaseViewModel } from "../view-models/base";

export interface BalanceCardData {
    inscriptionBalance: Signal<number>;
    wrappedBalance: Signal<number>;
    fee: Signal<number>;
    claimableInscriptions: Signal<number>;
}

type BalanceCardViewModel = BaseViewModel<BalanceCardData>;

export default BalanceCardViewModel;