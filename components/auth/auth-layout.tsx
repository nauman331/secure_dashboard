import { ReactNode } from "react";
import { GraduationCap, Check } from "lucide-react";

interface AuthLayoutProps {
    children: ReactNode;
    eyebrow?: string;
    headline?: string;
    subhead?: string;
}

export const AuthLayout = ({
    children,
    eyebrow = "Welcome back",
    headline = "The clean, minimal education operating system.",
    subhead = "Sign in to access student records, fee collection, and attendance registers.",
}: AuthLayoutProps) => {
    return (
        <div className="flex min-h-screen w-full bg-[#F8FAFC] text-[#0F172A]">
            {/* Left Branded Panel */}
            <div className="relative hidden w-[42%] bg-[#0F172A] text-white lg:flex lg:flex-col lg:justify-between p-12">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-sm">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                            EduPak
                        </span>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">
                            Education OS
                        </span>
                    </div>
                </div>

                {/* Features & Copy */}
                <div>
                    {eyebrow && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#38BDF8] mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                            {eyebrow}
                        </div>
                    )}
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
                        {headline}
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {subhead}
                    </p>

                    <div className="mt-8 space-y-3.5">
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                                <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                            <span>Complete Student Information System (SIS)</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                                <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                            <span>Automated Fee Challans & Multi-Channel Reconciliation</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                                <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                            <span>Biometric Turnstiles & Automated Parent Notifications</span>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <div className="text-xs text-slate-400 font-medium">
                    © 2026 EduPak. Designed for world-class educational institutions.
                </div>
            </div>

            {/* Right Form pane */}
            <div className="flex w-full flex-1 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-[0_4px_24px_rgba(15,23,42,0.04)] border border-[#E2E8F0]">
                    {children}
                </div>
            </div>
        </div>
    );
};