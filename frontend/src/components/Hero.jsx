import gsap from "gsap";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Hero() {
  // Carousel Images
  const heroImages = ["/imagefont1.jpg", "/imagefont2.jpg", "/labo-image.webp"];

  const heroCarouselRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Carousel Animation
    const heroImages = heroCarouselRef.current.children;
    gsap.set(heroImages, { opacity: 0 });
    gsap.set(heroImages[0], { opacity: 1 });

    let currentImage = 0;

    const animateImages = () => {
      gsap.to(heroImages[currentImage], {
        opacity: 0,
        duration: 1,
      });

      currentImage = (currentImage + 1) % heroImages.length;

      gsap.to(heroImages[currentImage], {
        opacity: 1,
        duration: 1,
      });
    };

    const interval = setInterval(animateImages, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-16 relative min-h-screen">
      <div
        ref={heroCarouselRef}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
      >
        {heroImages.map((image, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 brightness-75 opacity-0 w-full h-full"
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto h-full px-4 relative z-10 text-white text-center lg:mt-80">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-40">
          Gérez vos Travaux Pratiques Efficacement
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Une plateforme complète pour étudiants et enseignants, simplifiant la
          gestion et le suivi des travaux pratiques universitaires.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-lg"
          >
            Commencer
          </Link>
          <Link
            to="/demo"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition text-lg"
          >
            Voir la Démo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
