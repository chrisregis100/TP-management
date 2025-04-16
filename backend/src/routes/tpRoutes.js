const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddeleware");
const tpController = require("../controllers/tpController");
const teacherController = require("../controllers/teacherController");

// routes pour les actions enseignant
router.post(
  "/createTP",
  authMiddleware(["enseignant", "admin"]),
  teacherController.createTP
);
router.get(
  "/tps/:teacherId",
  authMiddleware(["enseignant", "admin"]),
  teacherController.findAllTPs
);
router.put(
  "/tps/:tpId",
  authMiddleware(["enseignant", "admin"]),
  teacherController.updateTPById
);
router.delete(
  "/tps/:tpId",
  authMiddleware(["enseignant", "admin"]),
  teacherController.deleteTPById
);
router.get(
  "/tps/studentlist/:teacherId",
  authMiddleware(["enseignant", "admin"]),
  teacherController.getStudentsByTPId
);

// route pour inscription des etudiants au TP
router.post(
  "/tps/register/:tpId",
  authMiddleware(["etudiant", "admin"]),
  tpController.registerForTP
);
router.get(
  "/tps",
  authMiddleware(["etudiant", "admin"]),
  tpController.getAllTPs
);

// routes pour les TPs

/* router.delete('/tps/', authMiddleware(['enseignant', 'admin']), tpController.deleteTPById);
router.get('/tps/:tpId', authMiddleware(['enseignant', 'admin']), tpController.findTPById); */

module.exports = router;
