"use client";

import * as React from "react";
import {
  Building2,
  Calendar,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Mail,
  Phone,
  Sliders,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/top-nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [saved, setSaved] = React.useState(false);
  const [schoolName, setSchoolName] = React.useState("EduPak Model Academy");
  const [motto, setMotto] = React.useState("Excellence in Education, Character & Innovation");
  const [address, setAddress] = React.useState("Main Canal Road, Gulberg III, Lahore, Pakistan");
  const [affiliation, setAffiliation] = React.useState("BISE-LHR-REG-9082");
  const [academicYear, setAcademicYear] = React.useState("2025-2026");
  const [smsAlerts, setSmsAlerts] = React.useState(true);
  const [emailAlerts, setEmailAlerts] = React.useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 pb-16 bg-[#F8FAFC]">
      <TopNav
        title="Institution Settings"
        subtitle="Manage school profile, academic calendar, notification gateways, and permissions."
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-6 space-y-6">
        {saved && (
          <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            Institution settings have been updated and synchronized across all portals.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Institutional Profile */}
          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white p-6">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#FF5F1F]">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Campus Profile & Identity
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 font-medium">
                    Details printed on student fee challans, report cards, and official transcripts.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Institution Official Name</Label>
                  <Input
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="mt-1 h-9 rounded-xl border-slate-200/80 text-xs focus:border-[#FF5F1F]"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Affiliation / Board Registration ID</Label>
                  <Input
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="mt-1 h-9 rounded-xl border-slate-200/80 text-xs focus:border-[#FF5F1F]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">School Motto / Tagline</Label>
                <Input
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  className="mt-1 h-9 rounded-xl border-slate-200/80 text-xs focus:border-[#FF5F1F]"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Physical Campus Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 h-9 rounded-xl border-slate-200/80 text-xs focus:border-[#FF5F1F]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Term Configuration */}
          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white p-6">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-[#0F172A]">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Academic Term & Grading Rules
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 font-medium">
                    Define the active academic calendar, grading formula, and promotion criteria.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Active Academic Year</Label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="mt-1 flex h-9 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-800 shadow-sm focus:border-[#FF5F1F] focus:outline-none"
                  >
                    <option value="2025-2026">Session 2025-2026 (Current Active)</option>
                    <option value="2026-2027">Session 2026-2027 (Upcoming)</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Current Semester / Term</Label>
                  <select className="mt-1 flex h-9 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-800 shadow-sm focus:border-[#FF5F1F] focus:outline-none">
                    <option>Term 2 (Spring Session)</option>
                    <option>Term 1 (Fall Session)</option>
                    <option>Final Board Prep Term</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Grading System Benchmark</Label>
                  <select className="mt-1 flex h-9 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-800 shadow-sm focus:border-[#FF5F1F] focus:outline-none">
                    <option>FBISE / Punjab Board Standard (A+, A, B, C, D, E)</option>
                    <option>Cambridge International (A*, A, B, C, D, E, U)</option>
                    <option>4.0 GPA Standard Scale</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Minimum Passing Percentage</Label>
                  <Input defaultValue="40%" className="mt-1 h-9 rounded-xl border-slate-200/80 text-xs focus:border-[#FF5F1F]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automated Notification Gateways */}
          <Card className="rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] bg-white p-6">
            <CardHeader className="p-0 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#FF5F1F]">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Automated Guardian Notifications & SMS Gateways
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 font-medium">
                    Configure instant alerts for student absences, fee challan generation, and exam results.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-[#F8FAFC]">
                <div>
                  <p className="font-bold text-slate-900">
                    Daily Absentee SMS to Guardians
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Dispatches an instant SMS alert when student is marked absent after 08:15 AM.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#FF5F1F] focus:ring-[#FF5F1F] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-[#F8FAFC]">
                <div>
                  <p className="font-bold text-slate-900">
                    Monthly Fee Challan Due Reminder
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Sends reminder 3 days before voucher due date and on the final day.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#FF5F1F] focus:ring-[#FF5F1F] cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              className="bg-[#FF5F1F] hover:bg-[#E54E10] text-white rounded-xl font-bold text-xs h-10 px-5 gap-2 shadow-sm cursor-pointer transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Institution Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
