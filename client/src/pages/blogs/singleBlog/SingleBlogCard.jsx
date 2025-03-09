import React from 'react'
import { formatDate } from '../../../utilis/formateDat';
import EditorJSHTML from "editorjs-html"
import { useSelector } from 'react-redux';


const editorJSHTML = EditorJSHTML()
// const {user} = useSelector((state) => state.auth);
function SingleBlogCard({blog}) {
    //const {auhtor} = useSelector((state) => state.blog);
    const  {title, description, content, coverImg, category, rating, author, createdAt } = blog || {};

    //console.log(user)
    
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
           <p className='mb-6'>{formatDate(createdAt)} by {author?.username || "Unknown Author"}<span className='text-blue-400 cursor-pointer'></span></p>
        </div>
        <div className='w-full md:h-[400px] bg-cover flex justify-center'>
            <img src={coverImg} alt="cover Img" className='flex items-center justify-between' />
        </div>

        {/* blog detail */}
        <div className='mt-8 space-y-4 '>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='space-y-3 editorjsdiv'/>


            <div>
                <span className='text-lg font-medium'>Rating: </span>
                <span>{rating}</span>
            </div>
        
        </div>
    </div>
    </>
  )
}

export default SingleBlogCard