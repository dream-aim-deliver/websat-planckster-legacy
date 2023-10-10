import { BaseComponentViewModel } from "./base";

export interface MessageViewModel extends BaseComponentViewModel{
    id: number,
    name: string,
    timestamp: Date,
    content: string
}