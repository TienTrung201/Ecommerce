import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
const store = configureStore({
  reducer: {
    // ------------ User interface ------------

    // ------------ Admin interface ------------
    notifications: notificationsSlice.reducer,
  },
});

export default store;
