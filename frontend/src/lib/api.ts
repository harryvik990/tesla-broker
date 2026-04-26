import axios from 'axios';

const BASE = (import.meta as any).env.REACT_APP_BACKEND_URL || '';
export const API = `${BASE}/api`;

export const apiClient = axios.create({
  baseURL: API,
  timeout: 15000,
});

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

export const TELEGRAM_HANDLE = 'TMBsupport_X';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

export async function trackVisit(page: string): Promise<{ ok: boolean; visit_id?: string }> {
  try {
    const { data } = await apiClient.post('/visits', { page });
    return data;
  } catch {
    return { ok: false };
  }
}

export async function trackCta(action: string, page: string): Promise<{ ok: boolean }> {
  try {
    const { data } = await apiClient.post('/cta', { action, page });
    return data;
  } catch {
    return { ok: false };
  }
}

export async function getPlans(): Promise<Plan[]> {
  const { data } = await apiClient.get<Plan[]>('/plans');
  return data;
}

export async function getStats(): Promise<Stat[]> {
  const { data } = await apiClient.get<Stat[]>('/stats');
  return data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await apiClient.get<Testimonial[]>('/testimonials');
  return data;
}

export async function getFaqs(): Promise<Faq[]> {
  const { data } = await apiClient.get<Faq[]>('/faqs');
  return data;
}

export async function getSteps(): Promise<Step[]> {
  const { data } = await apiClient.get<Step[]>('/steps');
  return data;
}
