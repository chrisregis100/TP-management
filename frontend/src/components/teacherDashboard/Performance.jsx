import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PerformanceSection = () => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Simulating API call
    setPerformanceData(mockDataService.getPerformanceData());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Statistiques de Performance</h2>

        {performanceData && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">
                Moyennes par Travaux Pratiques
              </h3>
              <div className="space-y-2">
                {performanceData.averageGrades.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${item.average * 5}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">
                      {item.practicalWork}: {item.average.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Taux de Réussite Global</h3>
              <div className="text-center">
                <div
                  className="mx-auto w-32 h-32 rounded-full flex items-center justify-center border-8 border-blue-200"
                  style={{
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    borderRightColor: "rgb(59, 130, 246)",
                  }}
                >
                  <span className="text-2xl font-bold text-blue-600">
                    {performanceData.successRate.toFixed(1)}%
                  </span>
                </div>
                <p className="mt-2 text-gray-600">Taux de Réussite</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PerformanceSection;
