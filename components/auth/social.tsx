"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const GoogleIcon = () => (
    <svg
        className="h-[18px] w-[18px] shrink-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            fill="#4285F4"
            d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1A11.998 11.998 0 0012 24z"
        />
        <path
            fill="#FBBC05"
            d="M5.27 14.28A7.2 7.2 0 014.89 12c0-.79.14-1.56.38-2.28v-3.1H1.26A12 12 0 000 12c0 1.93.46 3.76 1.26 5.38l4.01-3.1z"
        />
        <path
            fill="#EA4335"
            d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A11.998 11.998 0 001.26 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77z"
        />
    </svg>
);

const GitHubIcon = () => (
    <svg
        className="h-[18px] w-[18px] shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.2 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z" />
    </svg>
);

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: "/dashboard",
        });
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            <Button
                type="button"
                variant="outline"
                onClick={() => onClick("google")}
                className="h-11 w-full gap-2.5 cursor-pointer rounded-lg border-zinc-200 bg-white px-4 font-medium text-zinc-700 shadow-sm transition-all hover:-translate-y-px hover:bg-zinc-50 hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
                <GoogleIcon />
                <span>Google</span>
            </Button>

            <Button
                type="button"
                variant="outline"
                onClick={() => onClick("github")}
                className="h-11 w-full gap-2.5 cursor-pointer rounded-lg border-zinc-200 bg-white px-4 font-medium text-zinc-700 shadow-sm transition-all hover:-translate-y-px hover:bg-zinc-50 hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
                <GitHubIcon />
                <span>GitHub</span>
            </Button>
        </div>
    );
};
