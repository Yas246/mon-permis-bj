"use client";

import { useEffect, useState } from "react";
import { ExamResult } from "../../types/ExamResult";
import { getExamHistory } from "../../utils/storage";

export default function History() {
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);
  const [expandedExam, setExpandedExam] = useState<number | null>(null);

  useEffect(() => {
    setExamHistory(getExamHistory());
  }, []);

  if (examHistory.length === 0) {
    return (
      <div className="container px-4 py-6 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
          Historique
        </h1>
        <div className="p-6 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            Aucun examen n&apos;a encore été effectué.
          </p>
        </div>
      </div>
    );
  }

  const toggleExam = (index: number) => {
    setExpandedExam(expandedExam === index ? null : index);
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Historique
      </h1>

      <div className="space-y-4">
        {examHistory.map((result, index) => {
          const isExpanded = expandedExam === index;
          const percentage = Math.round(
            (result.score / result.totalQuestions) * 100
          );
          const scoreColor =
            percentage >= 70 ? "text-green-500" : "text-red-500";

          return (
            <div
              key={index}
              className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
              <button
                onClick={() => toggleExam(index)}
                className="p-6 w-full text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col gap-4 justify-between items-start sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-white">
                      Examen du {result.date.toLocaleDateString()} à{" "}
                      {result.date.toLocaleTimeString()}
                    </h2>
                    <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                      {result.totalQuestions} questions
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold sm:text-3xl ${scoreColor}`}
                      >
                        {result.score} / {result.totalQuestions}
                      </p>
                      <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        {percentage}%
                      </p>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform ${
                        isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "opacity-100 max-h-[5000px]"
                    : "overflow-hidden max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-4">
                    {result.questions.map((q, qIndex) => (
                      <div
                        key={qIndex}
                        className={`p-4 rounded-lg ${
                          q.isCorrect
                            ? "bg-green-50 dark:bg-green-900/50"
                            : "bg-red-50 dark:bg-red-900/50"
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          <span
                            className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold shrink-0 ${
                              q.isCorrect
                                ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                                : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100"
                            }`}
                          >
                            {qIndex + 1}
                          </span>
                          <div className="flex-1">
                            <p className="mb-2 font-medium text-gray-800 dark:text-white">
                              {q.question}
                            </p>
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-600 dark:text-gray-300">
                                Votre réponse :{" "}
                                <span
                                  className={
                                    q.isCorrect
                                      ? "text-green-600 dark:text-green-400 font-medium"
                                      : "text-red-600 dark:text-red-400 font-medium"
                                  }
                                >
                                  {q.userAnswer
                                    .map((a) => a.toUpperCase())
                                    .join(", ") || "-"}
                                </span>
                              </p>
                              {!q.isCorrect && (
                                <p className="text-gray-600 dark:text-gray-300">
                                  Bonne réponse :{" "}
                                  <span className="font-medium text-green-600 dark:text-green-400">
                                    {q.correctAnswer
                                      .map((a) => a.toUpperCase())
                                      .join(", ")}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
