import type { NextAuthConfig } from "next-auth";

export default {
    providers: [],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as "ADMIN" | "USER";
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig;