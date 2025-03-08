const jwt = require('jsonwebtoken');

const authMiddleware = (rolesAutorises = []) => {
  return (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
  const token = req.cookies["session_token"];

  

  if(!token){
    return res.status(401).json({ message: "Vous n'ếtes pas autorisé à mener cette action" });
  }

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ajouter l'utilisateur décodé à la requête
      req.user = decoded;

      // Vérification des rôles si des rôles spécifiques sont requis
      if (rolesAutorises.length > 0 && !rolesAutorises.includes(decoded.role)) {
        log("role vérifié")
        return res.status(403).json({ 
          message: 'Accès refusé. Vous n\'avez pas les autorisations nécessaires.' 
        });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalide' });
    }
  };
};

module.exports = { authMiddleware };