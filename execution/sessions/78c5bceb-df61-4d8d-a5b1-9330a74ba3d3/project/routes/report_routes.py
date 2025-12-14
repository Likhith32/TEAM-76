from flask import Blueprint
report_bp = Blueprint("report", __name__)

@report_bp.route("/final")
def report():
    return {"status": "report generated"}
