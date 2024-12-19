import { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, ChevronDown, Book, Calendar, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["none", "0 2px 10px rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Formations",
      icon: Book,
      submenu: ["Travaux Pratiques", "Cours Disponibles", "Planning"],
    },
    {
      title: "Calendrier",
      icon: Calendar,
      submenu: ["Séances", "Examens", "Événements"],
    },
    {
      title: "Notifications",
      icon: Bell,
      submenu: ["Messages", "Alertes", "Mises à jour"],
    },
  ];

  const MenuButton = ({ isOpen, onClick }) => (
    <motion.button
      onClick={onClick}
      className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </motion.button>
  );

  const MenuItem = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;

    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          <Icon size={20} />
          <span>{item.title}</span>
          <ChevronDown
            size={16}
            className={`transform transition-transform ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        </motion.div>

        <AnimatedSubmenu show={isHovered} items={item.submenu} />
      </div>
    );
  };

  const AnimatedSubmenu = ({ show, items }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          {items.map((subItem, index) => (
            <motion.div
              key={index}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              {subItem}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header
      style={{ backgroundColor: headerBackground, boxShadow: headerShadow }}
      className="fixed w-full top-0 z-50 backdrop-blur-sm"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TP</span>
            </div>
            <span className="text-xl font-bold">UniPratique</span>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link to={"/login"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-black hover:text-gray-900 border-2 border-blue-600 rounded-lg"
              >
                Connexion
              </motion.button>
            </Link>
            <Link to={"/register"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Inscription
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <MenuButton
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link to={"/login"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 border-2 border-blue-600 rounded-lg"
                    >
                      Connexion
                    </motion.button>
                  </Link>
                  <Link to={"/register"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Inscription
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
