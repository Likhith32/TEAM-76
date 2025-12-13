# Security utilities
# utils/security.py

BLOCKED_COMMANDS = ["rm -rf", "shutdown", "reboot", "mkfs"]


def is_command_safe(command):
    for blocked in BLOCKED_COMMANDS:
        if blocked in command.lower():
            return False
    return True
