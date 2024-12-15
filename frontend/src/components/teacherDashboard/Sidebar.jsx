import gsap from "gsap";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Animation pour la Sidebar
    gsap.fromTo(
      sidebarRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
  }, []);
  return (
    <aside
      ref={sidebarRef}
      className="w-64 bg-purple-600 text-white shadow-lg transform"
    >
      <div className="p-6 text-center font-bold text-2xl">Enseignant</div>
      <nav>
        <ul className="space-y-4 p-4">
          <li>
            <Link
              to="/dashboard/teacher/tps"
              className="block py-2 px-4 rounded hover:bg-purple-500 transition duration-300"
            >
              Gestion des TP
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/teacher/groups"
              className="block py-2 px-4 rounded hover:bg-purple-500 transition duration-300"
            >
              Groupes & Polynômes
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/teacher/grading"
              className="block py-2 px-4 rounded hover:bg-purple-500 transition duration-300"
            >
              Notation
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/teacher/analytics"
              className="block py-2 px-4 rounded hover:bg-purple-500 transition duration-300"
            >
              Tableaux de bord
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
