import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <AuthLayout
            eyebrow="Get started"
            headline="Everything your team needs, in one place."
            subhead="Create an account and be up and running in minutes."
        >
            <RegisterForm />
        </AuthLayout>
    );
}