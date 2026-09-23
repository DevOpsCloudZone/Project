import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app-container">

      <h1 className="app-title">
        Media Platform
      </h1>

      <p className="app-subtitle">
        Movies, Technology and Latest News
      </p>

      <div className="home-buttons">

        <Link to="/movies">
          <button className="home-button">
            🎬 Movies
          </button>
        </Link>

        <Link to="/tech-news">
          <button className="home-button">
            💻 Tech News
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Home;
