import { Request, Response } from "express";
import * as QuestionService from "../question/question.service";

export const createQuestion = async (req: Request, res: Response) => {
    try {
        const question = await QuestionService.createQuestion(req.body);
        res.status(201).json(question);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuestions = async (_req: Request, res: Response) => {
    try {
        const questions = await QuestionService.getQuestions();
        res.json(questions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuestionById = async (req: Request, res: Response) => {
    try {
        const question = await QuestionService.getQuestionById(req.params.id);
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateQuestion = async (req: Request, res: Response) => {
    try {
        const updated = await QuestionService.updateQuestion(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Question not found" });
        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const deleted = await QuestionService.deleteQuestion(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Question not found" });
        res.json({ message: "Question deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
