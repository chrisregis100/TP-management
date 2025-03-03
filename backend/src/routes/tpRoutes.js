const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddeleware');
const tpController = require('../controllers/tpController');


// routes pour les TPs
router.post('/createTP', authMiddleware(['enseignant', 'admin']), tpController.createTP);

// route pour inscription des etudiants au TP
router.post('/tps/:tpId/inscription', authMiddleware(), tpController.registerForTP);

// routes pour les TPs
router.put('/tps/:tpId', authMiddleware(['enseignant', 'admin']), tpController.updateTPById);

router.delete('/tps/:tpId', authMiddleware(['enseignant', 'admin']), tpController.deleteTPById);

router.get('/tps',  tpController.findAllTPs);

router.get('/tps/:tpId', authMiddleware(['enseignant', 'admin']), tpController.findTPById);


module.exports = router;