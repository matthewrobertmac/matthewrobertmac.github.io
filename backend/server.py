from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import httpx
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

app = FastAPI(title="Diia Thesis API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

PDF_URL = "https://customer-assets.emergentagent.com/job_35dfb78f-7ed9-4c3b-b6b1-f2802659a17f/artifacts/kfojc4e5_The_Diia_Thesis_Minimal.pdf"

BOOK_METADATA = {
    "title": "The Diia Thesis",
    "subtitle": "AI, Digital Government, and the Future of Civic Intelligence — From Ukraine to the World",
    "author": "Civic Intelligence Research Program",
    "year": 2024,
    "pages": 160,
    "language": "English",
    "license": "Academic Research — Open Access",
    "pdf_url": PDF_URL,
    "description": (
        "A rigorous academic thesis arguing that Ukraine's Diia platform represents "
        "a pioneering global laboratory for civic artificial intelligence. Drawing on "
        "philosophical traditions from Marx, Wojtyla, and Cossack democratic heritage, "
        "it examines whether digital government can genuinely serve human dignity — "
        "or become a tool for surveillance and control."
    ),
    "themes": [
        {
            "id": "civic-ai",
            "title": "Civic AI & Digital Government",
            "description": "Ukraine's Diia platform as a global model for citizen-first artificial intelligence in public service delivery.",
            "tag": "Digital Governance",
            "icon": "cpu"
        },
        {
            "id": "hromada",
            "title": "Hromada: Community Self-Governance",
            "description": "The Ukrainian concept of hromada — collective community agency — as the normative ideal guiding digital transformation.",
            "tag": "Political Philosophy",
            "icon": "users"
        },
        {
            "id": "dignity",
            "title": "Human Dignity & Participation",
            "description": "Synthesizing Wojtyla's philosophy of participation with Marxian alienation theory to evaluate citizen-state digital relationships.",
            "tag": "Ethics",
            "icon": "shield"
        },
        {
            "id": "resilience",
            "title": "War-Time Resilience",
            "description": "Ukraine's digital transformation under active conflict — how crisis accelerates civic technology and tests institutional design.",
            "tag": "War-time Governance",
            "icon": "zap"
        },
        {
            "id": "honest-ai",
            "title": "Honest AI & Transparency",
            "description": "AI systems must report uncertainty rather than fabricate answers. Transparency and accountability as foundational civic values.",
            "tag": "AI Ethics",
            "icon": "eye"
        },
        {
            "id": "linguistic-sovereignty",
            "title": "Linguistic Sovereignty",
            "description": "Developing AI models that preserve and process the Ukrainian language — linking technological capacity to national identity.",
            "tag": "Cultural Rights",
            "icon": "globe"
        },
        {
            "id": "surveillance",
            "title": "Democracy vs. Surveillance",
            "description": "Critical engagement with Zuboff, Morozov, and Eubanks on algorithmic discrimination, surveillance capitalism, and authoritarian creep.",
            "tag": "Critical Theory",
            "icon": "alert-triangle"
        },
        {
            "id": "institutional-design",
            "title": "Institutional Design",
            "description": "Technology is not neutral: the political valence of digital government is determined by institutional architecture, not the code itself.",
            "tag": "Institutional Design",
            "icon": "building"
        }
    ],
    "comparisons": ["Estonia", "India", "China", "Singapore", "Rwanda", "Brazil"],
    "updated_at": "2024-01-01T00:00:00Z"
}


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "diia-thesis-api", "timestamp": datetime.utcnow().isoformat()}


@app.get("/api/book")
async def get_book():
    return BOOK_METADATA


@app.get("/api/pdf")
async def proxy_pdf():
    """Proxy the PDF to avoid CORS issues."""
    async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client_http:
        try:
            response = await client_http.get(PDF_URL)
            if response.status_code == 200:
                return StreamingResponse(
                    iter([response.content]),
                    media_type="application/pdf",
                    headers={
                        "Content-Disposition": "inline; filename=The_Diia_Thesis.pdf",
                        "Access-Control-Allow-Origin": "*",
                    }
                )
            else:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch PDF")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
