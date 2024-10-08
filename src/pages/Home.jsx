import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import axios from "axios";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [minPages, setMinPages] = useState("");
  const [maxPages, setMaxPages] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (min = "", max = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books`,
        {
          params: {
            minPages: min,
            maxPages: max,
          },
        }
      );
      setBooks(response.data || []);
      setFilteredBooks(response.data || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const min = minPages ? parseInt(minPages, 10) : "";
    const max = maxPages ? parseInt(maxPages, 10) : "";

    fetchBooks(min, max);
  };

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  return (
    <>
      <div className="base-container mt-24 flex justify-between">
        <div>
          <div>
            <SearchComponent setBooks={setFilteredBooks} />
          </div>
          <form className="flex gap-4 mt-4" onSubmit={handleFilter}>
            <input
              type="number"
              placeholder="Minimum pages"
              value={minPages}
              onChange={(e) => setMinPages(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Maximum pages"
              value={maxPages}
              onChange={(e) => setMaxPages(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="border rounded-lg px-4 py-2 bg-blue-600 text-slate-50"
            >
              Filter
            </button>
          </form>
        </div>
      </div>

      <div className="base-container mt-10 flex flex-wrap gap-16 justify-between border rounded-xl p-12">
        {isLoading && <SyncLoader color="red" size={20} />}
        {!isLoading && filteredBooks.length === 0 && <p>No books available.</p>}
        {!isLoading &&
          filteredBooks.length > 0 &&
          filteredBooks.map((el, index) => {
            return <Card key={index} books={el} onRedirect={handleRedirect} />;
          })}
      </div>
    </>
  );
}

export default Home;
