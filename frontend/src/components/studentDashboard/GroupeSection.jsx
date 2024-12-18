import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GroupsSection = () => {
  const [groupAssignments, setGroupAssignments] = useState([]);

  useEffect(() => {
    setGroupAssignments(mockDataService.getGroupAssignments());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mes Groupes de TP</h2>

        <div className="space-y-4">
          {groupAssignments.map((assignment, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{assignment.practicalWork}</h3>
                <p className="text-gray-600">Groupe: {assignment.group}</p>
                <p className="text-gray-600">Salle: {assignment.room}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600">
                  {assignment.schedule}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GroupsSection;
