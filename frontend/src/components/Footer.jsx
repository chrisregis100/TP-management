import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { to: "/login", label: "Connexion" },
    { to: "/register", label: "Inscription" },
    { to: "/help", label: "Aide" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                <span className="font-bold text-xl">TP</span>
              </div>
              <h3 className="text-xl font-bold">UniPratique</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Plateforme de gestion des travaux pratiques universitaires. Une
              solution innovante pour l'organisation et le suivi des TPs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-6">Liens Rapides</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} className="text-blue-400" />
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Mail size={20} className="text-blue-400" />
                <p>support@tpmanager.com</p>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Phone size={20} className="text-blue-400" />
                <p>01 52 43 50 63</p>
              </motion.div>
              <div className="pt-4 text-gray-300">
                <p>Faculté des Sciences et Techniques</p>
                <p>Université d'Abomey-Calavi</p>
                <p>Bénin</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8 mt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div className="flex flex-wrap justify-center gap-6">
              <p>© 2025 FAST/UAC</p>
              <p>All rights reserved</p>
              <motion.p
                whileHover={{ color: "#60A5FA" }}
                className="cursor-pointer"
              >
                Designed by Régis KIKI
              </motion.p>
            </div>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
