import { toast } from "react-toastify";

export const UseTpManager = {

  registerTP: async (tpData) => {
    try {
      const response = await fetch("http://localhost:5000/api/createTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tpData),
      });
      const data = await response.json();
      if(!response.ok){
        toast.error(data.message)
      }else
      toast.success(data.message)
      return data;
    }
    catch (error) {
      console.error(error);
    }
  },



getAllTPs: async (userId) => {
  try {

    const response = await fetch(`/api/tps/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
},

DeleteTP: async (tpId) => {
  try {
    const response = await fetch(`/api/tps/${tpId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
},

UpdateTP: async (tpId, tpData) => {
  try {
    const response = await fetch(`/api/tps/${tpId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tpData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
};


