"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import questions from "../../../questions_reponses.json";
import LoadingSpinner from "../../components/LoadingSpinner";
import QuestionCard from "../../components/QuestionCard";
import { Question } from "../../types/Question";
import { getRevisionProgress, saveRevisionProgress } from "../../utils/storage";

// Typage du fichier JSON
const typedQuestions = questions as Question[];

function RevisionContent() {
  const searchParams = useSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const questionId = searchParams?.get("question");
    if (questionId) {
      const index = typedQuestions.findIndex(
        (q) => q.id === parseInt(questionId)
      );
      if (index !== -1) {
        setCurrentQuestionIndex(index);
        saveRevisionProgress(index);
        return;
      }
    }

    const savedProgress = getRevisionProgress();
    if (savedProgress !== null) {
      setCurrentQuestionIndex(savedProgress);
    }
  }, [searchParams]);

  const handleAnswer = (answer: string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [typedQuestions[currentQuestionIndex].id]: answer,
    }));
    if (isTrainingMode) {
      setHasCheckedAnswer(false);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < typedQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      saveRevisionProgress(nextIndex);
      setHasCheckedAnswer(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      saveRevisionProgress(prevIndex);
      setHasCheckedAnswer(false);
    }
  };

  const handleModeChange = (checked: boolean) => {
    setIsTrainingMode(checked);
    setHasCheckedAnswer(false);
  };

  const checkAnswer = () => {
    setHasCheckedAnswer(true);

    const currentQuestion = typedQuestions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestion.id] || [];
    const isCorrect =
      JSON.stringify(currentAnswer.sort()) ===
      JSON.stringify(currentQuestion.answer.sort());

    if (
      isCorrect &&
      isTrainingMode &&
      currentQuestionIndex < typedQuestions.length - 1
    ) {
      timerRef.current = setTimeout(() => {
        goToNextQuestion();
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const currentUserAnswer =
    userAnswers[typedQuestions[currentQuestionIndex].id] || [];
  const showResult = !isTrainingMode || (isTrainingMode && hasCheckedAnswer);

  return (
    <div className="container px-4 py-6 mx-auto max-w-3xl">
      <div className="flex flex-col gap-4 justify-between items-start mb-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-4 items-start sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Mode Révision
          </h1>
          <label className="inline-flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-gray-300">
              Mode entraînement
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isTrainingMode}
                onChange={(e) => handleModeChange(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
          </label>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
          Question {currentQuestionIndex + 1} / {typedQuestions.length}
        </div>
      </div>

      <QuestionCard
        question={typedQuestions[currentQuestionIndex]}
        userAnswer={currentUserAnswer}
        onAnswer={handleAnswer}
        showResult={showResult}
      />

      <div className="flex flex-col gap-4 justify-between mt-6 sm:flex-row">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="order-2 w-full btn-navigation sm:order-1 sm:w-auto"
        >
          Question précédente
        </button>

        <div className="flex flex-col order-1 gap-4 sm:flex-row sm:order-2">
          {isTrainingMode &&
            currentUserAnswer.length > 0 &&
            !hasCheckedAnswer && (
              <button
                onClick={checkAnswer}
                className="px-6 py-2 w-full font-semibold text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600 sm:w-auto"
              >
                Vérifier
              </button>
            )}
          <button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === typedQuestions.length - 1}
            className="w-full btn-navigation sm:w-auto"
          >
            Question suivante
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Revision() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RevisionContent />
    </Suspense>
  );
}
