import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import authConfig from "./auth.config";
import { db } from "./db";
import { users } from "./db/schema";
import { LoginSchema } from "./schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    ...authConfig,
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
    providers: [
        ...authConfig.providers,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const [user] = await db.select().from(users).where(eq(users.email, email));

                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return { id: user.id, name: user.name, email: user.email, role: user.role };
                }
                return null;
            }
        })
    ],
});