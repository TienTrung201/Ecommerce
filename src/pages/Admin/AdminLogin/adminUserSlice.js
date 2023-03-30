import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'adminUser',
    initialState: {
        uid: '',
        avatar: null,
        bio: null,
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
        setAdminUser: (state, action) => {
            state.uid = action.payload.adminUserId;
            state.avatar = action.payload.avatar;
            state.bio = action.payload.bio;
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
