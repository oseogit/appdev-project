'use client'
import Link from 'next/link'
import { useUser } from '../_lib/store'
export default function Home() {
  const user = useUser()
  return (
    <div className="space-y-14">
      <section className="max-w-2xl">
        <p className="font-bold uppercase tracking-wide text-skydk">DIY · Full Service Laundry Shop</p>
        <h1 className="mt-2 text-4xl leading-tight md:text-5xl">Fast, Fresh, Folded</h1>
        <p className="mt-4 text-lg">Spending too much time washing, drying, and folding? Labadab does your laundry fast, fresh, and folded at an affordable price, so you can spend your time on what you love.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/labago/locations" className="btn-sun">Find a Labadab near you</Link>
          <Link href="/labago/services" className="btn">Our services</Link>
        </div>
        {!user && <p className="mt-4">New here? <Link href="/labago/login" className="font-bold text-skydk underline">Create an account</Link> to choose your preferred services.</p>}
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-mist p-6"><h2 className="text-2xl">Full Service: Wash, Dry &amp; Fold</h2><p className="mt-2">Drop off your clothes and get them back fast, fresh, and folded.</p></div>
        <div className="rounded-2xl bg-mist p-6"><h2 className="text-2xl">Self Service: DIY</h2><p className="mt-2">Use our washers and dryers to save time. No need to wait for the sun.</p></div>
      </section>
      <section className="max-w-2xl">
        <h2 className="text-2xl">May Libreng Sabon &amp; Fabcon sa Bawat Laba</h2>
        <p className="mt-2">Every wash comes with free ASTRON liquid detergent and fabric conditioner, an eco-friendly, plant-based pair.</p>
      </section>
      <section className="max-w-2xl rounded-2xl border-2 border-skylt p-6">
        <h2 className="text-2xl">We Lab the Community</h2>
        <p className="mt-2">Labadab takes care of the laundry of Casa Miani, an orphanage managed by St. Jerome Parish in Alabang.</p>
      </section>
    </div>
  )
}
