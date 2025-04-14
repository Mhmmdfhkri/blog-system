import React, { useEffect } from 'react';
import { formatDate } from '../../../utilis/formateDat';
import EditorJSHTML from 'editorjs-html';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RelatedBlogs from './RelatedBlogs';
import CommentCard from '../comments/CommentCard';
//tambahan
import Quote from "@editorjs/quote";
import "react-toastify/dist/ReactToastify.css";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import InlineImage from "editorjs-inline-image";
import ColorPicker from "editorjs-color-picker";
import SimpleImage from "@editorjs/simple-image";
import editorjsCodeflask from "@calumk/editorjs-codeflask";
import ToggleBlock from 'editorjs-toggle-block';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Delimiter from '@coolbytes/editorjs-delimiter';
import ChangeCase from 'editorjs-change-case';
import Annotation from 'editorjs-annotation';

import EditorJS from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
import Header from "@editorjs/header";

const editorJSHTML = EditorJSHTML();

function SingleBlogCard({ blog }) {

    // tambahan

    useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4],
            defaultLevel: 1,
          },
        },
        changeCase: {
          class: ChangeCase,
          config: {
            showLocaleOption: true, // enable locale case options
            locale: 'tr' // or ['tr', 'TR', 'tr-TR']
          }
        },  
        annotation: Annotation,  
        delimiter: {
          class: Delimiter,
          config: {
            styleOptions: ['star', 'dash', 'line'],
            defaultStyle: 'star',
            lineWidthOptions: [8, 15, 25, 35, 50, 60, 100],
            defaultLineWidth: 25,
            lineThicknessOptions: [1, 2, 3, 4, 5, 6],
            defaultLineThickness: 2,
          }
        },
        list: {
          class: EditorjsList,
          inlineToolbar: true,
        },
        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
        code: editorjsCodeflask,
        images: SimpleImage,
        ColorPicker: {
          class: ColorPicker,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
            maxRows: 5,
            maxCols: 5,
          },
        },
        // code: CodeTool,
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "masukkan quote",
            captionPlaceholder: "Penulis",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        image: {
          class: InlineImage,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: "blog_system",
              apiUrl: "https://images.unsplash.com",
              maxResults: 30,
              imageParams: {
                q: 85,
                w: 1500,
              },
            },
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },
        audioPlayer: AudioPlayer,        
      },
    });

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

    // akhir

    const { title, description, content, coverImg, category, rating, author, createdAt } = blog || {};
    const parsedContent = editorJSHTML.parse(content);
    const htmlContent = Array.isArray(parsedContent) ? parsedContent.join('') : parsedContent;

    return (
        <div className="flex flex-col gap-8 px-8 md:px-16">
            {/* Detail Blog */}
            <div className="flex gap-8 flex-col lg:flex-row">
                <div className="lg:w-3/5 flex flex-col gap-6">
                    <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold">{title}</h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Penulis</span>
                        <Link className="text-blue-800">{author?.username || "Unknown Author"}</Link>
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
                            <img src={coverImg} alt="Cover" className="rounded-3xl object-cover w-full h-[350px]" />
                        </div>
                    )}
                </div>
            </div>
            {/* Content & Related Blogs */}
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-3/5 flex flex-col gap-6 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-3 editorjsdiv" />
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