import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import categoriesSlice from '@/pages/Category/CategotySlice';
import optionsSlice from '@/pages/OptionItem/optionItemSlice';
import adminUserSlice from '@/pages/Admin/AdminLogin/adminUserSlice';
import userSlice from '@/pages/MyAccount/UserSlice';
import cartSlice from '@/pages/Cart/CartSlice';
import shippingSlice from '@/pages/ShippingMethod/ShippingSlice';
import userOrderSlice from '@/pages/MyAccount/Order/UserOrderSlice';
const store = configureStore({
    reducer: {
        // ------------ User interface ------------
        categories: categoriesSlice.reducer,
        options: optionsSlice.reducer,
        cart: cartSlice.reducer,
        user: userSlice.reducer,
        shippingMethods: shippingSlice.reducer,
        userOrder: userOrderSlice.reducer,

        // ------------ Admin interface ------------
        notifications: notificationsSlice.reducer,
        adminUser: adminUserSlice.reducer,
    },
});

export default store;
