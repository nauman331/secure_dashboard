"use client";

import * as React from "react";
import {
  CreditCard,
  Search,
  Plus,
  RotateCw,
  Building2,
  Smartphone,
  CheckCircle2,
  Printer,
  ArrowUpRight,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FeeVoucher {
  id: string;
  challanNo: string;
  studentName: string;
  rollNo: string;
  grade: string;
  amount: string;
  dueDate: string;
  channel: string;
  status: "Paid" | "Pending" | "Overdue";
}

const initialVouchers: FeeVoucher[] = [
  {
    id: "1",
    challanNo: "CHL-2026-081",
    studentName: "Muhammad Ali Khan",
    rollNo: "#3456791",
    grade: "Grade 10-A",
    amount: "PKR 14,500",
    dueDate: "20 Sep 2026",
    channel: "HBL Bank Transfer",
    status: "Paid",
  },
  {
    id: "2",
    challanNo: "CHL-2026-082",
    studentName: "Zainab Fatima",
    rollNo: "#3456792",
    grade: "Grade 9-B",
    amount: "PKR 12,000",
    dueDate: "20 Sep 2026",
    channel: "JazzCash Direct",
    status: "Paid",
  },
  {
    id: "3",
    challanNo: "CHL-2026-083",
    studentName: "Ayan Sheikh",
    rollNo: "#3456793",
    grade: "Grade 11 Pre-Med",
    amount: "PKR 16,000",
    dueDate: "20 Sep 2026",
    channel: "Pending Challan",
    status: "Pending",
  },
  {
    id: "4",
    challanNo: "CHL-2026-084",
    studentName: "Mariam Noor",
    rollNo: "#3456794",
    grade: "O-Levels",
    amount: "PKR 22,000",
    dueDate: "20 Sep 2026",
    channel: "EasyPaisa",
    status: "Paid",
  },
  {
    id: "5",
    challanNo: "CHL-2026-085",
    studentName: "Bilal Raza",
    rollNo: "#3456795",
    grade: "Grade 12 Pre-Engg",
    amount: "PKR 16,000",
    dueDate: "10 Sep 2026",
    channel: "Overdue Challan",
    status: "Overdue",
  },
];

export default function FeesPage() {
  const [vouchers, setVouchers] = React.useState<FeeVoucher[]>(initialVouchers);
  const [tabFilter, setTabFilter] = React.useState<"All" | "Paid" | "Pending">("All");
  const [search, setSearch] = React.useState("");
  const [selectedVoucher, setSelectedVoucher] = React.useState<FeeVoucher | null>(null);

  const filteredVouchers = vouchers.filter((v) => {
    const matchesSearch =
      v.studentName.toLowerCase().includes(search.toLowerCase()) ||
      v.challanNo.toLowerCase().includes(search.toLowerCase());
    if (tabFilter === "Paid") return matchesSearch && v.status === "Paid";
    if (tabFilter === "Pending") return matchesSearch && v.status !== "Paid";
    return matchesSearch;
  });

  const markPaid = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Paid", channel: "Cash Counter" } : v))
    );
    setSelectedVoucher(null);
  };

  return (
    <div className="flex-1 pb-14 bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <TopNav title="Fee Management & Invoicing" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-5">
        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Billed</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  PKR 9.63M
                </h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            </div>
            <span className="text-xs text-slate-300 font-semibold mt-2 inline-block">
              1,248 issued challans
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Collected Cashflow</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 mt-1">
                PKR 8.42M
              </h3>
            </div>
            <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">
              87.4% recovery rate
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Defaulter Arrears</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                PKR 1.21M
              </h3>
            </div>
            <span className="text-xs text-slate-400 mt-2 inline-block">88 pending vouchers</span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Fee Concessions</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                PKR 450K
              </h3>
            </div>
            <span className="text-xs text-slate-400 mt-2 inline-block">32 merit scholarships</span>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search challan # or student name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full bg-white pl-9 pr-4 text-xs font-medium text-slate-800 shadow-2xs border border-slate-200/80 focus:border-[#FF5F1F] focus:outline-none"
              />
            </div>

            <div className="flex items-center rounded-full bg-white p-1 border border-slate-200/80 shadow-2xs">
              {(["All", "Paid", "Pending"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTabFilter(tab)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    tabFilter === tab
                      ? "bg-[#0F172A] text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert("Batch Challan Generator initialized.")}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5F1F] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#E54E10] transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print Batch Challans
          </button>
        </div>

        {/* Vouchers Table Card */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                  <th className="py-3 px-3">Challan No</th>
                  <th className="py-3 px-3">Student</th>
                  <th className="py-3 px-3">Class</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Due Date</th>
                  <th className="py-3 px-3">Payment Channel</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVouchers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#0F172A]">{v.challanNo}</td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-[#0F172A]">{v.studentName}</p>
                      <p className="text-[10px] text-slate-400">{v.rollNo}</p>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{v.grade}</td>
                    <td className="py-3.5 px-3 font-bold text-[#0F172A]">{v.amount}</td>
                    <td className="py-3.5 px-3 text-slate-500">{v.dueDate}</td>
                    <td className="py-3.5 px-3 text-slate-600">{v.channel}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-bold ${
                          v.status === "Paid"
                            ? "bg-[#0F172A] text-white shadow-2xs"
                            : v.status === "Pending"
                            ? "bg-orange-50 text-[#C2410C] border border-orange-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {v.status !== "Paid" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedVoucher(v)}
                          className="rounded-full bg-[#FF5F1F] px-3.5 py-1 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer shadow-2xs"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Cleared</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {selectedVoucher && (
        <Modal
          isOpen={!!selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
          title="Collect Fee Payment"
          description={`Challan: ${selectedVoucher.challanNo} • ${selectedVoucher.studentName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payable Amount:</span>
                <span className="text-lg font-extrabold text-[#0F172A]">{selectedVoucher.amount}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-500">Student Class:</span>
                <span className="font-semibold text-slate-800">{selectedVoucher.grade}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-500">Due Date:</span>
                <span className="font-semibold text-slate-800">{selectedVoucher.dueDate}</span>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Payment Method</Label>
              <select className="mt-1 flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-[#FF5F1F]">
                <option>Cash at Accounts Counter</option>
                <option>HBL Direct Transfer</option>
                <option>JazzCash QR Scan</option>
                <option>EasyPaisa Voucher</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setSelectedVoucher(null)}>
                Cancel
              </Button>
              <button
                type="button"
                onClick={() => markPaid(selectedVoucher.id)}
                className="rounded-xl bg-[#FF5F1F] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer shadow-xs"
              >
                Confirm Payment & Issue Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
