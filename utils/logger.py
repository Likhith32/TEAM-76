# utils/logger.py
import logging
import os

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

def get_logger(name: str):
    """
    Returns a configured logger instance
    """
    return logging.getLogger(name)
