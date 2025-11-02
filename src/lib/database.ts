import Dexie from "dexie";

export const database = new Dexie("ByteFinDB");

database.version(2).stores({
  accounts: "++id, name, totalBalance",
  funds: "++id, name, total, accountId",
  transactions: "++id, amount, description, date, fundId",
});
