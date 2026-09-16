"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByEmail } from "@/db/queries";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields provided!" };
    }
    const { email, name, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email is already in use!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword
    })
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.identifier, verificationToken.token);
    return { success: "We've sent a verification link to your email. Please verify your account to continue." };
}