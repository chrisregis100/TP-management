import { useEffect, useRef } from "react";
import gsap from "gsap";

function TeacherAnalytics() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Animation pour la section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const studentData = [
    { name: "Jean Dupont", grade: 85 },
    { name: "Marie Curie", grade: 92 },
    { name: "Albert Einstein", grade: 78 },
    { name: "Isaac Newton", grade: 88 },
  ];

  const groupStats = {
    totalGroups: 3,
    totalPolynomes: 6,
  };
  /* 
  const gradeDistribution = {
    labels: ["85-100%", "70-84%", "50-69%", "0-49%"],
    datasets: [
      {
        label: "Répartition des Notes",
        data: [2, 1, 1, 0],
        backgroundColor: ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"],
      },
    ],
  }; */

  return (
    <div ref={sectionRef} className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Tableau de Bord Enseignant
      </h1>

      {/* Section Étudiants Inscrits */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Étudiants Inscrits
        </h2>
        <ul>
          {studentData.map((student, index) => (
            <li key={index} className="text-gray-600">
              {student.name} - Note : {student.grade}%
            </li>
          ))}
        </ul>
      </div>

      {/* Section Groupes et Polynômes */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Groupes et Polynômes
        </h2>
        <p className="text-gray-600">
          Nombre total de groupes : {groupStats.totalGroups}
        </p>
        <p className="text-gray-600">
          Nombre total de polynômes : {groupStats.totalPolynomes}
        </p>
      </div>

      {/* Section Répartition des Notes */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Répartition des Notes
        </h2>
      </div>

      {/* Section Notifications */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Notifications</h2>
        <p className="text-gray-600">Aucune notification pour le moment.</p>
      </div>

      {/* Section Partage de Documents */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Partage de Documents
        </h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          Télécharger un Document
        </button>
      </div>
    </div>
  );
}

export default TeacherAnalytics;
