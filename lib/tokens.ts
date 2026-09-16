
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { verificationTokens } from "@/db/schema";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const [existingToken] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, email));

    if (existingToken) {
        await db
            .delete(verificationTokens)
            .where(eq(verificationTokens.identifier, email));
    }

    const [verificationToken] = await db
        .insert(verificationTokens)
        .values({
            identifier: email,
            token,
            expires,
        })
        .returning();

    return verificationToken;
};