from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database import get_db
from app.models.menu import MenuItem
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/menu", tags=["menu"])

class MenuCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str

class MenuItemOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    is_available: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

@router.post("/", response_model=MenuItemOut, status_code=201)
def create_menu_item(item: MenuCreate, db: Session = Depends(get_db)):
    db_item = MenuItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/", response_model=List[MenuItemOut])
def get_menu(db: Session = Depends(get_db)):
    items = db.execute(select(MenuItem).where(MenuItem.is_available == 1)).scalars().all()
    return items

@router.get("/{item_id}", response_model=MenuItemOut)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(MenuItem, item_id)
    if not item or not item.is_available:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
