import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import {
  usePostAllQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from '../../redux/Slices/PostAPI';

export const Home = () => {
  const [posts, setPosts] = useState();
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [url, setUrl] = useState('');

  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const checked = JSON.parse(localStorage.getItem('login'));
  // console.log(checked);
  // const { exp } = jwt_decode(checked.token);
  // const expirationTime = exp * 1000 - 60000;

  let navigate = useNavigate();

  const { data, isSuccess, refetch } = usePostAllQuery();
  console.log(data);

  useEffect(() => {
    setPosts(data?.post);
  }, []);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = await instancePost.get(
  //         'http://localhost:5000/api/v1/post/all'
  //         // , {
  //         //   headers: { Authorization: `Bearer ${checked.token}` },
  //         // }
  //       );
  //       setPosts(res.data.post);
  //       // console.log(res.data);
  //     } catch (error) {
  //       localStorage.setItem(
  //         'login',
  //         JSON.stringify({
  //           isLogin: false,
  //         })
  //       );
  //       console.log(error);
  //     }
  //   };
  //   fetchPost();
  // }, []);

  const instancePost = axios.create();
  instancePost.interceptors.request.use(
    async (config) => {
      const { exp } = jwt_decode(checked.token);
      const expirationTime = exp * 1000;
      let currentDate = Date.now();
      if (currentDate >= expirationTime) {
        navigate('/login');
        localStorage.clear();
        alert('Phien dang nhap cua ban da het han!');
      }

      config.headers['Authorization'] = `Bearer ${checked.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleCreatePost = async (e) => {
    try {
      e.preventDefault();
      // const res = await instancePost.post(
      //   'http://localhost:5000/api/v1/post/create',
      //   {
      //     title,
      //     description: des,
      //     url,
      //     status: 'LEARNING',
      //   }
      // );
      // setPosts([...posts, res.data.post]);
      const newPost = { title: title, des: des, url: url, status: 'LEARNING' };
      await createPost(newPost);
      setTitle('');
      setDes('');
      setUrl('');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      // e.preventDefault();
      await deletePost(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return checked?.isLogin ? (
    <div className="home-layout row">
      <nav className="navbar nav-expand navbar-dark bg-dark mb-5 ">
        <a className="navbar-brand" href="javascript:void(0)">
          Logo
        </a>

        <button
          className="btn btn-secondary me-5"
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </nav>
      <div className="col-6">
        <h3 className="d-flex justify-content-center ">List Post</h3>
        <table className="table table-hover ms-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Post</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {checked?.isLogin &&
              isSuccess &&
              data?.post.map((item, i) => (
                <>
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeletePost(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>

      <div className="col-6">
        <form onSubmit={handleCreatePost}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                onChange={(e) => setDes(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">URL</label>
            <div className="col-sm-10">
              <input
                type="url"
                className="form-control"
                placeholder="url"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Add Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to={'/login'} />
  );
};
