# execution/clean_up.py
import os
import shutil
import time

SESSION_ROOT = "execution/sessions"
SESSION_TTL_SECONDS = 60 * 60  # 1 hour


def cleanup_old_sessions():
    """
    Deletes execution sessions older than TTL
    """
    if not os.path.exists(SESSION_ROOT):
        return

    now = time.time()

    for session_id in os.listdir(SESSION_ROOT):
        session_path = os.path.join(SESSION_ROOT, session_id)

        if not os.path.isdir(session_path):
            continue

        created_time = os.path.getctime(session_path)
        age = now - created_time

        if age > SESSION_TTL_SECONDS:
            shutil.rmtree(session_path, ignore_errors=True)


if __name__ == "__main__":
    cleanup_old_sessions()
