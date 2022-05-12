import { createSlice } from '@reduxjs/toolkit';
// import { api } from '../../Api/api';
import { login, register } from '../Actions/AuthActions';

const initialState = {
  isLogin: false,
  token: '',
};

const AuthSilce = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, actions) => {
      state.isLogin = actions.payload.success;
      state.token = actions.payload.accessToken;
    });

    builder.addCase(login.rejected, (state) => {
      state.isLogin = false;
    });

    builder.addCase(register.fulfilled, (state, actions) => {
      state.isLogin = actions.payload.success;
      state.token = actions.payload.accessToken;
    });
  },
});

export default AuthSilce.reducer;
