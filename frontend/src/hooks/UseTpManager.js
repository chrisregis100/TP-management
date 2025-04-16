import { toast } from "react-toastify";

export const UseTpManager = {
  registerTP: async (tpData) => {
    console.log(tpData);

    try {
      const response = await fetch("http://localhost:5000/api/createTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tpData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else toast.success(data.message);
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getAllTPs: async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tps/${userId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }

      toast.success(data.message);
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getTpById: async (tpId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tps/${tpId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  DeleteTP: async (tpId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tps/${tpId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },

  UpdateTP: async (tpId, tpData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tps/${tpId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tpData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },

  getStudents: async (teacherId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tps/studentlist/${teacherId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },
};
