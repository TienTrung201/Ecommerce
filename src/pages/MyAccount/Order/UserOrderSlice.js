import { createSlice } from '@reduxjs/toolkit';
export const userOrderSlice = createSlice({
    name: 'userOrderSlice',
    initialState: {
        status: 'idle',
        dataOrder: [],
    },
    reducers: {
        setDataOrder: (state, action) => {
            state.dataOrder = action.payload;
        },
    },
});
export default userOrderSlice;
