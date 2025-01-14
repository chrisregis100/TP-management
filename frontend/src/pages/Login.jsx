import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useAuth } from "../store/AuthContext";

function Login() {
  const formRef = useRef(null);
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { matricule, password };
    console.log(data);
    const response = await fetch("http://localhost:5000/api/connexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.utilisateur));
      const role = data.utilisateur.role;
      if (role === "enseignant") {
        navigate("/dashboard/teacher");
      } else if (role === "etudiant") {
        navigate("/dashboard/student");
      }
    }
    login(data.utilisateur, data.token);
    console.log("fait");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        ref={formRef}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Connexion
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Matricule
            </label>
            <input
              type="text"
              id="matricule"
              placeholder="Entrez votre matricule"
              onChange={(e) => setMatricule(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:underline"
          >
            S&apos;inscrire
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

export default Login;
