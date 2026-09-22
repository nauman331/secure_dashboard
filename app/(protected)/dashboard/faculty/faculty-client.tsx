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

    return matchesSearch && matchesDept;
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

  const handleDeleteFaculty = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from faculty records?`)) return;
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
    <div className="flex-1 pb-16 bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      <TopNav
        title="Faculty & Staff Directory"
        subtitle="Manage teaching faculty, departmental leadership, class assignments, and office schedules."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-6 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Faculty</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                  {totalCount} Teachers
                </h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            </div>
            <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Live Database
            </p>
          </div>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Academic Departments
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                {uniqueDepartments.length} Units
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
                {activePercent}%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">
                {activeCount} active on duty
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white">
            <CardHeader className="p-5 pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Staff Status
              </CardDescription>
              <CardTitle className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                {totalCount - activeCount} On Leave
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <p className="text-xs text-slate-500 font-medium">Verified institution records</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty by name, department, or class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-slate-200/80 bg-white pl-8 pr-3 text-xs shadow-sm focus:border-[#FF5F1F] focus:outline-none"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center overflow-x-auto py-1 gap-1 text-xs no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedDept("All")}
                className={`rounded-xl px-3 py-1.5 font-semibold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  selectedDept === "All"
                    ? "bg-[#0F172A] text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                All Departments
              </button>
              {uniqueDepartments.slice(0, 4).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDept(d)}
                  className={`rounded-xl px-3 py-1.5 font-semibold text-xs transition-all cursor-pointer whitespace-nowrap ${
                    selectedDept === d
                      ? "bg-[#0F172A] text-white shadow-2xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  {d.replace(" Department", "")}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="bg-[#FF5F1F] hover:bg-[#E54E10] text-white rounded-xl text-xs font-semibold h-9 px-4 gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Faculty Member
          </Button>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFaculty.map((f) => {
            const initials = f.name
              .replace(/^(Dr\.|Prof\.|Ms\.|Mr\.)\s*/i, "")
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <Card
                key={f.id}
                className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F172A] text-[#FF5F1F] font-extrabold text-xs shadow-2xs">
                        {initials || "FC"}
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
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleToggleStatus(f.id, f.status)}
                      title="Click to toggle status"
                      className="cursor-pointer transition-transform active:scale-95"
                    >
                      <Badge
                        variant={f.status === "Active" ? "success" : "secondary"}
                        className="text-[10px] font-bold"
                      >
                        {f.status}
                      </Badge>
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-2.5 text-xs">
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> Dept:
                      </span>
                      <span className="font-semibold text-slate-800 text-right">{f.department}</span>
                    </div>
                    {f.assignedClass && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">Assigned Class:</span>
                        <span className="font-semibold text-[#FF5F1F] text-right">
                          {f.assignedClass}
                        </span>
                      </div>
                    )}
                    {f.officeHours && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Office Hours:
                        </span>
                        <span className="text-slate-500 font-medium text-right">{f.officeHours}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1.5 font-medium truncate max-w-[190px]">
                      <Mail className="h-3 w-3 text-slate-400 shrink-0" /> {f.email}
                    </span>
                    <span className="font-bold text-slate-700 shrink-0">
                      {f.experience || "1 Year"}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-7 rounded-xl border-slate-200 text-slate-700 hover:bg-[#0F172A] hover:text-white transition-colors"
                      onClick={() => setSelectedFaculty(f)}
                    >
                      View Profile
                    </Button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDeleteFaculty(f.id, f.name)}
                      className="h-7 w-7 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      title="Delete faculty member"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-slate-700">No faculty members found</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or department filter.
            </p>
            <Button
              className="mt-4 bg-[#FF5F1F] hover:bg-[#E54E10] text-white rounded-xl text-xs font-semibold"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add First Faculty Member
            </Button>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedFaculty && (
        <Modal
          isOpen={!!selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
          title={selectedFaculty.name}
          description={`${selectedFaculty.designation} • ${selectedFaculty.department}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-slate-400 font-medium">Status</p>
                <p className="font-bold text-[#0F172A] mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      selectedFaculty.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  {selectedFaculty.status}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Experience</p>
                <p className="font-bold text-[#0F172A] mt-0.5">
                  {selectedFaculty.experience || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Assigned Class</p>
                <p className="font-bold text-[#FF5F1F] mt-0.5">
                  {selectedFaculty.assignedClass || "General Faculty"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Office Hours</p>
                <p className="font-bold text-slate-700 mt-0.5">
                  {selectedFaculty.officeHours || "09:00 AM - 01:00 PM"}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="h-4 w-4 text-[#FF5F1F]" />
                <span className="font-semibold text-[#0F172A]">Email:</span>
                <span>{selectedFaculty.email}</span>
              </div>
              {selectedFaculty.phone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="h-4 w-4 text-[#FF5F1F]" />
                  <span className="font-semibold text-[#0F172A]">Phone:</span>
                  <span>{selectedFaculty.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  handleToggleStatus(selectedFaculty.id, selectedFaculty.status)
                }
                className="text-xs font-semibold text-slate-600 hover:text-[#FF5F1F] transition-colors cursor-pointer"
              >
                Change Status to {selectedFaculty.status === "Active" ? "On Leave" : "Active"}
              </button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setSelectedFaculty(null)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-[#0F172A] text-white hover:bg-[#FF5F1F] transition-colors"
                  onClick={() => alert(`Contact initiated with ${selectedFaculty.name}`)}
                >
                  Message Faculty
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Faculty Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => !isPending && setIsAddModalOpen(false)}
        title="Add Faculty Member"
        description="Register a teacher or academic staff member to the institution directory."
      >
        <form onSubmit={handleAddFaculty} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Full Name *</Label>
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
              <Label className="text-xs font-semibold">Designation *</Label>
              <Input
                required
                placeholder="e.g. Senior Lecturer Physics"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Department *</Label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isPending}
                className="mt-1 flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-[#FF5F1F]"
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
            </div>
            <div>
              <Label className="text-xs font-semibold">Assigned Class</Label>
              <Input
                placeholder="e.g. Grade 10 - Section A"
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Institutional Email *</Label>
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
              <Label className="text-xs font-semibold">Contact Phone</Label>
              <Input
                placeholder="+92 300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs font-semibold">Office Hours</Label>
              <Input
                placeholder="10:00 AM - 12:30 PM"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Experience</Label>
              <Input
                placeholder="e.g. 8 Years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                disabled={isPending}
                className="mt-1 h-9 rounded-xl text-xs focus:border-[#FF5F1F]"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Active" | "On Leave")}
                disabled={isPending}
                className="mt-1 flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 focus:border-[#FF5F1F]"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setIsAddModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#FF5F1F] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#E54E10] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Adding Faculty..." : "Save Faculty"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
