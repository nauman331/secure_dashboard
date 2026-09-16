import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Loader2 } from "lucide-react";

export default function NewVerificationPage() {
    return (
        <AuthLayout
            eyebrow="Verification"
            headline="Securing your account."
            subhead="Verifying your identity to give you full access."
        >
            <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin" /></div>}>
                <NewVerificationForm />
            </Suspense>
        </AuthLayout>
    );
}