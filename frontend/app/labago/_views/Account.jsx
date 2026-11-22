'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SERVICES } from '../_lib/data'
import { getSelection, saveSelection } from '../_lib/store'
export default function Account({ user }) {
  const [ids, setIds] = useState(null)
  useEffect(() => { getSelection(user.email).then(setIds) }, [user.email])
  const remove = async (id) => { const next = ids.filter((x) => x !== id); await saveSelection(user.email, next); setIds(next) }
  const chosen = SERVICES.filter((s) => ids?.includes(s.id))
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl">My account</h1>
      <p className="mt-2">{user.name} · {user.email}</p>
      <h2 className="mt-8 text-2xl">My selected services</h2>
      {ids === null ? <p className="mt-3">Loading…</p> : chosen.length === 0
        ? <p className="mt-3">You have not selected any services yet. <Link href="/labago/services" className="font-bold text-skydk underline">Choose services</Link></p>
        : <ul className="mt-3 space-y-2">{chosen.map((s) => (
            <li key={s.id} className="flex items-center justify-between rounded-xl border-2 border-skylt p-3">
              <span><b>{s.group}</b> {s.name} ({s.detail}) · ₱{s.price}</span>
              <button className="font-bold text-skydk underline" onClick={() => remove(s.id)}>Remove</button>
            </li>))}</ul>}
    </div>
  )
}
