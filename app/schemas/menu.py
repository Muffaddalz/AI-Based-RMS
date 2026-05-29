from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MenuItemBase(BaseModel):
    name : str
    description : Optional[str] = None
    price: float
    category : str = None
    is_available : bool = True
    
class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name : Optional[str] = None
    description : Optional[str] = None
    price : Optional[float] = None
    category : Optional[str] = None
    is_available : Optional[bool] = None
    
class MenuItem(MenuItemBase):
    id:int
    created_at : datetime
    updated_at : Optional[datetime] = None
    
    class Config:
        from_attributes = True