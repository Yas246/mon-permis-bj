import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Question } from "../types/Question";

interface QuestionCardProps {
  question: Question;
  userAnswer?: string[];
  onAnswer: (answer: string[]) => void;
  showResult?: boolean;
  isExamMode?: boolean;
  timeLeft?: number;
  onNextQuestion?: () => void;
  isTrainingMode?: boolean;
}

export default function QuestionCard({
  question,
  userAnswer = [],
  onAnswer,
  showResult = false,
  isExamMode = false,
  timeLeft,
  onNextQuestion,
  isTrainingMode = false,
}: QuestionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [previousShowResult, setPreviousShowResult] = useState(showResult);
  const [previousQuestionId, setPreviousQuestionId] = useState(question.id);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        clearProps: "all",
      });
    }
  }, [question.id]);

  useEffect(() => {
    if (
      showResult &&
      !previousShowResult &&
      question.id === previousQuestionId &&
      cardRef.current
    ) {
      const isCorrect =
        JSON.stringify(userAnswer.sort()) ===
        JSON.stringify(question.answer.sort());

      gsap.to(cardRef.current, {
        backgroundColor: isCorrect
          ? "rgba(34, 197, 94, 0.1)"
          : "rgba(239, 68, 68, 0.1)",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.set(cardRef.current, { clearProps: "backgroundColor" });
        },
      });

      if (isCorrect && isTrainingMode && onNextQuestion) {
        timerRef.current = setTimeout(() => {
          onNextQuestion();
        }, 2000);
      }
    }
    setPreviousShowResult(showResult);
    setPreviousQuestionId(question.id);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    showResult,
    userAnswer,
    question.id,
    question.answer,
    previousShowResult,
    previousQuestionId,
    isTrainingMode,
    onNextQuestion,
  ]);

  const handleChoiceClick = (index: string) => {
    const newAnswer = userAnswer.includes(index)
      ? userAnswer.filter((a) => a !== index)
      : [...userAnswer, index];
    onAnswer(newAnswer);
  };

  return (
    <div
      ref={cardRef}
      className="p-4 sm:p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
    >
      {isExamMode && timeLeft !== undefined && (
        <div className="mb-4 text-right">
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {timeLeft}s
          </span>
        </div>
      )}

      <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
        {question.question}
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {question.choices.map((choice, index) => {
          const letterIndex = String.fromCharCode(97 + index);
          const isSelected = userAnswer.includes(letterIndex);
          const isCorrect = showResult && question.answer.includes(letterIndex);
          const isWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleChoiceClick(letterIndex)}
              className={`
                w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-200
                ${
                  isSelected
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                }
                ${isCorrect ? "border-2 border-green-500" : ""}
                ${isWrong ? "border-2 border-red-500" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-600 shrink-0">
                  {letterIndex.toUpperCase()}
                </span>
                <span className="text-sm sm:text-base">{choice.content}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
