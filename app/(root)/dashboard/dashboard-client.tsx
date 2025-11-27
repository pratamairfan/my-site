"use client";
import { auth } from "@/lib/auth";
import Maps from "./maps";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  CheckCircle2Icon,
  HouseWifi,
  RadioTower,
} from "lucide-react";
import { Modal } from "@/app/components/modal";

type Session = typeof auth.$Infer.Session;

export default function DashboardClientPage({ session }: { session: Session }) {
  const user = session.user;

  return (
    <div className="min-h-screen bg-accent rounded-md">
      {/* Main Content */}
      <main className="w-full sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-background rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-accent-foreground mb-2">
                  Hi, {user.name}! 👋🏼
                </h2>
                <p className="text-gray-400">Welcome to dashboard</p>
              </div>
            </div>

            {/* Authentication Info */}
            <div className="bg-accent border border-accent rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Notifications Permit
              </h3>
              <div className="text-sm">
                <div className="h-36 overflow-auto">
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                  <Alert className="mb-2">
                    <CheckCircle2Icon />
                    <AlertDescription>
                      This is an alert with icon, title and description.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-6">
              <div className="bg-accent flex flex-col gap-2 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Witel
                </h3>
                <p className="dark:text-gray-300 text-gray-600 text-sm">0</p>
                <Modal label="View" title="List Witel" />
              </div>

              <div className="bg-accent flex flex-col gap-2 rounded-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <HouseWifi className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Datel
                </h3>
                <p className="dark:text-gray-300 text-gray-600 text-sm">0</p>
                <Modal label="View" title="List Datel" />
              </div>

              <div className="bg-accent flex flex-col gap-2 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <RadioTower className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  STO / Site
                </h3>
                <p className="dark:text-gray-300 text-gray-600 text-sm">0</p>
                <Modal label="View" title="List STO / Site" />
              </div>
            </div>

            {/* Maps */}
            <Maps />
          </div>
        </div>
      </main>
    </div>
  );
}
