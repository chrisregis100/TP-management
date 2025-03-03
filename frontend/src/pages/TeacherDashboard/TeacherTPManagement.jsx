import { Bell } from "lucide-react";
import SideBar from "../../components/teacherDashboard/SideBar";
import { useEffect, useState } from "react";

const TeacherDashboard = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { role } = JSON.parse(user);
      if (role !== "enseignant") {
        window.location.href = "/";
      }

      setSession(JSON.parse(user));
    }
  }, []);

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
                {session?.nom}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sideBar*/}
      <SideBar />
    </div>
  );
};

export default TeacherDashboard;
