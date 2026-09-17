"use client";

import * as React from "react";
import {
  Search,
  Plus,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  X,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  grade: string;
  section: string;
  guardian: string;
  phone: string;
  attendanceRate: number;
  feeStatus: "Paid" | "Pending" | "Overdue";
  gpa: number;
}

const initialStudents: Student[] = [
  {
    id: "1",
    name: "Muhammad Ali Khan",
    rollNo: "#3456791",
    grade: "Grade 10",
    section: "Section A (Matric)",
    guardian: "Tariq Mahmood",
    phone: "+92 300 4589211",
    attendanceRate: 98,
    feeStatus: "Paid",
    gpa: 3.92,
  },
  {
    id: "2",
    name: "Zainab Fatima",
    rollNo: "#3456792",
    grade: "Grade 9",
    section: "Section B (Science)",
    guardian: "Farooq Ahmed",
    phone: "+92 321 8892014",
    attendanceRate: 94,
    feeStatus: "Paid",
    gpa: 3.85,
  },
  {
    id: "3",
    name: "Ayan Sheikh",
    rollNo: "#3456793",
    grade: "Grade 11",
    section: "Pre-Medical",
    guardian: "Dr. Sheikh Sohail",
    phone: "+92 333 4901822",
    attendanceRate: 88,
    feeStatus: "Pending",
    gpa: 3.45,
  },
  {
    id: "4",
    name: "Mariam Noor",
    rollNo: "#3456794",
    grade: "O-Levels",
    section: "Cambridge Year 2",
    guardian: "Noor ul Hassan",
    phone: "+92 302 9182374",
    attendanceRate: 99,
    feeStatus: "Paid",
    gpa: 4.0,
  },
  {
    id: "5",
    name: "Bilal Raza",
    rollNo: "#3456795",
    grade: "Grade 12",
    section: "Pre-Engineering",
    guardian: "Raza Ali Shah",
    phone: "+92 312 4478120",
    attendanceRate: 81,
    feeStatus: "Overdue",
    gpa: 3.1,
  },
  {
    id: "6",
    name: "Ayesha Malik",
    rollNo: "#3456796",
    grade: "A-Levels",
    section: "Science Stream",
    guardian: "Malik Usman",
    phone: "+92 301 7712399",
    attendanceRate: 95,
    feeStatus: "Paid",
    gpa: 3.78,
  },
];

export default function StudentsPage() {
  const [students, setStudents] = React.useState<Student[]>(initialStudents);
  const [search, setSearch] = React.useState("");
  const [selectedGrade, setSelectedGrade] = React.useState("All");
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [newName, setNewName] = React.useState("");
  const [newGrade, setNewGrade] = React.useState("Grade 10");
  const [newGuardian, setNewGuardian] = React.useState("");

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.guardian.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === "All" || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: String(Date.now()),
      name: newName,
      rollNo: `#${Math.floor(3000000 + Math.random() * 900000)}`,
      grade: newGrade,
      section: "Section A",
      guardian: newGuardian,
      phone: "+92 300 0000000",
      attendanceRate: 100,
      feeStatus: "Paid",
      gpa: 3.5,
    };
    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
    setNewName("");
    setNewGuardian("");
  };

  return (
    <div className="flex-1 pb-14 bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <TopNav title="Students Directory" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-5">
        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Enrolled</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  1,248
                </h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-2 inline-block">
              +42 this semester
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Average Attendance</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                94.8%
              </h3>
            </div>
            <span className="text-xs text-slate-400 mt-2 inline-block">Verified turnstile entries</span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Fee Clearance</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                92.3%
              </h3>
            </div>
            <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">
              1,152 up to date
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="text-xs font-semibold text-slate-500">Institutional GPA</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                3.64 / 4.0
              </h3>
            </div>
            <span className="text-xs text-slate-400 mt-2 inline-block">Top 5% in Board</span>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search students by name, roll ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full bg-white pl-9 pr-4 text-xs font-medium text-slate-800 shadow-2xs border border-slate-200/80 focus:border-[#FF5F1F] focus:outline-none"
              />
            </div>

            <div className="flex items-center rounded-full bg-white p-1 border border-slate-200/80 shadow-2xs">
              {["All", "Grade 10", "Grade 9", "O-Levels"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    selectedGrade === g
                      ? "bg-[#0F172A] text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5F1F] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-[#E54E10] transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Enroll Student
          </button>
        </div>

        {/* Students Table Card */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Roll ID</th>
                  <th className="py-3 px-3">Class & Section</th>
                  <th className="py-3 px-3">Guardian</th>
                  <th className="py-3 px-3 text-center">Attendance</th>
                  <th className="py-3 px-3 text-center">Fee Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] font-bold text-xs">
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-[#0F172A]">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">{s.rollNo}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600">{s.grade} ({s.section})</td>
                    <td className="py-3.5 px-3 text-slate-500">{s.guardian}</td>
                    <td className="py-3.5 px-3 text-center font-bold text-emerald-600">
                      {s.attendanceRate}%
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-bold ${
                          s.feeStatus === "Paid"
                            ? "bg-[#0F172A] text-white shadow-2xs"
                            : s.feeStatus === "Pending"
                            ? "bg-orange-50 text-[#C2410C] border border-orange-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {s.feeStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(s)}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-[#FF5F1F] hover:text-white transition-colors cursor-pointer"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent.name}
          description={`Roll ID: ${selectedStudent.rollNo} • ${selectedStudent.grade}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50">
              <div>
                <p className="text-slate-400 font-medium">Class Section</p>
                <p className="font-bold text-[#0F172A] mt-0.5">{selectedStudent.grade} ({selectedStudent.section})</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Academic GPA</p>
                <p className="font-bold text-[#0F172A] mt-0.5">{selectedStudent.gpa} / 4.0</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Attendance</p>
                <p className="font-bold text-emerald-600 mt-0.5">{selectedStudent.attendanceRate}% Present</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Fee Clearance</p>
                <p className="font-bold text-[#0F172A] mt-0.5">{selectedStudent.feeStatus}</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600">
              <p><span className="font-semibold text-[#0F172A]">Guardian:</span> {selectedStudent.guardian}</p>
              <p className="mt-1"><span className="font-semibold text-[#0F172A]">Phone:</span> {selectedStudent.phone}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
              <button
                type="button"
                onClick={() => alert("Student Card Downloaded")}
                className="rounded-xl bg-[#0F172A] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#FF5F1F] transition-colors cursor-pointer"
              >
                Print Student ID
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Enroll Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll Student"
        description="Register a student into EduPak directory."
      >
        <form onSubmit={handleAddStudent} className="space-y-3.5">
          <div>
            <Label className="text-xs font-semibold">Student Full Name</Label>
            <Input required placeholder="e.g. Zeeshan Haider" value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Grade</Label>
              <select value={newGrade} onChange={(e) => setNewGrade(e.target.value)} className="mt-1 flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-[#FF5F1F]">
                <option>Grade 10</option>
                <option>Grade 9</option>
                <option>Grade 11</option>
                <option>O-Levels</option>
                <option>A-Levels</option>
              </select>
            </div>
            <div>
              <Label className="text-xs font-semibold">Guardian Name</Label>
              <Input required placeholder="Parent Name" value={newGuardian} onChange={(e) => setNewGuardian(e.target.value)} className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <button type="submit" className="rounded-xl bg-[#FF5F1F] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer">
              Save Admission
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
