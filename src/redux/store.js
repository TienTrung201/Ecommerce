import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import adminUserSlice from '@/pages/Admin/AdminLogin/adminUserSlice';
const store = configureStore({
  reducer: {
    // ------------ User interface ------------

    // ------------ Admin interface ------------
    notifications: notificationsSlice.reducer,
    adminUser: adminUserSlice.reducer,
  },
});

export default store;
