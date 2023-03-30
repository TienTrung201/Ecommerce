import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        uid: '',
        avatar: null,
        birthDate: null,
        createdAt: null,
        email: '',
        fullName: '',
        gender: null,
        password: '',
        phoneNumber: null,
        userName: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.userId;
            state.avatar = action.payload.avatar;
            state.birthDate = action.payload.birthDate;
            state.createdAt = action.payload.createdAt;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.gender = action.payload.gender;
            state.password = action.payload.password;
            state.phoneNumber = action.payload.phoneNumber;
            state.userName = action.payload.userName;
        },
    },
});
export default userSlice;
