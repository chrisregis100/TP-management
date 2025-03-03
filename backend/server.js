const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { authMiddleware } = require('./src/middleware/authMiddeleware');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Database Connection
connectDB();
// Routes

app.use('/api', require('./src/routes/userRoutes'));
 app.use('/api', require('./src/routes/tpRoutes'));

 app.get("/private", authMiddleware("enseignant"), (req, res) => {
  
  res.json({ message: "Accès autorisé" });  
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé !');
});

module.exports = app;