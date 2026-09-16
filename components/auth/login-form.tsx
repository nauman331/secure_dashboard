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
            <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Sign in
                </h2>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400"
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
                                <FormLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="you@example.com"
                                        type="email"
                                        autoComplete="email"
                                        className="h-11 rounded-lg border-zinc-200 bg-white transition-shadow focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-zinc-800 dark:bg-zinc-900"
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
                                    <FormLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Password
                                    </FormLabel>
                                    <Link
                                        href="/reset"
                                        className="text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400"
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
                                            className="h-11 rounded-lg border-zinc-200 bg-white pr-10 transition-shadow focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-zinc-800 dark:bg-zinc-900"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            tabIndex={-1}
                                            className="absolute right-0 top-0 flex h-11 w-10 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
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
                        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 w-full cursor-pointer rounded-lg bg-indigo-600 font-medium text-white transition-all hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing in
                            </span>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>
            </Form>

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-xs text-zinc-400">or continue with</span>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <Social />
        </div>
    );
};