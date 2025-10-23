// backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

// GET /api/usuarios
router.get('/', async (_req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
  res.json(data);
});

// GET /api/usuarios/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).single();
  if (error || !data) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(data);
});

// POST /api/usuarios
router.post('/', async (req, res) => {
  const { nombre, email, telefono } = req.body || {};
  if (!nombre || !email) return res.status(400).json({ error: 'nombre y email son requeridos' });

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nombre, email, telefono }])
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: 'No se pudo crear', details: error.message });
  res.status(201).json(data);
});

// PUT /api/usuarios/:id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, email, telefono } = req.body || {};

  const { data, error } = await supabase
    .from('usuarios')
    .update({ nombre, email, telefono })
    .eq('id', id)
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: 'No se pudo actualizar', details: error.message });
  if (!data) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(data);
});

// DELETE /api/usuarios/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from('usuarios').delete().eq('id', id);
  if (error) return res.status(500).json({ error: 'No se pudo eliminar', details: error.message });
  res.status(204).send();
});

module.exports = router;
