import Dexie, { type Table } from "dexie";
import type { Account, Fund, Transaction } from "./types";

export class ByteFinDB extends Dexie {
  accounts!: Table<Account>;
  funds!: Table<Fund>;
  transactions!: Table<Transaction>;

  constructor() {
    super("ByteFinDB");
    this.version(2).stores({
      accounts: "id, name, totalBalance",
      funds: "id, name, total, accountId",
      transactions: "id, amount, description, date, fundId",
    });
  }
}

export const database = new ByteFinDB();
