import { motion } from "framer-motion";
import { Edit, PlusCircle, Trash2, Clock, Users, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import CreateTPModal from "./CreateTPModal";
import { Button } from "antd";
import { UseTpManager } from "../../hooks/UseTpManager";
import UpdateModal from "./updateModat";

const OverviewSection = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTp, setSelectedTp] = useState(null);
  const [tps, setTps] = useState([]);

  // Récupérer les TP
  const handleGetTps = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      const response = await UseTpManager.getAllTPs(user.id);
      setTps(response);
    }
  };

  // Supprimer un TP
  const handleDeleteTP = async (tpId) => {
    await UseTpManager.DeleteTP(tpId);
    handleGetTps();
  };

  const handleEditTP = (tp) => {
    setSelectedTp(tp);
    setOpenEditModal(true);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  useEffect(() => {
    handleGetTps();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Vue d&apos;ensemble des TP</h2>
        <Button
          onClick={() => setOpenCreateModal(true)}
          type="primary"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouveau TP
        </Button>

        <CreateTPModal
          onShow={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      </div>

      <div className="flex flex-col gap-2">
        {tps.map((tp) => (
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
              <div className="flex gap-2 items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {tp.registeredStudents.length} étudiants inscrits
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tp.horaire}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{tp.duree}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between gap-2 mt-4 pt-4 border-t">
                <div>
                  <Button>Programmer</Button>
                  <Button>Organiser les etudiants</Button>
                </div>
                <div className="flex items-center">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Modifier"
                    onClick={() => handleEditTP(tp._id)}
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                    onClick={() => handleDeleteTP(tp._id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de mise à jour */}
      {selectedTp && (
        <UpdateModal
          onShow={openEditModal}
          tpId={selectedTp}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </motion.div>
  );
};

export default OverviewSection;
