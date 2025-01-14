const fetchUserProfile = async (use) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur",
      error
    );
  }
};
