import { toast } from "react-toastify";

export const useStudentsManager = {
  findAllTps: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tps", {
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  registerForTP: async (tpId, userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tps/register/${tpId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      toast.success(data.message);
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  },

  getStudentById: async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${studentId}`,
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
      console.error(error);
    }
  },
};

export default useStudentsManager;
