import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-black/80 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 h-20 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">
          FAST/UAC <span className="h-10">.</span>{" "}
        </div>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 transition border border-white px-4 py-2 rounded"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
