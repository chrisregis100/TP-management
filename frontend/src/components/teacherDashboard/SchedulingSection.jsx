import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SchedulingSection = () => {
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      day: "Lundi",
      time: "10:00 - 12:00",
      group: "TP1",
      practicalWork: "Analyse Numérique",
    },
    {
      id: 2,
      day: "Mercredi",
      time: "14:00 - 16:00",
      group: "TP2",
      practicalWork: "Programmation Avancée",
    },
  ]);

  const handleAddSchedule = () => {
    // Logic to add new schedule
    const newSchedule = {
      id: schedule.length + 1,
      day: "Nouveau Jour",
      time: "Nouvelle Heure",
      group: "Nouveau Groupe",
      practicalWork: "Nouveau TP",
    };
    setSchedule([...schedule, newSchedule]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Planification des TP</h2>
          <button
            onClick={handleAddSchedule}
            className="bg-green-600 text-white px-3 py-1 rounded flex items-center"
          >
            <PlusCircle className="w-4 h-4 mr-1" /> Ajouter Créneau
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Jour</th>
              <th className="p-2 text-left">Heure</th>
              <th className="p-2 text-left">Groupe</th>
              <th className="p-2 text-left">Travaux Pratiques</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.day}</td>
                <td className="p-2">{item.time}</td>
                <td className="p-2">{item.group}</td>
                <td className="p-2">{item.practicalWork}</td>
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
export default SchedulingSection;
