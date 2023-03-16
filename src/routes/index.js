import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Blog from '@/pages/Blog';
import Cart from '@/pages/Cart';
import CheckOut from '@/pages/CheckOut';
import CommingSoon from '@/pages/CommingSoon';
import Contact from '@/pages/Contact';
import FAQs from '@/pages/FAQs';
import MyAccount from '@/pages/MyAccount';
import Page404 from '@/pages/Page404';
import Shop from '@/pages/Shop';
import Login from '@/pages/Login';

import LayoutPage from '@/components/Layout/LayoutPage';
import LayoutHome from '@/components/Layout/LayoutHome';
import Collection from '@/pages/Collection';

const publicRoutes = [
    { path: '/', component: Home, layout: LayoutHome },
    { path: '/aboutUs', component: AboutUs, layout: LayoutPage },
    { path: '/blog', component: Blog, layout: LayoutPage },
    { path: '/Cart', component: Cart, layout: LayoutPage },
    { path: '/checkOut', component: CheckOut, layout: LayoutPage },
    { path: '/commingSoon', component: CommingSoon, layout: LayoutPage },
    { path: '/contact', component: Contact, layout: LayoutPage },
    { path: '/fAQs', component: FAQs, layout: LayoutPage },
    { path: '/myAccount', component: MyAccount, layout: LayoutPage },
    { path: '/page404', component: Page404, layout: LayoutPage },
    { path: '/shop', component: Shop, layout: LayoutPage },
    { path: '/collection', component: Collection, layout: LayoutPage },
    { path: '/login', component: Login, layout: null },
];

const privateRoutes = []; //cần đăng nhâp

export { publicRoutes, privateRoutes };
