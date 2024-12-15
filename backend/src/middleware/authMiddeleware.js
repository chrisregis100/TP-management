const jwt = require('jsonwebtoken');

const authMiddleware = (rolesAutorises = []) => {
  return (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Aucun token, autorisation refusée' });
    }

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ajouter l'utilisateur décodé à la requête
      req.user = decoded;

      // Vérification des rôles si des rôles spécifiques sont requis
      if (rolesAutorises.length > 0 && !rolesAutorises.includes(decoded.role)) {
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