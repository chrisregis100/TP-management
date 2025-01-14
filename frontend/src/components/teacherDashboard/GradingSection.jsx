import { useState } from "react";
import { motion } from "framer-motion";

const GradingSection = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      practicalWork: "Analyse Numérique",
      grade: null,
    },
    {
      id: 2,
      name: "Jean Dupont",
      practicalWork: "Programmation Avancée",
      grade: null,
    },
    {
      id: 3,
      name: "Sophie Martin",
      practicalWork: "Systèmes Embarqués",
      grade: null,
    },
  ]);

  const handleGradeChange = (id, grade) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, grade: parseFloat(grade) } : student
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Notation des Étudiants</h2>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Travaux Pratiques</th>
              <th className="p-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.practicalWork}</td>
                <td className="p-2">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={student.grade || ""}
                    onChange={(e) =>
                      handleGradeChange(student.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-20"
                    placeholder="Note"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Enregistrer les Notes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GradingSection;
