import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FAST/UAC</h3>
            <p>Plateforme de gestion des travaux pratiques universitaires.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <nav className="space-y-2">
              <Link to="/login" className="block hover:text-indigo-400">
                Connexion
              </Link>
              <Link to="/register" className="block hover:text-indigo-400">
                Inscription
              </Link>
              <Link to="/help" className="block hover:text-indigo-400">
                Aide
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p>Email: support@tpmanager.com</p>
            <p>Téléphone: 01 52 43 50 63</p>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-lg">
          <p className="text-center "> © 2025 FAST/UAC </p>
          <p className="text-center "> All rights reserved </p>
          <p className="text-center "> Designed by Régis KIKI </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
