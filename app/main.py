from fastapi import FastAPI
from app.routers.menu import router as menu_router
from app.schemas.menu import MenuItem
from  app.database import SessionLocal, engine
from app.models import menu
from app.routers.orders import router as orders_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Restaurant Management System",
    description="RMS APIs for orders, menu, inventory",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders_router)
app.include_router(menu_router)

app.include_router(menu_router, prefix="/api/v1/menu", tags=["menu"])

@app.get("/")
async def root():
    return {"message": "RMS API running! Check /docs"}

@app.get("/health")
async def health_check():
    return {"status": "ready"}
