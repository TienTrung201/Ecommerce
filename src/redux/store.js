import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import categoriesSlice from '@/pages/Category/CategotySlice';
import optionsSlice from '@/pages/OptionItem/optionItemSlice';
import adminUserSlice from '@/pages/Admin/AdminLogin/adminUserSlice';
import userSlice from '@/pages/MyAccount/UserSlice';
const store = configureStore({
    reducer: {
        // ------------ User interface ------------
        categories: categoriesSlice.reducer,
        options: optionsSlice.reducer,
        user: userSlice.reducer,

        // ------------ Admin interface ------------
        notifications: notificationsSlice.reducer,
        adminUser: adminUserSlice.reducer,
    },
});

export default store;
