"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  RotateCw,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  Users,
  CreditCard,
  CalendarCheck,
  BookOpen,
  Award,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TopNavProps {
  title?: string;
  subtitle?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export function TopNav({ title = "Dashboard", subtitle, user }: TopNavProps) {
  const router = useRouter();
  const [timeframe, setTimeframe] = React.useState<"Day" | "Week" | "Month" | "Year">("Month");
  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const [showQuickActionModal, setShowQuickActionModal] = React.useState(false);
  const [actionType, setActionType] = React.useState<"student" | "fee" | "attendance">("student");
  const [actionSuccess, setActionSuccess] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const searchIndex = [
    { title: "Student Directory", href: "/dashboard/students", category: "Academics", icon: Users },
    { title: "Fee Ledger & Challans", href: "/dashboard/fees", category: "Financials", icon: CreditCard },
    { title: "Class Attendance Hub", href: "/dashboard/attendance", category: "Daily Records", icon: CalendarCheck },
    { title: "LMS & Online Courses", href: "/dashboard/lms", category: "Academics", icon: BookOpen },
    { title: "Exam Results & Transcripts", href: "/dashboard/results", category: "Examinations", icon: Award },
    { title: "Muhammad Ali Khan (Roll #1042)", href: "/dashboard/students", category: "Student • Grade 10", icon: Users },
    { title: "Mariam Noor (Roll #1094)", href: "/dashboard/students", category: "Student • O-Levels", icon: Users },
    { title: "Challan #CHL-2026-081", href: "/dashboard/fees", category: "Fee Voucher", icon: CreditCard },
  ];

  const filteredSearch = searchIndex.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
      setShowQuickActionModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 px-6 sm:px-10 bg-transparent font-sans">
        {/* Left: Big Bold Title (clean header, no toggle) */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Right: Controls Strip (matching Skillset top bar) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Segmented Timeframe Toggle [ Day | Week | Month | Year ] */}
          <div className="hidden sm:flex items-center rounded-full bg-white p-1 shadow-2xs border border-slate-200/80">
            {(["Day", "Week", "Month", "Year"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  timeframe === t
                    ? "bg-[#0F172A] text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Date Picker Capsule */}
          <div className="hidden lg:flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs border border-slate-200/80">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>1 Sep 2026 - 30 Sep 2026</span>
          </div>

          {/* Search Capsule Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              onClick={() => setShowSearchModal(true)}
              readOnly
              className="h-9 w-36 sm:w-44 rounded-full bg-white pl-9 pr-4 text-xs font-medium text-slate-800 shadow-2xs border border-slate-200/80 placeholder:text-slate-400 hover:border-slate-300 transition-colors cursor-pointer"
            />
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setShowQuickActionModal(true)}
            title="Quick Action"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-2xs border border-slate-200/80 hover:bg-[#FF5F1F] hover:text-white hover:border-[#FF5F1F] transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>

          {/* User Profile Avatar Pill */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-white text-xs font-bold shadow-2xs border-2 border-white ring-1 ring-slate-200">
            {user?.name ? user.name.slice(0, 1).toUpperCase() : "A"}
          </div>
        </div>
      </header>

      {/* Search Palette Modal */}
      <Modal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        title="Search EduPak"
        description="Jump instantly to students, fee vouchers, or modules."
      >
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              autoFocus
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs focus:border-[#FF5F1F] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 pt-1">
            {filteredSearch.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setShowSearchModal(false);
                  router.push(item.href);
                }}
                className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-[#FF5F1F] group-hover:text-white transition-colors text-slate-600">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#FF5F1F] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{item.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Quick Action Modal */}
      <Modal
        isOpen={showQuickActionModal}
        onClose={() => setShowQuickActionModal(false)}
        title="Quick Action"
        description="Add a student, collect fee, or mark attendance."
      >
        {actionSuccess ? (
          <div className="py-6 text-center animate-in zoom-in-95">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#FF5F1F]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-slate-900">Saved Successfully</h4>
            <p className="text-xs text-slate-500 mt-1">Record updated in real-time.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActionType("student")}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  actionType === "student"
                    ? "border-[#FF5F1F] bg-[#FFF7ED] text-[#C2410C]"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                + Student
              </button>
              <button
                type="button"
                onClick={() => setActionType("fee")}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  actionType === "fee"
                    ? "border-[#FF5F1F] bg-[#FFF7ED] text-[#C2410C]"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                + Fee
              </button>
              <button
                type="button"
                onClick={() => setActionType("attendance")}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  actionType === "attendance"
                    ? "border-[#FF5F1F] bg-[#FFF7ED] text-[#C2410C]"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                + Attendance
              </button>
            </div>

            <form onSubmit={handleActionSubmit} className="space-y-3">
              <div>
                <Label className="text-xs font-semibold">Student Name</Label>
                <Input required placeholder="e.g. Danial Ahmed" className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Class</Label>
                  <select className="mt-1 flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800">
                    <option>Grade 10 Matric</option>
                    <option>Grade 9 Science</option>
                    <option>O-Levels</option>
                    <option>A-Levels</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-semibold">Amount (PKR)</Label>
                  <Input type="number" defaultValue={14500} className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setShowQuickActionModal(false)}
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#FF5F1F] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer shadow-xs"
                >
                  Confirm & Save
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
