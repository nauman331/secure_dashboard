import { getAllFaculty } from "@/db/queries";
import { FacultyClient } from "./faculty-client";

export const dynamic = "force-dynamic";

export default async function FacultyPage() {
  const facultyList = await getAllFaculty();

  return <FacultyClient initialData={facultyList} />;
}
