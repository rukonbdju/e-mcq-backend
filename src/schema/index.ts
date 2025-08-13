import { pgTable, uuid, text, varchar, timestamp, integer, boolean, jsonb, } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ===== Users Table =====
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull(), // admin | teacher | student
    status: varchar("status").default("Regular"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    questions: many(questions),
    exams: many(exams),
    studentExams: many(studentExams),
}));

// ===== Subjects Table =====
export const subjects = pgTable("subjects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subjectsRelations = relations(subjects, ({ many }) => ({
    topics: many(topics),
    questions: many(questions),
}));

// ===== Topics Table =====
export const topics = pgTable("topics", {
    id: uuid("id").primaryKey().defaultRandom(),
    subjectId: uuid("subject_id")
        .references(() => subjects.id)
        .notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const topicsRelations = relations(topics, ({ one, many }) => ({
    subject: one(subjects, {
        fields: [topics.subjectId],
        references: [subjects.id],
    }),
    questions: many(questions),
}));

// ===== Questions Table =====
export const questions = pgTable("questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    teacherId: uuid("teacher_id")
        .references(() => users.id)
        .notNull(),
    level: varchar("level", { length: 50 }).notNull(), // SSC, HSC, Job
    subjectId: uuid("subject_id").references(() => subjects.id).notNull(),
    topicId: uuid("topic_id").references(() => topics.id),
    questionText: text("question_text").notNull(),
    options: jsonb("options").notNull(), // [{id: 'A', text: 'Option 1'}, ...]
    correctAnswer: varchar("correct_answer", { length: 5 }).notNull(), // e.g. "A"
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
    teacher: one(users, {
        fields: [questions.teacherId],
        references: [users.id],
    }),
    subject: one(subjects, {
        fields: [questions.subjectId],
        references: [subjects.id],
    }),
    topic: one(topics, {
        fields: [questions.topicId],
        references: [topics.id],
    }),
    examQuestions: many(examQuestions),
    studentAnswers: many(studentAnswers),
}));

// ===== Exams Table =====
export const exams = pgTable("exams", {
    id: uuid("id").primaryKey().defaultRandom(),
    teacherId: uuid("teacher_id")
        .references(() => users.id)
        .notNull(),
    title: text("title").notNull(),
    scheduledTime: timestamp("scheduled_time").notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    passingScore: integer("passing_score").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const examsRelations = relations(exams, ({ one, many }) => ({
    teacher: one(users, {
        fields: [exams.teacherId],
        references: [users.id],
    }),
    examQuestions: many(examQuestions),
    studentExams: many(studentExams),
}));

// ===== Exam Questions (Join Table) =====
export const examQuestions = pgTable("exam_questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    examId: uuid("exam_id")
        .references(() => exams.id)
        .notNull(),
    questionId: uuid("question_id")
        .references(() => questions.id)
        .notNull(),
});

export const examQuestionsRelations = relations(examQuestions, ({ one }) => ({
    exam: one(exams, {
        fields: [examQuestions.examId],
        references: [exams.id],
    }),
    question: one(questions, {
        fields: [examQuestions.questionId],
        references: [questions.id],
    }),
}));

// ===== Student Exams Table =====
export const studentExams = pgTable("student_exams", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id")
        .references(() => users.id)
        .notNull(),
    examId: uuid("exam_id")
        .references(() => exams.id)
        .notNull(),
    score: integer("score").default(0),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studentExamsRelations = relations(studentExams, ({ one, many }) => ({
    student: one(users, {
        fields: [studentExams.studentId],
        references: [users.id],
    }),
    exam: one(exams, {
        fields: [studentExams.examId],
        references: [exams.id],
    }),
    studentAnswers: many(studentAnswers),
}));

// ===== Student Answers Table =====
export const studentAnswers = pgTable("student_answers", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentExamId: uuid("student_exam_id")
        .references(() => studentExams.id)
        .notNull(),
    questionId: uuid("question_id")
        .references(() => questions.id)
        .notNull(),
    chosenOption: varchar("chosen_option", { length: 5 }).notNull(),
    isCorrect: boolean("is_correct").notNull(),
});

export const studentAnswersRelations = relations(studentAnswers, ({ one }) => ({
    studentExam: one(studentExams, {
        fields: [studentAnswers.studentExamId],
        references: [studentExams.id],
    }),
    question: one(questions, {
        fields: [studentAnswers.questionId],
        references: [questions.id],
    }),
}));
