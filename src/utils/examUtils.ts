import { Question } from "../types/Question";

export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function calculateScore(
  userAnswers: Record<number, string[]>,
  questions: Question[]
): number {
  let score = 0;
  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id] || [];
    if (arraysEqual(userAnswer.sort(), question.answer.sort())) {
      score++;
    }
  });
  return score;
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}
