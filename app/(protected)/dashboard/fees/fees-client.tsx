"use client";

import * as React from "react";
import { useTransition } from "react";
import {
  CreditCard,
  Search,
  Plus,
  Building2,
  CheckCircle2,
  Printer,
  Calendar,
  X,
  Clock,
  AlertCircle,
  FileText,
  Trash2,
  DollarSign,
  ChevronDown,
  ArrowUpRight,
  Receipt,
  Download,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { markVoucherPaid } from "@/actions/fees/collect";
import { createFeeChallan, deleteFeeChallan } from "@/actions/fees/create";

export interface FeeVoucherRecord {
  id: string;
  challanNo: string;
  studentName: string;
  rollNo: string;
  grade: string;
  amount: number;
  dueDate: string;
  channel: string | null;
  status: "Paid" | "Pending" | "Overdue";
  paidAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export function FeesClient({ initialData }: { initialData: FeeVoucherRecord[] }) {
  const [vouchers, setVouchers] = React.useState<FeeVoucherRecord[]>(initialData);
  const [tabFilter, setTabFilter] = React.useState<"All" | "Paid" | "Pending" | "Overdue">("All");
  const [search, setSearch] = React.useState("");
  const [selectedVoucher, setSelectedVoucher] = React.useState<FeeVoucherRecord | null>(null);
  const [viewingReceipt, setViewingReceipt] = React.useState<FeeVoucherRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("Cash at Accounts Counter");

  const [isPending, startTransition] = useTransition();

  // Create form states
  const [newStudentName, setNewStudentName] = React.useState("");
  const [newRollNo, setNewRollNo] = React.useState("");
  const [newGrade, setNewGrade] = React.useState("Grade 10-A");
  const [newAmount, setNewAmount] = React.useState("15000");
  const [newDueDate, setNewDueDate] = React.useState("30 Sep 2026");

  // Keep state synced with server data if revalidated
  React.useEffect(() => {
    setVouchers(initialData);
  }, [initialData]);

  // Dynamic KPI calculations
  const totalBilled = vouchers.reduce((acc, v) => acc + (v.amount || 0), 0);
  const paidVouchers = vouchers.filter((v) => v.status === "Paid");
  const collectedCashflow = paidVouchers.reduce((acc, v) => acc + (v.amount || 0), 0);
  const pendingVouchers = vouchers.filter((v) => v.status !== "Paid");
  const arrearsAmount = pendingVouchers.reduce((acc, v) => acc + (v.amount || 0), 0);
  const recoveryRate = totalBilled > 0 ? Math.round((collectedCashflow / totalBilled) * 100) : 0;

  const formatPKR = (val: number) => {
    if (val >= 1_000_000) {
      return `PKR ${(val / 1_000_000).toFixed(2)}M`;
    }
    if (val >= 1_000) {
      return `PKR ${(val / 1_000).toFixed(0)}K`;
    }
    return `PKR ${val.toLocaleString()}`;
  };

  const filteredVouchers = vouchers.filter((v) => {
    const matchesSearch =
      v.studentName.toLowerCase().includes(search.toLowerCase()) ||
      v.challanNo.toLowerCase().includes(search.toLowerCase()) ||
      v.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      v.grade.toLowerCase().includes(search.toLowerCase());

    if (tabFilter === "Paid") return matchesSearch && v.status === "Paid";
    if (tabFilter === "Pending") return matchesSearch && v.status === "Pending";
    if (tabFilter === "Overdue") return matchesSearch && v.status === "Overdue";
    return matchesSearch;
  });

  const handleCollectPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVoucher) return;

    startTransition(() => {
      markVoucherPaid({
        voucherId: selectedVoucher.id,
        paymentMethod,
      }).then((res) => {
        if (res.success) {
          setSelectedVoucher(null);
        } else {
          alert(res.error);
        }
      });
    });
  };

  const handleCreateChallan = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      createFeeChallan({
        studentName: newStudentName,
        rollNo: newRollNo,
        grade: newGrade,
        amount: Number(newAmount),
        dueDate: newDueDate,
      }).then((res) => {
        if (res.success) {
          setIsCreateModalOpen(false);
          setNewStudentName("");
          setNewRollNo("");
          setNewAmount("15000");
          setNewDueDate("30 Sep 2026");
        } else {
          alert(res.error);
        }
      });
    });
  };

  const handleDelete = (id: string, challanNo: string) => {
    if (!confirm(`Are you sure you want to delete challan ${challanNo}?`)) return;
    startTransition(() => {
      deleteFeeChallan(id).then((res) => {
        if (!res.success) alert(res.error);
      });
    });
  };

  return (
    <div className="flex-1 pb-16 bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <TopNav
        title="Fee Management & Invoicing"
        subtitle="Manage student fee challans, cashflow collection, bank transfers, and defaulter ledgers."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-4 space-y-6">
        {/* Dynamic 4-Card KPI Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Card 1: Total Billed */}
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Billed
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  {formatPKR(totalBilled)}
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#FF5F1F]">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium pt-2">
              <span className="flex h-2 w-2 rounded-full bg-[#FF5F1F]" />
              <span>{vouchers.length} issued challans</span>
            </div>
          </div>

          {/* Card 2: Collected Cashflow */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Collected Cashflow
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 mt-1">
                  {formatPKR(collectedCashflow)}
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 pt-2">
              <span className="font-bold">{recoveryRate}%</span> recovery rate ({paidVouchers.length} paid)
            </p>
          </div>

          {/* Card 3: Defaulter Arrears */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Defaulter Arrears
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                  {formatPKR(arrearsAmount)}
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#FF5F1F]">
                <AlertCircle className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium pt-2">
              {pendingVouchers.length} pending vouchers
            </p>
          </div>

          {/* Card 4: Average Challan */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Avg. Monthly Fee
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                  PKR {vouchers.length > 0 ? Math.round(totalBilled / vouchers.length).toLocaleString() : 0}
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium pt-2">
              Standardized tuition scale
            </p>
          </div>
        </div>

        {/* Filter Strip & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search challan #, student name, or roll no..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full bg-white pl-10 pr-9 text-xs font-medium text-slate-800 shadow-2xs border border-slate-200/80 focus:border-[#FF5F1F] focus:outline-none transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter Capsule */}
            <div className="flex items-center rounded-full bg-white p-1 border border-slate-200/80 shadow-2xs">
              {(["All", "Paid", "Pending", "Overdue"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTabFilter(tab)}
                  className={`rounded-full px-3 sm:px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Batch printing initialized for ${filteredVouchers.length} challans.`)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print Batch</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5F1F] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#E54E10] transition-colors cursor-pointer shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Issue Fee Challan</span>
            </button>
          </div>
        </div>

        {/* Vouchers Table Card */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                  <th className="py-3 px-3">Challan No</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Class</th>
                  <th className="py-3 px-3">Payable Amount</th>
                  <th className="py-3 px-3">Due Date</th>
                  <th className="py-3 px-3">Payment Channel</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVouchers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Challan No */}
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/70">
                        {v.challanNo}
                      </span>
                    </td>

                    {/* Student Info */}
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-[#0F172A]">{v.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{v.rollNo}</p>
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-3 text-slate-700 font-medium">
                      {v.grade}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-3 font-extrabold text-[#0F172A]">
                      PKR {v.amount.toLocaleString()}
                    </td>

                    {/* Due Date */}
                    <td className="py-3.5 px-3 text-slate-500 font-medium">
                      {v.dueDate}
                    </td>

                    {/* Channel */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium">
                      {v.channel || "Pending Challan"}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          v.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                            : v.status === "Pending"
                            ? "bg-orange-50 text-[#C2410C] border border-orange-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            v.status === "Paid"
                              ? "bg-emerald-500"
                              : v.status === "Pending"
                              ? "bg-[#FF5F1F]"
                              : "bg-rose-500"
                          }`}
                        />
                        {v.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {v.status !== "Paid" ? (
                          <button
                            type="button"
                            onClick={() => setSelectedVoucher(v)}
                            className="rounded-full bg-[#FF5F1F] px-3.5 py-1 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer shadow-2xs"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setViewingReceipt(v)}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-[#0F172A] hover:text-white transition-colors cursor-pointer"
                          >
                            <Receipt className="h-3 w-3" />
                            Receipt
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleDelete(v.id, v.challanNo)}
                          className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete challan"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredVouchers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#FF5F1F] mb-3">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        {vouchers.length === 0
                          ? "No fee vouchers issued yet"
                          : "No fee vouchers match your filter"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        {vouchers.length === 0
                          ? "Issue student fee challans directly using the button below to start tracking billing and collections."
                          : "Try resetting your search query or status filter to see other challans."}
                      </p>
                      {vouchers.length === 0 ? (
                        <button
                          type="button"
                          onClick={() => setIsCreateModalOpen(true)}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FF5F1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors shadow-xs cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          Issue First Fee Challan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setTabFilter("All");
                          }}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Collect Fee Modal */}
      {selectedVoucher && (
        <Modal
          isOpen={!!selectedVoucher}
          onClose={() => !isPending && setSelectedVoucher(null)}
          title="Collect Fee Payment"
          description={`Challan: ${selectedVoucher.challanNo} • ${selectedVoucher.studentName}`}
          className="max-w-md"
        >
          <form onSubmit={handleCollectPayment} className="space-y-4 text-xs font-sans">
            {/* Voucher Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Payable Amount:</span>
                <span className="text-xl font-extrabold text-[#0F172A]">
                  PKR {selectedVoucher.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-500">Student & Roll:</span>
                <span className="font-semibold text-slate-800">
                  {selectedVoucher.studentName} ({selectedVoucher.rollNo})
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-500">Academic Grade:</span>
                <span className="font-semibold text-[#FF5F1F]">{selectedVoucher.grade}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-500">Due Date:</span>
                <span className="font-medium text-slate-800">{selectedVoucher.dueDate}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <Label className="text-xs font-semibold text-slate-700">Payment Channel *</Label>
              <div className="relative mt-1">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={isPending}
                  className="flex h-10 w-full appearance-none rounded-xl border border-slate-200/90 bg-white px-3 pr-8 text-xs font-medium text-slate-800 focus:border-[#FF5F1F] focus:outline-none cursor-pointer"
                >
                  <option>Cash at Accounts Counter</option>
                  <option>HBL Direct Transfer</option>
                  <option>JazzCash Direct</option>
                  <option>EasyPaisa Voucher</option>
                  <option>Meezan Bank Raast</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full px-4"
                onClick={() => setSelectedVoucher(null)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5F1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>Confirm & Issue Receipt</span>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Receipt Modal */}
      {viewingReceipt && (
        <Modal
          isOpen={!!viewingReceipt}
          onClose={() => setViewingReceipt(null)}
          title="Official Fee Receipt"
          description={`Verified Payment Confirmation • Challan ${viewingReceipt.challanNo}`}
          className="max-w-md"
        >
          <div className="space-y-4 text-xs font-sans">
            {/* Header Stamp Box */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="text-base font-extrabold text-emerald-900">Payment Cleared</h4>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                Paid via {viewingReceipt.channel || "Accounts Counter"}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-bold text-slate-800">{viewingReceipt.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Roll Number:</span>
                <span className="font-mono text-slate-700">{viewingReceipt.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Class & Grade:</span>
                <span className="font-semibold text-slate-800">{viewingReceipt.grade}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 text-sm">
                <span className="font-bold text-slate-700">Total Paid:</span>
                <span className="font-extrabold text-emerald-600">
                  PKR {viewingReceipt.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4"
                onClick={() => setViewingReceipt(null)}
              >
                Close
              </Button>
              <button
                type="button"
                onClick={() => alert(`Receipt downloaded for ${viewingReceipt.challanNo}`)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#FF5F1F] transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Issue Fee Challan Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => !isPending && setIsCreateModalOpen(false)}
        title="Issue New Fee Challan"
        description="Generate an academic tuition fee voucher for a registered student."
        className="max-w-lg"
      >
        <form onSubmit={handleCreateChallan} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-slate-700">Student Full Name *</Label>
              <Input
                required
                placeholder="e.g. Danial Ahmed"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700">Student Roll No *</Label>
              <Input
                required
                placeholder="e.g. #3456798"
                value={newRollNo}
                onChange={(e) => setNewRollNo(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700">Class & Section *</Label>
              <div className="relative mt-1">
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  disabled={isPending}
                  className="flex h-9 w-full appearance-none rounded-xl border border-slate-200/90 bg-white px-3 pr-8 text-xs font-medium text-slate-800 focus:border-[#FF5F1F] focus:outline-none cursor-pointer"
                >
                  <option>Grade 10-A</option>
                  <option>Grade 9-B</option>
                  <option>Grade 11 Pre-Med</option>
                  <option>Grade 12 Pre-Engg</option>
                  <option>O-Levels</option>
                  <option>A-Levels CS</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-700">Fee Amount (PKR) *</Label>
              <Input
                required
                type="number"
                min={100}
                placeholder="15000"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Payment Due Date *</Label>
            <Input
              required
              placeholder="e.g. 25 Oct 2026"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              disabled={isPending}
              className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full px-5 text-xs font-semibold"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5F1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
            >
              {isPending ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Issuing Challan...</span>
                </>
              ) : (
                <span>Generate Challan</span>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
