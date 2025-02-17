export interface Choice {
  type: string;
  content: string;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  answer: string[];
}
