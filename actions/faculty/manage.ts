"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { faculty } from "@/db/schema";
import { eq } from "drizzle-orm";

export const toggleFacultyStatus = async (id: string, currentStatus: "Active" | "On Leave") => {
  try {
    const nextStatus = currentStatus === "Active" ? "On Leave" : "Active";
    await db
      .update(faculty)
      .set({ status: nextStatus, updatedAt: new Date() })
      .where(eq(faculty.id, id));

    revalidatePath("/dashboard/faculty");
    return { success: `Status changed to ${nextStatus}` };
  } catch (error) {
    console.error("Error toggling faculty status:", error);
    return { error: "Failed to update status." };
  }
};

export const deleteFacultyMember = async (id: string) => {
  try {
    await db.delete(faculty).where(eq(faculty.id, id));
    revalidatePath("/dashboard/faculty");
    return { success: "Faculty member removed successfully." };
  } catch (error) {
    console.error("Error deleting faculty member:", error);
    return { error: "Failed to delete faculty member." };
  }
};
