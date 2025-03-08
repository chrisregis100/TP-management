const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddeleware');
const tpController = require('../controllers/tpController');
const teacherController = require('../controllers/teacherController');


// routes pour les actions enseignant
router.post('/createTP', authMiddleware(['enseignant', 'admin']), teacherController.createTP);
router.get('/tps/:teacherId', authMiddleware(['enseignant', 'admin']),   teacherController.findAllTPs);
router.patch('/tps/:tpId', authMiddleware(['enseignant', 'admin']), tpController.updateTPById);
router.delete('/tps/:tpId', authMiddleware(['enseignant', 'admin']), teacherController.deleteTPById);

 
// route pour inscription des etudiants au TP
router.post('/tps/:tpId/inscription', authMiddleware(), tpController.registerForTP);

// routes pour les TPs

/* router.delete('/tps/', authMiddleware(['enseignant', 'admin']), tpController.deleteTPById);
router.get('/tps/:tpId', authMiddleware(['enseignant', 'admin']), tpController.findTPById); */


module.exports = router;