import { Router } from "express";
import * as QuestionController from "../question/question.controller";

const router = Router();

// Create Question
router.post("/", QuestionController.createQuestion);

// Get all Questions
router.get("/", QuestionController.getQuestions);

// Get Question by ID
router.get("/:id", QuestionController.getQuestionById);

// Update Question
router.put("/:id", QuestionController.updateQuestion);

// Delete Question
router.delete("/:id", QuestionController.deleteQuestion);

export default router;
