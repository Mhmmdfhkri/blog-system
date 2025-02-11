import React from 'react'
import commentorIcon from '../../../assets/commentor.png'
import { formatDate } from '../../../utilis/formateDat'
import PostAComment from './PostAComment'
import { useSelector } from 'react-redux'
import {format} from 'timeago.js'


const CommentCard = ({comments}) => {
    console.log(comments)
    const user = useSelector((state) => state.auth.user);

  return (
    <div className='my-6 bg-bgPrimary p-8'>
        <div >
            {
                comments?.length > 0 ? <div>
                    <h3 className='text-lg font-medium'>All Comments</h3>
                    <div>{
                        comments.map((comment, index) => (
                            <div key={index} className='mt-4 bg-white p-4 rounded-2xl'>
                                <div className='flex gap-4 items-center'>
                                    <img src={commentorIcon} alt="" className='h-14'/>
                                    <div>
                                        <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{comment?.user?.username}</p>
                                        <p className='text-[12px] italic'>{format(comment.createdAt)}</p>
                                    </div>
                                </div>
                                {/* Comments Details */}
                                <div className='text-gray-600 p-3'>
                                    <p className='md:w-4/5'>{comment?.comment}</p>
                                </div>
                            </div>
                        ))
                        }</div>
                </div> : <div className='text-lg font-medium'>No Comments Found</div> 
            }
        </div>

        {/* comment input here! */}
        <PostAComment/>
    </div>
  )
}

export default CommentCard