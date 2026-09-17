"use client";

import * as React from "react";
import { useSidebar } from "./sidebar-context";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    image?: string | null;
  };
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] antialiased selection:bg-[#FF5F1F] selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar user={user} />

      {/* Main Content Area offset by sidebar width (animates smoothly when collapsed/expanded) */}
      <div
        className={cn(
          "flex flex-col min-h-screen transition-[padding] duration-200 ease-in-out",
          collapsed ? "lg:pl-[72px]" : "lg:pl-60"
        )}
      >
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
