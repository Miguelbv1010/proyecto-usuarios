import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Login from './components/Login';

function App() {
  const [session, setSession] = useState(null);
  const [editing, setEditing] = useState(null);

  if (!session) return <Login onLogged={setSession} />;

  return (
    <div style={{ padding: 20 }}>
      <h1>React + Supabase (API separada)</h1>
      <p>Hola, {session.usuario.nombre} ({session.usuario.rol})</p>
      <UserForm editing={editing} onDone={() => setEditing(null)} />
      <UserList onEdit={setEditing} />
    </div>
  );
}
export default App;
