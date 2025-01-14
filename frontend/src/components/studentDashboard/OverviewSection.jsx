import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Clock,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import CreateTPModal from "../teacherDashboard/CreateTPModal";

const OverviewSection = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tpList, setTpList] = useState([
    {
      id: 1,
      title: "Analyse Numérique",
      description: "Introduction aux méthodes numériques",
      students: 25,
      schedule: "Lundi, 10:00",
      duration: "2h",
      status: "active",
    },
    {
      id: 2,
      title: "Programmation Web",
      description: "Développement frontend et backend",
      students: 30,
      schedule: "Mardi, 14:00",
      duration: "3h",
      status: "pending",
    },
    {
      id: 3,
      title: "Base de Données",
      description: "Conception et optimisation",
      students: 20,
      schedule: "Mercredi, 08:00",
      duration: "2h",
      status: "active",
    },
  ]);

  const handleCreateTP = (newTP) => {
    const tp = {
      id: tpList.length + 1,
      ...newTP,
      students: 0,
      status: "pending",
    };
    setTpList([...tpList, tp]);
    setIsCreateModalOpen(false);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Vos Travaux Pratiques
        </h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span>Nouveau TP</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tpList.map((tp) => (
          <motion.div
            key={tp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {tp.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{tp.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  tp.status
                )}`}
              >
                {tp.status === "active" ? "Actif" : "En attente"}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">{tp.students} étudiants</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{tp.schedule}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{tp.duration}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Modifier"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <CreateTPModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTP}
      />
    </div>
  );
};

export default OverviewSection;
