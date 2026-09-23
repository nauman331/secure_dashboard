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


export const getAllFaculty = async () => {
    try {
        const records = await db.select().from(faculty).orderBy(desc(faculty.createdAt));
        return records;
    } catch (error) {
        console.error("Error in getAllFaculty:", error);
        return [];
    }
};