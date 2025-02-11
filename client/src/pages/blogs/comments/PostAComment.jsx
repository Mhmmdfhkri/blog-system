import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostAComment = () => {
  
  const { id } = useParams();
  const [comment, setComment] = useState('')
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate()
  // console.log(user)
  const [postComment] = usePostCommentMutation();
  const {refetch} = useFetchBlogByIdQuery(id, {skip: !id});
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!user){
      toast.error('Please Login to Comment on this post');
      setTimeout(() => {
        navigate("/login"); // Navigasi ke login setelah 2 detik
      }, 2000); 
      return;
    }
    const newComment = {
      comment: comment,
      user: user?._id,
      postId: id
    };
    // console.log(newComment)
    try {
      const response = await postComment(newComment).unwrap();
      console.log(response)
      toast.success("Comment Posted Successfully");
      // alert('Comment Posted Successfully')
      setComment('');
      refetch()
    } catch (error) {
      toast.error('An Error occurred posting Comment'); // Error toast
    }
  } 

  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-3">Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea name="text"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Share Your Opinion About This Post"
        className="w-full rounded-2xl bg-white h-30 focus:outline-none p-2"/>
        <button type="submit" className="w-30 mt-2 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PostAComment;
