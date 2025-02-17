"use client";

import Link from "next/link";
import questions from "../../../questions_reponses.json";

export default function Sommaire() {
  return (
    <div className="container px-4 py-6 mx-auto sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 sm:text-3xl sm:mb-8 dark:text-white">
        Sommaire des Questions
      </h1>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((q) => (
          <Link
            key={q.id}
            href={`/revision?question=${q.id}`}
            prefetch={false}
            className="p-4 bg-white rounded-lg shadow-md transition-all duration-200 dark:bg-gray-800 hover:shadow-lg group"
          >
            <div className="flex gap-3 items-start">
              <span className="inline-flex justify-center items-center w-6 h-6 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-100 shrink-0">
                {q.id}
              </span>
              <p className="text-sm text-gray-800 transition-colors dark:text-gray-200 sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {q.question}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
