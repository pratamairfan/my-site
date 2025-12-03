import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma/client";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "./email";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // Send reset password email to user
      // Using void to avoid awaiting (prevents timing attacks)
      void sendResetPasswordEmail(user.email, url);
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour in seconds
    onPasswordReset: async ({ user }) => {
      // Log password reset for security/analytics
      console.log(`✅ Password reset successful for user: ${user.email}`);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
