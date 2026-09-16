import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <AuthLayout
            eyebrow="Welcome back"
            headline="Pick up exactly where you left off."
            subhead="Sign in to access your dashboard, projects, and team."
        >
            <LoginForm />
        </AuthLayout>
    );
}