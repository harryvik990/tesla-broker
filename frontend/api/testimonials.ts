export const config = {
  runtime: 'edge',
}

const TESTIMONIALS = [
  {
    id: 'sarah',
    name: 'Sarah M.',
    location: 'Seattle, WA',
    avatar: '/images/avatar-sarah.jpg',
    quote:
      'I started with the Starter plan to test the waters. Within 3 months I upgraded to Pro. The daily payouts are consistent and the dashboard makes everything transparent.',
    rating: 5,
    investment: 'Pro Miner — $2,500',
  },
  {
    id: 'james',
    name: 'James K.',
    location: 'London, UK',
    avatar: '/images/avatar-james.jpg',
    quote:
      'As a financial advisor, I vetted this platform thoroughly. The broker credentials check out, the Tesla partnership is verifiable, and my clients have seen steady 1.2% daily returns.',
    rating: 5,
    investment: 'Enterprise Miner — $10,000',
  },
  {
    id: 'elena',
    name: 'Elena R.',
    location: 'Singapore',
    avatar: '/images/avatar-elena.jpg',
    quote:
      'The AI switching between blockchain networks is brilliant. While my friends struggle with which coin to mine, Tesla Mining automatically optimizes for the highest yield every day.',
    rating: 5,
    investment: 'Pro Miner — $2,500',
  },
  {
    id: 'marcus',
    name: 'Marcus T.',
    location: 'Austin, TX',
    avatar: '/images/avatar-marcus.jpg',
    quote:
      'I was skeptical about cloud mining until I saw the Tesla energy infrastructure firsthand during a facility tour. The operational transparency here is unlike anything else in the industry.',
    rating: 5,
    investment: 'Starter + Pro — $3,000',
  },
]

export default function handler() {
  return new Response(JSON.stringify(TESTIMONIALS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
