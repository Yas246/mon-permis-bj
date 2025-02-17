const Offline = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Pas de connexion Internet</h1>
      <p>
        Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion.
      </p>
    </div>
  );
};

export default Offline;
