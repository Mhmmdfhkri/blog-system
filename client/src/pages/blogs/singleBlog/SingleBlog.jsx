import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi.js';
import SingleBlogCard from './SingleBlogCard.jsx';
import CommentCard from '../comments/CommentCard.jsx';
import RelatedBlogs from './RelatedBlogs.jsx';

const SingleBlog = () => {
  const {id} = useParams();
  const {data: blog, error, isLoading} = useFetchBlogByIdQuery(id);
  console.log(blog)
  return (
    <div className='text-primary container mx-auto mt-8'> 
    <div>
      {isLoading && <div>Loading....</div>}
      {error && <div>Something Went Wrong....</div>}
      {
        blog?.post && (
          <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
            <div className='lg:w-2/3 w-full'>
              <SingleBlogCard blog={blog.post}/>
              <CommentCard comments={blog.comments}/>
            </div>
            <div className='bg-white lg:w-1/3 w-full'><RelatedBlogs/></div>
          </div>
        )
      }
    </div>
    </div>
  )
}

export default SingleBlog