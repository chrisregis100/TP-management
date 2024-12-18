import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Schedule Section
const ScheduleSection = () => {
  const [groupAssignments, setGroupAssignments] = useState([]);

  useEffect(() => {
    setGroupAssignments(mockDataService.getGroupAssignments());
  }, []);

  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Emploi du Temps</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">{day}</h3>
              {groupAssignments
                .filter((assignment) => assignment.schedule.includes(day))
                .map((assignment, index) => (
                  <div key={index} className="bg-blue-50 p-2 rounded mb-2">
                    <p className="font-medium">{assignment.practicalWork}</p>
                    <p className="text-sm text-gray-600">
                      {assignment.schedule}
                    </p>
                    <p className="text-sm text-gray-600">{assignment.room}</p>
                  </div>
                ))}
              {groupAssignments.filter((assignment) =>
                assignment.schedule.includes(day)
              ).length === 0 && (
                <p className="text-gray-500 text-sm">Aucun TP ce jour</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleSection;
