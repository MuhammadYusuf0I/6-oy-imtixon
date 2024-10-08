import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchComponent({ setBooks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a search term.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/search?query=${searchTerm}`);
      setBooks(response.data || []); 
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded-lg w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchComponent;
