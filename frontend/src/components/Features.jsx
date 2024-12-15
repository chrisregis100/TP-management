function Features() {
  const features = [
    {
      icon: "📝",
      title: "Inscription Simplifiée",
      description:
        "Inscrivez-vous facilement à vos travaux pratiques en quelques clics.",
    },
    {
      icon: "👥",
      title: "Gestion de Groupes",
      description:
        "Répartition intelligente et suivi personnalisé des groupes.",
    },
    {
      icon: "💡",
      title: "Suivi Pédagogique",
      description:
        "Tableau de bord complet pour suivre vos progrès et performances.",
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Découvrez quelques fonctionnalités de la plateforme
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
