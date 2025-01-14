/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";

const PerformanceSection = () => {
  const [stats] = useState({
    totalStudents: 75,
    averageGrade: 15.8,
    completionRate: 85,
    topPerformers: 12,
    tpStats: [
      {
        name: "Analyse Numérique",
        averageGrade: 16.5,
        attendance: 95,
        submissions: 22,
        totalStudents: 25,
      },
      {
        name: "Programmation Web",
        averageGrade: 14.8,
        attendance: 88,
        submissions: 27,
        totalStudents: 30,
      },
      {
        name: "Base de Données",
        averageGrade: 15.2,
        attendance: 92,
        submissions: 18,
        totalStudents: 20,
      },
    ],
  });

  const StatCard = ({ icon: Icon, title, value, suffix, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold">
            {value}
            {suffix && (
              <span className="text-gray-500 text-lg ml-1">{suffix}</span>
            )}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </motion.div>
  );

  const TPPerformanceCard = ({ tp }) => {
    const submissionRate = Math.round(
      (tp.submissions / tp.totalStudents) * 100
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">{tp.name}</h3>
            <p className="text-sm text-gray-500">
              {tp.totalStudents} étudiants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Moyenne: {tp.averageGrade}/20
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Barre de progression des soumissions */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Soumissions</span>
              <span className="font-medium">{submissionRate}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${submissionRate}%` }}
              />
            </div>
          </div>

          {/* Barre de progression de la présence */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Présence</span>
              <span className="font-medium">{tp.attendance}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${tp.attendance}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{tp.submissions} soumis</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>{tp.totalStudents - tp.submissions} en attente</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Statistiques Globales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Étudiants Total"
            value={stats.totalStudents}
            color="bg-blue-50"
          />
          <StatCard
            icon={TrendingUp}
            title="Moyenne Générale"
            value={stats.averageGrade}
            suffix="/20"
            color="bg-green-50"
          />
          <StatCard
            icon={Clock}
            title="Taux de Complétion"
            value={stats.completionRate}
            suffix="%"
            color="bg-yellow-50"
          />
          <StatCard
            icon={Award}
            title="Meilleurs Étudiants"
            value={stats.topPerformers}
            color="bg-purple-50"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Performance par TP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.tpStats.map((tp, index) => (
            <TPPerformanceCard key={index} tp={tp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;
