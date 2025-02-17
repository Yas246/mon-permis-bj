import { Question } from "../types/Question";

interface ExamSummaryProps {
  questions: Question[];
  userAnswers: Record<number, string[]>;
  score: number;
  onRetry: () => void;
  onHome: () => void;
}

export default function ExamSummary({
  questions,
  userAnswers,
  score,
  onRetry,
  onHome,
}: ExamSummaryProps) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* En-tête avec le score */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Examen terminé !
        </h2>
        <p className="text-4xl font-bold text-blue-500 mb-2">
          {score} / {questions.length}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {score >= questions.length * 0.7
            ? "Félicitations ! 🎉"
            : "Continuez vos efforts ! 💪"}
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onHome}
            className="flex-1 px-4 py-2 font-semibold text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
          >
            Accueil
          </button>
          <button
            onClick={onRetry}
            className="flex-1 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
          >
            Nouvel examen
          </button>
        </div>
      </div>

      {/* Liste des questions avec les réponses */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.id] || [];
          const isCorrect =
            JSON.stringify(userAnswer.sort()) ===
            JSON.stringify(question.answer.sort());

          return (
            <div
              key={question.id}
              className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 ${
                isCorrect ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span
                  className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-white text-sm font-semibold ${
                    isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {question.question}
                </h3>
              </div>

              <div className="ml-9 space-y-3">
                {question.choices.map((choice, choiceIndex) => {
                  const letterIndex = String.fromCharCode(97 + choiceIndex);
                  const isUserSelected = userAnswer.includes(letterIndex);
                  const isCorrectAnswer = question.answer.includes(letterIndex);

                  return (
                    <div
                      key={choiceIndex}
                      className={`p-3 rounded-lg ${
                        isUserSelected
                          ? isCorrectAnswer
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-red-100 dark:bg-red-900"
                          : isCorrectAnswer
                          ? "bg-green-50 dark:bg-green-900/50"
                          : "bg-gray-50 dark:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-sm font-semibold">
                          {letterIndex.toUpperCase()}
                        </span>
                        <span
                          className={`${
                            isCorrectAnswer ? "font-semibold" : ""
                          } text-gray-800 dark:text-white`}
                        >
                          {choice.content}
                        </span>
                        {isUserSelected && (
                          <span className="ml-auto">
                            {isCorrectAnswer ? "✅" : "❌"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
