"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Une erreur est survenue
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {error.message || "Quelque chose s'est mal passé."}
      </p>
      <button
        onClick={reset}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
