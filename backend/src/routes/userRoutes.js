const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware, authAdmin } = require('../middleware/authMiddeleware');
const tpController = require('../controllers/tpController');

// Routes publiques
router.post('/inscription', authController.inscription);
router.post('/verification', authController.verifierCode);
router.post('/connexion', authController.connexion);

// Routes protégées pour l'admin
router.post('/enseignant/inscription', authMiddleware(['admin']), authController.inscriptionEnseignant);

// Routes protégées nécessitant authentification
router.get('/profil', authMiddleware(), (req, res) => {
  res.json(req.user);
});

module.exports = router;