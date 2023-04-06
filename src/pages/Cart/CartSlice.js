import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        status: 'idle',
        cartItems: [],
        // dataCartUser: [],
        cartId: '',
    },
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload;
        },
        setCartId: (state, action) => {
            state.cartId = action.payload;
        },
        // setDataCart: (state, action) => {
        //     state.dataCartUser = action.payload;
        // },
        removeItemCart: (state, action) => {
            state.cartItems.splice(action.payload, 1);
        },
        addItemsCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
    },
});
export default cartSlice;
