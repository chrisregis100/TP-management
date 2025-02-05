import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateTPModal from "./CreateTPModal";

const OverviewSection = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Vue d&apos;ensemble des TP</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouveau Tp
        </button>
        {openModal && <CreateTPModal onClose={() => setOpenModal(false)} />}
      </div>
    </motion.div>
  );
};

export default OverviewSection;
