"use client";

import * as React from "react";
import {
  CalendarCheck,
  Calendar,
  Clock,
  CheckCircle2,
  Fingerprint,
  Send,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";

interface AttendanceRecord {
  id: string;
  name: string;
  rollNo: string;
  timeIn: string;
  status: "Present" | "Absent" | "Late" | "Leave";
}

const initialClassRecords: AttendanceRecord[] = [
  { id: "1", name: "Muhammad Ali Khan", rollNo: "#3456791", timeIn: "07:48 AM", status: "Present" },
  { id: "2", name: "Zainab Fatima", rollNo: "#3456792", timeIn: "07:52 AM", status: "Present" },
  { id: "3", name: "Ayan Sheikh", rollNo: "#3456793", timeIn: "--", status: "Absent" },
  { id: "4", name: "Mariam Noor", rollNo: "#3456794", timeIn: "07:45 AM", status: "Present" },
  { id: "5", name: "Bilal Raza", rollNo: "#3456795", timeIn: "08:18 AM", status: "Late" },
  { id: "6", name: "Ayesha Malik", rollNo: "#3456796", timeIn: "07:55 AM", status: "Present" },
];

export default function AttendancePage() {
  const [records, setRecords] = React.useState<AttendanceRecord[]>(initialClassRecords);
  const [selectedClass, setSelectedClass] = React.useState("Grade 10 - Section A");
  const [smsSent, setSmsSent] = React.useState(false);

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;
  const lateCount = records.filter((r) => r.status === "Late").length;

  const toggleStatus = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next =
          r.status === "Present"
            ? "Absent"
            : r.status === "Absent"
            ? "Late"
            : "Present";
        return {
          ...r,
          status: next,
          timeIn: next === "Present" ? "07:50 AM" : next === "Late" ? "08:15 AM" : "--",
        };
      })
    );
  };

  const markAllPresent = () => {
    setRecords((prev) =>
      prev.map((r) => ({
        ...r,
        status: "Present",
        timeIn: r.timeIn === "--" ? "07:50 AM" : r.timeIn,
      }))
    );
  };

  const handleNotifyParents = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 2500);
  };

  return (
    <div className="flex-1 pb-14 bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <TopNav title="Daily Attendance Hub" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-5">
        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Attendance Rate</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  94.8%
                </h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-2 inline-block">
              1,183 present today
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Unexcused Absentees</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                {absentCount}
              </h3>
            </div>
            <span className="text-xs text-rose-600 font-semibold mt-2 inline-block">
              SMS alert queued
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Late Arrivals</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                {lateCount}
              </h3>
            </div>
            <span className="text-xs text-slate-400 mt-2 inline-block">Arrived after 08:00 AM</span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Biometric RFID Gate</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 mt-1">
                Online
              </h3>
            </div>
            <span className="text-xs text-slate-400 mt-2 inline-block">Gate 1 & 2 Synced</span>
          </div>
        </div>

        {/* Filter & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 rounded-full bg-white px-4 text-xs font-bold text-slate-800 shadow-2xs border border-slate-200/80 cursor-pointer focus:border-[#FF5F1F]"
            >
              <option value="Grade 10 - Section A">Grade 10 - Section A</option>
              <option value="Grade 9 - Section B">Grade 9 - Section B</option>
              <option value="Grade 11 - Pre-Medical">Grade 11 - Pre-Medical</option>
              <option value="O-Levels Year 2">O-Levels Year 2</option>
            </select>

            <button
              type="button"
              onClick={markAllPresent}
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs border border-slate-200/80 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Mark All Present
            </button>
          </div>

          <button
            type="button"
            onClick={handleNotifyParents}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5F1F] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#E54E10] transition-colors cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            {smsSent ? "SMS Alerts Dispatched!" : "Notify Absent Guardians"}
          </button>
        </div>

        {/* Register Table Card */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Roll ID</th>
                  <th className="py-3 px-3">Check-in Timestamp</th>
                  <th className="py-3 px-3 text-center">Status (Click to toggle)</th>
                  <th className="py-3 px-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] font-bold text-xs">
                          {r.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-[#0F172A]">{r.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">{r.rollNo}</td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {r.timeIn}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggleStatus(r.id)}
                        className="cursor-pointer transition-transform active:scale-95"
                      >
                        <span
                          className={`inline-flex items-center rounded-full px-3.5 py-1 text-[10px] font-bold ${
                            r.status === "Present"
                              ? "bg-[#0F172A] text-white shadow-2xs"
                              : r.status === "Absent"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {r.status}
                        </span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {r.status === "Present" ? "Biometric RFID" : r.status === "Absent" ? "Alert Queued" : "Manual Gate"}
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
