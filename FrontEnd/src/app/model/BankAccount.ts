import { User } from "./user";

export interface BankAccount{
    id: string,
    account_status: string,
    balance: number,
    holder?: User
}