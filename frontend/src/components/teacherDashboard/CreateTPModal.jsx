import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { UseTpManager } from "../../hooks/UseTpManager";

// eslint-disable-next-line react/prop-types
const CreateTPModal = ({ onClose }) => {
  const { registerTP } = UseTpManager;

  const fields = [{ filiere: "MIA" }, { filiere: "SVT" }, { filiere: "PC" }];

  const annees = [
    { annee: "Licence 1" },
    { annee: "Licence 2" },
    { annee: "Licence 3" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    annee: "",
    filiere: "",
    maxStudents: "",
    horaire: "",
    duree: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // inscription de nouveau tp
  const handleSubmit = (e) => {
    console.log(formData);

    e.preventDefault();
    registerTP(formData);
  };

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md lg:max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Créer un nouveau TP
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Titre du TP
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="ex: Analyse Numérique"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Description du TP..."
                />
              </div>
              <div>
                <label
                  htmlFor="annee"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filière
                </label>
                <select
                  name="filiere"
                  id="filiere"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="filiere1">Selectionnez une filiere</option>
                  {fields.map((filiere) => (
                    <option key={filiere.filiere} value={filiere.filiere}>
                      {filiere.filiere}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="annee"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Année
                </label>
                <select
                  name="annee"
                  id="annee"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="annee1">Selectionnez une année</option>
                  {annees.map((annee) => (
                    <option key={annee.annee} value={annee.annee}>
                      {annee.annee}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="maxStudents"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre maximum d&apos;étudiants
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="ex: 25"
                />
              </div>

              <div>
                <label
                  htmlFor="schedule"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Horaire
                </label>
                <input
                  type="time"
                  id="schedule"
                  name="schedule"
                  value={formData.horaire}
                  onChange={(e) =>
                    setFormData({ ...formData, horaire: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="ex: Lundi, 10:00"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Durée
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duree}
                  onChange={(e) =>
                    setFormData({ ...formData, duree: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="ex: 2h"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Prix
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="ex: 1000 FCFA"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Créer le TP
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default CreateTPModal;
