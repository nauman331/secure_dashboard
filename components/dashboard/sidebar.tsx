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
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth/logout";
import { useSidebar } from "./sidebar-context";

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
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm text-slate-800 cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container (supports expanded w-60 and collapsed w-[72px]) */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200/80 transition-all duration-200 ease-in-out font-sans",
          // Mobile state
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop width
          collapsed ? "w-[72px] p-3" : "w-60 p-5"
        )}
      >
        {/* Header: Toggle Button strictly inside sidebar */}
        <div
          className={cn(
            "flex h-12 items-center pb-4 border-b border-slate-100",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed ? (
            <>
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

              {/* Collapse toggle button inside sidebar header */}
              <button
                type="button"
                onClick={toggleCollapsed}
                title="Collapse sidebar"
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              {/* Expand toggle button inside collapsed sidebar header */}
              <button
                type="button"
                onClick={toggleCollapsed}
                title="Expand sidebar"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-[#FFF7ED] text-[#0F172A] hover:text-[#FF5F1F] transition-all cursor-pointer shadow-2xs"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 pt-4 overflow-y-auto no-scrollbar">
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
                title={collapsed ? item.title : undefined}
                className={cn(
                  "group flex items-center rounded-xl transition-all duration-150 relative",
                  collapsed
                    ? "h-10 w-10 mx-auto justify-center"
                    : "gap-3.5 px-3.5 py-2.5 text-xs font-semibold",
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
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade / Campus Pro Card */}
        <div className="pt-3 pb-3">
          {!collapsed ? (
            <div className="rounded-2xl bg-[#0F172A] p-4 text-white shadow-sm text-left relative overflow-hidden animate-in fade-in duration-200">
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
          ) : (
            <div className="flex justify-center">
              <Link
                href="/settings"
                title="Campus Edition Pro"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] hover:bg-[#FF5F1F] hover:text-white transition-colors shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Menu items */}
        <div className="border-t border-slate-100 pt-3 space-y-1 text-xs font-medium">
          <Link
            href="/settings"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "Settings" : undefined}
            className={cn(
              "flex items-center rounded-xl text-slate-500 hover:bg-slate-100/70 hover:text-slate-900 transition-colors",
              collapsed ? "h-10 w-10 mx-auto justify-center" : "gap-3 px-3.5 py-2"
            )}
          >
            <Settings className="h-4 w-4 text-slate-400" />
            {!collapsed && <span>Settings</span>}
          </Link>

          <button
            type="button"
            onClick={() => alert("EduPak Institutional Helpdesk: support@edupak.edu.pk")}
            title={collapsed ? "Help Center" : undefined}
            className={cn(
              "w-full flex items-center rounded-xl text-slate-500 hover:bg-slate-100/70 hover:text-slate-900 transition-colors text-left cursor-pointer",
              collapsed ? "h-10 w-10 mx-auto justify-center" : "gap-3 px-3.5 py-2"
            )}
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            {!collapsed && <span>Help Center</span>}
          </button>

          <form action={logout}>
            <button
              type="submit"
              title={collapsed ? "Log out" : undefined}
              className={cn(
                "w-full flex items-center rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left cursor-pointer",
                collapsed ? "h-10 w-10 mx-auto justify-center" : "gap-3 px-3.5 py-2"
              )}
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              {!collapsed && <span>Log out</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
