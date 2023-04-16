import { createSlice } from '@reduxjs/toolkit';
export const optionsSlice = createSlice({
    name: 'optionsSlice',
    initialState: {
        status: 'idle',
        options: [],
    },
    reducers: {
        setOptions: (state, action) => {
            state.options = action.payload;
        },
    },
});
export default optionsSlice;
