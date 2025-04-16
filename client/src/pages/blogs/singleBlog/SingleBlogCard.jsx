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
      const { style, items } = block.data;
    
      if (!items || !Array.isArray(items)) return "";
    
      // ✅ Checklist
      if (style === "checklist") {
        return `
          <div class="my-4">
            <ul class="space-y-2">
              ${items
                .map(
                  (item) => `
                    <li class="flex items-start gap-2">
                      <input type="checkbox" disabled ${item?.meta?.checked ? "checked" : ""} class="mt-1 accent-green-600">
                      <span class="text-gray-700">${item.content}</span>
                    </li>
                  `
                )
                .join("")}
            </ul>
          </div>
        `;
      }
    
      // ✅ Ordered/Unordered List
      const tag = style === "ordered" ? "ol" : "ul";
      const listClass = style === "ordered" ? "list-decimal" : "list-disc";
    
      return `
        <${tag} class="${listClass} list-inside ml-6 text-gray-700 my-4">
          ${items
            .map((item) => {
              if (typeof item === "string") return `<li>${item}</li>`;
              if (typeof item === "object" && item?.content) return `<li>${item.content}</li>`;
              return "";
            })
            .join("")}
        </${tag}>
      `;
    },

    code: (block) => {
      const { code, language = "plaintext", showlinenumbers } = block.data || {};
    
      if (!code) return "";
    
      return `
        <div class="my-6 max-w-full overflow-x-auto">
          <pre class="bg-[#1e1e1e] text-white text-sm p-4 rounded-md font-mono leading-snug w-fit min-w-[300px]">
            <code class="hljs" data-language="${language}">
              ${
                showlinenumbers
                  ? code
                      .split("\n")
                      .map(
                        (line, idx) =>
                          `<div class="flex"><span class="pr-4 text-gray-400 select-none">${idx + 1}</span><span>${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span></div>`
                      )
                      .join("")
                  : code.replace(/</g, "&lt;").replace(/>/g, "&gt;")
              }
            </code>
          </pre>
        </div>
      `;
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
    
      const header = content[0];
      const bodyRows = content.slice(1);
    
      const thead = `
        <thead class="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            ${header.map((cell) => `<th class="border border-gray-300 px-4 py-2 text-left">${cell}</th>`).join("")}
          </tr>
        </thead>
      `;
    
      const tbody = `
        <tbody>
          ${bodyRows
            .map(
              (row) => `
            <tr class="hover:bg-gray-50 transition">
              ${row.map((cell) => `<td class="border border-gray-200 px-4 py-2">${cell}</td>`).join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      `;
    
      return `
        <div class="overflow-x-auto my-6 rounded-xl shadow-md">
          <table class="min-w-full table-auto border-collapse bg-white">
            ${thead}
            ${tbody}
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


