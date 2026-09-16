import { auth } from "@/auth";
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-8 border">
                <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

                <div className="space-y-4 mb-8">
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-sm text-slate-500 font-semibold">Name</p>
                        <p className="text-lg">{session?.user?.name}</p>
                    </div>

                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-sm text-slate-500 font-semibold">Email</p>
                        <p className="text-lg">{session?.user?.email}</p>
                    </div>

                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-sm text-slate-500 font-semibold">Role</p>
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mt-1">
                            {session?.user?.role}
                        </span>
                    </div>
                </div>

                <form action={logout}>
                    <Button type="submit" variant="destructive" className="w-full">
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
}