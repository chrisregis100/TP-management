import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function OverviewSection() {
  //const [practicalWorks, setPracticalWorks] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUserData(data);
  }, []);

  // Mock data service (would be replaced by actual API calls)
  /*   const mockDataService = {
    getUserProfile: () => ({
      name: "Marie Dupont",
      email: "marie.dupont@university.edu",
      studentId: "ST2024-0456",
      program: "Informatique et Systèmes",
    }),

    getPracticalWorks: () => [
      {
        id: 1,
        title: "Analyse Numérique",
        code: "AN-101",
        instructor: "Dr. Jean Lefebvre",
        status: "Inscrit",
        paymentStatus: "Payé",
      },
      {
        id: 2,
        title: "Programmation Avancée",
        code: "PA-202",
        instructor: "Pr. Sophie Martin",
        status: "En attente",
        paymentStatus: "À payer",
      },
    ],

    getGroupAssignments: () => [
      {
        practicalWork: "Analyse Numérique",
        group: "TP1",
        schedule: "Lundi 10:00-12:00",
        room: "Salle 205",
      },
      {
        practicalWork: "Programmation Avancée",
        group: "TP2",
        schedule: "Mercredi 14:00-16:00",
        room: "Laboratoire Informatique",
      },
    ],

    getGrades: () => [
      {
        practicalWork: "Analyse Numérique",
        grade: 15.5,
        maxGrade: 20,
        coefficient: 0.4,
      },
      {
        practicalWork: "Systèmes Embarqués",
        grade: 17.2,
        maxGrade: 20,
        coefficient: 0.3,
      },
    ],

    getPaymentHistory: () => [
      {
        id: 1,
        practicalWork: "Analyse Numérique",
        amount: 150,
        date: "2024-01-15",
        status: "Confirmé",
      },
      {
        id: 2,
        practicalWork: "Programmation Avancée",
        amount: 200,
        date: "2024-02-01",
        status: "En attente",
      },
    ],
  }; */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Bienvenue, {userData?.nom}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Informations Personnelles</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                <strong>Numéro Matricule:</strong> {userData?.matricule}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Travaux Pratiques en Cours</h3>
            <div className="space-y-2">
              {/*    {practicalWorks.map((pw) => (
                <div
                  key={pw.id}
                  className="bg-blue-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{pw.title}</h4>
                    <p className="text-sm text-gray-600">{pw.code}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      pw.status === "Inscrit"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {pw.status}
                  </span>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OverviewSection;
