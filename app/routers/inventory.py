from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db

router = APIRouter(prefix="/inventory", tags=["inventory"])


class InventoryItemBase(BaseModel):
    name: str
    category: str
    stock: int
    unit: Optional[str] = "kg"
    reorderLevel: Optional[int] = 0
    supplier: Optional[str] = ""


class InventoryItemCreate(InventoryItemBase):
    pass


class InventoryItemOut(InventoryItemBase):
    id: int


@router.get("/", response_model=List[InventoryItemOut])
def get_inventory(db: Session = Depends(get_db)):
    inventory_items = [
        InventoryItemOut(
            id=1,
            name="Basmati Rice",
            category="Grains",
            stock=18,
            unit="kg",
            reorderLevel=20,
            supplier="FreshMart",
        ),
        InventoryItemOut(
            id=2,
            name="Chicken",
            category="Meat",
            stock=8,
            unit="kg",
            reorderLevel=10,
            supplier="DailyCuts",
        ),
        InventoryItemOut(
            id=3,
            name="Paneer",
            category="Dairy",
            stock=0,
            unit="kg",
            reorderLevel=6,
            supplier="MilkZone",
        ),
    ]
    return inventory_items


@router.post("/", response_model=InventoryItemOut, status_code=201)
def create_inventory_item(item: InventoryItemCreate, db: Session = Depends(get_db)):
    return InventoryItemOut(
        id=0,
        name=item.name,
        category=item.category,
        stock=item.stock,
        unit=item.unit,
        reorderLevel=item.reorderLevel,
        supplier=item.supplier,
    )
