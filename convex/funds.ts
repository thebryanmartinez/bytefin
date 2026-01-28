import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getNewBalance } from "../src/modules/shared/utils";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("funds").collect();
  },
});

export const createFund = mutation({
  args: { name: v.string(), balance: v.number(), accountId: v.id("accounts") },
  handler: async (ctx, args) => {
    const newFundId = await ctx.db.insert("funds", {
      name: args.name,
      balance: args.balance,
      accountId: args.accountId,
    });
    return newFundId;
  },
});

export const deleteFund = mutation({
  args: { id: v.id("funds") },
  handler: async (ctx, args) => {
    await ctx.db.delete("funds", args.id);
  },
});

export const updateFundBalance = mutation({
  args: { id: v.id("funds"), currentBalance: v.number(), amount: v.number() },
  handler: async (ctx, args) => {
    const newBalance = getNewBalance(args.currentBalance, args.amount);
    await ctx.db.patch("funds", args.id, { balance: newBalance });
  },
});
