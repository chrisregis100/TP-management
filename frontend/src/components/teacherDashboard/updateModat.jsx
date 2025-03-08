import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UseTpManager } from "../../hooks/UseTpManager";
import { Button, Modal, Spin } from "antd";

// eslint-disable-next-line react/prop-types
const UpdateModal = ({ onClose, tpId, onShow }) => {
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

  const getTpById = async (tpId) => {
    try {
      setIsLoading(true);
      const response = await UseTpManager.getTpById(tpId);

      setFormData({
        title: response[0]?.title || "",
        description: response[0]?.description || "",
        annee: response[0]?.annee || "",
        filiere: response[0]?.filiere || "",
        maxStudents: response[0]?.capacity || "",
        horaire: response[0]?.horaire || "",
        duree: response[0]?.duree || "",
        price: response[0]?.price || "",
      });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tpId) {
      getTpById(tpId);
    }
  }, [tpId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTP = async (tpId, tpData) => {
    console.log("Mise à jour en cours...");

    try {
      setIsLoading(true);
      await UseTpManager.UpdateTP(tpId, tpData);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <Modal
        title="Modifier un TP"
        open={onShow}
        onCancel={onClose}
        footer={null}
      >
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md lg:max-w-2xl">
          <form
            onSubmit={(e) => {
              handleUpdateTP(e, tpId, formData);
            }}
            className="p-6 space-y-4"
          >
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
                className="w-full px-3 py-2 border rounded-lg"
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
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Description du TP..."
              />
            </div>

            <div>
              <label htmlFor="filiere">Filière</label>
              <select
                name="filiere"
                value={formData.filiere}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">
                  {formData.filiere || "Sélectionner une filière"}
                </option>
                {fields.map((f) => (
                  <option key={f.filiere} value={f.filiere}>
                    {f.filiere}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="annee">Année</label>
              <select
                name="annee"
                value={formData.annee}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">
                  {formData.annee || "Sélectionner une année"}
                </option>
                {annees.map((a) => (
                  <option key={a.annee} value={a.annee}>
                    {a.annee}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="maxStudents">
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
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="horaire">Horaire</label>
              <input
                type="time"
                id="horaire"
                name="horaire"
                value={formData.horaire}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="price">Prix</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                onClick={() => handleUpdateTP(tpId, formData)}
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                {isLoading ? <Spin /> : "Enregistrer la modification"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </AnimatePresence>
  );
};

export default UpdateModal;
