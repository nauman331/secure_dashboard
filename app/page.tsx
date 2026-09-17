"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  Check,
  Users,
  CreditCard,
  CalendarCheck,
  BookOpen,
  ArrowUpRight,
  ArrowUp,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
} from "lucide-react";

export default function Home() {
  const [selectedDay, setSelectedDay] = React.useState("19");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#FF5F1F] selection:text-white font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-[#0F172A] text-white px-4 py-2 text-center text-xs font-semibold">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F1F]" />
          <span>EduPak Education OS</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Clean, unified management for students, fees, attendance & LMS</span>
        </span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
              EduPak
            </span>
            <span className="h-2 w-2 rounded-full bg-[#FF5F1F] mt-1" />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#preview" className="hover:text-[#0F172A] transition-colors">Dashboard Preview</a>
            <a href="#features" className="hover:text-[#0F172A] transition-colors">Core Modules</a>
            <a href="#financials" className="hover:text-[#0F172A] transition-colors">Fee Engine</a>
            <a href="#attendance" className="hover:text-[#0F172A] transition-colors">Attendance</a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#0F172A] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5F1F] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#E54E10] transition-colors cursor-pointer"
            >
              Launch App
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#0F172A] shadow-2xs border border-slate-200/80 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
            Clean, Minimalist Education Operating System
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
            Managing education, <br />
            simplified to perfection.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Unified student records, automated fee reconciliation (JazzCash, EasyPaisa, Bank Transfer),
            biometric turnstile attendance, and modern course management with zero visual clutter.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5F1F] px-7 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#E54E10] transition-colors cursor-pointer"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-[#0F172A] shadow-2xs border border-slate-200/80 hover:bg-slate-50 transition-colors"
            >
              Sign In with 1-Click Demo
            </Link>
          </div>
        </div>

        {/* Hero Visual: The Skillset-Styled EduPak Dashboard Mockup */}
        <div id="preview" className="mx-auto max-w-6xl px-6 sm:px-10 mt-12">
          <div className="rounded-3xl bg-[#F1F5F9] p-4 sm:p-6 border border-slate-300/70 shadow-xl">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-300/70 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-400" />
                <span className="h-3 w-3 rounded-full bg-slate-400" />
                <span className="h-3 w-3 rounded-full bg-slate-400" />
                <span className="ml-2 font-mono text-xs text-slate-500 font-semibold">
                  edupak.edu.pk/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
                Live Demo
              </div>
            </div>

            {/* Dashboard Mock Content */}
            <div className="space-y-4">
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-[#0F172A] text-white p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-white mt-1">PKR 84,200</h3>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-[#FF5F1F]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-semibold">
                    <ArrowUp className="h-3 w-3" />
                    <span>4.2% from last month</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-500">Active Students</p>
                  <h3 className="text-2xl font-bold text-[#0F172A] mt-1">16,815</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-semibold">
                    <ArrowUp className="h-3 w-3" />
                    <span>1.7% from last month</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-500">New Admissions</p>
                  <h3 className="text-2xl font-bold text-[#0F172A] mt-1">1,457</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-semibold">
                    <ArrowUp className="h-3 w-3" />
                    <span>2.9% from last month</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-500">Total Faculty</p>
                  <h3 className="text-2xl font-bold text-[#0F172A] mt-1">2,023</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-semibold">
                    <ArrowUp className="h-3 w-3" />
                    <span>0.9% from last month</span>
                  </div>
                </div>
              </div>

              {/* Middle Row: Revenue Bar Chart + Calendar Widget */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-[#0F172A]">Total Revenue</h4>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="flex items-end justify-between h-44 pt-4 px-2">
                    <div className="flex flex-col justify-between h-full text-[10px] font-semibold text-slate-400 pr-3">
                      <span>10K</span>
                      <span>8K</span>
                      <span>4K</span>
                      <span>2K</span>
                      <span>0</span>
                    </div>

                    <div className="flex-1 flex items-end justify-around h-full">
                      {[
                        { m: "Jan", h: "60%", active: false },
                        { m: "Feb", h: "70%", active: false },
                        { m: "Mar", h: "85%", active: true },
                        { m: "Apr", h: "52%", active: false },
                        { m: "May", h: "90%", active: false },
                        { m: "Jun", h: "35%", active: false },
                      ].map((bar) => (
                        <div key={bar.m} className="flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-8 sm:w-10 bg-slate-100 rounded-xl overflow-hidden flex items-end h-32 p-1">
                            <div
                              className={`w-full rounded-lg ${
                                bar.active ? "bg-[#FF5F1F] shadow-sm ring-2 ring-[#FF5F1F]/40" : "bg-[#0F172A]"
                              }`}
                              style={{ height: bar.h }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold ${bar.active ? "text-[#FF5F1F]" : "text-slate-400"}`}>
                            {bar.m}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calendar & Attendance gauge */}
                <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-slate-400"><ChevronLeft className="h-3.5 w-3.5" /></span>
                      <span className="text-xs font-bold text-[#0F172A]">September 2026</span>
                      <span className="text-slate-400"><ChevronRight className="h-3.5 w-3.5" /></span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {[
                        { day: "Tue", date: "17" },
                        { day: "Wed", date: "18" },
                        { day: "Thu", date: "19" },
                        { day: "Fri", date: "20" },
                        { day: "Sat", date: "21" },
                      ].map((item) => (
                        <button
                          key={item.date}
                          type="button"
                          onClick={() => setSelectedDay(item.date)}
                          className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all cursor-pointer ${
                            selectedDay === item.date
                              ? "bg-[#0F172A] text-white shadow-sm ring-1 ring-[#FF5F1F]"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className={`text-[9px] font-medium ${selectedDay === item.date ? "text-[#FF5F1F]" : "text-slate-400"}`}>{item.day}</span>
                          <span className="text-xs font-bold mt-0.5">{item.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">Community Growth</p>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-0.5 font-semibold">
                        <ArrowUp className="h-3 w-3" />
                        <span>0.9% from last month</span>
                      </div>
                    </div>

                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#FF5F1F]"
                          strokeDasharray="65, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-extrabold text-[#0F172A]">65%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Purchases Table */}
              <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/80">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-[#0F172A]">Recent Course Purchases</h4>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[10px] font-semibold text-slate-400">
                        <th className="py-2 px-2">Course Name</th>
                        <th className="py-2 px-2">Student Name</th>
                        <th className="py-2 px-2">Student ID</th>
                        <th className="py-2 px-2">Amount</th>
                        <th className="py-2 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-2 font-bold text-[#0F172A]">Digital Marketing</td>
                        <td className="py-2.5 px-2 text-slate-600">Aria</td>
                        <td className="py-2.5 px-2 font-mono text-slate-400">#3456791</td>
                        <td className="py-2.5 px-2 font-bold text-[#0F172A]">PKR 14,500</td>
                        <td className="py-2.5 px-2 text-right">
                          <span className="rounded-full bg-[#0F172A] px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                            Paid
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section id="features" className="py-16 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5F1F]">
              Platform Architecture
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Pure utility. Zero clutter.
            </h2>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Every interface is designed for instantaneous speed, maximum legibility, and effortless daily administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-[#F8FAFC] p-6 border border-slate-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Student Information System</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Centralized student profiles, guardian contacts, class sections, and continuous academic history.
              </p>
            </div>

            <div id="financials" className="rounded-2xl bg-[#F8FAFC] p-6 border border-slate-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] mb-4">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Smart Fee & Challan Engine</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Integrated Bank Transfer, JazzCash, EasyPaisa, and Cash reconciliation. Detect defaulters immediately.
              </p>
            </div>

            <div id="attendance" className="rounded-2xl bg-[#F8FAFC] p-6 border border-slate-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] text-[#FF5F1F] mb-4">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Biometric RFID Attendance</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Real-time RFID gate readers linked with classroom registers and instant SMS alerts to parents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 py-8 bg-[#F8FAFC] text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-6 sm:px-10 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A]">EduPak</span>
            <span>• Clean Education Management Platform</span>
          </div>
          <p>© 2026 EduPak System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
