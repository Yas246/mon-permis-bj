"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([titleRef.current, cardsRef.current?.children || []], {
      opacity: 0,
      y: 10,
    });

    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      clearProps: "all",
    });

    gsap.to(cardsRef.current?.children || [], {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.1,
      clearProps: "all",
    });
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <h1
        ref={titleRef}
        className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl lg:text-5xl dark:text-white"
      >
        Bienvenue sur Mon_permis.BJ
      </h1>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2"
      >
        <Link
          href="/revision"
          className="p-6 bg-blue-100 rounded-xl shadow-lg transition-all duration-300 feature-card dark:bg-blue-900 hover:scale-105"
        >
          <h2 className="mb-3 text-lg font-semibold md:text-xl">
            Mode Révision
          </h2>
          <p className="text-sm md:text-base">
            Apprenez à votre rythme le code de la route
          </p>
        </Link>

        <Link
          href="/examen"
          className="p-6 bg-emerald-100 rounded-xl shadow-lg transition-all duration-300 feature-card dark:bg-green-900 hover:scale-105"
        >
          <h2 className="mb-3 text-lg font-semibold md:text-xl">Mode Examen</h2>
          <p className="text-sm md:text-base">
            Testez vos connaissances dans des conditions réelles
          </p>
        </Link>

        <Link
          href="/historique"
          className="p-6 bg-purple-100 rounded-xl shadow-lg transition-all duration-300 feature-card dark:bg-purple-900 hover:scale-105"
        >
          <h2 className="mb-3 text-lg font-semibold md:text-xl">Historique</h2>
          <p className="text-sm md:text-base">
            Suivez votre progression au fil du temps
          </p>
        </Link>

        <Link
          href="/sommaire"
          className="p-6 bg-orange-100 rounded-xl shadow-lg transition-all duration-300 feature-card dark:bg-orange-900 hover:scale-105"
        >
          <h2 className="mb-3 text-lg font-semibold md:text-xl">Sommaire</h2>
          <p className="text-sm md:text-base">
            Accédez à toutes les questions du code de la route
          </p>
        </Link>
      </div>
    </div>
  );
}
