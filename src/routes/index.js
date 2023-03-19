import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
// import Blog from '@/pages/Blog';
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
// import Collection from '@/pages/Collection';

// Admin
import LayoutAdmin from '@/components/Admin/Layout/LayoutAdmin';
<<<<<<< HEAD
import Dashboard from '@/pages/Admin/Dashboard';
import ProductCategories from '@/pages/Admin/ProductCategories';
import ProductCategoriesCreate from '@/pages/Admin/ProductCategoriesCreate';
import Promotions from '@/pages/Admin/Promotions';
import PromotionsCreate from '@/pages/Admin/PromotionsCreate';
import Products from '@/pages/Admin/Products';
import ProductsCreate from '@/pages/Admin/ProductsCreate';
=======
import Product from '@/pages/Product';
>>>>>>> Pages

const publicRoutes = [
    { path: '/', component: Home, layout: LayoutHome },
    { path: '/aboutUs', component: AboutUs, layout: LayoutPage },
    { path: '/product', component: Product, layout: LayoutPage },
    // { path: '/blog', component: Blog, layout: LayoutPage },
    { path: '/Cart', component: Cart, layout: LayoutPage },
    { path: '/checkOut', component: CheckOut, layout: LayoutPage },
    { path: '/commingSoon', component: CommingSoon, layout: null },
    { path: '/contact', component: Contact, layout: LayoutPage },
    { path: '/fAQs', component: FAQs, layout: LayoutPage },
    { path: '/myAccount', component: MyAccount, layout: LayoutPage },
    { path: '/page404', component: Page404, layout: LayoutPage },
    { path: '/shop', component: Shop, layout: LayoutPage },
    // { path: '/collection', component: Collection, layout: LayoutPage },
    { path: '/login', component: Login, layout: null },
];

const privateRoutes = [
    { path: '/admin', component: Dashboard, layout: LayoutAdmin },
    { path: '/admin/products/categories', component: ProductCategories, layout: LayoutAdmin },
    { path: '/admin/products/categories/create', component: ProductCategoriesCreate, layout: LayoutAdmin },
    { path: '/admin/promotions', component: Promotions, layout: LayoutAdmin },
    { path: '/admin/promotions/create', component: PromotionsCreate, layout: LayoutAdmin },
    { path: '/admin/products', component: Products, layout: LayoutAdmin },
    { path: '/admin/products/create', component: ProductsCreate, layout: LayoutAdmin },
];

export { publicRoutes, privateRoutes };
