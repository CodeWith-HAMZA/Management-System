// for operations and queries in user table, regarding convex db

import { v } from "convex/values";
import { mutation } from "./_generated/server";



export const upsertUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {

    // check if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user) {
      return user;
    }


    // othre wise create the user
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      image: args.image,
      clerkId: args.clerkId,
    });

    return userId;
  }
});



