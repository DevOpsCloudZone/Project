import { Link } from "react-router-dom";

function Header() {

  return (
    <header className="header">

      <div className="header-content">

        <Link
          to="/"
          className="logo"
        >
          Media Platform
        </Link>


        <nav>

          <Link to="/">
            Home
          </Link>

          <Link to="/movies">
            Movies
          </Link>

          <Link to="/tech-news">
            Tech News
          </Link>

        </nav>

      </div>

    </header>
  );
}

export default Header;
