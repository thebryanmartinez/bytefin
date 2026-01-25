import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getNewBalance } from "./funds";

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
