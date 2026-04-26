// Static data - works in both dev and production
export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  featured: boolean;
  badge?: string;
  borderColor: string;
};

export type Stat = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  investment: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

// Telegram configuration
export const TELEGRAM_HANDLE = 'TMBsupport_X';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

export function buildTelegramLink(message?: string): string {
  if (!message) return TELEGRAM_URL;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;
}

// Static data
const PLANS: Plan[] = [
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
];

const STATS: Stat[] = [
  { id: 'aum', label: 'Total Assets Managed', value: 2400, prefix: '$', suffix: 'B+' },
  { id: 'miners', label: 'Active Miners', value: 147000, suffix: '+' },
  { id: 'payouts', label: 'Paid Out This Month', value: 18200000, prefix: '$' },
  { id: 'uptime', label: 'Network Uptime', value: 9997, suffix: '%', decimals: 2 },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Michael R.',
    location: 'Austin, TX',
    avatar: 'MR',
    quote: 'Started with the Starter plan six months ago. Consistent daily payouts, no issues withdrawing. Already upgraded to Pro.',
    rating: 5,
    investment: '$2,500',
  },
  {
    id: '2',
    name: 'Sarah K.',
    location: 'Miami, FL',
    avatar: 'SK',
    quote: 'The transparency is what sold me. I can see my hash rate and earnings in real-time. Tesla backing gives me confidence.',
    rating: 5,
    investment: '$10,000',
  },
  {
    id: '3',
    name: 'David L.',
    location: 'Seattle, WA',
    avatar: 'DL',
    quote: 'Enterprise tier has been phenomenal. My dedicated account manager helped me optimize my portfolio strategy.',
    rating: 5,
    investment: '$50,000',
  },
  {
    id: '4',
    name: 'Jennifer M.',
    location: 'Denver, CO',
    avatar: 'JM',
    quote: 'Was skeptical at first, but the regulated operations and daily payouts proved me wrong. Great passive income stream.',
    rating: 4,
    investment: '$5,000',
  },
];

const FAQS: Faq[] = [
  {
    id: '1',
    question: 'How does Tesla Mining Broker work?',
    answer: 'We partner with Tesla Energy to provide institutional-grade cryptocurrency mining infrastructure. You invest in mining contracts, and our certified brokers manage the operations while you earn daily returns.',
  },
  {
    id: '2',
    question: 'What is the minimum investment?',
    answer: 'Our Starter Miner plan begins at $500 for a 180-day contract. This gives you access to 5 TH/s of hash power with a 0.8% daily yield.',
  },
  {
    id: '3',
    question: 'How and when do I receive payouts?',
    answer: 'Payouts are processed daily and credited to your dashboard wallet. You can withdraw to your personal crypto wallet or bank account at any time with no minimum withdrawal limits.',
  },
  {
    id: '4',
    question: 'Is this regulated?',
    answer: 'Yes, Tesla Mining Broker operates under full regulatory compliance with transparent operations. All mining activities are audited and we maintain 99.9% network uptime.',
  },
  {
    id: '5',
    question: 'Can I upgrade my plan?',
    answer: 'Absolutely! You can upgrade at any time. Your existing contract will be prorated and applied toward the new plan. Many of our investors start with Starter and upgrade to Pro within months.',
  },
  {
    id: '6',
    question: 'What support do you offer?',
    answer: 'All plans include email support. Pro members get priority email and chat support plus monthly broker review calls. Enterprise members receive a dedicated account manager.',
  },
];

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Choose Your Plan',
    description: 'Select from Starter, Pro, or Enterprise mining contracts based on your investment goals and risk tolerance.',
  },
  {
    number: '02',
    title: 'Connect with a Broker',
    description: 'Our certified brokers will guide you through the onboarding process and help optimize your mining strategy.',
  },
  {
    number: '03',
    title: 'Fund Your Account',
    description: 'Securely transfer funds via crypto or bank transfer. Your investment is immediately allocated to mining operations.',
  },
  {
    number: '04',
    title: 'Start Earning',
    description: 'Watch your daily earnings grow in real-time. Withdraw anytime with no minimums or hidden fees.',
  },
];

// API functions - return static data with simulated async
export async function getPlans(): Promise<Plan[]> {
  return Promise.resolve(PLANS);
}

export async function getStats(): Promise<Stat[]> {
  return Promise.resolve(STATS);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return Promise.resolve(TESTIMONIALS);
}

export async function getFaqs(): Promise<Faq[]> {
  return Promise.resolve(FAQS);
}

export async function getSteps(): Promise<Step[]> {
  return Promise.resolve(STEPS);
}

// Analytics tracking - no-op in static mode
export async function trackVisit(page: string): Promise<{ ok: boolean; visit_id?: string }> {
  console.log('[Analytics] Page visit:', page);
  return { ok: true, visit_id: crypto.randomUUID() };
}

export async function trackCta(action: string, page: string): Promise<{ ok: boolean }> {
  console.log('[Analytics] CTA click:', action, 'on', page);
  return { ok: true };
}
