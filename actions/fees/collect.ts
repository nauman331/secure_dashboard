"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { feeVouchers, students } from "@/db/schema";
import { eq } from "drizzle-orm";

const CollectFeeSchema = z.object({
  voucherId: z.string().min(1, "Voucher ID is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export const markVoucherPaid = async (values: z.infer<typeof CollectFeeSchema>) => {
  const validated = CollectFeeSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Invalid payment details provided" };
  }

  const { voucherId, paymentMethod } = validated.data;

  try {
    const [voucher] = await db
      .select()
      .from(feeVouchers)
      .where(eq(feeVouchers.id, voucherId));

    if (!voucher) {
      return { error: "Fee voucher not found" };
    }

    await db
      .update(feeVouchers)
      .set({
        status: "Paid",
        channel: paymentMethod,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(feeVouchers.id, voucherId));

    // Optimistically update student's fee status if roll matches
    if (voucher.rollNo) {
      try {
        await db
          .update(students)
          .set({ feeStatus: "Paid", updatedAt: new Date() })
          .where(eq(students.rollId, voucher.rollNo));
      } catch (err) {
        // Non-fatal if student roll doesn't exist in student table
      }
    }

    revalidatePath("/dashboard/fees");
    revalidatePath("/dashboard/students");
    return { success: "Fee collected and receipt issued successfully!" };
  } catch (error) {
    console.error("Error marking voucher as paid:", error);
    return { error: "Failed to process payment in database." };
  }
};
