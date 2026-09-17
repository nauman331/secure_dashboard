import { ReactNode } from "react";
import { auth } from "@/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar user={session?.user} />

      {/* Main Content Area offset by sidebar width */}
      <div className="flex flex-col min-h-screen lg:pl-60 transition-[padding] duration-150">
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
