"""Tesla Mining backend — FastAPI + MongoDB.

Endpoints:
- GET  /api/                health check
- GET  /api/plans           investment plans
- GET  /api/stats           hero stats
- GET  /api/testimonials    investor testimonials
- GET  /api/faqs            faq list
- GET  /api/steps           how-it-works steps
- POST /api/visits          log a page visit (analytics)
- POST /api/cta             log a cta click (analytics)
- GET  /api/visits/summary  aggregate visit counts (admin)
"""
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Tesla Mining API", version="1.0.0")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger("tesla-mining")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


# ---------- Models ----------
class Plan(BaseModel):
    id: str
    name: str
    price: str
    period: str
    features: List[str]
    cta: str
    featured: bool = False
    badge: Optional[str] = None
    borderColor: str = "#1E293B"


class Stat(BaseModel):
    id: str
    label: str
    value: int
    prefix: Optional[str] = None
    suffix: Optional[str] = None
    decimals: Optional[int] = 0


class Testimonial(BaseModel):
    id: str
    name: str
    location: str
    avatar: str
    quote: str
    rating: int
    investment: str


class Faq(BaseModel):
    id: str
    question: str
    answer: str


class Step(BaseModel):
    number: str
    title: str
    description: str


class VisitIn(BaseModel):
    page: str


class CtaIn(BaseModel):
    action: str
    page: str


# ---------- Static content (would normally live in DB; kept inline for simplicity) ----------
PLANS: List[Plan] = [
    Plan(
        id="starter",
        name="Starter Miner",
        price="$500",
        period="one-time",
        features=[
            "180-day mining contract",
            "0.8% daily yield",
            "5 TH/s hash power",
            "Daily dashboard access",
            "Email support",
        ],
        cta="Get Started",
        featured=False,
        borderColor="#1E293B",
    ),
    Plan(
        id="pro",
        name="Pro Miner",
        price="$2,500",
        period="one-time",
        badge="MOST POPULAR",
        features=[
            "365-day mining contract",
            "1.2% daily yield",
            "25 TH/s hash power",
            "Real-time analytics",
            "Priority email + chat support",
            "Monthly broker review call",
        ],
        cta="Start Mining",
        featured=True,
        borderColor="#3B82F6",
    ),
    Plan(
        id="enterprise",
        name="Enterprise Miner",
        price="$10,000",
        period="one-time",
        features=[
            "730-day mining contract",
            "1.8% daily yield",
            "120 TH/s hash power",
            "Dedicated account manager",
            "API access for integrations",
            "Custom payout scheduling",
            "Tesla Energy Priority allocation",
        ],
        cta="Contact Sales",
        featured=False,
        borderColor="#10B981",
    ),
]

STATS: List[Stat] = [
    Stat(id="aum", label="Total Assets Managed", value=2400, prefix="$", suffix="B+"),
    Stat(id="miners", label="Active Miners", value=147000, suffix="+"),
    Stat(id="payouts", label="Paid Out This Month", value=18200000, prefix="$"),
    Stat(id="uptime", label="Network Uptime", value=9997, suffix="%", decimals=2),
]

TESTIMONIALS: List[Testimonial] = [
    Testimonial(
        id="sarah",
        name="Sarah M.",
        location="Seattle, WA",
        avatar="/images/avatar-sarah.jpg",
        quote=(
            "I started with the Starter plan to test the waters. Within 3 months I "
            "upgraded to Pro. The daily payouts are consistent and the dashboard "
            "makes everything transparent."
        ),
        rating=5,
        investment="Pro Miner — $2,500",
    ),
    Testimonial(
        id="james",
        name="James K.",
        location="London, UK",
        avatar="/images/avatar-james.jpg",
        quote=(
            "As a financial advisor, I vetted this platform thoroughly. The broker "
            "credentials check out, the Tesla partnership is verifiable, and my "
            "clients have seen steady 1.2% daily returns."
        ),
        rating=5,
        investment="Enterprise Miner — $10,000",
    ),
    Testimonial(
        id="elena",
        name="Elena R.",
        location="Singapore",
        avatar="/images/avatar-elena.jpg",
        quote=(
            "The AI switching between blockchain networks is brilliant. While my "
            "friends struggle with which coin to mine, Tesla Mining automatically "
            "optimizes for the highest yield every day."
        ),
        rating=5,
        investment="Pro Miner — $2,500",
    ),
    Testimonial(
        id="marcus",
        name="Marcus T.",
        location="Austin, TX",
        avatar="/images/avatar-marcus.jpg",
        quote=(
            "I was skeptical about cloud mining until I saw the Tesla energy "
            "infrastructure firsthand during a facility tour. The operational "
            "transparency here is unlike anything else in the industry."
        ),
        rating=5,
        investment="Starter + Pro — $3,000",
    ),
]

FAQS: List[Faq] = [
    Faq(
        id="partnership",
        question="Is Tesla Mining Investments officially partnered with Tesla?",
        answer=(
            "Yes. We operate through a formal energy supply and infrastructure "
            "partnership with Tesla Energy. Our mining facilities utilize Tesla's "
            "Megapack battery storage and solar grid systems."
        ),
    ),
    Faq(
        id="protection",
        question="How are my funds protected?",
        answer=(
            "All client funds are held in segregated accounts with our licensed "
            "broker partners. We maintain full regulatory compliance with FINRA "
            "and undergo quarterly third-party audits."
        ),
    ),
    Faq(
        id="withdraw",
        question="When can I withdraw my earnings?",
        answer=(
            "Daily mining rewards are calculated at 00:00 UTC and immediately "
            "available for withdrawal. There are no lock-up periods."
        ),
    ),
    Faq(
        id="coins",
        question="What cryptocurrencies do you mine?",
        answer=(
            "Our AI-powered systems dynamically allocate hash power across "
            "Bitcoin, Ethereum, Litecoin, and other SHA-256 and Scrypt networks "
            "based on real-time profitability analysis."
        ),
    ),
    Faq(
        id="fees",
        question="Are there any hidden fees?",
        answer=(
            "No. Our pricing is fully transparent. The one-time plan fee covers "
            "your entire contract period. A small 2% maintenance fee is deducted "
            "from daily yields to cover facility operations."
        ),
    ),
    Faq(
        id="visit",
        question="Can I visit the mining facility?",
        answer=(
            "Enterprise tier investors are invited to quarterly facility tours at "
            "our Nevada and Texas locations. Pro tier investors can join annual "
            "virtual facility tours with live Q&A."
        ),
    ),
]

STEPS: List[Step] = [
    Step(
        number="01",
        title="Quick Registration",
        description=(
            "Sign up with your email and complete our streamlined KYC verification. "
            "Our broker partners handle compliance securely."
        ),
    ),
    Step(
        number="02",
        title="Select Investment Tier",
        description=(
            "Pick from our range of mining contracts starting at $500. Higher tiers "
            "unlock priority energy allocation and bonus yields."
        ),
    ),
    Step(
        number="03",
        title="Deposit & Launch",
        description=(
            "Fund your account via bank transfer, card, or crypto deposit. Your "
            "mining hardware goes live within 2 hours of confirmation."
        ),
    ),
    Step(
        number="04",
        title="Automated Payouts",
        description=(
            "Mining rewards are calculated every 24 hours and credited to your "
            "dashboard. Withdraw anytime to your wallet or bank."
        ),
    ),
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"status": "ok", "service": "tesla-mining-api"}


@api_router.get("/plans", response_model=List[Plan])
async def list_plans():
    return PLANS


@api_router.get("/stats", response_model=List[Stat])
async def list_stats():
    return STATS


@api_router.get("/testimonials", response_model=List[Testimonial])
async def list_testimonials():
    return TESTIMONIALS


@api_router.get("/faqs", response_model=List[Faq])
async def list_faqs():
    return FAQS


@api_router.get("/steps", response_model=List[Step])
async def list_steps():
    return STEPS


@api_router.post("/visits")
async def log_visit(payload: VisitIn):
    visit_id = str(uuid.uuid4())
    doc = {
        "id": visit_id,
        "page": payload.page,
        "ts": datetime.now(timezone.utc).isoformat(),
    }
    await db.visits.insert_one(dict(doc))
    return {"ok": True, "visit_id": visit_id}


@api_router.post("/cta")
async def log_cta(payload: CtaIn):
    doc = {
        "id": str(uuid.uuid4()),
        "action": payload.action,
        "page": payload.page,
        "ts": datetime.now(timezone.utc).isoformat(),
    }
    await db.cta_clicks.insert_one(dict(doc))
    return {"ok": True}


@api_router.get("/visits/summary")
async def visits_summary():
    pipeline = [
        {"$group": {"_id": "$page", "count": {"$sum": 1}}},
        {"$project": {"page": "$_id", "count": 1, "_id": 0}},
        {"$sort": {"count": -1}},
    ]
    results = await db.visits.aggregate(pipeline).to_list(100)
    total = sum(r["count"] for r in results)
    return {"total": total, "by_page": results}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
