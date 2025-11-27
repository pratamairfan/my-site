import { auth } from "@/lib/auth";
import DashboardClientPage from "./dashboard-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-accent rounded-md transition-all">
      <DashboardClientPage session={session} />
    </div>
  );
}
