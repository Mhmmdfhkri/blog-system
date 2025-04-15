import React from "react";
import { formatDate } from "../../../utilis/formateDat";
import EditorJSHTML from "editorjs-html";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RelatedBlogs from "./RelatedBlogs";
import CommentCard from "../comments/CommentCard";

// Custom Parser
// Custom Parser
const customParsers = {
    paragraph: (block) => {
      // Cek apakah ada inline link di dalam paragraph
      return `<p class="text-gray-700 text-base leading-relaxed">${block.data.text}</p>`;
    },
    header: (block) => {
      const level = block.data.level;
      return `<h${level} class="font-semibold text-gray-800 text-${level === 1 ? "3xl" : level === 2 ? "2xl" : "xl"}">${block.data.text}</h${level}>`;
    },
    list: (block) => {
        try {
          const tag = block.data.style === "ordered" ? "ol" : "ul";
          const listStyle = block.data.style === "ordered" ? "list-decimal" : "list-disc";
          const items = (block.data.items || [])
            .map((item) => `<li class="ml-6 ${listStyle} text-gray-700 text-base">${item}</li>`)
            .join("");
          return `<${tag} class="my-4">${items}</${tag}>`;
        } catch (err) {
          console.error("List parsing error:", err);
          return ""; // fallback kosong kalau error
        }
      },
      
    quote: (block) => {
      return `
        <blockquote class="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-4">
          "${block.data.text}"
          ${block.data.caption ? `<footer class="mt-2 text-sm text-right">— ${block.data.caption}</footer>` : ""}
        </blockquote>
      `;
    },
    delimiter: () => {
      return `<div class="my-6 text-center text-gray-400 text-2xl">***</div>`;
    },
    // Optional: if you're using the "link" plugin
    linkTool: (block) => {
      return `
        <a href="${block.data.link}" class="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
          ${block.data.meta?.title || block.data.link}
        </a>
      `;
    },
  };
  

const editorJSHTML = EditorJSHTML(customParsers);

function SingleBlogCard({ blog }) {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    rating,
    author,
    createdAt,
  } = blog || {};
  const parsedContent = editorJSHTML.parse(content);
  const htmlContent = Array.isArray(parsedContent)
    ? parsedContent.join("")
    : parsedContent;

  return (
    <div className="flex flex-col gap-8 px-8 md:px-16">
      {/* Detail Blog */}
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="lg:w-3/5 flex flex-col gap-6">
          <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Penulis</span>
            <Link className="text-blue-800">
              {author?.username || "Unknown Author"}
            </Link>
            <span>Pada</span>
            <Link className="text-blue-800">{category}</Link>
            <span>{formatDate(createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{description}</p>
        </div>
        {/* Sidebar with Image */}
        <div className="lg:w-2/5 flex mt-0 flex-col gap-4">
          {coverImg && (
            <div className="mb-0 -mt-4">
              <img
                src={coverImg}
                alt="Cover"
                className="rounded-3xl object-cover w-full h-[350px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content & Related Blogs */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-3/5 flex flex-col gap-6 text-justify">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose max-w-none break-words overflow-hidden"
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
          />
        </div>

        {/* Related Blogs */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          <RelatedBlogs />
        </div>
      </div>
    </div>
  );
}

export default SingleBlogCard;
