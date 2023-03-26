import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import categoriesSlice from '@/pages/Category/CategotySlice';
import optionsSlice from '@/pages/OptionItem/optionItemSlice';
const store = configureStore({
    reducer: {
        // ------------ User interface ------------

        // ------------ Admin interface ------------
        notifications: notificationsSlice.reducer,
        categories: categoriesSlice.reducer,
        options: optionsSlice.reducer,
    },
});

export default store;
