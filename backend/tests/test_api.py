"""Tesla Mining backend API tests."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://quick-deploy-free.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"


# --- Static content endpoints
class TestContent:
    def test_plans(self, client):
        r = client.get(f"{API}/plans")
        assert r.status_code == 200
        plans = r.json()
        assert isinstance(plans, list)
        assert len(plans) == 3
        ids = {p["id"] for p in plans}
        assert ids == {"starter", "pro", "enterprise"}
        for p in plans:
            for k in ("id", "name", "price", "period", "features", "cta", "featured", "borderColor"):
                assert k in p, f"missing key {k} in plan {p.get('id')}"
            assert isinstance(p["features"], list) and len(p["features"]) > 0

    def test_stats(self, client):
        r = client.get(f"{API}/stats")
        assert r.status_code == 200
        stats = r.json()
        assert len(stats) == 4
        ids = {s["id"] for s in stats}
        assert ids == {"aum", "miners", "payouts", "uptime"}
        for s in stats:
            assert isinstance(s["value"], int)

    def test_testimonials(self, client):
        r = client.get(f"{API}/testimonials")
        assert r.status_code == 200
        items = r.json()
        assert len(items) == 4
        for t in items:
            for k in ("id", "name", "location", "avatar", "quote", "rating", "investment"):
                assert k in t

    def test_faqs(self, client):
        r = client.get(f"{API}/faqs")
        assert r.status_code == 200
        faqs = r.json()
        assert len(faqs) == 6
        for f in faqs:
            assert "question" in f and "answer" in f and "id" in f

    def test_steps(self, client):
        r = client.get(f"{API}/steps")
        assert r.status_code == 200
        steps = r.json()
        assert len(steps) == 4
        for st in steps:
            assert "number" in st and "title" in st and "description" in st


# --- Analytics endpoints
class TestAnalytics:
    def test_visit_log_and_summary(self, client):
        # Get baseline summary
        baseline = client.get(f"{API}/visits/summary").json()
        baseline_total = baseline.get("total", 0)

        r = client.post(f"{API}/visits", json={"page": "home"})
        assert r.status_code == 200
        body = r.json()
        assert body.get("ok") is True
        assert isinstance(body.get("visit_id"), str) and len(body["visit_id"]) > 0

        # Verify persistence via summary
        summary = client.get(f"{API}/visits/summary")
        assert summary.status_code == 200
        s = summary.json()
        assert "total" in s and "by_page" in s
        assert s["total"] >= baseline_total + 1
        assert any(item.get("page") == "home" for item in s["by_page"])

    def test_visit_validation(self, client):
        r = client.post(f"{API}/visits", json={})
        assert r.status_code == 422

    def test_cta_log(self, client):
        r = client.post(f"{API}/cta", json={"action": "telegram-redirect", "page": "get-started"})
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_cta_validation(self, client):
        r = client.post(f"{API}/cta", json={"action": "x"})
        assert r.status_code == 422
