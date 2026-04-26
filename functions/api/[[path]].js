// Cloudflare Pages Function — handles ALL /api/* requests.
// File-based routing: this file responds to every request matching /api/*.
// Deployed automatically when you connect the repo to Cloudflare Pages.
//
// Required environment variables (set in Cloudflare Pages dashboard):
//   MONGO_URL  — MongoDB Atlas connection string
//   DB_NAME    — database name (e.g. "tesla_mining")
//
// Cloudflare Workers cannot use the standard `mongodb` driver (it needs Node
// TCP). We use the **MongoDB Atlas Data API** instead — a REST layer Atlas
// provides for free that works from any edge runtime.
//
// To enable Data API:
//   1. Atlas → Data API → Enable for your cluster
//   2. Create an API key → copy it
//   3. In Cloudflare add: ATLAS_DATA_API_URL, ATLAS_DATA_API_KEY,
//      ATLAS_CLUSTER (e.g. "Cluster0")

const PLANS = [
  { id: 'starter', name: 'Starter Miner', price: '$500', period: 'one-time',
    features: ['180-day mining contract', '0.8% daily yield', '5 TH/s hash power', 'Daily dashboard access', 'Email support'],
    cta: 'Get Started', featured: false, badge: null, borderColor: '#1E293B' },
  { id: 'pro', name: 'Pro Miner', price: '$2,500', period: 'one-time', badge: 'MOST POPULAR',
    features: ['365-day mining contract', '1.2% daily yield', '25 TH/s hash power', 'Real-time analytics', 'Priority email + chat support', 'Monthly broker review call'],
    cta: 'Start Mining', featured: true, borderColor: '#3B82F6' },
  { id: 'enterprise', name: 'Enterprise Miner', price: '$10,000', period: 'one-time',
    features: ['730-day mining contract', '1.8% daily yield', '120 TH/s hash power', 'Dedicated account manager', 'API access for integrations', 'Custom payout scheduling', 'Tesla Energy Priority allocation'],
    cta: 'Contact Sales', featured: false, badge: null, borderColor: '#10B981' },
];

const STATS = [
  { id: 'aum', label: 'Total Assets Managed', value: 2400, prefix: '$', suffix: 'B+', decimals: 0 },
  { id: 'miners', label: 'Active Miners', value: 147000, suffix: '+', decimals: 0 },
  { id: 'payouts', label: 'Paid Out This Month', value: 18200000, prefix: '$', decimals: 0 },
  { id: 'uptime', label: 'Network Uptime', value: 9997, suffix: '%', decimals: 2 },
];

const TESTIMONIALS = [
  { id: 'sarah', name: 'Sarah M.', location: 'Seattle, WA', avatar: '/images/avatar-sarah.jpg',
    quote: "I started with the Starter plan to test the waters. Within 3 months I upgraded to Pro. The daily payouts are consistent and the dashboard makes everything transparent.",
    rating: 5, investment: 'Pro Miner — $2,500' },
  { id: 'james', name: 'James K.', location: 'London, UK', avatar: '/images/avatar-james.jpg',
    quote: 'As a financial advisor, I vetted this platform thoroughly. The broker credentials check out, the Tesla partnership is verifiable, and my clients have seen steady 1.2% daily returns.',
    rating: 5, investment: 'Enterprise Miner — $10,000' },
  { id: 'elena', name: 'Elena R.', location: 'Singapore', avatar: '/images/avatar-elena.jpg',
    quote: 'The AI switching between blockchain networks is brilliant. While my friends struggle with which coin to mine, Tesla Mining automatically optimizes for the highest yield every day.',
    rating: 5, investment: 'Pro Miner — $2,500' },
  { id: 'marcus', name: 'Marcus T.', location: 'Austin, TX', avatar: '/images/avatar-marcus.jpg',
    quote: 'I was skeptical about cloud mining until I saw the Tesla energy infrastructure firsthand during a facility tour. The operational transparency here is unlike anything else in the industry.',
    rating: 5, investment: 'Starter + Pro — $3,000' },
];

const FAQS = [
  { id: 'partnership', question: 'Is Tesla Mining Investments officially partnered with Tesla?',
    answer: "Yes. We operate through a formal energy supply and infrastructure partnership with Tesla Energy. Our mining facilities utilize Tesla's Megapack battery storage and solar grid systems." },
  { id: 'protection', question: 'How are my funds protected?',
    answer: 'All client funds are held in segregated accounts with our licensed broker partners. We maintain full regulatory compliance with FINRA and undergo quarterly third-party audits.' },
  { id: 'withdraw', question: 'When can I withdraw my earnings?',
    answer: 'Daily mining rewards are calculated at 00:00 UTC and immediately available for withdrawal. There are no lock-up periods.' },
  { id: 'coins', question: 'What cryptocurrencies do you mine?',
    answer: 'Our AI-powered systems dynamically allocate hash power across Bitcoin, Ethereum, Litecoin, and other SHA-256 and Scrypt networks based on real-time profitability analysis.' },
  { id: 'fees', question: 'Are there any hidden fees?',
    answer: 'No. Our pricing is fully transparent. The one-time plan fee covers your entire contract period. A small 2% maintenance fee is deducted from daily yields to cover facility operations.' },
  { id: 'visit', question: 'Can I visit the mining facility?',
    answer: 'Enterprise tier investors are invited to quarterly facility tours at our Nevada and Texas locations. Pro tier investors can join annual virtual facility tours with live Q&A.' },
];

const STEPS = [
  { number: '01', title: 'Quick Registration', description: 'Sign up with your email and complete our streamlined KYC verification. Our broker partners handle compliance securely.' },
  { number: '02', title: 'Select Investment Tier', description: 'Pick from our range of mining contracts starting at $500. Higher tiers unlock priority energy allocation and bonus yields.' },
  { number: '03', title: 'Deposit & Launch', description: 'Fund your account via bank transfer, card, or crypto deposit. Your mining hardware goes live within 2 hours of confirmation.' },
  { number: '04', title: 'Automated Payouts', description: 'Mining rewards are calculated every 24 hours and credited to your dashboard. Withdraw anytime to your wallet or bank.' },
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

// Atlas Data API helper
async function dataApi(env, action, payload) {
  if (!env.ATLAS_DATA_API_URL || !env.ATLAS_DATA_API_KEY) {
    throw new Error('ATLAS_DATA_API_URL and ATLAS_DATA_API_KEY env vars missing');
  }
  const res = await fetch(`${env.ATLAS_DATA_API_URL}/action/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': env.ATLAS_DATA_API_KEY,
    },
    body: JSON.stringify({
      dataSource: env.ATLAS_CLUSTER || 'Cluster0',
      database: env.DB_NAME,
      ...payload,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Atlas Data API ${action} failed: ${res.status} ${text}`);
  }
  return res.json();
}

function uuid() {
  return crypto.randomUUID();
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  // Strip the /api prefix
  let path = url.pathname.replace(/^\/api/, '') || '/';

  try {
    if (method === 'GET' && path === '/') return json({ status: 'ok', service: 'tesla-mining-api' });
    if (method === 'GET' && path === '/plans') return json(PLANS);
    if (method === 'GET' && path === '/stats') return json(STATS);
    if (method === 'GET' && path === '/testimonials') return json(TESTIMONIALS);
    if (method === 'GET' && path === '/faqs') return json(FAQS);
    if (method === 'GET' && path === '/steps') return json(STEPS);

    if (method === 'POST' && path === '/visits') {
      const body = await request.json();
      if (!body.page) return json({ error: 'page is required' }, 400);
      const visit_id = uuid();
      await dataApi(env, 'insertOne', {
        collection: 'visits',
        document: { id: visit_id, page: body.page, ts: new Date().toISOString() },
      });
      return json({ ok: true, visit_id });
    }

    if (method === 'POST' && path === '/cta') {
      const body = await request.json();
      if (!body.action || !body.page) return json({ error: 'action and page required' }, 400);
      await dataApi(env, 'insertOne', {
        collection: 'cta_clicks',
        document: { id: uuid(), action: body.action, page: body.page, ts: new Date().toISOString() },
      });
      return json({ ok: true });
    }

    if (method === 'GET' && path === '/visits/summary') {
      const result = await dataApi(env, 'aggregate', {
        collection: 'visits',
        pipeline: [
          { $group: { _id: '$page', count: { $sum: 1 } } },
          { $project: { page: '$_id', count: 1, _id: 0 } },
          { $sort: { count: -1 } },
        ],
      });
      const docs = result.documents || [];
      const total = docs.reduce((s, r) => s + (r.count || 0), 0);
      return json({ total, by_page: docs });
    }

    return json({ error: 'not found', path, method }, 404);
  } catch (err) {
    return json({ error: 'internal error', message: err.message }, 500);
  }
}
