import { useEffect, useState } from "react";
import { getMovies } from "../services/api";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    getMovies()
      .then((data) => {

        setMovies(data);

        setLoading(false);

      })
      .catch((err) => {

        console.error(err);

        setError("Failed to load movies");

        setLoading(false);

      });

  }, []);


  if (loading) {

    return (
      <div className="page-container">

        <h1 className="page-title">
          Movies
        </h1>

        <p className="page-subtitle">
          Loading movies...
        </p>

      </div>
    );
  }


  if (error) {

    return (
      <div className="page-container">

        <h1 className="page-title">
          Movies
        </h1>

        <p className="page-subtitle">
          {error}
        </p>

      </div>
    );
  }


  return (
    <div className="page-container">

      <h1 className="page-title">
        Movies
      </h1>

      <p className="page-subtitle">
        Explore our movie collection
      </p>


      <div className="card-grid">

        {movies.map((movie) => (

          <div
            className="card"
            key={movie.id}
          >

            <h2>
              🎬 {movie.title}
            </h2>

            <p>
              {movie.description}
            </p>

            <p>
              <strong>
                ⭐ Rating:
              </strong>{" "}
              {movie.rating}
            </p>

            <p>
              <strong>
                📅 Release Year:
              </strong>{" "}
              {movie.release_year}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Movies;
