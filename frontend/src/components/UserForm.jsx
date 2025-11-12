import { useEffect, useState } from 'react'
import { api } from '../api'

export default function UserForm({ editing, onDone }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })

  useEffect(() => {
    if (editing) setForm({ nombre: editing.nombre, email: editing.email, telefono: editing.telefono || '' })
  }, [editing])

  const save = async (e) => {
    e.preventDefault()
    if (editing) {
      await api.put(`/api/usuarios/${editing.id}`, form)
    } else {
      await api.post('/api/usuarios', form)
    }
    setForm({ nombre: '', email: '', telefono: '' })
    onDone?.()
  }

  return (
    <form onSubmit={save} style={{ margin: '20px 0', display: 'grid', gap: 8 }}>
      <h3>{editing ? 'Editar usuario' : 'Crear usuario'}</h3>
      <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && <button type="button" onClick={() => onDone?.()}>Cancelar</button>}
      </div>
    </form>
  )
}
