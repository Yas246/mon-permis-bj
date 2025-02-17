import { ExamResult } from "../types/ExamResult";

const REVISION_PROGRESS_KEY = "revision_progress";
const EXAM_HISTORY_KEY = "exam_history";

export function saveRevisionProgress(index: number): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(REVISION_PROGRESS_KEY, index.toString());
  }
}

export function getRevisionProgress(): number | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(REVISION_PROGRESS_KEY);
    return saved ? parseInt(saved) : null;
  }
  return null;
}

export function saveExamResult(result: ExamResult): void {
  if (typeof window !== "undefined") {
    const history = getExamHistory();
    history.unshift(result);
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
  }
}

export function getExamHistory(): ExamResult[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(EXAM_HISTORY_KEY);
    if (saved) {
      const history = JSON.parse(saved);
      // Convertir les dates string en objets Date
      return history.map((result: any) => ({
        ...result,
        date: new Date(result.date),
      }));
    }
  }
  return [];
}
