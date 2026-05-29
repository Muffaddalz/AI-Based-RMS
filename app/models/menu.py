from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database import Base

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255))
    price = Column(Float, nullable=False)
    category = Column(String(50), nullable=False)  # "appetizer", "main", "dessert"
    is_available = Column(Integer, default=1)  # 1=true, 0=false
    created_at = Column(DateTime(timezone=True), server_default=func.now())
