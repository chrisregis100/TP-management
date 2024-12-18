import { useState } from "react";
import { motion } from "framer-motion";

const SettingsSection = () => {
  const [settings, setSettings] = useState({
    maxGroupSize: 25,
    notificationPreferences: {
      email: true,
      sms: false,
    },
    gradingScale: {
      excellent: 16,
      good: 14,
      average: 12,
    },
  });

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
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
        <h2 className="text-xl font-bold mb-4">Paramètres</h2>

        <div className="space-y-6">
          {/* Group Size Setting */}
          <div>
            <h3 className="font-semibold mb-2">Taille Maximale des Groupes</h3>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={settings.maxGroupSize}
                onChange={(e) =>
                  handleSettingChange(
                    "maxGroupSize",
                    null,
                    parseInt(e.target.value)
                  )
                }
                className="border rounded px-2 py-1 w-20"
                min="10"
                max="50"
              />
              <span>Étudiants maximum par groupe</span>
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <h3 className="font-semibold mb-2">Préférences de Notification</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.notificationPreferences.email}
                  onChange={(e) =>
                    handleSettingChange(
                      "notificationPreferences",
                      "email",
                      e.target.checked
                    )
                  }
                />
                <span>Notifications par Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.notificationPreferences.sms}
                  onChange={(e) =>
                    handleSettingChange(
                      "notificationPreferences",
                      "sms",
                      e.target.checked
                    )
                  }
                />
                <span>Notifications SMS</span>
              </label>
            </div>
          </div>

          {/* Grading Scale */}
          <div>
            <h3 className="font-semibold mb-2">Échelle de Notation</h3>
            <div className="space-y-2">
              {Object.entries(settings.gradingScale).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-4">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleSettingChange(
                        "gradingScale",
                        key,
                        parseFloat(e.target.value)
                      )
                    }
                    className="border rounded px-2 py-1 w-20"
                    min="0"
                    max="20"
                    step="0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Enregistrer les Paramètres
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsSection;
