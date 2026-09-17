"use client";

import * as React from "react";
import {
  Award,
  Search,
  Download,
  Printer,
  TrendingUp,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  ChevronDown,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface StudentResult {
  id: string;
  name: string;
  rollNo: string;
  grade: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  letterGrade: string;
  rank: number;
  status: "Passed" | "Failed";
  breakdown: { subject: string; marks: number; max: number; grade: string }[];
}

const mockResults: StudentResult[] = [
  {
    id: "1",
    name: "Muhammad Ali Khan",
    rollNo: "EP-1042",
    grade: "Grade 10 Matric",
    marksObtained: 472,
    totalMarks: 500,
    percentage: 94.4,
    letterGrade: "A+",
    rank: 1,
    status: "Passed",
    breakdown: [
      { subject: "Mathematics", marks: 98, max: 100, grade: "A+" },
      { subject: "Physics", marks: 95, max: 100, grade: "A+" },
      { subject: "Chemistry", marks: 92, max: 100, grade: "A+" },
      { subject: "English", marks: 91, max: 100, grade: "A+" },
      { subject: "Computer Science", marks: 96, max: 100, grade: "A+" },
    ],
  },
  {
    id: "2",
    name: "Mariam Noor",
    rollNo: "EP-1094",
    grade: "O-Levels Year 2",
    marksObtained: 465,
    totalMarks: 500,
    percentage: 93.0,
    letterGrade: "A*",
    rank: 2,
    status: "Passed",
    breakdown: [
      { subject: "Mathematics", marks: 96, max: 100, grade: "A*" },
      { subject: "Physics", marks: 91, max: 100, grade: "A*" },
      { subject: "Chemistry", marks: 94, max: 100, grade: "A*" },
      { subject: "English", marks: 92, max: 100, grade: "A*" },
      { subject: "Biology", marks: 92, max: 100, grade: "A*" },
    ],
  },
  {
    id: "3",
    name: "Zainab Fatima",
    rollNo: "EP-1088",
    grade: "Grade 9 Science",
    marksObtained: 445,
    totalMarks: 500,
    percentage: 89.0,
    letterGrade: "A",
    rank: 4,
    status: "Passed",
    breakdown: [
      { subject: "Mathematics", marks: 90, max: 100, grade: "A" },
      { subject: "Physics", marks: 88, max: 100, grade: "A" },
      { subject: "Chemistry", marks: 89, max: 100, grade: "A" },
      { subject: "English", marks: 88, max: 100, grade: "A" },
      { subject: "Computer Science", marks: 90, max: 100, grade: "A" },
    ],
  },
  {
    id: "4",
    name: "Ahmed Raza",
    rollNo: "EP-1011",
    grade: "Grade 10 Matric",
    marksObtained: 458,
    totalMarks: 500,
    percentage: 91.6,
    letterGrade: "A+",
    rank: 3,
    status: "Passed",
    breakdown: [
      { subject: "Mathematics", marks: 94, max: 100, grade: "A+" },
      { subject: "Physics", marks: 90, max: 100, grade: "A+" },
      { subject: "Chemistry", marks: 91, max: 100, grade: "A+" },
      { subject: "English", marks: 89, max: 100, grade: "A+" },
      { subject: "Computer Science", marks: 94, max: 100, grade: "A+" },
    ],
  },
  {
    id: "5",
    name: "Bilal Hassan",
    rollNo: "EP-1077",
    grade: "Grade 8 General",
    marksObtained: 382,
    totalMarks: 500,
    percentage: 76.4,
    letterGrade: "B",
    rank: 12,
    status: "Passed",
    breakdown: [
      { subject: "Mathematics", marks: 74, max: 100, grade: "B" },
      { subject: "General Science", marks: 78, max: 100, grade: "B" },
      { subject: "Urdu", marks: 80, max: 100, grade: "A" },
      { subject: "English", marks: 72, max: 100, grade: "B" },
      { subject: "Social Studies", marks: 78, max: 100, grade: "B" },
    ],
  },
  {
    id: "6",
    name: "Dua Tariq",
    rollNo: "EP-1025",
    grade: "Grade 9 Science",
    marksObtained: 430,
    totalMarks: 500,
    percentage: 86.0,
    letterGrade: "A",
    rank: 5,
    status: "Passed",
    breakdown: [
      { subject: "Mathematics", marks: 88, max: 100, grade: "A" },
      { subject: "Physics", marks: 84, max: 100, grade: "A" },
      { subject: "Chemistry", marks: 86, max: 100, grade: "A" },
      { subject: "English", marks: 86, max: 100, grade: "A" },
      { subject: "Biology", marks: 86, max: 100, grade: "A" },
    ],
  },
];

export default function ResultsPage() {
  const [search, setSearch] = React.useState("");
  const [selectedExam, setSelectedExam] = React.useState("Midterm Assessments 2026");
  const [activeReportCard, setActiveReportCard] = React.useState<StudentResult | null>(null);

  const filteredResults = mockResults.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 pb-16 bg-[#F8FAFC]">
      <TopNav
        title="Examinations & Results Hub"
        subtitle="Grade distributions, exam scorecards, and official EduPak report card generation."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-6 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Overall Pass Rate
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-emerald-600 tracking-tight">
                96.8%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">1,208 / 1,248 students cleared</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                A+ & A Distinction
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-[#2563EB] tracking-tight">
                62.4%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-emerald-600 font-semibold">+4.1% vs previous year</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Top Examination Score
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                98.2%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Muhammad Ali Khan (Roll #1042)</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Published Transcripts
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                1,248 Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Available on Student Portal</p>
            </CardContent>
          </Card>
        </div>

        {/* Grade Distribution Breakdown Bar */}
        <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold text-slate-900">
              Grade Distribution Curve
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 font-medium">
              {selectedExam} • Institutional Grading Standard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="flex h-3.5 w-full rounded-full overflow-hidden bg-slate-100">
              <div className="bg-emerald-500" style={{ width: "28%" }} title="A+ (28%)" />
              <div className="bg-[#2563EB]" style={{ width: "34%" }} title="A (34%)" />
              <div className="bg-indigo-500" style={{ width: "22%" }} title="B (22%)" />
              <div className="bg-amber-500" style={{ width: "12%" }} title="C (12%)" />
              <div className="bg-rose-500" style={{ width: "4%" }} title="D/F (4%)" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 font-medium">A+ (90-100%): <strong className="text-slate-900">349</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                <span className="text-slate-600 font-medium">A (80-89%): <strong className="text-slate-900">424</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-600 font-medium">B (70-79%): <strong className="text-slate-900">274</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600 font-medium">C (60-69%): <strong className="text-slate-900">150</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-600 font-medium">Improvement Needed: <strong className="text-slate-900">51</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="h-9 rounded-xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:border-[#2563EB]"
            >
              <option value="Midterm Assessments 2026">Midterm Assessments 2026</option>
              <option value="Monthly Test Series - August">Monthly Test Series - August</option>
              <option value="Annual Board Mocks 2026">Annual Board Mocks 2026</option>
            </select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search student or roll number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-slate-200/80 bg-white pl-8 pr-3 text-xs shadow-sm focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="rounded-xl border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50 gap-1.5 h-9"
            onClick={() => alert("Broad-sheet exported as CSV.")}
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-[#2563EB]" />
            Export Broad-sheet (CSV)
          </Button>
        </div>

        {/* Results Ledger Table */}
        <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3.5 px-5">Rank</th>
                    <th className="py-3.5 px-5">Student</th>
                    <th className="py-3.5 px-5">Grade / Section</th>
                    <th className="py-3.5 px-5">Marks Obtained</th>
                    <th className="py-3.5 px-5 text-center">Percentage</th>
                    <th className="py-3.5 px-5 text-center">Grade</th>
                    <th className="py-3.5 px-5 text-right">Report Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResults.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-5 font-extrabold text-slate-900 text-xs">
                        #{r.rank}
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-slate-900">{r.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{r.rollNo}</p>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 font-medium">{r.grade}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-900">
                        {r.marksObtained} <span className="text-slate-400 font-normal">/ {r.totalMarks}</span>
                      </td>
                      <td className="py-3.5 px-5 text-center font-bold text-emerald-600">
                        {r.percentage}%
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <Badge
                          variant={r.letterGrade.startsWith("A") ? "brand" : "secondary"}
                          className="font-bold text-xs"
                        >
                          {r.letterGrade}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveReportCard(r)}
                          className="rounded-xl text-xs font-semibold h-7 px-2.5 border-slate-200 hover:bg-slate-50 hover:text-[#2563EB] gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View Card
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Official Report Card Modal */}
      {activeReportCard && (
        <Modal
          isOpen={!!activeReportCard}
          onClose={() => setActiveReportCard(null)}
          title="Official Academic Transcript"
          description={`EduPak Model Academy • ${selectedExam}`}
        >
          <div className="space-y-4 text-xs">
            {/* Header with Student Details */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/90 bg-[#F8FAFC]">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {activeReportCard.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Roll No: <span className="font-mono text-slate-700">{activeReportCard.rollNo}</span> • {activeReportCard.grade}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Overall Grade</span>
                <p className="text-2xl font-extrabold text-[#2563EB]">
                  {activeReportCard.letterGrade}
                </p>
              </div>
            </div>

            {/* Subject Breakdown Table */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-semibold text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3.5">Subject</th>
                    <th className="py-2.5 px-3.5 text-center">Marks</th>
                    <th className="py-2.5 px-3.5 text-center">Max</th>
                    <th className="py-2.5 px-3.5 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {activeReportCard.breakdown.map((b, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3.5 font-semibold text-slate-800">
                        {b.subject}
                      </td>
                      <td className="py-2.5 px-3.5 text-center font-bold text-slate-900">{b.marks}</td>
                      <td className="py-2.5 px-3.5 text-center text-slate-400">{b.max}</td>
                      <td className="py-2.5 px-3.5 text-right">
                        <Badge variant="brandSoft" className="py-0 px-2 text-[10px] font-bold">
                          {b.grade}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50/80 font-bold border-t border-slate-200">
                    <td className="py-3 px-3.5 text-slate-900">Total Aggregate</td>
                    <td className="py-3 px-3.5 text-center text-[#2563EB]">
                      {activeReportCard.marksObtained}
                    </td>
                    <td className="py-3 px-3.5 text-center text-slate-400">
                      {activeReportCard.totalMarks}
                    </td>
                    <td className="py-3 px-3.5 text-right text-emerald-600 font-extrabold">
                      {activeReportCard.percentage}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] border border-slate-100 leading-relaxed">
              <span className="font-bold text-slate-900">
                Principal Remarks:
              </span>{" "}
              Exceptional academic aptitude demonstrated across all disciplines. Recommended for academic honors cohort.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-slate-200 text-xs font-semibold"
                onClick={() => setActiveReportCard(null)}
              >
                Close
              </Button>
              <Button
                size="sm"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold gap-1.5 shadow-sm"
                onClick={() => alert("Sending transcript to print spooler...")}
              >
                <Printer className="h-3.5 w-3.5" />
                Print Official Transcript
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
