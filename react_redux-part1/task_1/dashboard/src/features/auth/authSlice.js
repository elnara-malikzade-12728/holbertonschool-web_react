import {
  createSlice,
} from '@reduxjs/toolkit';

export const initialState = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, action) => {
      const {
        email,
        password,
      } = action.payload;

      state.user.email = email;
      state.user.password = password;
      state.user.isLoggedIn = true;
    },

    logout: (state) => {
      state.user.email = '';
      state.user.password = '';
      state.user.isLoggedIn = false;
    },
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
