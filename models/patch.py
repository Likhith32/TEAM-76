# models/patch.py

from sqlalchemy import Column, String, Text, DateTime
from datetime import datetime
from models.base import Base


class Patch(Base):
    __tablename__ = "patches"

    id = Column(String, primary_key=True)
    project_id = Column(String, index=True)
    patch_content = Column(Text)
    applied = Column(String, default="no")  # yes / no
    created_at = Column(DateTime, default=datetime.utcnow)
