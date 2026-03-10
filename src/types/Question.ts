export interface Choice {
  type: 'text' | 'image';
  content: string;
  image?: string | null;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  answer: string[];
  contextImages?: string[];
  page?: number;
}
