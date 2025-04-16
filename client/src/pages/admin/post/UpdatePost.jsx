import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
import Header from "@editorjs/header";
import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/features/blogs/blogsApi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import FootnotesTune from '@editorjs/footnotes';

import AudioPlayer from 'editorjs-audio-player';

import Checklist from '@editorjs/checklist';

import Underline from '@editorjs/underline';

import Tooltip from 'editorjs-tooltip';


const UpdatePost = () => {
  const { id } = useParams();

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setcoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [updateBlog] = useUpdateBlogMutation();

  const {
    data: blog = {},
    error,
    isLoading,
    refetch,
  } = useFetchBlogByIdQuery(id);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!blog?.post) return; // Pastikan blog.post ada sebelum mengaksesnya
  
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
        audioPlayer: AudioPlayer,
        tooltip: {
          class: Tooltip,
          config: {
            location: 'left',
            underline: true,
            placeholder: 'Enter a tooltip',
            highlightColor: '#FFEFD5',
            backgroundColor: '#154360',
            textColor: '#FDFEFE',
            holder: 'editorId',
          }
        },
        footnotes: {
          class: FootnotesTune,
        },
        underline: Underline,
        changeCase: {
          class: ChangeCase,
          config: {
            showLocaleOption: true,
            locale: "tr",
          },
        },
        annotation: Annotation,
        delimiter: {
          class: Delimiter,
          config: {
            defaultStyle: "star",
          },
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
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "Masukkan quote",
            captionPlaceholder: "Penulis",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          tunes: ['footnotes'],
        },
        checklist: {
                  class: Checklist,
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
              coub: true,
            },
          },
        },
      },
      data: blog?.post?.content || {}, // Pastikan content tidak undefined
    });
  
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [blog?.post]); // Tambahkan optional chaining di dependency array
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog.post.title,
        coverImg: coverImg || blog.post.coverImg,
        category : category || blog.post.category,
        content,
        description: metaDescription || blog.post.description,
        author: user?._id,
        rating: rating || blog.post.rating,
      };

      // console.log(updatedPost)
      const response = await updateBlog({ id, ...updatedPost }).unwrap();
      console.log(response);
      toast.success("Post Berhasil diupdate!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      refetch();
    } catch (error) {
      console.log("Failed To Submit post", error);
      setMessage("Failed To Submit Post. Please Try Again");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <h2 className="text-2xl font-semibold">Edit or Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title :</label>
          <input
            type="text"
            defaultValue={blog?.post?.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
            placeholder="Ex: Puisi"
            required
          />
        </div>
        {/* blog details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Left Side */}
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Write your post below here</p>
            <div id="editorjs"></div>
          </div>
          {/* right Side */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose Blog Format</p>

            {/* images */}
            <div className="space-y-4">
              <label className="font-semibold">Blog Cover :</label>
              <input
                type="text"
                defaultValue={blog?.post?.coverImg}
                onChange={(e) => setcoverImg(e.target.value)}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder="https://unsplash.com/image/cover-photo-of-blog/..."
                required
              />
            </div>

            {/* category */}
            <div className="space-y-4">
              <label className="font-semibold">Category :</label>
              <input
                type="text"
                defaultValue={blog?.post?.category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder="Puisi"
                required
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-4">
              <label className="font-semibold text-xl">
                Meta Description :
              </label>
              <textarea
                type="text"
                cols={4}
                rows={4}
                defaultValue={blog?.post?.description}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder="Write Your Blog meta Description"
                required
              />
            </div>

            {/* rating */}
            <div className="space-y-4">
              <label className="font-semibold text-xl">Rating :</label>
              <input
                type="number"
                defaultValue={blog?.post?.rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-4">
              <label className="font-semibold text-xl">Author :</label>
              <input
                type="text"
                value={user?.username || ""}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder={`${user.username} (not Editable)`}
                disabled
              />
            </div>
          </div>
        </div>

        {message && <p className="text-red-500">{message}</p>}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          Update Blog Text
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdatePost;
