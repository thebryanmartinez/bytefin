import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getNewBalance } from "../src/modules/shared/utils";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("accounts").collect();
  },
});

export const updateAccountBalance = mutation({
  args: {
    id: v.id("accounts"),
    currentBalance: v.number(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const newBalance = getNewBalance(args.currentBalance, args.amount);
    await ctx.db.patch("accounts", args.id, { balance: newBalance });
  },
});
