import { configureStore } from '@reduxjs/toolkit';
// import { api } from '../Api/api';
import AuthSilce from './Slices/AuthSlice';

import { PostAPI } from './Slices/PostAPI';

import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    [PostAPI.reducerPath]: PostAPI.reducer,
    auth: AuthSilce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostAPI.middleware, thunk),
});
