import { useState } from "react";
import { motion } from "framer-motion";

const PracticalWorksSection = () => {
  const [practicalWorks, setPracticalWorks] = useState([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mes Travaux Pratiques</h2>

        <div className="space-y-4">
          {practicalWorks.map((pw) => (
            <div
              key={pw.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{pw.title}</h3>
                <p className="text-gray-600">Code: {pw.code}</p>
                <p className="text-gray-600">Enseignant: {pw.instructor}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    pw.status === "Inscrit"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {pw.status}
                </span>
                <div className="mt-2">
                  <strong>Statut Paiement:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      pw.paymentStatus === "Payé"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pw.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PracticalWorksSection;
