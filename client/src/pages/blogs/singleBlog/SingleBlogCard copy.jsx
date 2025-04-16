const customParsers = {
    paragraph: (block) => {
      const text = block?.data?.text;
      if (typeof text !== "string") {
        console.warn("Paragraph skipped: invalid text", block);
        return "";
      }
      return `<p class="text-gray-700 text-base leading-relaxed">${text}</p>`;
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
    delimiter: () => {
      return `<div class="text-center my-4 text-gray-300">***</div>`;
    },
    header: (block) => {
      const level = block?.data?.level || 2;
      const sizeClass = {
        1: "text-3xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-base",
        6: "text-sm",
      }[level];
      return `<h${level} class="font-semibold text-gray-800 ${sizeClass}">${block?.data?.text || ""}</h${level}>`;
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
  