import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "../components/Navigation";
import ResetPasswordClient from "./reset-password-client";

export default async function ResetPasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navigation session={session} />
      <ResetPasswordClient />
    </>
  );
}
