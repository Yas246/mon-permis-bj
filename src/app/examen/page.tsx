"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import questions from "../../../questions_reponses.json";
import ExamConfig from "../../components/ExamConfig";
import ExamSummary from "../../components/ExamSummary";
import QuestionCard from "../../components/QuestionCard";
import { ExamQuestionResult, ExamResult } from "../../types/ExamResult";
import { Question } from "../../types/Question";
import { saveExamResult } from "../../utils/storage";

export default function Exam() {
  const router = useRouter();
  const [isStarted, setIsStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            goToNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft, isFinished]);

  const startExam = (numberOfQuestions: number) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setExamQuestions(shuffled.slice(0, numberOfQuestions) as Question[]);
    setIsStarted(true);
    setTimeLeft(30);
  };

  const handleAnswer = (answer: string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [examQuestions[currentQuestionIndex].id]: answer,
    }));
  };

  const calculateScore = () => {
    let newScore = 0;
    Object.entries(userAnswers).forEach(([questionId, answers]) => {
      const question = examQuestions.find((q) => q.id === Number(questionId));
      if (
        question &&
        JSON.stringify(answers.sort()) ===
          JSON.stringify(question.answer.sort())
      ) {
        newScore++;
      }
    });
    return newScore;
  };

  const finishExam = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsFinished(true);

    // Créer le résultat détaillé
    const examResult: ExamResult = {
      date: new Date(),
      score: finalScore,
      totalQuestions: examQuestions.length,
      questions: examQuestions.map((question): ExamQuestionResult => {
        const userAnswer = userAnswers[question.id] || [];
        return {
          question: question.question,
          userAnswer,
          correctAnswer: question.answer,
          isCorrect:
            JSON.stringify(userAnswer.sort()) ===
            JSON.stringify(question.answer.sort()),
        };
      }),
    };

    // Sauvegarder le résultat
    saveExamResult(examResult);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(15);
    } else {
      finishExam();
    }
  };

  const restartExam = () => {
    setIsStarted(false);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(30);
    setScore(0);
  };

  if (!isStarted) {
    return <ExamConfig onStart={startExam} />;
  }

  if (isFinished) {
    return (
      <ExamSummary
        questions={examQuestions}
        userAnswers={userAnswers}
        score={score}
        onRetry={restartExam}
        onHome={() => router.push("/")}
      />
    );
  }

  return (
    <div className="px-4 mx-auto max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Mode Examen
        </h1>
        <div className="text-gray-600 dark:text-gray-300">
          Question {currentQuestionIndex + 1} / {examQuestions.length}
        </div>
      </div>

      <QuestionCard
        question={examQuestions[currentQuestionIndex]}
        userAnswer={userAnswers[examQuestions[currentQuestionIndex].id]}
        onAnswer={handleAnswer}
        showResult={false}
        isExamMode={true}
        timeLeft={timeLeft}
      />

      <div className="flex justify-end mt-6">
        <button onClick={goToNextQuestion} className="btn-navigation">
          {currentQuestionIndex === examQuestions.length - 1
            ? "Terminer"
            : "Question suivante"}
        </button>
      </div>
    </div>
  );
}
