'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, register } from '../_lib/store'
export default function Auth() {
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const router = useRouter()
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setErr('')
    try { await (mode === 'login' ? login(f) : register(f)); router.push('/labago/services') } catch (x) { setErr(x.message) }
  }
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-3xl">{mode === 'login' ? 'Log in' : 'Create your account'}</h1>
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-mist p-5">
        {mode === 'register' && <div><label className="label" htmlFor="n">Full name</label><input id="n" required className="input" value={f.name} onChange={set('name')} /></div>}
        <div><label className="label" htmlFor="e">Email</label><input id="e" type="email" required className="input" value={f.email} onChange={set('email')} /></div>
        <div><label className="label" htmlFor="p">Password</label><input id="p" type="password" required minLength={6} className="input" value={f.password} onChange={set('password')} /></div>
        {err && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}
        <button className="btn w-full">{mode === 'login' ? 'Log in' : 'Create account'}</button>
      </form>
      <button className="mt-4 font-bold text-skydk underline" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErr('') }}>
        {mode === 'login' ? 'No account yet? Create one' : 'Already registered? Log in'}
      </button>
    </div>
  )
}
