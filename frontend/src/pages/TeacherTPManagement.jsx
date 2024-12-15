import { useEffect, useRef } from "react";
import gsap from "gsap";
import Sidebar from "../components/teacherDashboard/Sidebar";
import { Outlet } from "react-router-dom";

function TeacherDashboard() {
  const mainContentRef = useRef(null);

  useEffect(() => {
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
      <Sidebar />
      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenue sur votre Dashboard
        </h1>
        <p className="text-gray-600">
          Gérez vos Travaux Pratiques, affectez des groupes, notez les étudiants
          et consultez les analyses depuis cette interface.
        </p>
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
