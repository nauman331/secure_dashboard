"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, TriangleAlert, MailCheck } from "lucide-react";

import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/auth/register";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Social } from "@/components/auth/social";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) setSuccess(data.success);
      });
    });
  };


  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-6">
        <div className="h-20 w-20 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center">
          <MailCheck className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Check your email
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
            {success}
          </p>
        </div>
        <Button className="w-full mt-4 h-11 bg-indigo-600 hover:bg-indigo-700">
          <Link href="/login">Back to sign in</Link>
        </Button>
      </div>
    );
  }


  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create your account
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          Already have one?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="John Doe" className="h-11 rounded-lg border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="you@example.com" type="email" className="h-11 rounded-lg border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
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
                <FormLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} disabled={isPending} placeholder="••••••••" type={showPassword ? "text" : "password"} className="h-11 rounded-lg border-zinc-200 bg-white pr-10 dark:border-zinc-800 dark:bg-zinc-900" />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-0 top-0 flex h-11 w-10 items-center justify-center text-zinc-400 hover:text-zinc-600">
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

          <Button type="submit" disabled={isPending} className="h-11 w-full rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            {isPending ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Creating account</span> : "Create account"}
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