"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  BookOpen,
  CreditCard,
  CalendarCheck,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth/logout";

interface SidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    image?: string | null;
  };
}

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/dashboard/students", icon: GraduationCap },
  { title: "Faculty & Staff", href: "/dashboard/faculty", icon: Users },
  { title: "Fee Management", href: "/dashboard/fees", icon: CreditCard },
  { title: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
  { title: "Courses & LMS", href: "/dashboard/lms", icon: BookOpen },
  { title: "Results & Grades", href: "/dashboard/results", icon: BarChart3 },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm text-slate-800"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex w-60 flex-col bg-white border-r border-slate-200/80 transition-transform duration-200 lg:translate-x-0 p-5 font-sans",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo matching Skillset header */}
        <div className="flex h-12 items-center justify-between pb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
                EduPak
              </span>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F] ml-1 mt-1.5" />
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 pt-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150",
                  isActive
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-[#FF5F1F]" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Upgrade / Pro Card in Sidebar (Midnight Slate + Orange dot & CTA) */}
        <div className="pt-3 pb-4">
          <div className="rounded-2xl bg-[#0F172A] p-4 text-white shadow-sm text-left relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Campus Edition Pro</span>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-300 leading-tight">
              Biometric turnstiles, automated SMS & Board transcripts.
            </p>
            <Link
              href="/settings"
              className="mt-3 block w-full rounded-xl bg-white/10 hover:bg-[#FF5F1F] hover:text-white transition-colors py-1.5 text-center text-xs font-bold text-slate-200"
            >
              Configure
            </Link>
          </div>
        </div>

        {/* Bottom Menu items */}
        <div className="border-t border-slate-100 pt-3 space-y-0.5 text-xs font-medium">
          <Link
            href="/settings"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-slate-500 hover:bg-slate-100/70 hover:text-slate-900 transition-colors"
          >
            <Settings className="h-4 w-4 text-slate-400" />
            <span>Settings</span>
          </Link>

          <button
            type="button"
            onClick={() => alert("EduPak Institutional Helpdesk: support@edupak.edu.pk")}
            className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2 text-slate-500 hover:bg-slate-100/70 hover:text-slate-900 transition-colors text-left cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <span>Help Center</span>
          </button>

          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
