"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, TriangleAlert } from "lucide-react";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/auth/login";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Social } from "@/components/auth/social";

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");

        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
            });
        });
    };

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Sign in
                    </h2>
                    <button
                        type="button"
                        onClick={() => {
                            form.setValue("email", "nauman33183@gmail.com");
                            form.setValue("password", "admin123");
                        }}
                        className="rounded-lg border border-orange-200 bg-orange-50/80 px-2.5 py-1 text-xs font-semibold text-[#C2410C] hover:bg-orange-100 transition-colors cursor-pointer"
                    >
                        ⚡ 1-Click Demo Fill
                    </button>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-[#FF5F1F] underline-offset-4 transition-colors hover:text-[#E54E10] hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-semibold text-slate-700">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="you@example.com"
                                        type="email"
                                        autoComplete="email"
                                        className="h-10 rounded-xl border-slate-200 bg-white text-xs transition-shadow focus-visible:ring-2 focus-visible:ring-[#FF5F1F]/30 focus-visible:border-[#FF5F1F]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-xs font-semibold text-slate-700">
                                        Password
                                    </FormLabel>
                                    <Link
                                        href="/reset"
                                        className="text-xs font-medium text-slate-400 transition-colors hover:text-[#FF5F1F]"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            className="h-10 rounded-xl border-slate-200 bg-white pr-10 text-xs transition-shadow focus-visible:ring-2 focus-visible:ring-[#FF5F1F]/30 focus-visible:border-[#FF5F1F]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            tabIndex={-1}
                                            className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-slate-400 transition-colors hover:text-slate-600 cursor-pointer"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-11 w-full cursor-pointer rounded-xl bg-[#FF5F1F] font-bold text-white shadow-xs transition-all hover:bg-[#E54E10] active:scale-[0.99] disabled:opacity-70 text-xs flex items-center justify-center tracking-wide"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing in...
                            </span>
                        ) : (
                            "Sign In to EduPak"
                        )}
                    </button>
                </form>
            </Form>

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[11px] text-slate-400 font-medium">or continue with</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Social />
        </div>
    );
};