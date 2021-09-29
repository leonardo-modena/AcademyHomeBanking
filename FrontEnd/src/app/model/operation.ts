export interface Operation {
  idTransaction: number;
  type: 'WITHDRAWAL' | 'DEPOSIT',
  amount: number;
  dateTransaction: number;
  causal: string;
  idAccount: number;
}
