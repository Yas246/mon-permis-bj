export interface ExamQuestionResult {
  question: string;
  userAnswer: string[];
  correctAnswer: string[];
  isCorrect: boolean;
}

export interface ExamResult {
  date: Date;
  score: number;
  totalQuestions: number;
  questions: ExamQuestionResult[];
}
