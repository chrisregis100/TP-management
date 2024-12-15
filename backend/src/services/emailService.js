const nodemailer = require('nodemailer');

// Configuration du transporteur email
const transporteur = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587, // Assurez-vous que le port est défini
  secure: false, // STARTTLS pour le port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});


// Fonction pour générer un code de vérification
const genererCodeVerification = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Fonction d'envoi d'email de vérification
const envoyerEmailVerification = async (email, code) => {
  const optionsEmail = {
    from: 'chrisregiskiki@gmail.com', // Correspond à l'authentification
    to: email,
    subject: 'Vérification de votre compte TP Management',
    html: `
      <h1 class="text-center">Vérification de compte</h1>
      <p>Votre code de vérification est : <strong>${code}</strong></p>
      <p>Ce code expire dans 15 minutes.</p>
    `,
  };
  
  try {
    await transporteur.sendMail(optionsEmail);
    console.log('Email envoyé avec succès');
    
    return true;
  } catch (erreur) {
    console.error('Erreur lors de l\'envoi de l\'email', erreur);
    return false;
  }
};

module.exports = {
  genererCodeVerification,
  envoyerEmailVerification
};