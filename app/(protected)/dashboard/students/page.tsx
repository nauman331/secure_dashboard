import { getAllStudents } from "@/db/queries";
import { StudentsClient } from "./students-client";

export default async function StudentsPage() {
  const studentsData = await getAllStudents();
  return <StudentsClient initialData={studentsData} />;
}