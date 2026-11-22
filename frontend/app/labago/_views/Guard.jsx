'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../_lib/store'
// Para sa pages na kailangang naka-login: <Guard>{(user) => ...}</Guard>
export default function Guard({ children }) {
  const user = useUser()
  const router = useRouter()
  useEffect(() => { if (user === null) router.replace('/labago/login') }, [user, router])
  return user ? children(user) : null
}
