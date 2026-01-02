import { db } from "@api/db";
import env from "@api/env";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.CLIENT_APP_URL],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },

  advanced: {
    cookiePrefix: "manjula",
    useSecureCookies: env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});
