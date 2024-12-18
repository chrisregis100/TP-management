import { useState } from "react";
import { motion } from "framer-motion";

// Settings Section
const SettingsSection = ({ userProfile }) => {
  const [profileData, setProfileData] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: "",
    notifications: {
      email: true,
      sms: false,
    },
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulate profile update
    alert("Profil mis à jour avec succès !");
  };

  const handleNotificationChange = (type) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Paramètres du Profil</h2>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Nom Complet</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Téléphone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Préférences de Notification</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profileData.notifications.email}
                  onChange={() => handleNotificationChange("email")}
                />
                <span>Notifications Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profileData.notifications.sms}
                  onChange={() => handleNotificationChange("sms")}
                />
                <span>Notifications SMS</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Mettre à Jour le Profil
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingsSection;
