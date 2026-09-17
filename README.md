# EduPak — Modern Education Management Operating System

![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat-square&logo=tailwindcss)
![NextAuth v5](https://img.shields.io/badge/NextAuth-v5-green?style=flat-square&logo=next.js)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

**EduPak** is an all-in-one, minimalist, high-performance education operating system built for modern schools, academies, colleges, and university departments. It unifies **Student Information (SIS)**, **Fee Challans & Reconciliation**, **Biometric Turnstile Attendance**, **Curricula & LMS**, **Examinations & Scorecards**, and **Faculty Management** under a clean, distraction-free interface.

---

## 📸 Design Philosophy & Aesthetics

EduPak features a grounded design inspired by modern high-end SaaS dashboards (Skillset layout):

- **Palette**: **Electric Orange (`#FF5F1F`)** primary accent paired with **Midnight Slate (`#0F172A`)** hero cards, dark capsules, and navigation accents on an ultra-clean **Slate-50 (`#F8FAFC`)** canvas.
- **Typography**: **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** for crisp humanist clarity, and **JetBrains Mono** for roll IDs, financial numbers, and timestamps.
- **Zero Clutter**: Strictly no artificial gradients, blurry mesh blobs, or noisy shadows. Every card features clean hairline borders (`border-slate-200/80`), `rounded-2xl` geometry, and instant micro-interactions.
- **Unified Consistency**: Every single module follows the exact same 4-card KPI strip, timeframe pill capsule, instant search bar, table styles, and modal patterns.

---

## ⚡ Core Modules & Capabilities

### 1. 📊 Executive Dashboard (`/dashboard`)
- **Metric Cards**: Real-time revenue counter, active student enrollment, monthly admissions, and faculty count.
- **Vertical Bar Chart**: Monthly institutional income curve with active month highlight ring.
- **Interactive Calendar Widget**: Daily schedule selector paired with a circular attendance & community growth gauge.
- **Recent Fee Transactions**: Live transaction ledger displaying student initials, roll codes, amounts, and payment clearance pills.

### 2. 🎓 Student Information System (`/dashboard/students`)
- **Directory & Roster**: Live search by student name, roll number, or guardian contact.
- **Segmented Grade Filters**: Quick switching across Grade 10, Grade 9, O-Levels, and A-Levels cohorts.
- **Comprehensive Profile Modal**: View section assignment, academic GPA, attendance rate, and fee clearance status.
- **Enrollment Wizard**: Add new student admissions directly to the database with instant roll ID generation.

### 3. 💳 Smart Fee & Challan Engine (`/dashboard/fees`)
- **Financial Ledger**: Track total billed tuition, collected cash flow, defaulter arrears, and scholarship concessions.
- **Multi-Channel Reconciliation**: Support for Bank Transfer (HBL), JazzCash Direct, EasyPaisa, and Accounts Counter Cash.
- **1-Click Challan Payment**: Mark vouchers as paid and generate instant digital receipts.
- **Batch Generator**: Print official board-compliant fee challan slips with a single click.

### 4. ⏱️ Biometric RFID & Attendance Hub (`/dashboard/attendance`)
- **Gate Turnstile Synced**: Real-time punch-in records verified against RFID hardware turnstiles.
- **Classroom Registers**: Toggle attendance statuses (`Present`, `Absent`, `Late`) with a single click.
- **Parent Alert Gateway**: 1-Click trigger to dispatch automated SMS notifications to absent students' guardians after 08:15 AM.

### 5. 📚 Learning Management System (LMS) (`/dashboard/lms`)
- **Coursework Management**: Course cards displaying syllabus completion percentage, enrolled students, and unit counts.
- **Assignment Submissions**: Real-time tracking of student homework, lab reports, quizzes, and grading pipelines.
- **Digital Resource Repository**: Centralized download center for past examination papers, formula booklets, and lecture slides.

### 6. 🏆 Examinations & Results Hub (`/dashboard/results`)
- **Grade Distribution Curve**: Institutional curve breakdown across A+ (90-100%), A, B, C, and needs-improvement bands.
- **Top Rankers Roster**: Merit positions, total aggregate marks, and percentage computations.
- **Official Printable Transcripts**: Clean report card modal with subject-wise breakdown, GPA, and Principal remarks.
- **Broad-Sheet CSV Export**: Export comprehensive examination tables directly to Excel/CSV.

### 7. 👥 Faculty & Department Directory (`/dashboard/faculty`)
- **Teacher Profiles**: Roster of department heads and lecturers with subject assignments and office hours.
- **Staff Attendance**: Daily faculty check-in metrics and teacher-to-student ratio tracking (1:23).

### 8. ⚙️ Campus Settings & Configuration (`/settings`)
- **Institutional Identity**: Configure school name, motto, address, and BISE/Cambridge affiliation numbers.
- **Academic Rules**: Define active academic sessions (e.g. 2025-2026), semester terms, and minimum passing criteria.
- **Automated Gateways**: Toggle automated absentee SMS alerts and monthly fee voucher reminders.

### 9. 🔐 Enterprise Authentication (`/login`)
- **NextAuth v5**: Secure server actions, encrypted session tokens, and middleware route protection.
- **1-Click Demo Fill**: Pre-fills verified demo administrator credentials (`nauman33183@gmail.com` / `admin123`) for evaluation.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (Turbopack, App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@theme inline` |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [JetBrains Mono](https://www.jetbrains.com/lp/mono/) |
| **Authentication** | [NextAuth v5 (Beta)](https://authjs.dev/) with Drizzle Adapter |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Form Validation** | [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.17.0` or later
- **PostgreSQL Database**: Local or hosted (Supabase, Neon, or Docker)

### 1. Clone & Install
```bash
git clone https://github.com/nauman331/secure_dashboard.git
cd secure_dashboard
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/edupak_db"

# NextAuth v5 Secret
AUTH_SECRET="your-super-secret-auth-key-generate-with-openssl"

# Public App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Start Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Access Credentials

To test the system immediately without manual registration:
- **URL**: [http://localhost:3000/login](http://localhost:3000/login)
- **Click**: `⚡ 1-Click Demo Fill`
- **Email**: `nauman33183@gmail.com`
- **Password**: `admin123`

---

## 📁 Repository Structure

```
secure_dashboard/
├── actions/             # Server actions (auth, login, logout, register)
├── app/                 # Next.js App Router
│   ├── (auth)/          # Authentication routes (/login, /register, /reset)
│   ├── (protected)/     # Authenticated dashboard views
│   │   ├── dashboard/   # Main dashboard, students, fees, attendance, LMS, results, faculty
│   │   └── settings/    # Institutional settings & notification configuration
│   ├── globals.css      # Design tokens, color variables, Tailwind v4 theme
│   ├── layout.tsx       # Root layout with Plus Jakarta Sans font loading
│   └── page.tsx         # Modern SaaS landing page with interactive preview
├── components/          # Reusable React components
│   ├── auth/            # Sign-in forms, social logins, auth panels
│   ├── dashboard/       # Sidebar, TopNav, Timeframe capsules, Modals
│   └── ui/              # Buttons, Badges, Cards, Inputs, Tabs
├── db/                  # Drizzle ORM schema, migrations, connection pool
├── schemas/             # Zod validation schemas for forms and actions
├── public/              # Static public assets
└── README.md            # Project documentation
```

---

## 📄 License
This project is open-source and available under the **MIT License**.