import { useEffect, useState } from 'react'
import { api } from '../api'

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([])

  const load = async () => {
    const { data } = await api.get('/api/usuarios')
    setUsers(data)
  }

  useEffect(() => { load() }, [])

  const onDelete = async (id) => {
    await api.delete(`/api/usuarios/${id}`)
    load()
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>User List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono || '-'}</td>
              <td>
                <button onClick={() => onEdit(u)}>Editar</button>{' '}
                <button onClick={() => onDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
