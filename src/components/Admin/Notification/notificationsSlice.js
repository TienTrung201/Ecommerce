import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'notifications',
  initialState: {
    message: '',
    type: 'destroy',
  },
  reducers: {
    showLoading: (state, action) => {
      state.message = action.payload;
      state.type = 'loading';
    },
    showSuccess: (state, action) => {
      state.message = action.payload;
      state.type = 'success';
    },
    showError: (state, action) => {
      state.message = action.payload;
      state.type = 'error';
    },
    destroy: (state, action) => {
      state.type = 'destroy';
    },
  },
});
