'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser, logout } from '../_lib/store'
export default function Nav() {
  const user = useUser()
  const path = usePathname()
  const router = useRouter()
  const item = (href, label) => (
    <Link href={href} className={`px-2 py-1 text-lg font-bold uppercase tracking-wide ${path === href ? 'text-sun' : 'text-white hover:text-sun'}`}>{label}</Link>
  )
  return (
    <header className="bg-sky">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-4" aria-label="Main">
        <Link href="/labago" className="mr-4 text-4xl font-bold lowercase text-white">labadab</Link>
        {item('/labago', 'Home')}{item('/labago/services', 'Services')}{item('/labago/locations', 'Locations')}
        <span className="ml-auto flex items-center gap-3">
          {user ? (<>
            <Link href="/labago/account" className="font-bold text-white underline">{user.name.split(' ')[0]}</Link>
            <button className="btn-sun" onClick={() => { logout(); router.push('/labago') }}>Log out</button>
          </>) : <Link href="/labago/login" className="btn-sun">Log in</Link>}
        </span>
      </nav>
    </header>
  )
}
