import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    matricule: "",
    email: "",
    motDePasse: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }, []);

  const userForm = [
    {
      id: "nom",
      label: "Nom",
      type: "text",
      placeholder: "Entrez votre nom",
    },
    {
      id: "prenom",
      label: "Prénoms",
      type: "text",
      placeholder: "Entrez votre prénom",
    },
    {
      id: "matricule",
      label: "Matricule",
      type: "text",
      placeholder: "Entrez votre matricule",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Entrez votre email",
    },
    {
      id: "motDePasse",
      label: "Mot de passe",
      type: "password",
      placeholder: "Entrez votre mot de passe",
    },
  ];

  const validate = () => {
    const newErrors = {};
    if (formData.nom.length < 3)
      newErrors.nom = "Le nom doit contenir au moins 3 caractères.";
    if (formData.prenom.length < 3)
      newErrors.prenom = "Le prénom doit contenir au moins 3 caractères.";
    if (formData.matricule.length !== 8)
      newErrors.matricule =
        "Le matricule doit contenir exactement 8 caractères alphanumériques.";
    if (!formData.email.includes("@"))
      newErrors.email = "Veuillez entrer une adresse email valide.";
    if (formData.motDePasse.length < 8)
      newErrors.motDePasse =
        "Le mot de passe doit contenir au moins 8 caractères.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    fetch("http://localhost:5000/api/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            localStorage.setItem("user", JSON.stringify(data.utilisateur));
            alert(data.message);
            window.location.href = "/verification";
          });
        }
        return res.json().then((data) => {
          throw new Error(data.message);
        });
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        ref={formRef}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Inscription
        </h1>
        <form onSubmit={handleSubmit}>
          {userForm.map(({ id, label, type, placeholder }) => (
            <div className="mb-4" key={id}>
              <label htmlFor={id} className="block text-gray-700 mb-2">
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 ${
                  errors[id] ? "border-red-500" : ""
                }`}
              />
              {errors[id] && (
                <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:underline"
          >
            Se connecter
          </Link>
        </p>
        <p className="mt-6 text-center">
          <Link to="/" className="text-indigo-500 hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
