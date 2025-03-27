import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utilis/formateDat";
import EditorJSHTML from "editorjs-html";
import { format } from "timeago.js";

const editorJSHTML = EditorJSHTML();

function SingleBlogCard({ blog }) {
  const { title, description, content, coverImg, category, rating, author, createdAt } = blog || {};
  const parsedContent = editorJSHTML.parse(content);
  const htmlContent = Array.isArray(parsedContent) ? parsedContent.join(" ") : parsedContent;

  return (
    <div className="flex flex-col gap-8">
      {/* Blog Header */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{author?.username || "Unknown Author"}</Link>
            <span>On</span>
            <Link className="text-blue-800">{category}</Link>
            <span>{format(createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{description}</p>
        </div>

        {coverImg && (
          <div className="hidden lg:block w-2/5">
            <img src={coverImg} alt="cover" className="rounded-2xl w-full h-auto" />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="flex flex-col md:flex-row gap-12">
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-3 editorjsdiv" />
          <div>
            <span className="text-lg font-medium">Rating: </span>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlogCard;
