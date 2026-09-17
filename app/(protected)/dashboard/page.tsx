import { auth } from "@/auth";
import Link from "next/link";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowUp,
  RotateCw,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";

export default async function DashboardPage() {
  const session = await auth();

  const barData = [
    { month: "Jan", height: "65%", active: false },
    { month: "Feb", height: "72%", active: false },
    { month: "Mar", height: "88%", active: true },
    { month: "Apr", height: "55%", active: false },
    { month: "May", height: "92%", active: false },
    { month: "Jun", height: "35%", active: false },
  ];

  const recentTransactions = [
    {
      course: "Digital Marketing & Design",
      initials: "DM",
      student: "Aria Zafar",
      id: "#3456791",
      amount: "PKR 14,500",
      status: "Paid",
    },
    {
      course: "Advanced Physics & Mechanics",
      initials: "AP",
      student: "Muhammad Ali",
      id: "#3456792",
      amount: "PKR 16,000",
      status: "Paid",
    },
    {
      course: "Pre-Medical Chemistry",
      initials: "CH",
      student: "Zainab Fatima",
      id: "#3456793",
      amount: "PKR 12,500",
      status: "Paid",
    },
    {
      course: "Computer Science Python",
      initials: "CS",
      student: "Bilal Raza",
      id: "#3456794",
      amount: "PKR 15,000",
      status: "Paid",
    },
  ];

  return (
    <div className="flex-1 pb-14 bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <TopNav
        title="Dashboard"
        user={session?.user}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-5">
        {/* Top 4 Stat Cards matching Skillset layout with Midnight Slate & Orange accents */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Deep Midnight Slate hero card with Orange indicator */}
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Revenue</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  PKR 84,200
                </h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-semibold">
              <ArrowUp className="h-3.5 w-3.5" />
              <span>4.2% from last month</span>
            </div>
          </div>

          {/* Card 2: Active Users / Students */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Active Students</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                16,815
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-semibold">
              <ArrowUp className="h-3.5 w-3.5" />
              <span>1.7% from last month</span>
            </div>
          </div>

          {/* Card 3: New Users / Admissions */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">New Admissions</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                1,457
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-semibold">
              <ArrowUp className="h-3.5 w-3.5" />
              <span>2.9% from last month</span>
            </div>
          </div>

          {/* Card 4: Total Mentors / Faculty */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Mentors & Faculty</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                2,023
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-semibold">
              <ArrowUp className="h-3.5 w-3.5" />
              <span>0.9% from last month</span>
            </div>
          </div>
        </div>

        {/* Middle Two-Column Grid matching Skillset screenshot */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left: Total Revenue Chart Card (2 cols) */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-bold text-[#0F172A]">Total Revenue</h4>
              <Link
                href="/dashboard/fees"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#FF5F1F] hover:text-white transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Vertical Bar Chart matching reference */}
            <div className="flex items-end justify-between h-56 pt-6 pb-2 px-4">
              {/* Y-Axis labels */}
              <div className="flex flex-col justify-between h-full text-[11px] font-semibold text-slate-400 pr-4">
                <span>10K</span>
                <span>8K</span>
                <span>4K</span>
                <span>2K</span>
                <span>0</span>
              </div>

              {/* Bar Columns */}
              <div className="flex-1 flex items-end justify-around h-full">
                {barData.map((bar) => (
                  <div key={bar.month} className="flex flex-col items-center gap-3 h-full justify-end">
                    <div className="w-10 sm:w-12 bg-slate-100 rounded-2xl overflow-hidden flex items-end h-44 p-1">
                      <div
                        className={`w-full rounded-xl transition-all duration-500 ${
                          bar.active
                            ? "bg-[#FF5F1F] shadow-md ring-2 ring-[#FF5F1F]/40"
                            : "bg-[#0F172A] hover:bg-[#1E293B]"
                        }`}
                        style={{ height: bar.height }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        bar.active ? "text-[#FF5F1F]" : "text-slate-400"
                      }`}
                    >
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calendar Widget + Community Growth (1 col) */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between">
            {/* Calendar header */}
            <div>
              <div className="flex items-center justify-between pb-4">
                <button type="button" className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-[#0F172A]">September 2026</span>
                <button type="button" className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Weekday pills matching reference */}
              <div className="grid grid-cols-5 gap-2 text-center py-2">
                {[
                  { day: "Tue", date: "17", active: false },
                  { day: "Wed", date: "18", active: false },
                  { day: "Thu", date: "19", active: true },
                  { day: "Fri", date: "20", active: false },
                  { day: "Sat", date: "21", active: false },
                ].map((item) => (
                  <div
                    key={item.date}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all ${
                      item.active
                        ? "bg-[#0F172A] text-white shadow-md ring-1 ring-[#FF5F1F]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`text-[10px] font-medium ${item.active ? "text-[#FF5F1F]" : "text-slate-400"}`}>
                      {item.day}
                    </span>
                    <span className="text-sm font-bold mt-1">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Growth & Attendance Ring matching screenshot */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Community & Attendance</p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1 font-semibold">
                  <ArrowUp className="h-3 w-3" />
                  <span>0.9% from last month</span>
                </div>
              </div>

              {/* Clean circular gauge ring with Orange progress */}
              <div className="relative flex h-14 w-14 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#FF5F1F]"
                    strokeDasharray="65, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-[#0F172A]">65%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card: Course Purchases / Fee Transactions Table matching Skillset */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h4 className="text-base font-bold text-[#0F172A]">Recent Course Purchases & Fees</h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                title="Refresh"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </button>
              <Link
                href="/dashboard/fees"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-[#FF5F1F] hover:text-white transition-colors"
                title="View All"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400">
                  <th className="py-3 px-3">Course / Department</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Student ID</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] font-bold text-xs">
                          {item.initials}
                        </div>
                        <span className="font-bold text-[#0F172A]">{item.course}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600">{item.student}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">{item.id}</td>
                    <td className="py-3.5 px-3 font-bold text-[#0F172A]">{item.amount}</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="inline-flex items-center rounded-full bg-[#0F172A] px-3.5 py-1 text-[11px] font-bold text-white shadow-2xs">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}