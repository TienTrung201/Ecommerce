import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        status: 'idle',
        cartItems: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload;
        },
    },
});
export default cartSlice;
