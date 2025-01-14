const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { 
  genererCodeVerification, 
  envoyerEmailVerification 
} = require('../services/emailService');

// Générer un token JWT
const genererToken = (utilisateur) => {
  return jwt.sign(
    { 
      id: utilisateur._id, 
      email: utilisateur.email, 
      role: utilisateur.role,
      estVerifie: utilisateur.estVerifie
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Inscription générique
exports.inscription = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, matricule } = req.body;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !motDePasse || !matricule) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email, matricule });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email ou matricule existe déjà.' });
    }
    // Générer un code de vérification
    const codeVerification = genererCodeVerification();

    let nouvelUtilisateur;

    // Logique spécifique pour les enseignants
    if (email.endsWith('@uac.bj')) {
      if (!matricule.startsWith('TEA')) {
        return res.status(400).json({ 
          message: 'Les enseignants doivent utiliser un matricule valide commençant par TEA.' 
        });
      }

      nouvelUtilisateur = new User({
        nom,
        prenom,
        email,
        motDePasse,
        matricule,
        role: 'enseignant',
        codeVerification,
        codeVerificationExpire: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    } else {
      // Logique pour les étudiants
      nouvelUtilisateur = new User({
        nom,
        prenom,
        email,
        motDePasse,
        matricule,
        role: 'etudiant',
        codeVerification,
        codeVerificationExpire: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    }

    // Sauvegarder l'utilisateur
    await nouvelUtilisateur.save();

    // Envoyer l'email de vérification
    const emailEnvoye = await envoyerEmailVerification(email, codeVerification);
    if (!emailEnvoye) {
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de vérification.' });
    }

    res.status(201).json({
      message: 'Inscription réussie. Veuillez vérifier votre email.',
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        prenom: nouvelUtilisateur.prenom,
        email: nouvelUtilisateur.email,
        matricule: nouvelUtilisateur.matricule,
        role: nouvelUtilisateur.role,
      },
    });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur lors de l\'inscription.', erreur: erreur.message });
  }
};


// Vérification du code
exports.verifierCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    

    const utilisateur = await User.findOne({ 
      email, 
      codeVerification: code,
      codeVerificationExpire: { $gt: Date.now() }
    });

    if (!utilisateur) {
      return res.status(400).json({ message: 'Code de vérification invalide ou expiré' });
    }

    // Marquer l'utilisateur comme vérifié
    utilisateur.estVerifie = true;
    utilisateur.codeVerification = undefined;
    utilisateur.codeVerificationExpire = undefined;

    await utilisateur.save();

    // Générer un token
    const token = genererToken(utilisateur);

    res.json({
      message: 'Email vérifié avec succès',
      token,
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        matricule:utilisateur.matricule,
        role: utilisateur.role
      }
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la vérification', 
      erreur: erreur.message 
    });
  }
};

// Connexion
exports.connexion = async (req, res) => {
  try {
    const {matricule, password } = req.body;
    console.log(req.body);
    console.log(password);
    console.log(matricule);
    
    

    // Rechercher l'utilisateur
    const utilisateur = await User.findOne({ matricule });
    if (!utilisateur) {
      return res.status(401).json({ message: "Utilisateur non trouvé. veuillez vérifier votre matricule" });
    }
   
    

    // Vérifier le mot de passe
    const motDePasseCorrespondant = await utilisateur.comparerMotDePasse(password);
    if (!motDePasseCorrespondant) {
      return res.status(401).json({ message: 'matricule ou mot de passe incorrect' });
    }

    // Vérifier si l'email est vérifié
    if (!utilisateur.estVerifie) {
      return res.status(403).json({ message: 'Veuillez vérifier votre email pour comfirmer votre adresse mail' });
    }

    // Générer un token
    const token = genererToken(utilisateur);

    res.set('Authorization', `Bearer ${token}`);

    res.json({
      message: 'Connexion réussie',
      token,
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        matricule:utilisateur.matricule,
        role: utilisateur.role
      }
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la connexion', 
      erreur: erreur.message 
    });
  }
};

// Inscription spécifique pour les enseignants (par un admin)
exports.inscriptionEnseignant = async (req, res) => {
  try {
    const { nom, prenom, email, matricule, motDePasse } = req.body;

    // Vérification spécifique de l'email pour les enseignants
    if (!email.endsWith('@uac.bj')) {
      return res.status(400).json({ 
        message: 'Les enseignants doivent utiliser une adresse email se terminant par @uac.bj' 
      });
    }

    if(!matricule.startsWith('TEA')){
      return res.status(400).json({ 
        message: 'Les enseignants doivent utiliser un matricule valide commençant par TEA' 
      });
    }

    // Reste du processus d'inscription similaire à l'inscription standard
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    const nouvelEnseignant = new User({
      nom,
      prenom,
      email,
      motDePasse,
      matricule,
      role: 'enseignant'
    });

    // Générer et envoyer un code de vérification
    const codeVerification = genererCodeVerification();
    nouvelEnseignant.codeVerification = codeVerification;
    nouvelEnseignant.codeVerificationExpire = Date.now() + 15 * 60 * 1000;

    const emailEnvoye = await envoyerEmailVerification(email, codeVerification);
    if (!emailEnvoye) {
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de vérification' });
    }

    await nouvelEnseignant.save();

    res.status(201).json({
      message: 'Inscription enseignant réussie. Veuillez vérifier votre email.',
      utilisateur: {
        id: nouvelEnseignant._id,
        nom: nouvelEnseignant.nom,
        prenom: nouvelEnseignant.prenom,
        email: nouvelEnseignant.email,
        matricule:nouvelEnseignant.matricule,
        role: nouvelEnseignant.role
      }
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'inscription enseignant', 
      erreur: erreur.message 
    });
  }
};