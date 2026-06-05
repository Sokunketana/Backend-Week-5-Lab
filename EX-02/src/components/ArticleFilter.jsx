import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilter() {
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get("http://localhost:5000/articles");

      setAllArticles(res.data);
      setFilteredArticles(res.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get("http://localhost:5000/journalists");
      setJournalists(res.data);
    } catch (error) {
      console.error("Error fetching journalists:", error);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalistId}
          onChange={(e) => setSelectedJournalistId(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map((j) => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>

        <select
          id="categoryFilter"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            let filtered = allArticles;
            if (selectedJournalistId) {
              filtered = filtered.filter(
                (a) => String(a.journalistId) === String(selectedJournalistId),
              );
            }
            if (selectedCategoryId) {
              filtered = filtered.filter(
                (a) => String(a.categoryId) === String(selectedCategoryId),
              );
            }
            setFilteredArticles(filtered);
          }}
        >
          Apply Filters
        </button>

        <button
          onClick={() => {
            setSelectedJournalistId("");
            setSelectedCategoryId("");
            setFilteredArticles(allArticles);
          }}
        >
          Reset Filters
        </button>
      </div>

      <ul>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
