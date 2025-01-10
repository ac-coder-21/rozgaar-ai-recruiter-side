from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt as pyjwt
import datetime
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

SECRET_KEY = "your_secret_key"

# MongoDB setup
MONGO_URL = os.getenv("MONGO_URL")
mongo_client = MongoClient(MONGO_URL)
db = mongo_client.resume_checker
jobs_collection = db.jobs

# Mock user data
users = {
    "admin@example.com": "password"
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email in users and users[email] == password:
        # Generate JWT token
        token = pyjwt.encode(
            {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401

@app.route('/api/jobs', methods=['POST'])
def create_job():
    try:
        # Debugging: Log request headers, form data, and files
        print("Request Headers:", request.headers)
        print("Request Form Data:", request.form)
        print("Request Files:", request.files)

        # Check if a file is included in the request
        if 'pdf' not in request.files:
            print("Error: No PDF file provided in the request.")
            return jsonify({"message": "No PDF file provided"}), 400

        # Retrieve file and form data
        pdf = request.files['pdf']
        unique_id = request.form.get('uniqueId')
        title = request.form.get('title')
        lpa = request.form.get('lpa')
        company = request.form.get('company')
        location = request.form.get('location')
        email = request.form.get('email')
        hiring_manager = request.form.get('hiringManager')
        recruiter = request.form.get('recruiter')
        start_date = request.form.get('startDate')
        end_date = request.form.get('endDate')
        target_candidates = request.form.get('targetCandidates')
        source = request.form.get('source')

        # Debugging: Log all form data
        print("Form Data Received:")
        print(f"uniqueId: {unique_id}, title: {title}, lpa: {lpa}, company: {company}, location: {location}, email: {email}, hiringManager: {hiring_manager}, recruiter: {recruiter}, startDate: {start_date}, endDate: {end_date}, targetCandidates: {target_candidates}, source: {source}")

        # Check if any form data is missing
        if not all([unique_id, title, lpa, company, location, email, hiring_manager, recruiter, start_date, end_date, target_candidates, source]):
            print("Error: Missing form data. Ensure all fields are filled.")
            return jsonify({"message": "Missing form data"}), 400

        # Create job data object
        job_data = {
            "unique_id": unique_id,
            "title": title,
            "lpa": lpa,
            "company": company,
            "location": location,
            "email": email,
            "hiring_manager": hiring_manager,
            "recruiter": recruiter,
            "start_date": start_date,
            "end_date": end_date,
            "target_candidates": target_candidates,
            "source": source,
            "pdf_filename": pdf.filename,
            "created_at": datetime.datetime.utcnow()
        }

        # Insert into MongoDB
        jobs_collection.insert_one(job_data)

        print("Job created successfully:", job_data)
        return jsonify({"message": "Job created successfully"}), 201

    except Exception as e:
        # Catch and log any server-side errors
        print("Error occurred:", str(e))
        return jsonify({"message": "Internal server error"}), 500




if __name__ == '__main__':
    app.run(debug=True)
