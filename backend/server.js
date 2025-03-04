const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Database Connection
connectDB();
// Routes

app.use('/api', require('./src/routes/userRoutes'));
 app.use('/api', require('./src/routes/tpRoutes'));

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