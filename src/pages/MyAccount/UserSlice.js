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
    },
});
export default userSlice;
