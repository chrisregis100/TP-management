import { useState } from "react";
import { motion } from "framer-motion";
import {
  Book,
  Users,
  CalendarCheck,
  ClipboardList,
  ChartBar,
  Settings,
} from "lucide-react";
import OverviewSection from "../components/studentDashboard/OverviewSection";
import StudentManagementSection from "../components/teacherDashboard/StudentManagement";
import SchedulingSection from "../components/teacherDashboard/SchedulingSection";
import GradingSection from "../components/teacherDashboard/GradingSection";
import PerformanceSection from "../components/teacherDashboard/Performance";
import SettingsSection from "../components/studentDashboard/SettingSection";

// Mock data service (would be replaced by actual API calls)
const mockDataService = {
  getPracticalWorks: () => [
    { id: 1, title: "Analyse Numérique", capacity: 25, enrolled: 22 },
    { id: 2, title: "Programmation Avancée", capacity: 30, enrolled: 28 },
    { id: 3, title: "Systèmes Embarqués", capacity: 20, enrolled: 18 },
  ],
  getStudents: () => [
    {
      id: 1,
      name: "Marie Dubois",
      group: "TP1",
      practicalWork: "Analyse Numérique",
    },
    {
      id: 2,
      name: "Jean Dupont",
      group: "TP2",
      practicalWork: "Programmation Avancée",
    },
    {
      id: 3,
      name: "Sophie Martin",
      group: "TP1",
      practicalWork: "Systèmes Embarqués",
    },
  ],
  getPerformanceData: () => ({
    averageGrades: [
      { practicalWork: "Analyse Numérique", average: 15.5 },
      { practicalWork: "Programmation Avancée", average: 16.2 },
      { practicalWork: "Systèmes Embarqués", average: 14.8 },
    ],
    successRate: 85.3,
  }),
};

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-xl p-6 border-r"
      >
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-blue-600">
            Espace Enseignant
          </h1>
          <p className="text-gray-500">Gestion des Travaux Pratiques</p>
        </div>

        <nav className="space-y-2">
          {dashboardSections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {section.icon}
              <div className="ml-3">
                <h3 className="font-semibold text-sm">{section.title}</h3>
                <p className="text-xs text-gray-400">{section.description}</p>
              </div>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-10 bg-gray-50"
      >
        {renderActiveSection()}
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
