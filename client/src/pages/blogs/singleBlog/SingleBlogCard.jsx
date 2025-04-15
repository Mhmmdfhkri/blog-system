import React from 'react';
import { formatDate } from '../../../utilis/formateDat';
import EditorJSHTML from 'editorjs-html';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RelatedBlogs from './RelatedBlogs';
import CommentCard from '../comments/CommentCard';

const editorJSHTML = EditorJSHTML();

function SingleBlogCard({ blog }) {



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