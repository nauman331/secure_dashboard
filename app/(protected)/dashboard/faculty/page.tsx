"use client";

import * as React from "react";
import {
  UserCheck,
  Search,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Clock,
  Plus,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  assignedClass: string;
  email: string;
  phone: string;
  officeHours: string;
  experience: string;
  status: "Active" | "On Leave";
}

const facultyList: FacultyMember[] = [
  {
    id: "1",
    name: "Dr. Tariq Jamil",
    designation: "Head of Sciences & Senior Lecturer",
    department: "Physics Department",
    assignedClass: "Grade 10 - Section A",
    email: "tariq.jamil@edupak.edu.pk",
    phone: "+92 300 1122334",
    officeHours: "10:00 AM - 12:30 PM",
    experience: "14 Years",
    status: "Active",
  },
  {
    id: "2",
    name: "Prof. Asif Raza",
    designation: "Senior Mathematics Master",
    department: "Mathematics Department",
    assignedClass: "Grade 11 Pre-Engineering",
    email: "asif.raza@edupak.edu.pk",
    phone: "+92 321 4455667",
    officeHours: "11:00 AM - 01:00 PM",
    experience: "18 Years",
    status: "Active",
  },
  {
    id: "3",
    name: "Ms. Hira Naeem",
    designation: "Lecturer in Computer Science",
    department: "Computer & IT Department",
    assignedClass: "A-Levels CS Stream",
    email: "hira.naeem@edupak.edu.pk",
    phone: "+92 333 7788990",
    officeHours: "09:30 AM - 11:30 AM",
    experience: "6 Years",
    status: "Active",
  },
  {
    id: "4",
    name: "Ms. Sadia Munir",
    designation: "Chemistry Department Head",
    department: "Chemistry Department",
    assignedClass: "Grade 9 - Section B",
    email: "sadia.munir@edupak.edu.pk",
    phone: "+92 302 3344556",
    officeHours: "08:30 AM - 10:30 AM",
    experience: "11 Years",
    status: "Active",
  },
  {
    id: "5",
    name: "Mr. Salman Siddiqui",
    designation: "Senior English Master",
    department: "Languages & Humanities",
    assignedClass: "O-Levels Year 2",
    email: "salman.siddiqui@edupak.edu.pk",
    phone: "+92 312 8899001",
    officeHours: "01:00 PM - 02:30 PM",
    experience: "9 Years",
    status: "Active",
  },
  {
    id: "6",
    name: "Dr. Farhan Qureshi",
    designation: "Associate Professor Biology",
    department: "Biology & Life Sciences",
    assignedClass: "Grade 12 Pre-Medical",
    email: "farhan.qureshi@edupak.edu.pk",
    phone: "+92 345 5566778",
    officeHours: "10:30 AM - 12:00 PM",
    experience: "12 Years",
    status: "Active",
  },
];

export default function FacultyPage() {
  const [search, setSearch] = React.useState("");

  const filteredFaculty = facultyList.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase()) ||
      f.assignedClass.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 pb-16 bg-[#F8FAFC]">
      <TopNav
        title="Faculty & Staff Directory"
        subtitle="Manage teaching faculty, departmental leadership, class assignments, and office schedules."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-6 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Faculty
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                54 Teachers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Student-Teacher Ratio 1:23</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Academic Departments
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                8 Units
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-emerald-600 font-semibold">100% Fully Staffed</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Faculty Attendance Today
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-emerald-600 tracking-tight">
                98.1%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">53 checked in on campus</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Avg. Experience
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-[#2563EB] tracking-tight">
                11.4 Years
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Higher Education Commission Certified</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty by name, department, or class..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200/80 bg-white pl-8 pr-3 text-xs shadow-sm focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <Button
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold h-9 px-4 gap-1.5 shadow-sm transition-colors"
            onClick={() => alert("Add Faculty modal initialized.")}
          >
            <Plus className="h-4 w-4" />
            Add Faculty Member
          </Button>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFaculty.map((f) => (
            <Card
              key={f.id}
              className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white hover:border-slate-300 transition-all"
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 font-extrabold text-xs">
                      {f.name
                        .replace("Dr. ", "")
                        .replace("Prof. ", "")
                        .replace("Ms. ", "")
                        .replace("Mr. ", "")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold text-slate-900 leading-tight">
                        {f.name}
                      </CardTitle>
                      <p className="text-[11px] text-slate-500 font-medium pt-0.5">
                        {f.designation}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px] font-bold">
                    {f.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-2.5 text-xs">
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400 font-medium">Department:</span>
                    <span className="font-semibold text-slate-800">{f.department}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400 font-medium">Assigned Class:</span>
                    <span className="font-semibold text-[#2563EB]">{f.assignedClass}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400 font-medium">Office Hours:</span>
                    <span className="text-slate-500 font-medium">{f.officeHours}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium truncate max-w-[190px]">
                    <Mail className="h-3 w-3 text-slate-400 shrink-0" /> {f.email}
                  </span>
                  <span className="font-bold text-slate-700 shrink-0">{f.experience} exp</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
