import { createSlice } from '@reduxjs/toolkit';
export const shippingSlice = createSlice({
    name: 'shippingSlice',
    initialState: {
        status: 'idle',
        shippingMethods: [],
    },
    reducers: {
        setShippingMethods: (state, action) => {
            state.shippingMethods = action.payload;
        },
    },
});
export default shippingSlice;
