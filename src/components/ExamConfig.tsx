import { useState } from "react";
import questions from "../../questions_reponses.json";

interface ExamConfigProps {
  onStart: (numberOfQuestions: number) => void;
}

export default function ExamConfig({ onStart }: ExamConfigProps) {
  const [numberOfQuestions, setNumberOfQuestions] = useState(20);
  const maxQuestions = questions.length;

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Configuration de l&apos;examen
      </h2>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-200 mb-2">
          Nombre de questions :
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="5"
            max={maxQuestions}
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-gray-700 dark:text-gray-200 w-12 text-center">
            {numberOfQuestions}
          </span>
        </div>
      </div>

      <div className="text-gray-600 dark:text-gray-400 mb-6">
        <p>Vous aurez :</p>
        <ul className="list-disc list-inside mt-2">
          <li>15 secondes par question</li>
          <li>1 point par bonne réponse</li>
          <li>Score final sur {numberOfQuestions} points</li>
        </ul>
      </div>

      <button
        onClick={() => onStart(numberOfQuestions)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Commencer l&apos;examen
      </button>
    </div>
  );
}
