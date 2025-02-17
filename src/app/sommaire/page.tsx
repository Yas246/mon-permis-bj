"use client";

import Link from "next/link";
import questions from "../../../questions_reponses.json";

export default function Sommaire() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800 dark:text-white">
        Sommaire des Questions
      </h1>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((q) => (
          <Link
            key={q.id}
            href={`/revision?question=${q.id}`}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm font-semibold shrink-0">
                {q.id}
              </span>
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {q.question}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
