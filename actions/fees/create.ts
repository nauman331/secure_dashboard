"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { feeVouchers } from "@/db/schema";
import { eq } from "drizzle-orm";

const CreateChallanSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  rollNo: z.string().min(2, "Roll number is required"),
  grade: z.string().min(1, "Grade / Class is required"),
  amount: z.coerce.number().min(100, "Amount must be at least PKR 100"),
  dueDate: z.string().min(1, "Due date is required"),
});

export const createFeeChallan = async (values: z.infer<typeof CreateChallanSchema>) => {
  const validated = CreateChallanSchema.safeParse(values);
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || "Invalid challan details" };
  }

  const { studentName, rollNo, grade, amount, dueDate } = validated.data;

  try {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const challanNo = `CHL-${year}-${randomSuffix}`;

    await db.insert(feeVouchers).values({
      challanNo,
      studentName: studentName.trim(),
      rollNo: rollNo.trim(),
      grade: grade.trim(),
      amount: Math.round(amount),
      dueDate: dueDate.trim(),
      channel: "Pending Challan",
      status: "Pending",
    });

    revalidatePath("/dashboard/fees");
    return { success: `Challan ${challanNo} generated successfully!` };
  } catch (error) {
    console.error("Error creating fee challan:", error);
    return { error: "Failed to generate fee challan in database." };
  }
};

export const deleteFeeChallan = async (id: string) => {
  try {
    await db.delete(feeVouchers).where(eq(feeVouchers.id, id));
    revalidatePath("/dashboard/fees");
    return { success: "Challan deleted successfully." };
  } catch (error) {
    console.error("Error deleting fee challan:", error);
    return { error: "Failed to delete fee voucher." };
  }
};
