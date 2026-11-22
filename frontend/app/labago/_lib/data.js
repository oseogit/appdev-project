// Presyo mula sa Services page ng Labadab (SRP, nag-iiba ayon sa branch)
export const SERVICES = [
  { id: 'wash-lite', group: 'Wash', name: 'Lite', detail: '4kg · 22 mins', price: 55 },
  { id: 'wash-regular', group: 'Wash', name: 'Regular', detail: '8kg · 36 mins', price: 75 },
  { id: 'dry-lite', group: 'Dry', name: 'Lite', detail: '4kg · 25 mins', price: 45 },
  { id: 'dry-regular', group: 'Dry', name: 'Regular', detail: '8kg · 40 mins', price: 65 },
]
// Mga lungsod mula sa Locations page ng Labadab (37 branches kabuuan).
// Isa pa lang ang may kumpletong detalye. Para magdagdag: i-click ang lungsod sa totoong site,
// kopyahin ang detalye ng branch, at ilagay sa `branches` ng lungsod na iyon.
export const CITIES = [
  { city: 'Taguig', branches: [
    { id: 'taguig-maharlika', name: 'Labadab Maharlika', address: 'Block 76 Lot 9 Maharlika Road, Upper Bicutan, Taguig City', phone: '0939-9195-594', days: [1,2,3,4,5], open: 8, close: 17 },
  ] },
  ...['Makati', 'Muntinlupa', 'Las Pinas', 'Cavite', 'San Pedro Laguna', 'Binan Laguna', 'Sta Rosa Laguna', 'Cabuyao Laguna', 'Calamba Laguna', 'Los Banos Laguna', 'Tarlac', 'Batangas'].map((city) => ({ city, branches: [] })),
]
export const CONTACT = {
  address: 'Anuva Residences, East Service Road, Brgy Buli, Muntinlupa City, Metro Manila 1771',
  phone: '0998 981 0805', email: 'inquiries@labadab.com.ph',
}
const D = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// Ang oras (d) ay galing sa component, hindi dito, dahil bawal ang new Date() sa render (Cache Components)
export const isOpen = (b, d) => b.days.includes(d.getDay()) && d.getHours() >= b.open && d.getHours() < b.close
export const hoursText = (b) => `${D[b.days[0]]}-${D[b.days[b.days.length - 1]]}, ${b.open}:00-${b.close}:00`
