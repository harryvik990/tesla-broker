export const config = {
  runtime: 'edge',
}

const STATS = [
  { id: 'aum', label: 'Total Assets Managed', value: 2400, prefix: '$', suffix: 'B+' },
  { id: 'miners', label: 'Active Miners', value: 147000, suffix: '+' },
  { id: 'payouts', label: 'Paid Out This Month', value: 18200000, prefix: '$' },
  { id: 'uptime', label: 'Network Uptime', value: 9997, suffix: '%', decimals: 2 },
]

export default function handler() {
  return new Response(JSON.stringify(STATS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
