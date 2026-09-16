"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/db/queries";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields provided!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" };
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};