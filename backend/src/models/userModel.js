const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validation générique de l'email
        if (!validator.isEmail(v)) return false;
        
        // Validation spécifique pour les enseignants
        if (this.role === 'enseignant' && !v.endsWith('@uac.bj')) {
          throw new Error('Les enseignants doivent utiliser une adresse email se terminant par @uac.bj');
        }
        
        return true;
      },
      message: 'Email invalide'
    }
  },
  motDePasse: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['etudiant', 'enseignant', 'admin'],
    default: 'etudiant'
  },
  estVerifie: {
    type: Boolean,
    default: false
  },
  codeVerification: {
    type: String,
    expire: Date
  },
  codeVerificationExpire: {
    type: Date
  },
  tpsInscrits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TP'
  }]
}, {
  timestamps: true
});

// Middleware pour hacher le mot de passe avant la sauvegarde
UserSchema.pre('save', async function(next) {
  // Hacher le mot de passe uniquement s'il a été modifié
  if (!this.isModified('motDePasse')) return next();

  try {
    // Générer un sel et hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparerMotDePasse = async function(motDePasseCandidat) {
  return bcrypt.compare(motDePasseCandidat, this.motDePasse);
};

module.exports = mongoose.model('User', UserSchema);