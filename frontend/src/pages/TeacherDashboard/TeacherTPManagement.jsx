import { useState } from "react";
import { motion } from "framer-motion";
import {
  Book,
  Users,
  CalendarCheck,
  ClipboardList,
  ChartBar,
  Settings,
  Bell,
} from "lucide-react";
import OverviewSection from "../../components/studentDashboard/OverviewSection";
import StudentManagementSection from "../../components/teacherDashboard/StudentManagement";
import SchedulingSection from "../../components/teacherDashboard/SchedulingSection";
import GradingSection from "../../components/teacherDashboard/GradingSection";
import PerformanceSection from "../../components/teacherDashboard/Performance";
import SettingsSection from "../../components/studentDashboard/SettingSection";

// Mock data service (would be replaced by actual API calls)

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dashboardSections = [
    {
      id: "overview",
      icon: <Book className="w-6 h-6" />,
      title: "Vue d'ensemble des TP",
      description: "Aperçu de vos travaux pratiques en cours",
    },
    {
      id: "student-management",
      icon: <Users className="w-6 h-6" />,
      title: "Gestion des Étudiants",
      description: "Répartition et suivi des groupes",
    },
    {
      id: "scheduling",
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Planification",
      description: "Gestion des créneaux et groupes",
    },
    {
      id: "grading",
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Notation",
      description: "Saisie et analyse des notes",
    },
    {
      id: "performance",
      icon: <ChartBar className="w-6 h-6" />,
      title: "Statistiques",
      description: "Rapports de performance",
    },
    {
      id: "settings",
      icon: <Settings className="w-6 h-6" />,
      title: "Paramètres",
      description: "Configuration des TP",
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "student-management":
        return <StudentManagementSection />;
      case "scheduling":
        return <SchedulingSection />;
      case "grading":
        return <GradingSection />;
      case "performance":
        return <PerformanceSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 ">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                Espace Enseignant
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                TD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`bg-white shadow-lg border-r ${
            isSidebarOpen ? "w-72" : "w-20"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="hamburger-button absolute top-4 left-4"
          >
            ☰
          </button>
          {isSidebarOpen ? (
            <div className="p-6">
              <p className="text-gray-500 mb-6">
                Gestion des Travaux Pratiques
              </p>
              <nav className="space-y-2">
                {dashboardSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div
                      className={`${
                        activeSection === section.id
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      } p-2 rounded-lg`}
                    >
                      {section.icon}
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="font-medium text-sm">{section.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {section.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </nav>
            </div>
          ) : (
            <div className="p-6">
              <nav className="space-y-2">
                {dashboardSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div
                      className={`${
                        activeSection === section.id
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      } p-2 rounded-lg`}
                    >
                      {section.icon}
                    </div>
                  </motion.button>
                ))}
              </nav>
            </div>
          )}
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto"
        >
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {renderActiveSection()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
