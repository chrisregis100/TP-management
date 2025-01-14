const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Constantes pour la configuration
const CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  MATRICULE_LENGTH: 8,
  EMAIL_DOMAIN: '@uac.bj',
  VERIFICATION_CODE_EXPIRY: 24 * 60 * 60 * 1000, // 24 heures
};

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  prenom: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        if (!validator.isEmail(email)) {
          return false;
        }
        
        if (this.role === 'enseignant' && !email.endsWith(CONFIG.EMAIL_DOMAIN)) {
          throw new Error(`Les enseignants doivent utiliser une adresse email se terminant par ${CONFIG.EMAIL_DOMAIN}`);
        }
        
        return true;
      },
      message: props => `${props.value} n'est pas une adresse email valide`
    }
  },
  matricule: {
    type: String,
    required: [true, 'Le matricule est requis'],
    unique: true,
    validate: {
      validator: function(matricule) {
        // Le matricule doit avoir exactement 8 caractères et être alphanumérique
        return validator.isLength(matricule, { min: CONFIG.MATRICULE_LENGTH, max: CONFIG.MATRICULE_LENGTH }) &&
               validator.isAlphanumeric(matricule);
      },
      message: 'Le matricule doit contenir exactement 8 caractères alphanumériques'
    }
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
  //  minlength: [CONFIG.PASSWORD_MIN_LENGTH, `Le mot de passe doit contenir au moins ${CONFIG.PASSWORD_MIN_LENGTH} caractères`]
  },
  role: {
    type: String,
    enum: {
      values: ['etudiant', 'enseignant', 'admin'],
      message: '{VALUE} n\'est pas un rôle valide'
    },
    default: 'etudiant'
  },
  estVerifie: {
    type: Boolean,
    default: false
  },
  codeVerification: String,
  codeVerificationExpire: {
    type: Date,
    default: function() {
      return new Date(Date.now() + CONFIG.VERIFICATION_CODE_EXPIRY);
    }
  },
  tpsInscrits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TP'
  }],
  derniereDateConnexion: {
    type: Date
  },
  tentativesConnexion: {
    count: { type: Number, default: 0 },
    lastAttempt: { type: Date }
  },

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour optimiser les recherches
UserSchema.index({ email: 1 });
UserSchema.index({ matricule: 1 });
UserSchema.index({ role: 1 });

// Virtuals
UserSchema.virtual('nomComplet').get(function() {
  return `${this.prenom} ${this.nom}`;
});

// Middleware de pré-sauvegarde
UserSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next();

  try {
    const salt = await bcrypt.genSalt(CONFIG.SALT_ROUNDS);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthodes d'instance
UserSchema.methods.comparerMotDePasse = async function(motDePasseCandidat) {
  return bcrypt.compare(motDePasseCandidat, this.motDePasse);
};


UserSchema.methods.reinitialiserTentativesConnexion = function() {
  this.tentativesConnexion.count = 0;
  this.tentativesConnexion.lastAttempt = null;
  this.estBloque = false;
  return this.save();
};

// Méthodes statiques
UserSchema.statics.verifierDisponibiliteEmail = async function(email) {
  const utilisateur = await this.findOne({ email });
  return !utilisateur;
};

module.exports = mongoose.model('User', UserSchema);