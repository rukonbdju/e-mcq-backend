DROP INDEX "exam_questions_exam_idx";--> statement-breakpoint
DROP INDEX "exam_questions_question_idx";--> statement-breakpoint
DROP INDEX "exams_teacher_idx";--> statement-breakpoint
DROP INDEX "exams_schedule_idx";--> statement-breakpoint
DROP INDEX "questions_teacher_idx";--> statement-breakpoint
DROP INDEX "questions_subject_idx";--> statement-breakpoint
DROP INDEX "questions_topic_idx";--> statement-breakpoint
DROP INDEX "questions_level_idx";--> statement-breakpoint
DROP INDEX "student_answers_student_exam_idx";--> statement-breakpoint
DROP INDEX "student_answers_question_idx";--> statement-breakpoint
DROP INDEX "student_exams_student_idx";--> statement-breakpoint
DROP INDEX "student_exams_exam_idx";--> statement-breakpoint
DROP INDEX "topics_subject_idx";--> statement-breakpoint
DROP INDEX "users_role_idx";--> statement-breakpoint
ALTER TABLE "exam_questions" DROP CONSTRAINT "exam_questions_exam_id_question_id_pk";--> statement-breakpoint
ALTER TABLE "exam_questions" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;