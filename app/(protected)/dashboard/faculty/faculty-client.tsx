"use client";

import * as React from "react";
import { useTransition } from "react";
import {
  Search,
  Mail,
  Phone,
  Clock,
  Plus,
  Building2,
  Trash2,
  Calendar,
  Sparkles,
  LayoutGrid,
  List,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Printer,
  X,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFacultyMember } from "@/actions/faculty/create";
import { toggleFacultyStatus, deleteFacultyMember } from "@/actions/faculty/manage";

export interface FacultyRecord {
  id: string;
  name: string;
  designation: string;
  department: string;
  assignedClass: string | null;
  email: string;
  phone: string | null;
  officeHours: string | null;
  experience: string | null;
  status: "Active" | "On Leave";
  createdAt?: Date;
  updatedAt?: Date;
}

export function FacultyClient({ initialData }: { initialData: FacultyRecord[] }) {
  const [search, setSearch] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState<"All" | "Active" | "On Leave">("All");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");
  const [selectedFaculty, setSelectedFaculty] = React.useState<FacultyRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [isPending, startTransition] = useTransition();

  // Form states
  const [name, setName] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [department, setDepartment] = React.useState("Sciences Department");
  const [assignedClass, setAssignedClass] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [officeHours, setOfficeHours] = React.useState("09:00 AM - 01:00 PM");
  const [experience, setExperience] = React.useState("5 Years");
  const [status, setStatus] = React.useState<"Active" | "On Leave">("Active");

  // Computed metrics
  const totalCount = initialData.length;
  const activeCount = initialData.filter((f) => f.status === "Active").length;
  const leaveCount = totalCount - activeCount;
  const activePercent = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

  const uniqueDepartments = React.useMemo(() => {
    const depts = new Set(initialData.map((f) => f.department).filter(Boolean));
    return Array.from(depts);
  }, [initialData]);

  const filteredFaculty = initialData.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase()) ||
      (f.assignedClass && f.assignedClass.toLowerCase().includes(search.toLowerCase())) ||
      f.designation.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === "All" || f.department === selectedDept;
    const matchesStatus = statusFilter === "All" || f.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      createFacultyMember({
        name,
        designation,
        department,
        assignedClass,
        email,
        phone,
        officeHours,
        experience,
        status,
      }).then((res) => {
        if (res.success) {
          setIsAddModalOpen(false);
          setName("");
          setDesignation("");
          setAssignedClass("");
          setEmail("");
          setPhone("");
          setOfficeHours("09:00 AM - 01:00 PM");
          setExperience("5 Years");
          setStatus("Active");
        } else {
          alert(res.error);
        }
      });
    });
  };

  const handleToggleStatus = (id: string, current: "Active" | "On Leave") => {
    startTransition(() => {
      toggleFacultyStatus(id, current).then((res) => {
        if (!res.success) alert(res.error);
      });
    });
  };

  const handleDeleteFaculty = (id: string, facultyName: string) => {
    if (!confirm(`Are you sure you want to remove ${facultyName} from faculty records?`)) return;
    startTransition(() => {
      deleteFacultyMember(id).then((res) => {
        if (res.success) {
          if (selectedFaculty?.id === id) setSelectedFaculty(null);
        } else {
          alert(res.error);
        }
      });
    });
  };

  return (
    <div className="flex-1 pb-16 bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans">
      <TopNav
        title="Faculty & Staff Directory"
        subtitle="Manage teaching faculty, departmental leadership, class assignments, and office schedules."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-4 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Card 1: Total Faculty (Brand Midnight Slate card) */}
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Faculty
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  {totalCount} Teachers
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#FF5F1F]">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium pt-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Database records</span>
            </div>
          </div>

          {/* Card 2: Academic Departments */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Academic Departments
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                  {uniqueDepartments.length} Units
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#FF5F1F]">
                <Building2 className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 pt-2">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Fully Staffed
            </p>
          </div>

          {/* Card 3: Attendance Today */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Faculty Attendance Today
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 mt-1">
                  {activePercent}%
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium pt-2">
              <span className="font-semibold text-slate-800">{activeCount}</span> on campus & duty
            </p>
          </div>

          {/* Card 4: Staff Status / On Leave */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between min-h-[128px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Leave & Coverage
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] mt-1">
                  {leaveCount} On Leave
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium pt-2">
              {leaveCount === 0 ? "All staff active today" : "Substitutes pre-assigned"}
            </p>
          </div>
        </div>

        {/* Filter, Search & View Controls Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty by name, department, class, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full border border-slate-200/90 bg-white pl-10 pr-9 text-xs font-medium text-slate-800 shadow-2xs placeholder:text-slate-400 focus:border-[#FF5F1F] focus:outline-none transition-colors"
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

            {/* Right Controls: Status filter, View Mode Toggle, Add Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Capsule Filter */}
              <div className="flex items-center rounded-full bg-white p-1 border border-slate-200/80 shadow-2xs">
                {(["All", "Active", "On Leave"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st
                        ? "bg-[#0F172A] text-white shadow-2xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* View Switcher [Grid | Table] */}
              <div className="flex items-center rounded-full bg-white p-1 border border-slate-200/80 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Card Grid View"
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#0F172A] text-white shadow-2xs"
                      : "text-slate-400 hover:text-slate-800"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  title="Directory Table View"
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all cursor-pointer ${
                    viewMode === "table"
                      ? "bg-[#0F172A] text-white shadow-2xs"
                      : "text-slate-400 hover:text-slate-800"
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add Faculty Member Button */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#FF5F1F] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#E54E10] transition-colors cursor-pointer shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Faculty Member</span>
              </button>
            </div>
          </div>

          {/* Department Filter Pills Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Department:
            </span>
            <button
              type="button"
              onClick={() => setSelectedDept("All")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                selectedDept === "All"
                  ? "bg-[#0F172A] text-white ring-1 ring-[#0F172A]"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              All Departments ({totalCount})
            </button>
            {uniqueDepartments.map((dept) => {
              const count = initialData.filter((f) => f.department === dept).length;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                    selectedDept === dept
                      ? "bg-[#0F172A] text-white ring-1 ring-[#0F172A]"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  {dept.replace(" Department", "")} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode: Card Grid */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFaculty.map((f) => {
              const cleanName = f.name.replace(/^(Dr\.|Prof\.|Ms\.|Mr\.)\s*/i, "").trim();
              const nameParts = cleanName.split(" ");
              const initials = (nameParts[0]?.[0] || "") + (nameParts[1]?.[0] || "");

              return (
                <div
                  key={f.id}
                  className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F172A] text-[#FF5F1F] font-black text-sm shadow-2xs ring-2 ring-slate-100">
                          {initials.toUpperCase() || "FC"}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-[#FF5F1F] transition-colors">
                            {f.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium pt-0.5">
                            {f.designation}
                          </p>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                              <Building2 className="h-3 w-3 text-slate-400" />
                              {f.department.replace(" Department", "")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Status Pill */}
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleToggleStatus(f.id, f.status)}
                        title="Click to toggle status"
                        className="cursor-pointer transition-transform active:scale-95 shrink-0"
                      >
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            f.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                              : "bg-amber-50 text-amber-800 border border-amber-200/70"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              f.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {f.status}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body Information */}
                  <div className="px-5 py-3 border-t border-slate-100/90 space-y-2 text-xs">
                    {/* Assigned Class */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                        Assigned Class:
                      </span>
                      <span className="font-bold text-[#FF5F1F] text-right truncate max-w-[180px]">
                        {f.assignedClass || "General Faculty"}
                      </span>
                    </div>

                    {/* Office Hours */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        Office Hours:
                      </span>
                      <span className="font-medium text-slate-700 text-right">
                        {f.officeHours || "09:00 AM - 01:00 PM"}
                      </span>
                    </div>

                    {/* Contact Strip */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
                      <a
                        href={`mailto:${f.email}`}
                        className="flex items-center gap-1.5 font-medium truncate max-w-[190px] hover:text-[#FF5F1F] transition-colors"
                        title={f.email}
                      >
                        <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">{f.email}</span>
                      </a>
                      <span className="font-semibold text-slate-700 shrink-0 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        {f.experience || "1 Year"}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs h-8 rounded-xl border-slate-200/90 text-slate-700 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all cursor-pointer font-semibold shadow-2xs"
                      onClick={() => setSelectedFaculty(f)}
                    >
                      View Dossier
                    </Button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDeleteFaculty(f.id, f.name)}
                      className="h-8 w-8 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer shrink-0 shadow-2xs"
                      title="Delete faculty record"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode: Directory Table */}
        {viewMode === "table" && (
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                    <th className="py-3 px-3">Faculty Member</th>
                    <th className="py-3 px-3">Department</th>
                    <th className="py-3 px-3">Assigned Class</th>
                    <th className="py-3 px-3">Office Hours</th>
                    <th className="py-3 px-3">Experience</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFaculty.map((f) => {
                    const cleanName = f.name.replace(/^(Dr\.|Prof\.|Ms\.|Mr\.)\s*/i, "").trim();
                    const nameParts = cleanName.split(" ");
                    const initials = (nameParts[0]?.[0] || "") + (nameParts[1]?.[0] || "");

                    return (
                      <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] font-bold text-xs shadow-2xs">
                              {initials.toUpperCase() || "FC"}
                            </div>
                            <div>
                              <p className="font-bold text-[#0F172A]">{f.name}</p>
                              <p className="text-[11px] text-slate-400">{f.designation}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700">
                          {f.department}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#FF5F1F]">
                          {f.assignedClass || "—"}
                        </td>
                        <td className="py-3.5 px-3 text-slate-600 font-medium">
                          {f.officeHours || "09:00 - 13:00"}
                        </td>
                        <td className="py-3.5 px-3 text-slate-600 font-semibold">
                          {f.experience}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleToggleStatus(f.id, f.status)}
                            className="cursor-pointer"
                          >
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                f.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                                  : "bg-amber-50 text-amber-800 border border-amber-200/70"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  f.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                                }`}
                              />
                              {f.status}
                            </span>
                          </button>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedFaculty(f)}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-[#0F172A] hover:text-white transition-colors cursor-pointer"
                            >
                              Profile
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => handleDeleteFaculty(f.id, f.name)}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredFaculty.length === 0 && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#FF5F1F] mb-3">
              <GraduationCap className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">No faculty members found</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any faculty matching &quot;{search}&quot;. Try adjusting your search query or department filter.
            </p>
            <Button
              className="mt-4 bg-[#FF5F1F] hover:bg-[#E54E10] text-white rounded-full text-xs font-bold px-5 h-9"
              onClick={() => {
                setSearch("");
                setSelectedDept("All");
                setStatusFilter("All");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Teacher Dossier / Profile Modal */}
      {selectedFaculty && (
        <Modal
          isOpen={!!selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
          title="Faculty Profile Dossier"
          description={`Verified Institutional Staff Record • ID #${selectedFaculty.id.slice(0, 8)}`}
          className="max-w-xl"
        >
          <div className="space-y-4 text-xs font-sans">
            {/* Header Dossier Banner */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0F172A] text-white">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#FF5F1F] font-black text-lg ring-2 ring-[#FF5F1F]/40">
                {selectedFaculty.name
                  .replace(/^(Dr\.|Prof\.|Ms\.|Mr\.)\s*/i, "")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{selectedFaculty.name}</h3>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      selectedFaculty.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        selectedFaculty.status === "Active" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {selectedFaculty.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {selectedFaculty.designation}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-[#FF5F1F]" />
                    {selectedFaculty.department}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    HEC Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Blocks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-medium text-slate-400">Assigned Classroom</p>
                <p className="font-bold text-[#FF5F1F] text-sm mt-0.5">
                  {selectedFaculty.assignedClass || "Department Faculty"}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-medium text-slate-400">Total Teaching Experience</p>
                <p className="font-bold text-[#0F172A] text-sm mt-0.5">
                  {selectedFaculty.experience || "1 Year"}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-medium text-slate-400">Office Timings</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {selectedFaculty.officeHours || "09:00 AM - 01:00 PM"}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-medium text-slate-400">Institutional Role</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">Senior Faculty</p>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/90 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-slate-600">
                  <Mail className="h-4 w-4 text-[#FF5F1F]" /> Email Address:
                </span>
                <a
                  href={`mailto:${selectedFaculty.email}`}
                  className="font-bold text-[#0F172A] hover:text-[#FF5F1F] transition-colors"
                >
                  {selectedFaculty.email}
                </a>
              </div>

              {selectedFaculty.phone && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <Phone className="h-4 w-4 text-[#FF5F1F]" /> Phone Contact:
                  </span>
                  <a
                    href={`tel:${selectedFaculty.phone}`}
                    className="font-bold text-[#0F172A] hover:text-[#FF5F1F] transition-colors"
                  >
                    {selectedFaculty.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  handleToggleStatus(selectedFaculty.id, selectedFaculty.status)
                }
                className="text-xs font-bold text-slate-700 hover:text-[#FF5F1F] transition-colors cursor-pointer"
              >
                Mark as {selectedFaculty.status === "Active" ? "On Leave" : "Active"}
              </button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => setSelectedFaculty(null)}
                >
                  Close
                </Button>
                <button
                  type="button"
                  onClick={() => alert(`ID Badge sent for printing: ${selectedFaculty.name}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#FF5F1F] transition-colors cursor-pointer shadow-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print Faculty ID
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Faculty Modal (Fixed Screenshot 2 UX issues) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => !isPending && setIsAddModalOpen(false)}
        title="Add Faculty Member"
        description="Register an academic teacher or administrative staff member to the institution directory."
        className="max-w-xl"
      >
        <form onSubmit={handleAddFaculty} className="space-y-4">
          {/* Section 1: Academic & Position Details */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF5F1F] mb-2 flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> Academic & Role Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Full Name *</Label>
                <Input
                  required
                  placeholder="e.g. Dr. Salman Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-700">Designation *</Label>
                <Input
                  required
                  placeholder="e.g. Senior Lecturer Physics"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  disabled={isPending}
                  className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Department *</Label>
                <div className="relative mt-1">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={isPending}
                    className="flex h-9 w-full appearance-none rounded-xl border border-slate-200/90 bg-white px-3 pr-8 text-xs font-medium text-slate-800 focus:border-[#FF5F1F] focus:outline-none cursor-pointer"
                  >
                    <option>Sciences Department</option>
                    <option>Physics Department</option>
                    <option>Mathematics Department</option>
                    <option>Chemistry Department</option>
                    <option>Computer & IT Department</option>
                    <option>Biology & Life Sciences</option>
                    <option>Languages & Humanities</option>
                    <option>Administration</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Assigned Classroom</Label>
                <Input
                  placeholder="e.g. Grade 10 - Section A"
                  value={assignedClass}
                  onChange={(e) => setAssignedClass(e.target.value)}
                  disabled={isPending}
                  className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Office Schedule (Spacious layout, no truncation) */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF5F1F] mb-2 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Contact & Office Schedule
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Institutional Email *</Label>
                <Input
                  required
                  type="email"
                  placeholder="name@edupak.edu.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Contact Phone</Label>
                <Input
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isPending}
                  className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                />
              </div>

              {/* Office Hours - Given Full Column Width */}
              <div>
                <Label className="text-xs font-semibold text-slate-700">Office Timings</Label>
                <Input
                  placeholder="10:00 AM - 12:30 PM"
                  value={officeHours}
                  onChange={(e) => setOfficeHours(e.target.value)}
                  disabled={isPending}
                  className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Experience</Label>
                  <Input
                    placeholder="e.g. 8 Years"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    disabled={isPending}
                    className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Initial Status</Label>
                  <div className="relative mt-1">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as "Active" | "On Leave")}
                      disabled={isPending}
                      className="flex h-9 w-full appearance-none rounded-xl border border-slate-200/90 bg-white px-3 pr-7 text-xs font-medium text-slate-800 focus:border-[#FF5F1F] focus:outline-none cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full px-5 text-xs font-semibold"
              onClick={() => setIsAddModalOpen(false)}
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
                  <span>Saving Faculty...</span>
                </>
              ) : (
                <span>Save Faculty</span>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
