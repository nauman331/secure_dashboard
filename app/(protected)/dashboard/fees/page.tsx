import { getAllFeeVouchers } from "@/db/queries";
import { FeesClient } from "./fees-client";

export const dynamic = "force-dynamic";

export default async function FeesPage() {
  const feeVouchers = await getAllFeeVouchers();

  return <FeesClient initialData={feeVouchers} />;
}
