"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CircleCheck, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

import { newVerification } from "@/actions/auth/new-verification";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                if (data.success) setSuccess(data.success);
                if (data.error) setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                    Confirming your verification
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Please wait while we verify your email address.
                </p>
            </div>

            <div className="flex w-full items-center justify-center mt-6">
                {!success && !error && (
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                )}

                {success && (
                    <div className="flex w-full items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-600 border border-emerald-100">
                        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" />
                        <span className="font-medium text-base">{success}</span>
                    </div>
                )}

                {error && (
                    <div className="flex w-full items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
                        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                        <span className="font-medium text-base">{error}</span>
                    </div>
                )}
            </div>

            <Button variant="outline" className="w-full mt-6 h-11">
                <Link href="/login">Back to login</Link>
            </Button>
        </div>
    );
};