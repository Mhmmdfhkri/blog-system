import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/comments`,
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (commentData) => ({
        url: "/post-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, {postId}) => [{ type: "Comments", id: postId }],
    }),
    getComments: builder.query({
        query: () => ({
            url: "/total-comments",
            method: "GET",
          }),
    }) 
  }),
});

export const {usePostCommentMutation, useGetCommentsQuery} = commentApi;

export default commentApi;
