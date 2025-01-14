import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

// Features Data

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
