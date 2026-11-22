'use client'
// MOCK DATA LAYER (localStorage). Ang Backend dev ang magpapalit ng laman ng bawat function
// ng Supabase/Firebase calls. Huwag baguhin ang pangalan ng functions at ang shape ng return values.
import { useEffect, useState } from 'react'
const read = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f } catch { return f } }
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v))
const subs = new Set()
const setSession = (u) => { write('lb_session', u); subs.forEach((f) => f(u)) }
// undefined = nag-lo-load pa, null = walang naka-login, object = naka-login
export const useUser = () => {
  const [u, setU] = useState(undefined)
  useEffect(() => { setU(read('lb_session', null)); subs.add(setU); return () => subs.delete(setU) }, [])
  return u
}
export async function register({ name, email, password }) {
  const all = read('lb_users', [])
  if (all.some((x) => x.email === email)) throw new Error('That email is already registered. Try logging in.')
  write('lb_users', [...all, { name, email, password }])
  setSession({ name, email })
}
export async function login({ email, password }) {
  const u = read('lb_users', []).find((x) => x.email === email && x.password === password)
  if (!u) throw new Error('Wrong email or password.')
  setSession({ name: u.name, email: u.email })
}
export const logout = () => setSession(null)
// Laundry Service Selection: listahan ng service ids na pinili ng customer
export const getSelection = async (email) => read('lb_selection', {})[email] || []
export async function saveSelection(email, ids) {
  write('lb_selection', { ...read('lb_selection', {}), [email]: ids })
}
