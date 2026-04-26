export const config = {
  runtime: 'edge',
}

const STEPS = [
  {
    number: '01',
    title: 'Quick Registration',
    description:
      'Sign up with your email and complete our streamlined KYC verification. Our broker partners handle compliance securely.',
  },
  {
    number: '02',
    title: 'Select Investment Tier',
    description:
      'Pick from our range of mining contracts starting at $500. Higher tiers unlock priority energy allocation and bonus yields.',
  },
  {
    number: '03',
    title: 'Deposit & Launch',
    description:
      'Fund your account via bank transfer, card, or crypto deposit. Your mining hardware goes live within 2 hours of confirmation.',
  },
  {
    number: '04',
    title: 'Automated Payouts',
    description:
      'Mining rewards are calculated every 24 hours and credited to your dashboard. Withdraw anytime to your wallet or bank.',
  },
]

export default function handler() {
  return new Response(JSON.stringify(STEPS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
