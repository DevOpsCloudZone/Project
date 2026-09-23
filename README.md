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

# 1. Clone the Repository

Fork this repository on GitHub first.

Then clone your fork:

```bash
git clone <YOUR_FORK_REPOSITORY_URL>
cd Project
