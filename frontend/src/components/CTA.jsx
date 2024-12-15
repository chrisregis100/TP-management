import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-indigo-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Prêt à Simplifier Vos Travaux Pratiques ?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers d&apos;étudiants et d&apos;enseignants qui ont
          déjà adopté TP Manager.
        </p>
        <Link
          to="/register"
          className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition"
        >
          Inscrivez-vous Maintenant
        </Link>
      </div>
    </section>
  );
}

export default CTA;
