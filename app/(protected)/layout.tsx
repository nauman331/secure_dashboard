import { ReactNode } from "react";
import { auth } from "@/auth";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SidebarProvider>
      <DashboardShell user={session?.user}>
        {children}
      </DashboardShell>
    </SidebarProvider>
  );
}
