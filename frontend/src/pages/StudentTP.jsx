import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function StudentDashboard() {
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Animation pour la Sidebar
    gsap.fromTo(
      sidebarRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    // Animation pour le Contenu Principal
    gsap.fromTo(
      mainContentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="w-64 bg-indigo-600 text-white shadow-lg transform"
      >
        <div className="p-6 text-center font-bold text-2xl">Étudiant</div>
        <nav>
          <ul className="space-y-4 p-4">
            <li>
              <Link
                to="/dashboard/student/profile"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition duration-300"
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/student/tps"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition duration-300"
              >
                Travaux Pratiques
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/student/payments"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition duration-300"
              >
                Paiements
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/student/groups"
                className="block py-2 px-4 rounded hover:bg-indigo-500 transition duration-300"
              >
                Groupes & Polynômes
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenue sur votre Dashboard
        </h1>
        <p className="text-gray-600">
          Accédez à vos Travaux Pratiques, vos groupes, et vos paiements depuis
          cette interface.
        </p>
        {/* Ajouter ici les routes spécifiques pour chaque section */}
      </main>
    </div>
  );
}

export default StudentDashboard;
