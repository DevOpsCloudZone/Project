import { useEffect, useState } from "react";

import {
  getTechCategories,
  getTechNews,
} from "../services/api";


function TechNews() {

  const [categories, setCategories] = useState([]);

  const [news, setNews] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [newsLoading, setNewsLoading] =
    useState(false);

  const [error, setError] = useState("");


  useEffect(() => {

    getTechCategories()

      .then((data) => {

        setCategories(data);

        setLoading(false);

      })

      .catch((err) => {

        console.error(err);

        setError(
          "Failed to load tech categories"
        );

        setLoading(false);

      });

  }, []);


  const handleCategoryClick = (category) => {

    setSelectedCategory(category);

    setNewsLoading(true);

    setNews([]);

    setError("");


    getTechNews(category.id)

      .then((data) => {

        setNews(data);

        setNewsLoading(false);

      })

      .catch((err) => {

        console.error(err);

        setError(
          "Failed to load tech news"
        );

        setNewsLoading(false);

      });
  };


  if (loading) {

    return (
      <div className="page-container">

        <h1 className="page-title">
          Tech News
        </h1>

        <p className="page-subtitle">
          Loading categories...
        </p>

      </div>
    );
  }


  return (
    <div className="page-container">

      <h1 className="page-title">
        Tech News
      </h1>

      <p className="page-subtitle">
        Explore the latest updates by category
      </p>


      <div className="category-grid">

        {categories.map((category) => (

          <button
            className="category-button"
            key={category.id}
            onClick={() =>
              handleCategoryClick(category)
            }
          >

            {category.name === "Mobiles" && "📱"}

            {category.name === "Cars" && "🚗"}

            {category.name === "Laptops" && "💻"}

            {category.name === "AI" && "🤖"}

            <br />

            {category.name}

          </button>

        ))}

      </div>


      {selectedCategory && (

        <div className="news-section">

          <h2>
            {selectedCategory.name} News
          </h2>


          {newsLoading && (

            <p>
              Loading news...
            </p>

          )}


          {!newsLoading && error && (

            <p>
              {error}
            </p>

          )}


          {!newsLoading &&
            !error &&
            news.length === 0 && (

              <p>
                No news available for this category.
              </p>

            )}


          {!newsLoading &&
            !error &&
            news.map((item) => (

              <div
                className="news-card"
                key={item.id}
              >

                <h3>
                  📰 {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default TechNews;
