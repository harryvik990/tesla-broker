export const config = {
  runtime: 'edge',
}

const FAQS = [
  {
    id: 'partnership',
    question: 'Is Tesla Mining Investments officially partnered with Tesla?',
    answer:
      'Yes. We operate through a formal energy supply and infrastructure partnership with Tesla Energy. Our mining facilities utilize Tesla Megapack battery storage and solar grid systems.',
  },
  {
    id: 'protection',
    question: 'How are my funds protected?',
    answer:
      'All client funds are held in segregated accounts with our licensed broker partners. We maintain full regulatory compliance with FINRA and undergo quarterly third-party audits.',
  },
  {
    id: 'withdraw',
    question: 'When can I withdraw my earnings?',
    answer:
      'Daily mining rewards are calculated at 00:00 UTC and immediately available for withdrawal. There are no lock-up periods.',
  },
  {
    id: 'coins',
    question: 'What cryptocurrencies do you mine?',
    answer:
      'Our AI-powered systems dynamically allocate hash power across Bitcoin, Ethereum, Litecoin, and other SHA-256 and Scrypt networks based on real-time profitability analysis.',
  },
  {
    id: 'fees',
    question: 'Are there any hidden fees?',
    answer:
      'No. Our pricing is fully transparent. The one-time plan fee covers your entire contract period. A small 2% maintenance fee is deducted from daily yields to cover facility operations.',
  },
  {
    id: 'visit',
    question: 'Can I visit the mining facility?',
    answer:
      'Enterprise tier investors are invited to quarterly facility tours at our Nevada and Texas locations. Pro tier investors can join annual virtual facility tours with live Q&A.',
  },
]

export default function handler() {
  return new Response(JSON.stringify(FAQS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
