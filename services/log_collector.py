# Collect execution logs
# services/log_collector.py

import os
import json
import datetime

LOG_BASE_PATH = "storage/logs"


def save_logs(project_id, stage, stdout, stderr):
    timestamp = datetime.datetime.utcnow().isoformat()
    project_log_dir = os.path.join(LOG_BASE_PATH, project_id)
    os.makedirs(project_log_dir, exist_ok=True)

    log_data = {
        "timestamp": timestamp,
        "stage": stage,
        "stdout": stdout,
        "stderr": stderr
    }

    log_file = os.path.join(project_log_dir, f"{stage}.json")
    with open(log_file, "w", encoding="utf-8") as f:
        json.dump(log_data, f, indent=2)

    return log_file


def load_logs(project_id):
    project_log_dir = os.path.join(LOG_BASE_PATH, project_id)
    logs = []

    if not os.path.exists(project_log_dir):
        return logs

    for file in os.listdir(project_log_dir):
        with open(os.path.join(project_log_dir, file), "r", encoding="utf-8") as f:
            logs.append(json.load(f))

    return logs
