export const config = {
  runtime: 'edge',
}

const PLANS = [
  {
    id: 'starter',
    name: 'Starter Miner',
    price: '$500',
    period: 'one-time',
    features: [
      '180-day mining contract',
      '0.8% daily yield',
      '5 TH/s hash power',
      'Daily dashboard access',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
    borderColor: '#1E293B',
  },
  {
    id: 'pro',
    name: 'Pro Miner',
    price: '$2,500',
    period: 'one-time',
    badge: 'MOST POPULAR',
    features: [
      '365-day mining contract',
      '1.2% daily yield',
      '25 TH/s hash power',
      'Real-time analytics',
      'Priority email + chat support',
      'Monthly broker review call',
    ],
    cta: 'Start Mining',
    featured: true,
    borderColor: '#3B82F6',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Miner',
    price: '$10,000',
    period: 'one-time',
    features: [
      '730-day mining contract',
      '1.8% daily yield',
      '120 TH/s hash power',
      'Dedicated account manager',
      'API access for integrations',
      'Custom payout scheduling',
      'Tesla Energy Priority allocation',
    ],
    cta: 'Contact Sales',
    featured: false,
    borderColor: '#10B981',
  },
]

export default function handler() {
  return new Response(JSON.stringify(PLANS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
