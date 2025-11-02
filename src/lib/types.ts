export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  fundId: number;
}

export interface Fund {
  id: number;
  name: string;
  transactions: Transaction[];
  total: number;
  accountId: number;
}

export interface Account {
  id: number;
  name: string;
  funds: Fund[];
  totalBalance: number;
}
