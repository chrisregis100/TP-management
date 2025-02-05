export const UseTpManager = {



  registerTP: async (tpData) => {

    try {
      const response = await fetch("api/enseignant/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tpData),
      });
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
    }
}
}