// backend/controllers/tpController.js
const Field = require("../models/FieldsModel");
const TP = require("../models/TP");
const userModel = require("../models/userModel");

// inscription des etudiants au TP
exports.registerForTP = async (req, res) => {
  try {
    const tp = await TP.findById(req.params.tpId);
    console.log(tp);

    if (!tp) {
      return res
        .status(404)
        .json({ message: "Le TP selectionné n'existe pas" });
    }

    console.log(req.user);

    // Vérifier si l'étudiant est déjà inscrit
    if (tp.registeredStudents.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Vous etes déjà inscrit à ce TP" });
    }

    tp.registeredStudents.push(req.user.id);
    await tp.save();

    res.status(200).json({
      message: "Inscription réussie",
      tp,
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de l'inscription",
      error: error.message,
    });
  }
};

// find TP by ID
exports.findTPById = async (req, res) => {
  try {
    const tp = await TP.findById(req.params.tpId);
    if (!tp) {
      return res.status(404).json({ message: "TP non trouvé" });
    }
    res.json(tp);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la recherche du TP",
      error: error.message,
    });
  }
};

// get all tps

exports.getAllTPs = async (req, res) => {
  try {
    const tps = await TP.find();
    res.json(tps);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la recherche des TPs",
      error: error.message,
    });
  }
};

// get student by id
exports.getStudentById = async (req, res) => {
  try {
    const student = await userModel.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student non trouvé" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la recherche de l'étudiant",
      error: error.message,
    });
  }
};
