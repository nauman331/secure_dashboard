"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { faculty } from "@/db/schema";
import { eq } from "drizzle-orm";

const CreateFacultySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string().min(2, "Designation is required"),
  department: z.string().min(2, "Department is required"),
  assignedClass: z.string().optional().default(""),
  email: z.string().email("Valid institutional email is required"),
  phone: z.string().optional().default(""),
  officeHours: z.string().optional().default("09:00 AM - 01:00 PM"),
  experience: z.string().optional().default("1 Year"),
  status: z.enum(["Active", "On Leave"]).default("Active"),
});

export const createFacultyMember = async (values: z.infer<typeof CreateFacultySchema>) => {
  const validatedFields = CreateFacultySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0]?.message || "Invalid input provided" };
  }

  const data = validatedFields.data;

  try {
    const [existing] = await db
      .select({ id: faculty.id })
      .from(faculty)
      .where(eq(faculty.email, data.email.toLowerCase().trim()));

    if (existing) {
      return { error: "A faculty member with this email already exists!" };
    }

    await db.insert(faculty).values({
      name: data.name.trim(),
      designation: data.designation.trim(),
      department: data.department.trim(),
      assignedClass: data.assignedClass?.trim() || "",
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.trim() || "",
      officeHours: data.officeHours?.trim() || "09:00 AM - 01:00 PM",
      experience: data.experience?.trim() || "1 Year",
      status: data.status,
    });

    revalidatePath("/dashboard/faculty");
    return { success: "Faculty member added successfully!" };
  } catch (error) {
    console.error("Error creating faculty member:", error);
    return { error: "Failed to add faculty member to database." };
  }
};
