
import { db } from "../../config/db.config";
import { eq } from "drizzle-orm";
import { questions } from "../../schema";

export const createQuestion = async (data: any) => {
    const [inserted] = await db.insert(questions).values(data).returning();
    return inserted;
};

export const getQuestions = async () => {
    return await db.select().from(questions);
};

export const getQuestionById = async (id: string) => {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
};

export const updateQuestion = async (id: string, data: any) => {
    const [updated] = await db
        .update(questions)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(questions.id, id))
        .returning();
    return updated;
};

export const deleteQuestion = async (id: string) => {
    const [deleted] = await db.delete(questions).where(eq(questions.id, id)).returning();
    return deleted;
};
