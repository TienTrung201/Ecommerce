import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        uid: '',
        fullName: '',
        phoneNumber: '',
        gender: '',
        birthDate: '',
        password: '',
        avatar: '',
        email: '',
        userName: '',
        createdAt: null,
        addresses: [],
        paymentMethods: [],
        positionAddress: '',
        paymentMethodId: '0',
    },

    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.userId;
            state.avatar = action.payload.avatar === null ? '' : action.payload.avatar;
            state.birthDate = action.payload.birthDate === null ? '' : action.payload.birthDate;
            state.createdAt = action.payload.createdAt;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.gender = action.payload.gender === null ? '' : action.payload.gender;
            state.password = action.payload.password;
            state.phoneNumber = action.payload.phoneNumber === null ? '' : action.payload.phoneNumber;
            state.userName = action.payload.userName;
            state.addresses = action.payload.addresses;
            state.paymentMethods = action.payload.paymentMethods;
        },
        addAdress: (state, action) => {
            state.addresses.push(action.payload);
        },
        addPaymentMethod: (state, action) => {
            state.paymentMethods.push(action.payload);
        },
        removeAddress: (state, action) => {
            state.addresses.splice(action.payload, 1);
        },
        removePaymentMethod: (state, action) => {
            state.paymentMethods.splice(action.payload, 1);
        },
        editAddress: (state, action) => {
            state.addresses.splice(action.payload.position, 1, action.payload.data);
        },
        setPosition: (state, action) => {
            state.positionAddress = action.payload;
        },
        setpaymentMethod: (state, action) => {
            state.paymentMethodId = action.payload;
        },
    },
});
export default userSlice;
