import {
    pgTable,
    serial,
    varchar,
    timestamp,
    boolean,
    pgEnum,
} from 'drizzle-orm/pg-core'

// --------------------- ENUMS ---------------------
export const userRoleEnum = pgEnum('user_role', ['Student', 'Examiner'])

// --------------------- USERS ---------------------
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    role: userRoleEnum('role').default('Student'),
    isAdmin: boolean().default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})

