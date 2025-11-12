// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// En Codespaces, este origin está bien para desarrollo local.
// Si usas el dominio público de Codespaces, ponlo aquí.
app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
}));
app.use(express.json());

// Log simple para depurar requests
app.use((req, _res, next) => { console.log(`${req.method} ${req.url}`); next(); });

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => res.json({ message: 'API de Usuarios funcionando correctamente' }));

// Manejadores de errores no capturados
process.on('unhandledRejection', (r) => console.error('UNHANDLED REJECTION =>', r));
process.on('uncaughtException', (e) => { console.error('UNCAUGHT EXCEPTION =>', e); process.exit(1); });

app.listen(process.env.PORT || 5050, '0.0.0.0', () =>
  console.log(`🚀 API en http://localhost:${process.env.PORT || 5050}`)
);

