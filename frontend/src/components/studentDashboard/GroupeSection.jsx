import { motion } from "framer-motion";

const GroupsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mes Groupes de TP</h2>
      </div>
    </motion.div>
  );
};

export default GroupsSection;
