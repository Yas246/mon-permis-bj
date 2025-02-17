export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        404 - Page non trouvée
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        La page que vous recherchez n&apos;existe pas.
      </p>
    </div>
  );
}
