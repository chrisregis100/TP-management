import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OverviewSection = () => {
  const [practicalWorks, setPracticalWorks] = useState([]);

  useEffect(() => {
    // Simulating API call
    setPracticalWorks(mockDataService.getPracticalWorks());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Vue d&apos;ensemble des TP</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {practicalWorks.map((pw) => (
            <motion.div
              key={pw.id}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 p-4 rounded-lg border border-blue-100"
            >
              <h3 className="font-semibold text-blue-600">{pw.title}</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Capacité: {pw.capacity}</p>
                <p>Inscrits: {pw.enrolled}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(pw.enrolled / pw.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewSection;
