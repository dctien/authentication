import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { createPost } from '../Actions/PostActions';

export const PostAPI = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/',
    // Xử lý header trước khi gửi request
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.token;
      const token = JSON.parse(localStorage.getItem('login')).token;

      console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    postAll: builder.query({
      query: () => '/post/all',
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/post/create',
        method: 'POST',
        body: newPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { usePostAllQuery, useCreatePostMutation, useDeletePostMutation } =
  PostAPI;
