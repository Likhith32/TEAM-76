# models/project.py

from sqlalchemy import Column, String, DateTime
from datetime import datetime
from models.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, index=True)
    source = Column(String, nullable=False)   # github / zip
    status = Column(String, default="created")  # created, failed, fixed
    created_at = Column(DateTime, default=datetime.utcnow)
