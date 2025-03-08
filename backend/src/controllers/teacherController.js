const Field = require('../models/FieldsModel');
const TP = require('../models/TP');

//create tp
exports.createTP = async (req, res) => {
  try {
    const { 
      title, 
      filiere,
      annee,
      description, 
      maxStudents,
      horaire,
      duree,
      price, 
    } = req.body;        

    const newTP = new TP({
      title: title,
      filiere: filiere,
      annee: annee,
      description: description,
      capacity: maxStudents,
      horaire: horaire,
      duree: duree,
      teacher: req.user.id,
      price: price,
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


// find all tp by teacher id
exports.findAllTPs = async (req, res) => {
    try {
      const tps = await TP.find({ teacher: req.user.id });
      res.json(tps);
    } catch (error) {
      res.status(400).json({ 
        message: 'Erreur lors de la recherche des TPs',
        error: error.message 
      });
    }
  };


  // delete TP by teacher 

  exports.deleteTPById = async(req, res)=>{
    try {
      const tp = await TP.findById(req.params.tpId);
      if (!tp) {
        return res.status(404).json({ message: 'TP non trouvé' });
      }

      // Vérifier si l'enseignant est le propriétaire du TP
      if (tp.teacher.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Vous n\'êtes pas le propriétaire de ce TP' });
      }

      await tp.deleteOne();

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
  }
  // update TP by teacher
  exports.updateTPById = async (req, res) => {
    try {
      const tp = await TP.findById(req.params.tpId);
      if (!tp) {
        return res.status(404).json({ message: 'TP non trouvé' });
      }

      // Vérifier si l'enseignant est le propriétaire du TP
      if (tp.teacher.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Vous n\'êtes pas le propriétaire de ce TP' });
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
  }
 