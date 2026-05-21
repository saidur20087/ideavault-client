import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();

const db = client.db("ideaVaultDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
    },
  },
// session: {
//     cookieCache: {
//         enabled: true,
//         strategy : "jwt",
//         maxAge : 7 * 24 * 60 * 60
//     }
// },

  secret: process.env.BETTER_AUTH_SECRET,

});