import { useState } from 'react'
import { api } from '../api'

export default function Login({ onLogged }) {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const { data } = await api.post('/api/auth/login', { email })
      onLogged?.(data) // { ok, usuario, token }
    } catch {
      setMsg('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={submit} style={{ padding: 20, display: 'grid', gap: 8 }}>
      <h2>Login</h2>
      <input type="email" placeholder="Tu email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Entrar</button>
      {!!msg && <p style={{ color: 'red' }}>{msg}</p>}
    </form>
  )
}
