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

## Fork the Repository

Before cloning the project, fork the repository to your own GitHub account.

Open the project repository:

https://github.com/DevOpsCloudZone/Projec

---
## 1.Application Components
Component	Technology	Port
Frontend	React + Vite	5173
Backend	Flask + SQLAlchemy	5000
Database	PostgreSQL	5432
1.2 Request Flow

The frontend sends API requests using /api.

For example:

Browser
   |
   | http://EC2-IP:5173/api/movies
   v
Vite Development Server
   |
   | http://127.0.0.1:5000/api/movies
   v
Flask Backend
   |
   | SQLAlchemy
   v
PostgreSQL

The Vite development server proxies /api requests to the Flask backend.

## 2. Prerequisites

Before setting up the project, make sure the following software is installed.

# 2.1 Required Software
Git
Python 3
Node.js 22+
npm
PostgreSQL 15+
# 2.2 Recommended Versions
Python 3.9+
Node.js 22+
PostgreSQL 15+
# 2.3 Verify Git

Run:

git --version
# 2.4 Verify Python

Run:

python3 --version
# 2.5 Verify Node.js

Run:

node --version
# 2.6 Verify npm

Run:

npm --version
# 2.7 Verify PostgreSQL

Run:

psql --version

## 3. Clone the Repository

Clone the repository from GitHub:

git clone https://github.com/DevOpsCloudZone/Project.git

Move into the project directory:

cd Project

Verify the project files:

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

Note: Linux is case-sensitive. The directory is Project, not project.

4. PostgreSQL Database Setup

The application uses PostgreSQL as its database.

The following database configuration is used by the application:

Database Name : media_platform
Database User : media_user
Database Port : 5432

The database password should be chosen by the person setting up the application.

4.1 Start PostgreSQL

Start the PostgreSQL service:

sudo systemctl start postgresql

Check the PostgreSQL service:

sudo systemctl status postgresql

PostgreSQL should show:

active (running)
4.2 Switch to the PostgreSQL Administrative User

PostgreSQL provides a system user called postgres.

Switch to that user:

sudo -iu postgres

You should now be operating as the PostgreSQL administrative user.

4.3 Open the PostgreSQL Shell

Start the PostgreSQL command-line interface:

psql

You should see a PostgreSQL prompt similar to:

postgres=#
4.4 Create the Application User

Create a PostgreSQL user for the Media Platform application.

Replace YOUR_DATABASE_PASSWORD with the password you want to use.

CREATE USER media_user WITH PASSWORD 'YOUR_DATABASE_PASSWORD';

For example:

CREATE USER media_user WITH PASSWORD 'MyStrongPassword';

Important: Do not use an actual password in documentation or commit it to GitHub.

4.5 Create the Application Database

Create the database:

CREATE DATABASE media_platform;
4.6 Grant Database Privileges

Grant the application user privileges on the database:

GRANT ALL PRIVILEGES ON DATABASE media_platform TO media_user;
4.7 Make the Application User the Database Owner

Make media_user the owner of the application database:

ALTER DATABASE media_platform OWNER TO media_user;
4.8 Exit PostgreSQL

Exit the PostgreSQL shell:

\q

You will return to the postgres operating-system user.

4.9 Exit the PostgreSQL Operating-System User

Run:

exit

You should return to your normal Linux user.

5. Configure PostgreSQL Authentication

The application connects to PostgreSQL through localhost using a username and password.

Open the PostgreSQL authentication configuration:

sudo vim /var/lib/pgsql/data/pg_hba.conf

Make sure the following entries are present:

host    all    all    127.0.0.1/32    scram-sha-256
host    all    all    ::1/128         scram-sha-256

These entries allow local TCP connections to PostgreSQL using password authentication.

Save the file and restart PostgreSQL:

sudo systemctl restart postgresql

Verify PostgreSQL is running:

sudo systemctl status postgresql
6. Configure PostgreSQL Schema Permissions

The application user needs permission to work with the public schema.

6.1 Switch to the PostgreSQL Administrative User
sudo -iu postgres
6.2 Open PostgreSQL
psql
6.3 Connect to the Application Database

Run:

\c media_platform

You should see a message indicating that you are connected to media_platform.

6.4 Grant Schema Permissions

Run:

GRANT USAGE, CREATE ON SCHEMA public TO media_user;
6.5 Make the Application User the Schema Owner

Run:

ALTER SCHEMA public OWNER TO media_user;
6.6 Exit PostgreSQL
\q
6.7 Exit the PostgreSQL Administrative User
exit
7. Initialize the Database

The database initialization script is located at:

db/init.sql

The script creates the application tables and inserts sample data.

7.1 Navigate to the Project Directory
cd ~/Project
7.2 Run the Database Initialization Script

Run:

psql -h 127.0.0.1 -U media_user -W -d media_platform -f db/init.sql

When prompted, enter the password configured for media_user.

The script creates the following tables:

movies
tech_categories
tech_news
8. Verify the Database

Connect to the database:

psql -h 127.0.0.1 -U media_user -W -d media_platform
8.1 List Tables

Run:

\dt

You should see:

movies
tech_categories
tech_news
8.2 Check Movies

Run:

SELECT * FROM movies;
8.3 Check Technology Categories

Run:

SELECT * FROM tech_categories;
8.4 Check Technology News

Run:

SELECT * FROM tech_news;
8.5 Exit PostgreSQL
\q
9. Backend Setup

The backend is built using:

Python
Flask
Flask-SQLAlchemy
PostgreSQL
psycopg2

The backend source code is located in:

backend/
9.1 Navigate to the Backend Directory
cd ~/Project/backend
9.2 Verify Python
python3 --version
10. Create the Python Virtual Environment

A Python virtual environment keeps the application's Python dependencies isolated from the system Python installation.

10.1 Create the Virtual Environment

Run:

python3 -m venv venv

This creates:

backend/
└── venv/
10.2 Activate the Virtual Environment

Run:

source venv/bin/activate

After activation, your terminal should show something similar to:

(venv)
11. Install Backend Dependencies

Make sure the virtual environment is active:

source venv/bin/activate

Install the dependencies listed in requirements.txt:

pip install -r requirements.txt

The dependencies include the packages required to run the Flask application and connect to PostgreSQL.

12. Configure Backend Environment Variables

The repository contains a template:

backend/.env.example

The actual .env file contains environment-specific configuration and should not be committed to Git.

12.1 Create the .env File

From the backend directory:

cp .env.example .env
12.2 Edit the .env File

Open the file using Vim:

vim .env

Set the database connection string:

DATABASE_URL=postgresql+psycopg2://media_user:YOUR_DATABASE_PASSWORD@127.0.0.1:5432/media_platform

Replace:

YOUR_DATABASE_PASSWORD

with the actual PostgreSQL password.

For example:

DATABASE_URL=postgresql+psycopg2://media_user:MyStrongPassword@127.0.0.1:5432/media_platform

Save and exit Vim:

Esc
:wq
Enter

Security: Never commit the real .env file to GitHub.

13. Start the Backend

Make sure you are inside:

~/Project/backend

Make sure the virtual environment is active:

source venv/bin/activate

Start Flask:

python app.py

The backend runs on:

http://0.0.0.0:5000

Keep this terminal running.

14. Test the Backend

Open another terminal while the Flask server continues running.

14.1 Test the Backend Health Endpoint

Run:

curl http://127.0.0.1:5000/

Expected response:

Media Platform Backend is running!
14.2 Test the Database Connection

Run:

curl http://127.0.0.1:5000/api/db-test

Expected response:

{
  "database": "connected"
}
14.3 Test the Movies API

Run:

curl http://127.0.0.1:5000/api/movies

The API should return the movies stored in PostgreSQL.

14.4 Test a Movie by ID

Run:

curl http://127.0.0.1:5000/api/movies/1
14.5 Test Technology Categories

Run:

curl http://127.0.0.1:5000/api/tech/categories
14.6 Test Technology News

For example, to retrieve news for category ID 1:

curl http://127.0.0.1:5000/api/tech/news/1

Current category IDs are:

ID	Category
1	Mobiles
2	Cars
3	Laptops
4	AI
15. Frontend Setup

The frontend is built using:

React
Vite
React Router

The frontend source code is located in:

frontend/
15.1 Open Another Terminal

Keep the Flask backend running.

Open another terminal and navigate to the frontend:

cd ~/Project/frontend
15.2 Verify Node.js

Run:

node --version

Node.js 22+ is recommended.

15.3 Verify npm

Run:

npm --version
16. Install Frontend Dependencies

From the frontend directory:

cd ~/Project/frontend

Install the dependencies:

npm install

This creates the:

node_modules/

directory.

node_modules is generated locally and is not committed to GitHub.

17. Start the Frontend

From:

~/Project/frontend

run:

npm run dev -- --host 0.0.0.0

Vite will start the development server.

You should see output similar to:

VITE ... ready

Local:   http://localhost:5173/
Network: http://YOUR_EC2_PRIVATE_IP:5173/

Keep this terminal running.

18. Access the Application

Open your browser and navigate to:

http://YOUR_EC2_PUBLIC_IP:5173

For example:

http://13.xx.xx.xx:5173

The Media Platform home page should appear.

19. Application Pages
19.1 Home Page

URL:

/

The home page provides:

Media Platform

Movies
Tech News
19.2 Movies Page

URL:

/movies

The Movies page retrieves movie information from:

GET /api/movies

The movie information is stored in PostgreSQL.

19.3 Tech News Page

URL:

/tech-news

The page first retrieves the technology categories:

GET /api/tech/categories

The available categories are:

Mobiles
Cars
Laptops
AI

When the user selects a category, the frontend requests:

GET /api/tech/news/<category_id>

The corresponding technology news is then displayed.

20. Backend API Endpoints
Method	Endpoint	Description
GET	/	Backend health message
GET	/api/db-test	Test database connectivity
GET	/api/movies	Retrieve all movies
GET	/api/movies/<id>	Retrieve a movie by ID
GET	/api/tech/categories	Retrieve technology categories
GET	/api/tech/news/<category_id>	Retrieve news for a category
21. Frontend API Configuration

The frontend API service is located at:

frontend/src/services/api.js

The frontend uses relative API URLs such as:

/api/movies
/api/tech/categories
/api/tech/news/<category_id>

Vite forwards these requests to:

http://127.0.0.1:5000

The proxy configuration is located in:

frontend/vite.config.js
22. Project Structure

The complete project structure is:

Project/
│
├── .git/
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
23. Git Configuration
23.1 Check Repository Status

From the project root:

cd ~/Project
git status
23.2 Add Changes
git add .
23.3 Commit Changes
git commit -m "Update Media Platform"
23.4 Push Changes
git push
23.5 Pull Latest Changes

When working on another server:

git pull
24. Security

Do not commit sensitive information to GitHub.

Never commit:

Database passwords
API keys
AWS access keys
SSH private keys
Authentication tokens
.env files
Other credentials

The real environment file:

backend/.env

is excluded through .gitignore.

The repository contains only:

backend/.env.example

The example file contains a placeholder password rather than the real database password.

25. .gitignore

The project ignores files that should not be committed.

Important ignored files include:

.env
backend/.env
venv/
backend/venv/
node_modules/
frontend/node_modules/
dist/
frontend/dist/
*.log
26. AWS EC2 Configuration

The application currently runs on one EC2 instance.

AWS EC2
│
├── React + Vite
│   └── Port 5173
│
├── Flask Backend
│   └── Port 5000
│
└── PostgreSQL
    └── Port 5432
26.1 Required Security Group Port

For browser access to the frontend, allow:

Protocol : TCP
Port     : 5173
Source   : Your IP address
26.2 Backend Port

Port 5000 does not need to be publicly accessible for the current development architecture.

26.3 PostgreSQL Port

Port 5432 should not be publicly accessible for this setup.

The database is accessed locally by the Flask backend.

27. Running the Application

The application currently requires the following services.

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
Browser

Open:

http://YOUR_EC2_PUBLIC_IP:5173
28. Complete Application Flow
28.1 Movies Flow
User
 |
 | Opens Movies
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
28.2 Technology News Flow
User
 |
 | Opens Tech News
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
Technology Categories
 |
 v
React
 |
 | User selects category
 |
 | GET /api/tech/news/<category_id>
 v
Flask
 |
 v
PostgreSQL
 |
 v
Technology News
 |
 v
React
 |
 v
News Cards
29. Future Application Features

The next planned application feature is a Wishlist.

The planned functionality is:

Movies
   |
   | Add Movie
   v
Wishlist
   |
   | View Saved Movies
   |
   | Remove Movie
   v
PostgreSQL

The Wishlist feature will include:

Wishlist database table
Add-to-wishlist functionality
Remove-from-wishlist functionality
Wishlist page
Wishlist navigation in the header
Backend APIs
Database operations
Frontend integration
CRUD testing
30. Future DevOps Improvements

Once the application features are stable, DevOps practices can be introduced incrementally.

30.1 Version Control
Git
GitHub
30.2 CI/CD
GitHub
   |
   v
Jenkins
   |
   +--> Build
   |
   +--> Test
   |
   +--> SonarQube
   |
   +--> Package
   |
   +--> Deploy
30.3 Code Quality
SonarQube
30.4 Containerization
Docker
Docker Compose
30.5 Infrastructure as Code
Terraform
30.6 Cloud
AWS
EC2
S3
IAM
VPC
Security Groups
30.7 Container Orchestration
Kubernetes
31. Future CI/CD Architecture

The eventual deployment flow can be:

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
  Build            Tests
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
32. Troubleshooting
32.1 PostgreSQL Is Not Running

Check:

sudo systemctl status postgresql

Start it:

sudo systemctl start postgresql
32.2 Backend Is Not Responding

Check:

curl http://127.0.0.1:5000/

If necessary, start the backend:

cd ~/Project/backend
source venv/bin/activate
python app.py
32.3 Database Connection Failed

Test PostgreSQL directly:

psql -h 127.0.0.1 -U media_user -W -d media_platform

If authentication fails, verify:

Database username
Database password
Database name
PostgreSQL service
pg_hba.conf
32.4 Frontend Is Not Opening

Check Node.js:

node --version

Check npm:

npm --version

Install dependencies:

cd ~/Project/frontend
npm install

Start Vite:

npm run dev -- --host 0.0.0.0

Also verify that EC2 Security Group allows TCP port 5173.

32.5 Frontend Loads but API Data Does Not Appear

First check the backend:

curl http://127.0.0.1:5000/

Then check the database:

curl http://127.0.0.1:5000/api/db-test

Then test the Movies API:

curl http://127.0.0.1:5000/api/movies

If these work, check the frontend Vite proxy configuration:

frontend/vite.config.js
33. Quick Start

For an already configured server, the basic startup process is:

Step 1 - Clone
git clone https://github.com/DevOpsCloudZone/Project.git
cd Project
Step 2 - Initialize Database
psql -h 127.0.0.1 -U media_user -W -d media_platform -f db/init.sql
Step 3 - Start Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
vim .env
python app.py
Step 4 - Start Frontend

Open another terminal:

cd ~/Project/frontend
npm install
npm run dev -- --host 0.0.0.0
Step 5 - Open the Application

Open:

http://YOUR_EC2_PUBLIC_IP:5173
34. Repository

GitHub repository:

https://github.com/DevOpsCloudZone/Project
35. Development Approach

The project is being developed incrementally.

The current development approach is:

Application
     |
     v
PostgreSQL Database
     |
     v
Flask Backend
     |
     v
React Frontend
     |
     v
GitHub
     |
     v
Fresh EC2 Deployment
     |
     v
Feature Development
     |
     v
Docker
     |
     v
CI/CD
     |
     v
Terraform
     |
     v
AWS Infrastructure
     |
     v
Kubernetes

The goal is to understand each layer independently before introducing additional DevOps tooling.

36. License

This project is currently being developed as a personal learning and portfolio project.


### After pasting

Save:

```text
Esc
:wq
Enter

Then verify:

cd ~/Project
head -40 README.md

Then commit it:

git add README.md
git commit -m "Improve README documentation"
git push
