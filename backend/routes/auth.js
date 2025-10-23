// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email requerido' });

  const { data: user, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(401).json({ error: 'Credenciales inválidas' });

  // Rol simulado para el reto
  const rol = (email === 'juan.perez@email.com') ? 'admin' : 'usuario';
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

  res.json({ ok: true, usuario: { id: user.id, nombre: user.nombre, email: user.email, rol }, token });
});

module.exports = router;
