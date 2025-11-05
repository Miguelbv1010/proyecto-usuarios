import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);

  const load = () =>
    axios.get(`${API}/api/usuarios`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    await axios.delete(`${API}/api/usuarios/${id}`);
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Teléfono</th><th>Acciones</th>
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
                <button onClick={() => onEdit(u)}>Editar</button>
                <button onClick={() => onDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserList;
