export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  fundId: string;
}

export interface Fund {
  id: string;
  name: string;
  transactions: Transaction[];
  total: number;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  funds: Fund[];
  totalBalance: number;
}
