'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SERVICES } from '../_lib/data'
import { useUser, getSelection, saveSelection } from '../_lib/store'
export default function Services() {
  const user = useUser()
  const [picked, setPicked] = useState([])
  const [saved, setSaved] = useState(false)
  useEffect(() => { if (user) getSelection(user.email).then(setPicked) }, [user])
  const toggle = (id) => { setSaved(false); setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])) }
  const save = async () => { await saveSelection(user.email, picked); setSaved(true) }
  const total = SERVICES.filter((s) => picked.includes(s.id)).reduce((a, s) => a + s.price, 0)
  return (
    <div>
      <h1 className="text-3xl">DIY Self Service Laundry</h1>
      <p className="mt-2 max-w-2xl">Liquid detergent and fabric conditioner are free with every wash.</p>
      {!user && <p className="mt-4 rounded-xl bg-mist p-4"><Link href="/labago/login" className="font-bold text-skydk underline">Log in</Link> to select your preferred services.</p>}
      {['Wash', 'Dry'].map((g) => (
        <section key={g} className="mt-8 max-w-lg">
          <h2 className="mb-2 text-3xl uppercase">{g}*</h2>
          <div className="space-y-2">
            {SERVICES.filter((s) => s.group === g).map((s) => {
              const on = picked.includes(s.id)
              const row = (<>
                <span className={`flex-1 px-4 py-4 text-left font-bold ${on ? 'bg-sun/40' : 'bg-white'}`}>{on && '✓ '}{s.name} ({s.detail})</span>
                <span className="flex w-24 items-center bg-skydk px-3 font-bold text-white">₱{s.price}</span>
              </>)
              return user
                ? <button key={s.id} aria-pressed={on} onClick={() => toggle(s.id)} className="flex w-full overflow-hidden border-2 border-skylt">{row}</button>
                : <div key={s.id} className="flex overflow-hidden border-2 border-skylt">{row}</div>
            })}
          </div>
        </section>
      ))}
      <p className="mt-6 text-sm italic">*Prices are SRP only. Prices may vary by location and may change without prior notice.</p>
      {user && (
        <div className="mt-6 max-w-lg rounded-2xl bg-mist p-5">
          <p className="font-bold">{picked.length} selected · ₱{total} (SRP, for reference)</p>
          <button className="btn mt-3" onClick={save}>Save my selection</button>
          {saved && <p role="status" className="mt-3 font-bold text-skydk">Saved to your account.</p>}
        </div>
      )}
    </div>
  )
}
