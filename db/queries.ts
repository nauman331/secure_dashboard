import { eq, desc } from "drizzle-orm";
import { db } from "./index";
import { users, students, faculty } from "./schema";

export const getUserByEmail = async (email: string) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user || null;
    } catch (error) {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user || null;
    } catch (error) {
        return null;
    }
}

export const getAllStudents = async () => {
    return await db.select().from(students).orderBy(desc(students.createdAt));
};

const initialFacultySeed = [
    {
        name: "Dr. Tariq Jamil",
        designation: "Head of Sciences & Senior Lecturer",
        department: "Physics Department",
        assignedClass: "Grade 10 - Section A",
        email: "tariq.jamil@edupak.edu.pk",
        phone: "+92 300 1122334",
        officeHours: "10:00 AM - 12:30 PM",
        experience: "14 Years",
        status: "Active" as const,
    },
    {
        name: "Prof. Asif Raza",
        designation: "Senior Mathematics Master",
        department: "Mathematics Department",
        assignedClass: "Grade 11 Pre-Engineering",
        email: "asif.raza@edupak.edu.pk",
        phone: "+92 321 4455667",
        officeHours: "11:00 AM - 01:00 PM",
        experience: "18 Years",
        status: "Active" as const,
    },
    {
        name: "Ms. Hira Naeem",
        designation: "Lecturer in Computer Science",
        department: "Computer & IT Department",
        assignedClass: "A-Levels CS Stream",
        email: "hira.naeem@edupak.edu.pk",
        phone: "+92 333 7788990",
        officeHours: "09:30 AM - 11:30 AM",
        experience: "6 Years",
        status: "Active" as const,
    },
    {
        name: "Ms. Sadia Munir",
        designation: "Chemistry Department Head",
        department: "Chemistry Department",
        assignedClass: "Grade 9 - Section B",
        email: "sadia.munir@edupak.edu.pk",
        phone: "+92 302 3344556",
        officeHours: "08:30 AM - 10:30 AM",
        experience: "11 Years",
        status: "Active" as const,
    },
    {
        name: "Mr. Salman Siddiqui",
        designation: "Senior English Master",
        department: "Languages & Humanities",
        assignedClass: "O-Levels Year 2",
        email: "salman.siddiqui@edupak.edu.pk",
        phone: "+92 312 8899001",
        officeHours: "01:00 PM - 02:30 PM",
        experience: "9 Years",
        status: "Active" as const,
    },
    {
        name: "Dr. Farhan Qureshi",
        designation: "Associate Professor Biology",
        department: "Biology & Life Sciences",
        assignedClass: "Grade 12 Pre-Medical",
        email: "farhan.qureshi@edupak.edu.pk",
        phone: "+92 345 5566778",
        officeHours: "10:30 AM - 12:00 PM",
        experience: "12 Years",
        status: "Active" as const,
    },
];

export const getAllFaculty = async () => {
    try {
        const records = await db.select().from(faculty).orderBy(desc(faculty.createdAt));
        if (records.length === 0) {
            // Seed initial records so the dashboard has verified staff
            await db.insert(faculty).values(initialFacultySeed);
            return await db.select().from(faculty).orderBy(desc(faculty.createdAt));
        }
        return records;
    } catch (error) {
        console.error("Error in getAllFaculty:", error);
        return [];
    }
};