"use client";

import * as React from "react";
import {
  BookOpen,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  PlayCircle,
  Users,
  Award,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  code: string;
  title: string;
  grade: string;
  instructor: string;
  enrolled: number;
  progress: number;
  modulesCount: number;
  tagColor: string;
}

const courses: Course[] = [
  {
    id: "1",
    code: "PHY-101",
    title: "Physics: Thermodynamics & Waves",
    grade: "Grade 10 Matric",
    instructor: "Dr. Tariq Jamil",
    enrolled: 188,
    progress: 78,
    modulesCount: 14,
    tagColor: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    id: "2",
    code: "MTH-201",
    title: "Mathematics: Advanced Calculus & Vectors",
    grade: "Grade 11 Pre-Engg",
    instructor: "Prof. Asif Raza",
    enrolled: 120,
    progress: 85,
    modulesCount: 18,
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: "3",
    code: "CS-301",
    title: "Computer Science: Python & Algorithms",
    grade: "A-Levels & Grade 11",
    instructor: "Ms. Hira Naeem",
    enrolled: 94,
    progress: 92,
    modulesCount: 12,
    tagColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  {
    id: "4",
    code: "CHM-102",
    title: "Chemistry: Organic & Reaction Kinetics",
    grade: "Grade 10 & 11",
    instructor: "Ms. Sadia Munir",
    enrolled: 165,
    progress: 64,
    modulesCount: 16,
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    id: "5",
    code: "ENG-101",
    title: "English: Academic Writing & Analysis",
    grade: "All Sections",
    instructor: "Mr. Salman Siddiqui",
    enrolled: 240,
    progress: 88,
    modulesCount: 10,
    tagColor: "text-sky-700 bg-sky-50 border-sky-200",
  },
  {
    id: "6",
    code: "BIO-202",
    title: "Biology: Genetics & Molecular Physiology",
    grade: "Grade 11 Pre-Medical",
    instructor: "Dr. Farhan Qureshi",
    enrolled: 130,
    progress: 70,
    modulesCount: 15,
    tagColor: "text-rose-700 bg-rose-50 border-rose-200",
  },
];

const assignments = [
  {
    id: "1",
    course: "PHY-101",
    title: "Thermodynamics Lab Experiment Report",
    dueDate: "Sep 20, 2026",
    submitted: 142,
    total: 188,
    status: "Active",
  },
  {
    id: "2",
    course: "MTH-201",
    title: "Differential Equations Problem Set 4",
    dueDate: "Sep 22, 2026",
    submitted: 98,
    total: 120,
    status: "Active",
  },
  {
    id: "3",
    course: "CS-301",
    title: "Binary Search Tree Implementation in Python",
    dueDate: "Sep 18, 2026",
    submitted: 89,
    total: 94,
    status: "Reviewing",
  },
  {
    id: "4",
    course: "CHM-102",
    title: "Hydrocarbons & Polymer Synthesis Quiz",
    dueDate: "Sep 15, 2026",
    submitted: 165,
    total: 165,
    status: "Graded",
  },
];

const materials = [
  {
    id: "1",
    title: "Grade 10 Physics Midterm Past Papers (2021-2025)",
    subject: "Physics",
    size: "4.2 MB",
    downloads: 382,
    format: "PDF Document",
    date: "12 Sep 2026",
  },
  {
    id: "2",
    title: "Calculus Formula Sheet & Quick Reference Handbook",
    subject: "Mathematics",
    size: "1.8 MB",
    downloads: 512,
    format: "PDF Document",
    date: "10 Sep 2026",
  },
  {
    id: "3",
    title: "Python Data Structures Starter Code & Unit Tests",
    subject: "Computer Science",
    size: "860 KB",
    downloads: 245,
    format: "ZIP Archive",
    date: "08 Sep 2026",
  },
  {
    id: "4",
    title: "Organic Reaction Mechanisms Slide Deck (High-Res)",
    subject: "Chemistry",
    size: "12.4 MB",
    downloads: 190,
    format: "PPTX Presentation",
    date: "04 Sep 2026",
  },
];

export default function LMSPage() {
  const [activeTab, setActiveTab] = React.useState("courses");
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  return (
    <div className="flex-1 pb-16 bg-[#F8FAFC]">
      <TopNav
        title="Learning Management System"
        subtitle="Manage academic curricula, active lecture units, coursework, and digital materials."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-6 space-y-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Courses
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                38 Subjects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Across 6 grade sections</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Syllabus Completion
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-emerald-600 tracking-tight">
                80.8%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> On track for Midterms
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Coursework Submissions
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-[#2563EB] tracking-tight">
                4,930
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">92% on-time submission rate</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Digital Resources
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                428 Files
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Past papers, PDFs & slides</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Switcher & CTA */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <TabsList className="bg-slate-100/90 p-1 rounded-xl">
              <TabsTrigger
                value="courses"
                className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Active Courses ({courses.length})
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Assignments & Quizzes ({assignments.length})
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Study Materials & Notes
              </TabsTrigger>
            </TabsList>

            <Button
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold h-9 px-4 gap-1.5 shadow-sm transition-colors"
              onClick={() => alert("Add Course wizard initialized.")}
            >
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </div>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <Card
                  key={c.id}
                  className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[11px] font-mono font-bold ${c.tagColor}`}>
                        {c.code}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">{c.grade}</span>
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-900 pt-2 line-clamp-1">
                      {c.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 font-medium">
                      Instructor: {c.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 space-y-3.5 text-xs">
                    <div>
                      <div className="flex justify-between pb-1.5 text-[11px]">
                        <span className="text-slate-500 font-medium">Syllabus Covered</span>
                        <span className="font-bold text-slate-900">{c.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#2563EB] transition-all"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1 font-medium">
                        <Users className="h-3.5 w-3.5 text-slate-400" /> {c.enrolled} Students
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Layers className="h-3.5 w-3.5 text-slate-400" /> {c.modulesCount} Units
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full rounded-xl text-xs font-semibold h-8 border-slate-200 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                      onClick={() => setSelectedCourse(c)}
                    >
                      View Syllabus & Notes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="mt-4">
            <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="py-3.5 px-5">Course</th>
                      <th className="py-3.5 px-5">Assignment Title</th>
                      <th className="py-3.5 px-5">Due Date</th>
                      <th className="py-3.5 px-5">Submissions</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {assignments.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-5 font-mono font-bold text-slate-800 text-xs">
                          {a.course}
                        </td>
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-slate-900">{a.title}</p>
                        </td>
                        <td className="py-3.5 px-5 font-medium text-slate-600 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {a.dueDate}
                        </td>
                        <td className="py-3.5 px-5 font-medium text-slate-700">
                          <span className="font-bold text-slate-900">{a.submitted}</span> / {a.total}{" "}
                          <span className="text-[10px] text-slate-400">
                            ({Math.round((a.submitted / a.total) * 100)}%)
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          <Badge
                            variant={
                              a.status === "Active"
                                ? "brand"
                                : a.status === "Graded"
                                ? "success"
                                : "warning"
                            }
                            className="text-[11px] font-bold"
                          >
                            {a.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl text-xs font-semibold h-7 px-2.5 border-slate-200 hover:bg-slate-100"
                            onClick={() => alert(`Reviewing submissions for ${a.title}`)}
                          >
                            Review Submissions
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map((m) => (
                <Card
                  key={m.id}
                  className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white p-5 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-bold">
                        <FileText className="h-5 w-5 text-[#2563EB]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {m.title}
                        </h4>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 font-medium">
                          <span>{m.subject}</span>
                          <span>•</span>
                          <span>{m.format}</span>
                          <span>•</span>
                          <span>{m.size}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl text-xs font-semibold h-8 px-3 border-slate-200 hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-blue-200 transition-colors shrink-0"
                      onClick={() => alert(`Downloading ${m.title}...`)}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
