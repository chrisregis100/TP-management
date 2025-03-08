import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UseTpManager } from "../../hooks/UseTpManager";
import { Button, Modal, Spin } from "antd";

// eslint-disable-next-line react/prop-types
const CreateTPModal = ({ onClose, onShow }) => {
  const { registerTP } = UseTpManager;
  const [isLoading, setIsLoading] = useState(false);

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
    e.preventDefault();
    try {
      console.log(formData);

      setIsLoading(true);
      registerTP(formData);
      onclose();
      setIsLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AnimatePresence>
      <>
        {/* Modal */}
        <Modal
          title="Créer un nouveau TP"
          open={onShow}
          onOk={onClose}
          onCancel={onClose}
          footer={null}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md lg:max-w-2xl">
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
                <Button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Enregistrer le TP
                  {isLoading && <Spin />}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    </AnimatePresence>
  );
};

export default CreateTPModal;
