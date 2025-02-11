import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchBlogsQuery } from "../redux/features/blogs/blogsApi";
import SearchBlog from "../pages/blogs/SearchBlog";

const MainCategories = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  // Ambil data menggunakan Redux
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { user } = useSelector((state) => state.auth);

  // Update query saat kategori dipilih
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setQuery({ search, category: selectedCategory }); // Langsung update query
  };

  // Handle perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle pencarian saat tombol "Search" ditekan
  const handleSearch = () => {
    setQuery({ search, category });
  };

  return (
    <div className="mt-10 hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* Links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <button
          onClick={() => handleCategoryClick("")}
          className={`rounded-full px-4 py-2 ${
            category === "" ? "bg-blue-800 text-white" : "hover:bg-blue-50"
          }`}
        >
          All Posts
        </button>
        {["Puisi", "Cerpen", "Opini", "Resensi", "Feature"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`rounded-full px-4 py-2 ${
              category === cat ? "bg-blue-800 text-white" : "hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <span className="text-xl font-medium">|</span>
      {/* Search */}
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default MainCategories;