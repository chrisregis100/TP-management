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
    const { nom, prenom, email, motDePasse, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new User({
      nom,
      prenom,
      email,
      motDePasse,
      role: role || 'etudiant'
    });
    console.log(nouvelUtilisateur);
    

    // Générer et envoyer un code de vérification
    const codeVerification = genererCodeVerification();
    nouvelUtilisateur.codeVerification = codeVerification;
    nouvelUtilisateur.codeVerificationExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    
    // Envoyer l'email de vérification
    const emailEnvoye = await envoyerEmailVerification(email, codeVerification);
    if (!emailEnvoye) {
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de vérification' });
    }


    // Sauvegarder l'utilisateur
    await nouvelUtilisateur.save();

    res.status(201).json({
      message: 'Inscription réussie. Veuillez vérifier votre email.',
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        prenom: nouvelUtilisateur.prenom,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role
      }
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'inscription', 
      erreur: erreur.message 
    });
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
    const { email, motDePasse } = req.body;

    // Rechercher l'utilisateur
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const motDePasseCorrespondant = await utilisateur.comparerMotDePasse(motDePasse);
    if (!motDePasseCorrespondant) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si l'email est vérifié
    if (!utilisateur.estVerifie) {
      return res.status(403).json({ message: 'Veuillez vérifier votre email' });
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
    const { nom, prenom, email, motDePasse } = req.body;

    // Vérification spécifique de l'email pour les enseignants
    if (!email.endsWith('@uac.bj')) {
      return res.status(400).json({ 
        message: 'Les enseignants doivent utiliser une adresse email se terminant par @uac.bj' 
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