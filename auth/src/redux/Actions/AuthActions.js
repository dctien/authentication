import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        username,
        password,
      });
      // localStorage.setItem(
      //   'login',
      //   JSON.stringify({
      //     isLogin: res.data.success,
      //     token: res.data.accessToken,
      //   })
      // );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }) => {
    const res = await axios.post('http://localhost:5000/api/v1/auth/register', {
      username,
      password,
    });
    return res.data;
  }
);
