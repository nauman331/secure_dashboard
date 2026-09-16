import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    eyebrow?: string;
    headline?: string;
    subhead?: string;
}

const features = [
    "Real-time sync across every device",
    "Role-based access, down to the field",
    "Audit trails you can actually read",
];

export const AuthLayout = ({
    children,
    eyebrow = "Welcome",
    headline = "Everything your team needs, in one place.",
    subhead = "Sign in to pick up right where you left off.",
}: AuthLayoutProps) => {
    return (
        <div className="flex min-h-screen w-full bg-stone-50 dark:bg-zinc-950">
            <div className="relative hidden w-[44%] overflow-hidden bg-zinc-950 lg:flex lg:flex-col lg:justify-between">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] animate-blob rounded-full bg-indigo-600/30 blur-3xl" />
                    <div className="animation-delay-2000 absolute -bottom-32 -right-16 h-[26rem] w-[26rem] animate-blob rounded-full bg-violet-500/20 blur-3xl" />
                    <div className="animation-delay-4000 absolute left-1/3 top-1/2 h-64 w-64 animate-blob rounded-full bg-sky-500/10 blur-3xl" />
                </div>

                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />

                <div className="relative z-10 px-12 pt-12">
                    <div className="flex items-center gap-2 text-white">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                            <span className="text-sm font-semibold">A</span>
                        </div>
                        <span className="text-sm font-medium tracking-tight">Acme</span>
                    </div>
                </div>

                <div className="relative z-10 px-12 pb-14">
                    {eyebrow && (
                        <p className="mb-4 text-sm font-medium text-indigo-300/90">{eyebrow}</p>
                    )}
                    <h1 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white">
                        {headline}
                    </h1>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">{subhead}</p>

                    <ul className="mt-8 space-y-3">
                        {features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                                <svg
                                    className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Form pane */}
            <div className="flex w-full flex-1 items-center justify-center px-6 py-12 sm:px-10">
                <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
                    {children}
                </div>
            </div>
        </div>
    );
};