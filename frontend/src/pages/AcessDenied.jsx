import { Link } from "react-router-dom";

function AcessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Accès Refusé</h1>
      <p className="mt-2">
        Vous n&apos;avez pas les permissions nécessaires pour accéder à cette
        page.
      </p>
      <Link to="/" className="mt-4 text-blue-600 hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default AcessDenied;
