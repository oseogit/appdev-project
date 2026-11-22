'use client'
import { useEffect, useState } from 'react'
import { CITIES, isOpen, hoursText } from '../_lib/data'
export default function Locations() {
  const [q, setQ] = useState('')
  const [city, setCity] = useState('All')
  const [now, setNow] = useState(null)
  useEffect(() => { setNow(new Date()) }, [])
  const text = q.toLowerCase()
  const groups = CITIES
    .filter((c) => city === 'All' || c.city === city)
    .map((c) => ({ ...c, shown: c.branches.filter((b) => (b.name + b.address).toLowerCase().includes(text)) }))
    .filter((c) => !text || c.shown.length > 0)
  return (
    <div>
      <h1 className="text-3xl">Labadab Locations</h1>
      <p className="mt-1">37 locations and counting…</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px]">
        <div><label className="label" htmlFor="q">Search</label><input id="q" className="input" placeholder="Branch or address" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label className="label" htmlFor="c">City</label><select id="c" className="input" value={city} onChange={(e) => setCity(e.target.value)}><option>All</option>{CITIES.map((c) => <option key={c.city}>{c.city}</option>)}</select></div>
      </div>
      {groups.length === 0 && <p className="mt-6">No branch matches your search. Try another city or clear the search box.</p>}
      {groups.map((c) => (
        <section key={c.city} className="mt-8">
          <h2 className="text-2xl">{c.city}</h2>
          {c.shown.length === 0
            ? <p className="mt-2 text-sm italic">Branch details are not yet added for this city.</p>
            : <div className="mt-3 grid gap-4 sm:grid-cols-2">{c.shown.map((b) => (
                <article key={b.id} className="rounded-2xl border-2 border-skylt p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg">{b.name}</h3>
                    {now && <span className={`rounded-full px-3 py-1 text-xs font-bold ${isOpen(b, now) ? 'bg-sun text-ink' : 'bg-mist'}`}>{isOpen(b, now) ? 'Open now' : 'Closed'}</span>}
                  </div>
                  <p className="mt-1">{b.address}</p>
                  <p className="mt-2 text-sm">{hoursText(b)}</p>
                  <p className="text-sm font-bold">{b.phone}</p>
                </article>))}</div>}
        </section>
      ))}
    </div>
  )
}
