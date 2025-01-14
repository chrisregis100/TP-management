import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Verification() {
  const formRef = useRef(null);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    // get the user email from local storage
    if (user) {
      const { email } = JSON.parse(user);
      setEmail(email);
      console.log(email);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { code, email };
    fetch("http://localhost:5000/api/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        email: data.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Code de vérification invalide ou expiré") {
          alert("Code de vérification invalide ou expiré");
        } else {
          alert("Email vérifié avec succès");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.utilisateur));
          window.location.href = "/login";
        }
      });
  };

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        ref={formRef}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Vérifiez votre email
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre code"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Entre votre code
            </label>
            <input
              type="code"
              id="code"
              placeholder="Entrez votre code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Vérifier
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link to="/" className="text-indigo-500 hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Verification;
