import { createSlice } from '@reduxjs/toolkit';
export const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        status: 'idle',
        categories: [],
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});
export default categoriesSlice;
