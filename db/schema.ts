import { pgTable, text, timestamp, pgEnum, primaryKey, integer, varchar, numeric } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);

export const users = pgTable('user', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text('password'),
    role: roleEnum('role').default('USER').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

export const feeStatusEnum = pgEnum('fee_status', ['Paid', 'Pending', 'Overdue']);

export const students = pgTable('student', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    rollId: varchar('roll_id', { length: 20 }).notNull().unique(),
    fullName: text('full_name').notNull(),
    grade: text('grade').notNull(),
    section: text('section').default(''),
    guardianName: text('guardian_name').notNull(),
    guardianContact: varchar('guardian_contact', { length: 20 }).default(''),
    feeStatus: feeStatusEnum('fee_status').default('Paid').notNull(),
    attendanceRate: integer('attendance_rate').default(100),
    gpa: numeric('gpa', { precision: 3, scale: 2 }).default('0.00'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const facultyStatusEnum = pgEnum('faculty_status', ['Active', 'On Leave']);

export const faculty = pgTable('faculty', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    designation: text('designation').notNull(),
    department: text('department').notNull(),
    assignedClass: text('assigned_class').default(''),
    email: text('email').notNull().unique(),
    phone: varchar('phone', { length: 30 }).default(''),
    officeHours: text('office_hours').default(''),
    experience: text('experience').default(''),
    status: facultyStatusEnum('status').default('Active').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const feeVouchers = pgTable('fee_voucher', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    challanNo: varchar('challan_no', { length: 40 }).notNull().unique(),
    studentName: text('student_name').notNull(),
    rollNo: varchar('roll_no', { length: 30 }).notNull(),
    grade: text('grade').notNull(),
    amount: integer('amount').notNull(),
    dueDate: text('due_date').notNull(),
    channel: text('channel').default('Pending Challan'),
    status: feeStatusEnum('status').default('Pending').notNull(),
    paidAt: timestamp('paid_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});