from flask import Flask
from routes.project_routes import project_bp
from routes.execution_routes import execution_bp
from routes.patch_routes import patch_bp
from routes.report_routes import report_bp

app = Flask(__name__)

app.register_blueprint(project_bp, url_prefix="/api/project")
app.register_blueprint(execution_bp, url_prefix="/api/execute")
app.register_blueprint(patch_bp, url_prefix="/api/patch")
app.register_blueprint(report_bp, url_prefix="/api/report")

if __name__ == "__main__":
    app.run(debug=True)
