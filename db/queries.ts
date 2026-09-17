import { eq, desc } from "drizzle-orm";
import { db } from "./index";
import { users, students } from "./schema";

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