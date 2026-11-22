'use client'
import Guard from '../_views/Guard'
import Account from '../_views/Account'
export default function Page() { return <Guard>{(user) => <Account user={user} />}</Guard> }
