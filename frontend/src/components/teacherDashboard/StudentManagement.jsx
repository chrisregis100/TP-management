import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

const StudentManagementSection = () => {
  const [students, setStudents] = useState([]);
  const [newGroup, setNewGroup] = useState("");

  const handleCreateGroup = () => {
    if (newGroup.trim()) {
      // Logic to create a new group
      alert(`Groupe ${newGroup} créé`);
      setNewGroup("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestion des Étudiants</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Nom du nouveau groupe"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleCreateGroup}
              className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Créer Groupe
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Groupe</th>
              <th className="p-2 text-left">Travaux Pratiques</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.group}</td>
                <td className="p-2">{student.practicalWork}</td>
                <td className="p-2 text-right">
                  <button className="text-blue-600 mr-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default StudentManagementSection;
