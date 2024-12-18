import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const GradesSection = () => {
  const [grades, setGrades] = useState([]);
  const [overallAverage, setOverallAverage] = useState(0);

  useEffect(() => {
    const studentGrades = mockDataService.getGrades();
    setGrades(studentGrades);

    // Calculate weighted average
    const totalWeightedScore = studentGrades.reduce(
      (sum, grade) => sum + grade.grade * grade.coefficient,
      0
    );
    const totalCoefficients = studentGrades.reduce(
      (sum, grade) => sum + grade.coefficient,
      0
    );
    const average = totalWeightedScore / totalCoefficients;
    setOverallAverage(average);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mes Notes</h2>
          <div className="text-blue-600 font-bold">
            Moyenne Générale: {overallAverage.toFixed(2)}/20
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Travaux Pratiques</th>
              <th className="p-2 text-left">Note</th>
              <th className="p-2 text-left">Coefficient</th>
              <th className="p-2 text-right">Performance</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{grade.practicalWork}</td>
                <td className="p-2">{grade.grade}/20</td>
                <td className="p-2">{grade.coefficient * 100}%</td>
                <td className="p-2 text-right">
                  <div
                    className="h-2 rounded-full bg-blue-200"
                    style={{
                      width: "100%",
                      background: `linear-gradient(to right, 
                          ${grade.grade > 10 ? "green" : "red"} ${
                        (grade.grade / 20) * 100
                      }%, 
                          #e6e6e6 ${(grade.grade / 20) * 100}%)`,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default GradesSection;
