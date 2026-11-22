import { Fredoka } from 'next/font/google'
import Nav from './_views/Nav'
import { CONTACT } from './_lib/data'
import './labago.css'
const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-fredoka' })
export const metadata = { title: 'Labadab' }
export default function Layout({ children }) {
  return (
    <div className={`labago ${fredoka.variable} min-h-screen bg-white font-display text-ink antialiased`}>
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <footer className="mt-12 bg-mist px-4 py-8 text-center text-sm">
        <p className="font-bold">Contact us</p>
        <p>{CONTACT.address}</p>
        <p>{CONTACT.phone} · {CONTACT.email}</p>
        <p className="mt-3 opacity-70">Labadab · BSCS Legacy System Redesign project</p>
      </footer>
    </div>
  )
}
