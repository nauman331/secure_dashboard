"use server"

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { students } from "@/db/schema";

const EnrollStudentSchema = z.object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    grade: z.string().min(1, "Grade is required"),
    section: z.string().optional(),
    guardianName: z.string().min(3, "Guardian name is required"),
    guardianContact: z.string().optional(),
});

export const enrollStudent = async (values: z.infer<typeof EnrollStudentSchema>) => {
    const validatedFields = EnrollStudentSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid data provided!" };
    }
    const { fullName, grade, section, guardianName, guardianContact } = validatedFields.data;
    try {
        const currentYear = new Date().getFullYear();
        const timeString = Date.now().toString();
        const uniqueDigits = timeString.slice(-5);
        const rollId = `EP-${currentYear}-${uniqueDigits}`;
        await db.insert(students).values({
            rollId,
            fullName,
            grade,
            section: section || "",
            guardianName,
            guardianContact: guardianContact || "",
        });
        revalidatePath("/dashboard/students");
        return { success: "Student enrolled successfully!" };
    } catch (error) {
        console.error("Error enrolling student:", error);
        return { error: "Failed to enroll student. Roll ID might be taken." };
    }
}
