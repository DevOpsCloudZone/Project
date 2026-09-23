const API_BASE_URL = "";

export async function getMovies() {
  const response = await fetch(`${API_BASE_URL}/api/movies`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}

export async function getTechCategories() {
  const response = await fetch(`${API_BASE_URL}/api/tech/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch tech categories");
  }

  return response.json();
}

export async function getTechNews(categoryId) {
  const response = await fetch(
    `${API_BASE_URL}/api/tech/news/${categoryId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tech news");
  }

  return response.json();
}
