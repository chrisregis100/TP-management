import { motion } from "framer-motion";
import {
  Edit,
  PlusCircle,
  Trash2,
  Clock,
  Users,
  CalendarDays,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import CreateTPModal from "./CreateTPModal";
import { Button, Tag, Tooltip } from "antd";
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tps.map((tp) => (
          <motion.div
            key={tp._id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
              <h3 className="text-xl font-bold text-white truncate">
                {tp.title}
              </h3>
            </div>

            <div className="p-4">
              <p className="text-gray-700 mb-4 line-clamp-2">
                {tp.description}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">{tp.horaire}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">{tp.capacity} places</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">{tp.duree}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">{tp.annee}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Tag color="blue" className="flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {tp.filiere}
                </Tag>
                <Tag color="green" className="flex gap-1 items-center">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {tp.price}&nbsp;FCFA
                </Tag>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Tooltip title="Modifier">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<Edit className="w-4 h-4" />}
                    className="bg-blue-500"
                    onClick={() => handleEditTP(tp._id)}
                  />
                </Tooltip>
                <Tooltip title="Supprimer">
                  <Button
                    danger
                    shape="circle"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleDeleteTP(tp._id)}
                  />
                </Tooltip>
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
