import React from "react";
import { formatDate } from "../../../utilis/formateDat";
import EditorJSHTML from "editorjs-html";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RelatedBlogs from "./RelatedBlogs";
import CommentCard from "../comments/CommentCard";

// Fungsi untuk render nested list
  

// Custom Parser
const customParsers = {
  paragraph: (block) => {
    const text = block?.data?.text;
    const alignment = block?.data?.alignment || "left"; // Default ke left jika alignment tidak ada
    
    if (typeof text !== "string") {
      console.warn("Paragraph skipped: invalid text", block);
      return "";
    }
  
    // Menentukan alignment
    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    }[alignment] || "text-left"; // Default ke left jika alignment tidak valid
    
    return `<p class="text-gray-700 text-base leading-relaxed ${alignmentClass}">${text}</p>`;
  },
  image: (block) => {
    const file = block?.data?.url;  // Gunakan 'url' di sini
    const caption = block?.data?.caption || "";
    const withBorder = block?.data?.withBorder;
    const stretched = block?.data?.stretched;
    const withBackground = block?.data?.withBackground;
  
    if (!file) {
      console.warn("Image skipped: no file url", block);
      return "";
    }
  
    const classes = [
      "my-4",
      "rounded-xl",
      "mx-auto",
      "max-w-full",
      withBorder ? "border border-gray-300" : "",
      withBackground ? "bg-gray-100 p-2" : "",
      stretched ? "w-full" : "w-auto",
    ].join(" ");
  
    return `
      <div class="text-center ${classes}">
        <img src="${file}" alt="${caption}" class="mx-auto mb-2 max-h-[600px] object-contain" />
        ${caption ? `<p class="text-sm text-gray-500 italic">${caption}</p>` : ""}
      </div>
    `;
  },    
  toggle: (block) => {
    const { text, status } = block.data || {};
  
    if (!text) return "";
  
    const isOpen = status === "open"; // default terbuka kalau status === "open"
  
    return `
      <details class="border rounded-lg p-4 bg-gray-50" ${isOpen ? "open" : ""}>
        <summary class="cursor-pointer font-semibold text-gray-800">
          ${text}
        </summary>
      </details>
    `;
  },
     
    header: (block) => {
      const level = block.data.level || 2;
      const sizeClass = {
        1: "text-3xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-base",
        6: "text-sm",
      }[level];
      return `<h${level} class="font-semibold text-gray-800 ${sizeClass}">${block.data.text}</h${level}>`;
    },
    list: (block) => {
      try {
        const style = block?.data?.style === "ordered" ? "ol" : "ul";
        const listStyle = style === "ol" ? "list-decimal" : "list-disc";
        const items = (block?.data?.items || [])
          .map((item) => {
            const text = typeof item === "string" ? item : item?.content || "";
            return `<li class="ml-6 ${listStyle} text-gray-700 text-base leading-relaxed">${text}</li>`;
          })
          .join("");
        return `<${style} class="my-4">${items}</${style}>`;
      } catch (err) {
        console.error("List parsing error:", err, block);
        return "";
      }
    },
                 
    quote: (block) => {
      const text = block?.data?.text || "";
      const caption = block?.data?.caption || "";
      return `
        <blockquote class="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-4">
          "${text}"
          ${
            caption
              ? `<footer class="mt-2 text-sm text-right">— ${caption}</footer>`
              : ""
          }
        </blockquote>
      `;
    },
    delimiter: () => {
      return `<div class="text-center text-4xl my-4 text-black">***</div>`;
    },
      table: (block) => {
        const content = block.data.content;
        if (!content || !Array.isArray(content)) return "";
      
        const rows = content
          .map(
            (row) => `
            <tr>
              ${row.map((cell) => `<td class="border px-4 py-2">${cell}</td>`).join("")}
            </tr>
          `
          )
          .join("");
      
        return `
          <div class="overflow-x-auto my-6">
            <table class="table-auto border-collapse border border-gray-400 w-full">
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        `;
      },
            
      checklist: (block) => {
        const items = block.data.items || [];
        return `
          <div class="checklist my-4 flex flex-col gap-2">
            ${items
              .map((item) => {
                const checked = item.checked ? "checked" : "";
                const line = item.checked ? "line-through text-gray-400" : "";
                return `
                  <label class="inline-flex items-center gap-2">
                    <input type="checkbox" disabled ${checked} class="w-4 h-4 text-black" />
                    <span class="${line}">${item.text}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
        `;
      },
      
      
    linkTool: (block) => {
      const { link, meta } = block.data || {};
      return `
        <div class="my-4">
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">
            ${meta?.title || link}
          </a>
          <p class="text-sm text-gray-500">${meta?.description || ""}</p>
        </div>
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


