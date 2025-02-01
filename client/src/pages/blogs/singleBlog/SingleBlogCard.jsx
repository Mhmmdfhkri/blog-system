import React from 'react'
import { formatDate } from '../../../utilis/formateDat';
import EditorJSHTML from "editorjs-html"


const editorJSHTML = EditorJSHTML()

function SingleBlogCard({blog}) {
    const  {title, description, content, coverImg, category, rating, author, createdAt } = blog || {};
    
//     const htmlContent = editorJSHTML.parse(content).join(''); // Pastikan konten HTML jadi satu string

     const parsedContent = editorJSHTML.parse(content);
     const htmlContent = Array.isArray(parsedContent) ? parsedContent.join('') : parsedContent;
   return (
    <>
    <div className='bg-white p-8'>
        {/* blog Header */}

        <div>
            <h1 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h1>
            {/* Todo: Need To Change Author  */}
            <p className='mb-6'>{formatDate(createdAt)} by <span className='text-blue-400 cursor-pointer'>Admin 1</span></p>
        </div>
        <div>
            <img src={coverImg} alt="cover Img" className='w-full md:h-[520px] bg-cover' />
        </div>

        {/* blog detail */}
        <div className='mt-8 space-y-4 '>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='space-y-3 editorjsdiv'/>


            <div>
                <span className='text-lg font-medium'>Rating: </span>
                <span>{rating} (base on 2,370 reviews)</span>
            </div>
        
        </div>
    </div>
    </>
  )
}

export default SingleBlogCard