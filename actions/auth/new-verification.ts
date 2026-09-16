"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users, verificationTokens } from "@/db/schema";
import { getUserByEmail } from "@/db/queries";

export const newVerification = async (token: string) => {
    const [existingToken] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token));

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.identifier);
    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await db
        .update(users)
        .set({
            emailVerified: new Date(),
            email: existingToken.identifier,
        })
        .where(eq(users.id, existingUser.id));

    await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.token, token));

    return { success: "Email verified successfully!" };
};