import React, { useState, useEffect } from "react";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  //const  {author} = blog || {};

  // get data using redux
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  //const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setQuery({ search, category });
  }, [search, category]); // Update query whenever search or category change

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Handle category change (if needed)
  };

  return (
    <div className="mt-12 container mx-auto">
      {/* Search */}
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleCategoryChange={handleCategoryChange} // Include category handler if needed
      />

      {/* Loading/Error */}
      {isLoading && <div>Loading....</div>}
      {error && <div>{error.toString()}</div>}

      {/* Blog List */}
      <div className="mt-12">
        {/* Featured Blogs (4 pertama) */}
        {blogs.length >= 4 && (
          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* First (blog utama) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <Link to={`/blogs/${blogs[0]._id}`}>
                <img
                  src={blogs[0]?.coverImg}
                  className="rounded-3xl object-cover w-full h-[400px]"
                  alt={blogs[0]?.title}
                />
              </Link>
              <div className="flex items-center gap-4">
                <h1 className="font-semibold lg:text-lg">01</h1>
                <Link
                  to={`/blogs/${blogs[0]._id}`}
                  className="text-blue-800 lg:text-lg"
                >
                  {blogs[0]?.category}
                </Link>
                <span className="text-gray-500">
                  {new Date(blogs[0]?.createdAt).toDateString()}
                </span>
              </div>
              <Link
                to={`/blogs/${blogs[0]._id}`}
                className="text-xl lg:text-3xl font-semibold lg:font-bold"
              >
                {blogs[0]?.title}
              </Link>
            </div>

            {/* Other (3 selanjutnya) */}
            {/* Other (3 selanjutnya) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {blogs.slice(1, 4).map((blog, index) => (
                <div
                  key={blog._id}
                  className="lg:h-1/3 flex justify-between gap-4"
                >
                  <div className="w-1/3 aspect-video">
                    <Link to={`/blogs/${blog._id}`}>
                      <img
                        src={blog?.coverImg}
                        className="rounded-3xl object-cover w-full h-full"
                        alt={blog?.title}
                      />
                    </Link>
                  </div>
                  <div className="w-2/3">
                    <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                      <h1 className="font-semibold">{`0${index + 2}.`}</h1>
                      <Link to={`/blogs/${blog._id}`} className="text-blue-800">
                        {blog?.category}
                      </Link>
                      <span className="text-gray-500">
                        {new Date(blog?.createdAt).toDateString()}
                      </span>
                    </div>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                    >
                      {blog?.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog List (postingan lainnya) */}

        <div className="my-8 text-2xl text-gray-600">
          <h1>Recent Post</h1>
          <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Link
                  to={`/blogs/${blog._id}`}
                  key={blog._id}
                  className="shadow-md"
                >
                  {/* Render Image */}
                  <img
                    src={blog?.coverImg}
                    alt={blog.title}
                    className="h-80 w-full object-cover rounded-2xl"
                  />

                  {/* Render Title */}
                  <h2 className="text-xl p-4">{blog?.title}</h2>

                  {/* Render Date and Category */}
                  <div className="flex items-center mt-1 gap-2 text-gray-400 text-sm px-4">
                    {/* <span>Written By</span> */}
                    {/* <Link to={`/profile/${author}`} className="text-blue-800">
                      {author}
                    </Link> */}
                    <span>Category on</span>
                    <Link
                      to={`/category/${blog?.category}`}
                      className="text-blue-800"
                    >
                      {blog?.category}
                    </Link>
                  </div>

                  {/* Render Description */}
                  <p className="text-sm p-4">
                    {blog?.description?.split(" ").slice(0, 10).join(" ")}...
                  </p>

                  {/* Read More Link */}
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="underline text-blue-800 text-sm p-4"
                  >
                    Read More
                  </Link>
                </Link>
              ))
            ) : (
              <div>No blogs found matching the search criteria.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
