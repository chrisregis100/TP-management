import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStudentsManager from "../../hooks/useStudentsManager";
import { Button, Input } from "antd";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, Filter, Users } from "lucide-react";

const OverviewSection = () => {
  const [tps, setTps] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const getUserSession = () => {
    console.log(user.role);

    if (user.role !== "etudiant") {
      toast.error("Vous n'êtes pas un etudiant, veuillez vous connecter");
      navigate("/login");
    }
    return user;
  };

  useEffect(() => {
    getUserSession();
  }, []);

  const handleGetTps = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      const response = await useStudentsManager.findAllTps();
      setTps(response);
      console.log(response);
    }
  };

  useEffect(() => {
    handleGetTps();
  }, []);

  const handleRegisterForTP = async (tpId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      await useStudentsManager.registerForTP(tpId);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-full h-24 px-4 py-2  border-b shadow-md items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Mes Travaux Pratiques
        </h2>
        <div className="flex items-center gap-2">
          <Bell className=" size-6 text-blue-500 mr-2" />
          <div>
            <p className="text-lg font-semibold">
              {user.prenom} {user.nom}{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div>
        <form action="" className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Rechercher un TP"
            className="max-w-md p-2 border rounded-lg"
          />
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Rechercher
          </Button>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <Filter />
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tps.map((tp) => (
          <motion.div
            key={tp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {tp.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{tp.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tp.students} étudiants</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Bientôt</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Bientôt</span>
              </div>
              <div>
                <Button
                  type="primary"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleRegisterForTP(tp._id)}
                >
                  s&apos;inscrire
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
