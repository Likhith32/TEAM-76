# create_tables.py

from config.supabase import engine
from models.base import Base

# Import models so SQLAlchemy registers them
from models.project import Project
from models.log import Log
from models.patch import Patch


def create_tables():
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully")


if __name__ == "__main__":
    create_tables()
