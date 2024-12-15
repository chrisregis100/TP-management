// backend/controllers/tpController.js
const TP = require('../models/TP');

//create tp
exports.createTP = async (req, res) => {
  try {
    const { 
      title, 
      filiere,
      annee,
      description, 
      capacity, 
      price, 
    } = req.body;
    console.log(req.body);
    
    console.log( req.user);
    

    const newTP = new TP({
      title,
      filiere,
      annee,
      description,
      capacity,
      teacher: req.user.id,
      price,
    });

    const savedTP = await newTP.save();

    res.status(201).json({
      message: 'TP créé avec succès',
      tp: savedTP
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erreur lors de la création du TP',
      error: error.message 
    });
  }
};


// inscription des etudiants au TP
exports.registerForTP = async (req, res) => {
  try {
    const tp = await TP.findById(req.params.tpId);
    console.log(tp);

    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé' });
    }

    if (tp.isFullyBooked()) {
      return res.status(400).json({ message: 'TP complet' });
    }

    console.log(req.user);
    

    // Vérifier si l'étudiant est déjà inscrit
    if (tp.registeredStudents.includes(req.user.id)) {
      return res.status(400).json({ message: 'Déjà inscrit à ce TP' });
    }

    tp.registeredStudents.push(req.user.id);
    await tp.save();

    res.status(200).json({
      message: 'Inscription réussie',
      tp
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erreur lors de l\'inscription',
      error: error.message 
    });
  }
};

// find all TPs
exports.findAllTPs = async (req, res) => {
  try {
    const tps = await TP.find();
    res.json(tps);
  } catch (error) {
    res.status(400).json({ 
      message: 'Erreur lors de la recherche des TPs',
      error: error.message 
    });
  }
};

// find TP by ID
exports.findTPById = async (req, res) => {
  try {
    const tp = await TP.findById(req.params.tpId);
    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé' });
    }
    res.json(tp);
  } catch (error) {
    res.status(400).json({ 
      message: 'Erreur lors de la recherche du TP',
      error: error.message 
    });
  }
};

// update TP by ID
exports.updateTPById = async (req, res) => {
  try {
    const tp = await TP.findById(req.params.tpId);
    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé' });
    }

    // Vérifier si l'étudiant est déjà inscrit
    if (!tp.registeredStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Vous n\'êtes pas inscrit à ce TP' });
    }

    tp.title = req.body.title || tp.title;
    tp.description = req.body.description || tp.description;
    tp.capacity = req.body.capacity || tp.capacity;
    tp.price = req.body.price || tp.price;
    tp.startDate = req.body.startDate || tp.startDate;
    tp.endDate = req.body.endDate || tp.endDate;

    await tp.save();

    res.status(200).json({
      message: 'TP mis à jour avec succès',
      tp
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erreur lors de la mise à jour du TP',
      error: error.message 
    });
  }
};

// delete TP by ID
exports.deleteTPById = async (req, res) => {
  try {
    const tp = await TP.findById(req.params.tpId);
    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé' });
    }

    // Vérifier si l'étudiant est déjà inscrit
    if (!tp.registeredStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Vous n\'êtes pas inscrit à ce TP' });
    }

    tp.registeredStudents = tp.registeredStudents.filter(student => student.toString() !== req.user._id.toString());
    await tp.save();

    res.status(200).json({
      message: 'TP supprimé avec succès',
      tp
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erreur lors de la suppression du TP',
      error: error.message 
    });
  }
};