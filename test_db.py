from config.supabase import engine

try:
    conn = engine.connect()
    print("✅ Connected to Supabase PostgreSQL successfully")
    conn.close()
except Exception as e:
    print("❌ Connection failed:", e)
