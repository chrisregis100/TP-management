// Gestion des Groupes et Polynômes
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function GroupesEtPolynomes() {
  const sectionRef = useRef(null);
  const [students, setStudents] = useState([
    { id: 1, name: "Jean Dupont" },
    { id: 2, name: "Marie Curie" },
    { id: 3, name: "Albert Einstein" },
    { id: 4, name: "Isaac Newton" },
  ]); // Liste des étudiants (à remplacer par des données réelles)

  const [groups, setGroups] = useState([]);
  const [numGroups, setNumGroups] = useState(2); // Nombre de groupes
  const [numPolynomes, setNumPolynomes] = useState(1); // Nombre de polynômes par groupe

  useEffect(() => {
    // Animation pour la section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const handleNumGroupsChange = (e) => {
    setNumGroups(Number(e.target.value));
  };

  const handleNumPolynomesChange = (e) => {
    setNumPolynomes(Number(e.target.value));
  };

  const generateGroups = () => {
    const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
    const totalStudents = shuffledStudents.length;

    // Vérification si le nombre de groupes et polynômes est valide
    if (numGroups * numPolynomes > totalStudents) {
      alert("Le nombre total de polynômes dépasse le nombre d'étudiants.");
      return;
    }

    const newGroups = [];
    let index = 0;

    for (let i = 0; i < numGroups; i++) {
      const group = [];

      for (let j = 0; j < numPolynomes; j++) {
        if (index < totalStudents) {
          group.push(shuffledStudents[index]);
          index++;
        }
      }

      newGroups.push(group);
    }

    setGroups(newGroups);
  };

  const clearGroups = () => {
    setGroups([]);
  };

  return (
    <div ref={sectionRef} className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">
        Gestion des Groupes et Polynômes
      </h1>
      <p className="text-gray-600 mb-6">
        Créez et gérez facilement les groupes et polynômes pour vos Travaux
        Pratiques.
      </p>

      {/* Configuration des groupes */}
      <div className="mb-6">
        <label
          htmlFor="numGroups"
          className="block text-gray-700 font-medium mb-2"
        >
          Nombre de groupes
        </label>
        <input
          type="number"
          id="numGroups"
          value={numGroups}
          onChange={handleNumGroupsChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          min="1"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="numPolynomes"
          className="block text-gray-700 font-medium mb-2"
        >
          Nombre de polynômes par groupe
        </label>
        <input
          type="number"
          id="numPolynomes"
          value={numPolynomes}
          onChange={handleNumPolynomesChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          min="1"
        />
      </div>

      <button
        onClick={generateGroups}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition mr-2"
      >
        Générer les Groupes
      </button>
      <button
        onClick={clearGroups}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Réinitialiser
      </button>

      {/* Liste des groupes */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Groupes générés
        </h2>
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-100 rounded shadow-sm border"
            >
              <h3 className="font-bold text-purple-600">Groupe {index + 1}</h3>
              <ul className="mt-2">
                {group.map((student) => (
                  <li key={student.id} className="text-gray-700">
                    {student.name}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucun groupe généré pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default GroupesEtPolynomes;
