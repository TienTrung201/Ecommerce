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

import LayoutPage from '@/components/Layout/LayoutPage';
import LayoutHome from '@/components/Layout/LayoutHome';
import SignUp from '@/pages/Login/SignUp';
import SignIn from '@/pages/Login/SignIn';
import ForgotPassword from '@/pages/Login/ForgotPasswprd';
// import Collection from '@/pages/Collection';

// Admin
import LayoutAdmin from '@/components/Admin/Layout/LayoutAdmin';
import Dashboard from '@/pages/Admin/Dashboard';
import ProductCategories from '@/pages/Admin/ProductCategories';
import ProductCategoriesCreate from '@/pages/Admin/ProductCategoriesCreate';
import Promotions from '@/pages/Admin/Promotions';
import PromotionsCreate from '@/pages/Admin/PromotionsCreate';
import Products from '@/pages/Admin/Products';
import ProductsCreate from '@/pages/Admin/ProductsCreate';
import Product from '@/pages/Product';
import ManageAdminUsers from '@/pages/Admin/ManageAdminUsers';
import ManageRoles from '@/pages/Admin/ManageRoles';
import EditUserRoles from '@/pages/Admin/EditUserRoles';
import EditRoles from '@/pages/Admin/EditRoles';
import ShippingMethods from '@/pages/Admin/ShippingMethods';
import ShippingMethodsCreate from '@/pages/Admin/ShippingMethodsCreate';
import ShopOrders from '@/pages/Admin/ShopOrders';
import ShopOrdersDetail from '@/pages/Admin/ShopOrdersDetail';
import AdminLogin from '@/pages/Admin/AdminLogin';
import AdminRegister from '@/pages/Admin/AdminRegister';
import Profile from '@/pages/Admin/Profile';
import ProductProviders from '@/pages/Admin/ProductProviders';
import ProductOptions from '@/pages/Admin/ProductOptions';
import ProductProviderCreate from '@/pages/Admin/ProductProvidersCreate';
import ProductOptionsCreate from '@/pages/Admin/ProductOptionsCreate';
import ManageUsers from '@/pages/Admin/ManageUsers';

const publicRoutes = [
    { path: '/', component: Home, layout: LayoutHome },
    { path: '/aboutUs', component: AboutUs, layout: LayoutPage },
    { path: '/product', component: Product, layout: LayoutPage },
    { path: '/product/:name/:id', component: Product, layout: LayoutPage },
    // { path: '/blog', component: Blog, layout: LayoutPage },
    { path: '/Cart', component: Cart, layout: LayoutPage },
    { path: '/checkOut', component: CheckOut, layout: LayoutPage },
    { path: '/commingSoon', component: CommingSoon, layout: null },
    { path: '/contact', component: Contact, layout: LayoutPage },
    { path: '/fAQs', component: FAQs, layout: LayoutPage },
    { path: '/myAccount', component: MyAccount, layout: LayoutPage },
    { path: '/myAccount/:infoManagerment', component: MyAccount, layout: LayoutPage },
    { path: '/page404', component: Page404, layout: LayoutPage },
    { path: '/shop', component: Shop, layout: LayoutPage },
    // { path: '/collection', component: Collection, layout: LayoutPage },
    { path: '/user/signup', component: SignUp, layout: null },
    { path: '/user/signin', component: SignIn, layout: null },
    { path: '/user/forgotpassword', component: ForgotPassword, layout: null },
];

const privateRoutes = [
    { path: '/admin', component: Dashboard, layout: LayoutAdmin },
    { path: '/admin/categories', component: ProductCategories, layout: LayoutAdmin },
    { path: '/admin/categories/:action/:id', component: ProductCategoriesCreate, layout: LayoutAdmin },
    { path: '/admin/providers', component: ProductProviders, layout: LayoutAdmin },
    { path: '/admin/providers/:action/:id', component: ProductProviderCreate, layout: LayoutAdmin },
    { path: '/admin/product-options', component: ProductOptions, layout: LayoutAdmin },
    { path: '/admin/product-options/:action/:id', component: ProductOptionsCreate, layout: LayoutAdmin },
    { path: '/admin/promotions', component: Promotions, layout: LayoutAdmin },
    { path: '/admin/promotions/:action/:id', component: PromotionsCreate, layout: LayoutAdmin },
    { path: '/admin/products', component: Products, layout: LayoutAdmin },
    { path: '/admin/products/:action/:id', component: ProductsCreate, layout: LayoutAdmin },
    { path: '/admin/manage-users', component: ManageUsers, layout: LayoutAdmin },
    { path: '/admin/manage-admins', component: ManageAdminUsers, layout: LayoutAdmin },
    { path: '/admin/manage-admins/:action/:id', component: EditUserRoles, layout: LayoutAdmin },
    { path: '/admin/manage-roles', component: ManageRoles, layout: LayoutAdmin },
    { path: '/admin/manage-roles/:action/:id', component: EditRoles, layout: LayoutAdmin },
    { path: '/admin/shipping-methods', component: ShippingMethods, layout: LayoutAdmin },
    { path: '/admin/shipping-methods/:action/:id', component: ShippingMethodsCreate, layout: LayoutAdmin },
    { path: '/admin/orders', component: ShopOrders, layout: LayoutAdmin },
    { path: '/admin/orders/:action/:id', component: ShopOrdersDetail, layout: LayoutAdmin },
    { path: '/admin/login', component: AdminLogin, layout: null },
    { path: '/admin/register', component: AdminRegister, layout: null },
    { path: '/admin/profile', component: Profile, layout: LayoutAdmin },
];

export { publicRoutes, privateRoutes };
