# models/log.py

from sqlalchemy import Column, String, Text, DateTime
from datetime import datetime
from models.base import Base


class Log(Base):
    __tablename__ = "logs"

    id = Column(String, primary_key=True)
    project_id = Column(String, index=True)
    stage = Column(String)  # execution, dependency_install, post_patch_execution
    stdout = Column(Text)
    stderr = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
