import { createSlice } from '@reduxjs/toolkit';
export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        status: 'idle',
        cartItems: [],
        // dataCartUser: [],
        cartId: '',
        wishlist: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload;
        },
        deleteCart: (state) => {
            state = {
                status: 'idle',
                cartItems: [],
                // dataCartUser: [],
                cartId: '',
                wishlist: [],
            };
        },
        setCartId: (state, action) => {
            state.cartId = action.payload;
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
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
