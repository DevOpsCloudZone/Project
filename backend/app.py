import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# -------------------------
# Database Models
# -------------------------

class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    rating = db.Column(db.Float)
    release_year = db.Column(db.Integer)


class TechCategory(db.Model):
    __tablename__ = "tech_categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)


class TechNews(db.Model):
    __tablename__ = "tech_news"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text)

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("tech_categories.id"),
        nullable=False
    )


# -------------------------
# Routes
# -------------------------

@app.route("/")
def home():
    return "Media Platform Backend is running!"


@app.route("/api/db-test")
def db_test():
    try:
        db.session.execute(db.text("SELECT 1"))

        return {
            "database": "connected"
        }

    except Exception as e:

        return {
            "database": "connection failed",
            "error": str(e)
        }, 500


@app.route("/api/movies")
def get_movies():

    movies = Movie.query.all()

    return jsonify([
        {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "rating": movie.rating,
            "release_year": movie.release_year
        }

        for movie in movies
    ])


@app.route("/api/movies/<int:movie_id>")
def get_movie(movie_id):

    movie = Movie.query.get(movie_id)

    if movie is None:

        return {
            "error": "Movie not found"
        }, 404

    return {
        "id": movie.id,
        "title": movie.title,
        "description": movie.description,
        "rating": movie.rating,
        "release_year": movie.release_year
    }


@app.route("/api/tech/categories")
def get_categories():

    categories = TechCategory.query.all()

    return jsonify([
        {
            "id": category.id,
            "name": category.name
        }

        for category in categories
    ])


@app.route("/api/tech/news/<int:category_id>")
def get_tech_news(category_id):

    news = TechNews.query.filter_by(
        category_id=category_id
    ).all()

    return jsonify([
        {
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "category_id": item.category_id
        }

        for item in news
    ])


# -------------------------
# Create tables
# -------------------------

with app.app_context():

    db.create_all()


# -------------------------
# Start Application
# -------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
