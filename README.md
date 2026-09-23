# Media Platform

A simple full-stack Media Platform application built with React, Flask, and PostgreSQL.

The application currently provides:

- Movies
- Technology News
- Technology categories:
  - Mobiles
  - Cars
  - Laptops
  - AI

---

## Architecture

The application currently runs as:

Browser
   |
   v
React + Vite
   |
   | HTTP API requests
   v
Flask Backend
   |
   | SQLAlchemy / psycopg2
   v
PostgreSQL
   |
   v
media_platform database


### Current Development Ports

| Component | Port |
|---|---:|
| Frontend | 5173 |
| Backend | 5000 |
| PostgreSQL | 5432 |

---

# Prerequisites

Before running the application, install:

- Git
- Python 3
- Node.js
- npm
- PostgreSQL

Recommended versions:

- Python 3.9+
- Node.js 22+
- PostgreSQL 15+

---
1. Clone the Repository

Clone the repository:

git clone https://github.com/DevOpsCloudZone/Project.git

Go into the project:

cd Project

Check the project:

ls -la

Expected structure:

Project/
├── .git/
├── .gitignore
├── README.md
├── DevOps/
├── Documentation/
├── backend/
├── db/
└── frontend/
2. PostgreSQL Database Setup

Make sure PostgreSQL is running.

For systems using systemd:

sudo systemctl start postgresql

Check the status:

sudo systemctl status postgresql

2.1 Create the Database User

Switch to the PostgreSQL administrative user:

sudo -iu postgres

Open PostgreSQL:

psql

Create the application user:

CREATE USER media_user WITH PASSWORD 'YOUR_DATABASE_PASSWORD';

Create the database:

CREATE DATABASE media_platform;

Grant database privileges:

GRANT ALL PRIVILEGES ON DATABASE media_platform TO media_user;

Make the application user the database owner:

ALTER DATABASE media_platform OWNER TO media_user;

Exit PostgreSQL:

\q

Exit the postgres operating-system user:

exit

3. Configure PostgreSQL Authentication

The application connects to PostgreSQL through localhost.

The PostgreSQL authentication configuration should allow local password authentication.

Check:

sudo vim /var/lib/pgsql/data/pg_hba.conf

The local host entries should use:

host    all    all    127.0.0.1/32    scram-sha-256
host    all    all    ::1/128         scram-sha-256

Restart PostgreSQL after making changes:

sudo systemctl restart postgresql
4. Configure Database Schema Permissions

Switch to the PostgreSQL administrator:

sudo -iu postgres

Open PostgreSQL:

psql

Connect to the application database:

\c media_platform

Grant schema permissions:

GRANT USAGE, CREATE ON SCHEMA public TO media_user;

Make the application user the owner of the public schema:

ALTER SCHEMA public OWNER TO media_user;

Exit:

\q

Then:

exit



5. Initialize the Database

The database initialization script is located at:

db/init.sql

Run it using the application database user:

cd ~/Project
psql -h 127.0.0.1 -U media_user -W -d media_platform

Enter the database password when prompted.

Then execute:

\i db/init.sql

Alternatively, from the Linux shell:

psql -h 127.0.0.1 -U media_user -W -d media_platform -f db/init.sql
6. Database Tables

The current database contains:

movies
tech_categories
tech_news
Movies

The movies table contains:

id
title
description
rating
release_year
Technology Categories

The tech_categories table contains:

id
name

Current categories:

Mobiles
Cars
Laptops
AI
Technology News

The tech_news table contains:

id
title
description
category_id

The category_id connects technology news to a technology category.

7. Backend Setup

Move into the backend directory:

cd ~/Project/backend

Check Python:

python3 --version
7.1 Create Python Virtual Environment

Create the virtual environment:

python3 -m venv venv

Activate it:

source venv/bin/activate

You should see something similar to:

(venv)

in your terminal.

8. Install Backend Dependencies

Make sure the virtual environment is active:

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

The requirements file contains the Python packages required by the Flask application.

9. Configure Backend Environment Variables

The repository contains:

backend/.env.example

Copy it:

cp .env.example .env

Edit the environment file:

vim .env

Configure:

DATABASE_URL=postgresql+psycopg2://media_user:YOUR_DATABASE_PASSWORD@127.0.0.1:5432/media_platform

Replace:

YOUR_DATABASE_PASSWORD

with the actual PostgreSQL password.

Example:

DATABASE_URL=postgresql+psycopg2://media_user:YOUR_DATABASE_PASSWORD@127.0.0.1:5432/media_platform

Do not commit the real .env file to Git.

The repository ignores .env through .gitignore.

10. Start the Backend

From:

~/Project/backend

with the virtual environment activated:

python app.py

The Flask application runs on:

http://0.0.0.0:5000

Keep this terminal running.

11. Test the Backend

Open another terminal.

Test the root endpoint:

curl http://127.0.0.1:5000/

Expected response:

Media Platform Backend is running!
Database Connection Test
curl http://127.0.0.1:5000/api/db-test

Expected response:

{
  "database": "connected"
}
Movies API
curl http://127.0.0.1:5000/api/movies

This should return the movies stored in PostgreSQL.

Movie by ID

Example:

curl http://127.0.0.1:5000/api/movies/1
Technology Categories
curl http://127.0.0.1:5000/api/tech/categories
Technology News

For example, category ID 1:

curl http://127.0.0.1:5000/api/tech/news/1

The category IDs currently correspond to:

1 → Mobiles
2 → Cars
3 → Laptops
4 → AI
12. Frontend Setup

Open another terminal.

Move to the frontend:

cd ~/Project/frontend

Check Node.js:

node --version

Check npm:

npm --version

Install frontend dependencies:

npm install

This creates:

node_modules/

The node_modules directory is ignored by Git.

13. Start the Frontend

From:

~/Project/frontend

run:

npm run dev -- --host 0.0.0.0

Vite will start the frontend development server.

The application will normally be available on:

http://YOUR_EC2_PUBLIC_IP:5173

Open that address in a browser.

14. Frontend Pages

The current application contains:

Home

URL:

/

The home page contains:

Media Platform

Movies
Tech News
Movies

URL:

/movies

The page retrieves movie information from:

GET /api/movies

Movies are displayed using data retrieved from PostgreSQL through the Flask backend.

Tech News

URL:

/tech-news

The page first retrieves the technology categories:

GET /api/tech/categories

The user can select:

Mobiles
Cars
Laptops
AI

After selecting a category, the frontend requests:

GET /api/tech/news/<category_id>

and displays the related news.

15. Backend API Endpoints
Method	Endpoint	Purpose
GET	/	Backend health message
GET	/api/db-test	Test database connection
GET	/api/movies	Get all movies
GET	/api/movies/<id>	Get movie by ID
GET	/api/tech/categories	Get technology categories
GET	/api/tech/news/<category_id>	Get news for a category
16. Project Structure
Project/
│
├── .gitignore
├── README.md
│
├── DevOps/
│
├── Documentation/
│
├── db/
│   └── init.sql
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   └── venv/
│
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── index.html
    │
    ├── public/
    │
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── main.jsx
        │
        ├── components/
        │   ├── Header.jsx
        │   └── CategoryCard.jsx
        │
        ├── pages/
        │   ├── Home.jsx
        │   ├── Movies.jsx
        │   └── TechNews.jsx
        │
        └── services/
            └── api.js

    17. Git and Security

Never commit sensitive information such as:

Database passwords
API keys
AWS access keys
SSH private keys
.env files
Tokens
Credentials

The project uses .gitignore to exclude sensitive and generated files.

Important ignored files/directories include:

.env
backend/.env
venv/
backend/venv/
node_modules/
frontend/node_modules/
dist/
frontend/dist/

The repository contains:

backend/.env.example

instead of the real environment configuration.

18. Git Workflow

Check the current repository status:

git status

Add changes:

git add .

Commit:

git commit -m "Update Media Platform"

Push:

git push

Pull the latest version:

git pull
19. Running the Application on EC2

Three major components are involved.

Terminal 1 - Backend
cd ~/Project/backend
source venv/bin/activate
python app.py
Terminal 2 - Frontend
cd ~/Project/frontend
npm run dev -- --host 0.0.0.0
PostgreSQL

PostgreSQL runs as a system service:

sudo systemctl status postgresql

The application can then be accessed through:

http://YOUR_EC2_PUBLIC_IP:5173
20. AWS EC2 Security Group

For the current development setup, the frontend port needs to be reachable from the browser.

Allow:

TCP 5173

Recommended source:

Your IP address

Do not publicly expose PostgreSQL unless there is a specific requirement.

PostgreSQL:

5432

should normally remain private.

The Flask backend:

5000

also does not need to be publicly exposed because Vite proxies API requests to the backend locally.

21. Current Deployment Model

The current setup is intentionally simple.

Everything runs on one EC2 instance:

AWS EC2
│
├── React + Vite
│   └── Port 5173
│
├── Flask
│   └── Port 5000
│
└── PostgreSQL
    └── Port 5432

This is useful for development and learning the application architecture before introducing additional infrastructure.


22. Current Application Flow
Movies
User
 |
 | Open Movies
 v
React
 |
 | GET /api/movies
 v
Flask
 |
 | SQLAlchemy
 v
PostgreSQL
 |
 | Movie records
 v
Flask
 |
 v
React
 |
 v
Movie Cards
Technology News
User
 |
 | Open Tech News
 v
React
 |
 | GET /api/tech/categories
 v
Flask
 |
 v
PostgreSQL
 |
 v
Categories
 |
 v
React
 |
 | User selects category
 |
 | GET /api/tech/news/<id>
 v
Flask
 |
 v
PostgreSQL
 |
 v
News
 |
 v
React
 |
 v
News Cards
23. Future Application Features

The next planned application feature is a Wishlist.

Planned functionality:

Movies
   |
   | Add movie
   v
Wishlist
   |
   | View saved movies
   |
   | Remove movie
   v
Database

The Wishlist feature will require:

Wishlist database table
Backend API endpoints
Frontend Wishlist page
Add-to-wishlist functionality
Remove-from-wishlist functionality
Header Wishlist navigation
CRUD testing
24. Future DevOps Improvements

After the application features are stable, the project can progressively introduce DevOps practices.

Planned areas include:

Version Control
Git
GitHub
CI/CD
Jenkins
GitHub
Automated Build
Automated Tests
Deployment
Code Quality
SonarQube
Containerization
Docker
Docker Compose
Infrastructure as Code
Terraform
Cloud
AWS
EC2
S3
IAM
VPC
Security Groups
Container Orchestration
Kubernetes
25. Future CI/CD Flow

The application can eventually follow a pipeline similar to:

Developer
    |
    v
GitHub
    |
    v
Jenkins
    |
    +----------------+
    |                |
    v                v
Build             Tests
    |                |
    +-------+--------+
            |
            v
        SonarQube
            |
            v
        Docker Build
            |
            v
      Docker Registry
            |
            v
       AWS Deployment
            |
            v
        Application
26. Development Philosophy

The project is intentionally being developed incrementally.

Current approach:

Application
   ↓
Database
   ↓
Backend
   ↓
Frontend
   ↓
GitHub
   ↓
Fresh EC2 Deployment
   ↓
Feature Development
   ↓
Docker
   ↓
CI/CD
   ↓
Infrastructure as Code
   ↓
Cloud / Kubernetes

The objective is to understand each layer individually before introducing additional DevOps tooling.


27. Troubleshooting
Check PostgreSQL
sudo systemctl status postgresql
Check Backend
curl http://127.0.0.1:5000/
Check Database Connection
curl http://127.0.0.1:5000/api/db-test
Check Movies API
curl http://127.0.0.1:5000/api/movies
Check Frontend

Open:

http://YOUR_EC2_PUBLIC_IP:5173
Check Node.js
node --version
npm --version
Check Git
git status
28. Important Notes

This project is currently intended for development and learning.

The current configuration uses:

React + Vite
Flask
PostgreSQL
AWS EC2

Production deployment should introduce additional considerations such as:

Production WSGI server
Reverse proxy
HTTPS
Secrets management
Proper database backups
Monitoring
Logging
CI/CD
Containerization
Infrastructure as Code
Access control
Network security
29. Quick Start Summary

For an already configured EC2 server:

Clone
git clone https://github.com/DevOpsCloudZone/Project.git
cd Project
Database
psql -h 127.0.0.1 -U media_user -W -d media_platform -f db/init.sql
Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
vim .env
python app.py
Frontend

Open another terminal:

cd ~/Project/frontend
npm install
npm run dev -- --host 0.0.0.0
Application

Open:

http://YOUR_EC2_PUBLIC_IP:5173
30. Repository

GitHub repository:

https://github.com/DevOpsCloudZone/Project
License

This project is currently being developed as a personal learning and portfolio project.


After saving, **check the file**:

```bash
cd ~/Project
cat README.md

Then commit and push the complete README:

git status
git add README.md
git commit -m "Complete project README"
git push

That will give your GitHub repository a proper clone → database → backend → frontend → run → API → architecture → troubleshooting → future DevOps setup guide.
