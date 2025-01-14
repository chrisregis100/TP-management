import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  CreditCard,
  Users,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import OverviewSection from "../components/studentDashboard/OverviewSection";
import PracticalWorksSection from "../components/studentDashboard/PraticalSection";
import PaymentsSection from "../components/studentDashboard/PaymentsSection";
import GroupsSection from "../components/studentDashboard/GroupeSection";
import GradesSection from "../components/studentDashboard/GradesSection";
import SettingsSection from "../components/studentDashboard/SettingSection";
import ScheduleSection from "../components/studentDashboard/SheduleSection";
const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [userProfile, setUserProfile] = useState(null);

  /*   const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du profil utilisateur",
        errors
      );
    }
  }; */

  const dashboardSections = [
    {
      id: "overview",
      icon: <Home className="w-6 h-6" />,
      title: "Tableau de Bord",
      description: "Vue d'ensemble de vos études",
    },
    {
      id: "practical-works",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Travaux Pratiques",
      description: "Mes TP inscrits",
    },
    {
      id: "payments",
      icon: <CreditCard className="w-6 h-6" />,
      title: "Paiements",
      description: "Historique et frais",
    },
    {
      id: "groups",
      icon: <Users className="w-6 h-6" />,
      title: "Groupes",
      description: "Mes affectations",
    },
    {
      id: "schedule",
      icon: <Calendar className="w-6 h-6" />,
      title: "Emploi du Temps",
      description: "Mes créneaux de TP",
    },
    {
      id: "grades",
      icon: <FileText className="w-6 h-6" />,
      title: "Notes",
      description: "Résultats et performances",
    },
    {
      id: "settings",
      icon: <Settings className="w-6 h-6" />,
      title: "Paramètres",
      description: "Profil et préférences",
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection userProfile={userProfile} />;
      case "practical-works":
        return <PracticalWorksSection />;
      case "payments":
        return <PaymentsSection />;
      case "groups":
        return <GroupsSection />;
      case "schedule":
        return <ScheduleSection />;
      case "grades":
        return <GradesSection />;
      case "settings":
        return <SettingsSection userProfile={userProfile} />;
      default:
        return <OverviewSection userProfile={userProfile} />;
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
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {userProfile ? userProfile.name[0] : ""}
            </span>
          </div>
          <h1 className="text-xl font-bold text-blue-600">
            {userProfile ? userProfile.name : "Chargement..."}
          </h1>
          <p className="text-gray-500 text-sm">
            {userProfile ? userProfile.program : ""}
          </p>
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

export default StudentDashboard;
