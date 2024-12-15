// Gestion des Travaux Pratiques (TP)
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function TpManagement() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    filiere: "",
    annee: "",
    description: "",
    capacity: 1,
    price: 0,
    status: "PLANNED",
  });

  const [tpList, setTpList] = useState([]);

  useEffect(() => {
    // Animation pour la section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTpList([...tpList, { ...formData, id: Date.now() }]);
    setFormData({
      title: "",
      filiere: "",
      annee: "",
      description: "",
      capacity: 1,
      price: 0,
      status: "PLANNED",
    });
    console.log(formData);
  };

  const handleDelete = (id) => {
    setTpList(tpList.filter((tp) => tp.id !== id));
  };

  return (
    <div ref={sectionRef} className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">
        Gestion des Travaux Pratiques
      </h1>
      <p className="text-gray-600 mb-6">
        Créez, modifiez ou supprimez des Travaux Pratiques et configurez leurs
        groupes.
      </p>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Titre du TP
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Ex: TP de Physique"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="filiere"
            className="block text-gray-700 font-medium mb-2"
          >
            Filière
          </label>
          <input
            type="text"
            id="filiere"
            name="filiere"
            value={formData.filiere}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Ex: Mathématiques"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="annee"
            className="block text-gray-700 font-medium mb-2"
          >
            Année
          </label>
          <input
            type="number"
            id="annee"
            name="annee"
            value={formData.annee}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Ex: 2024"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Ajoutez une description pour le TP"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="capacity"
            className="block text-gray-700 font-medium mb-2"
          >
            Capacité
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
            Prix (optionnel)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 font-medium mb-2"
          >
            Statut
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="PLANNED">Prévu</option>
            <option value="ONGOING">En cours</option>
            <option value="COMPLETED">Terminé</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Créer un nouveau TP
        </button>
      </form>

      {/* Liste des TP */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">Liste des TP</h2>
      <ul className="space-y-4">
        {tpList.map((tp) => (
          <li
            key={tp.id}
            className="p-4 bg-gray-100 rounded flex justify-between items-center shadow-sm"
          >
            <div>
              <h3 className="font-bold text-purple-600">{tp.title}</h3>
              <p className="text-gray-600">{tp.description}</p>
              <p className="text-sm text-gray-500">Filière: {tp.filiere}</p>
              <p className="text-sm text-gray-500">Année: {tp.annee}</p>
              <p className="text-sm text-gray-500">Capacité: {tp.capacity}</p>
              <p className="text-sm text-gray-500">Prix: {tp.price} €</p>
              <p className="text-sm text-gray-500">Statut: {tp.status}</p>
            </div>
            <button
              onClick={() => handleDelete(tp.id)}
              className="text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TpManagement;
