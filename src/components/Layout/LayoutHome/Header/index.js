import images from '@/assets/image';
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header id="header" className="header-v2">
            <div className="topbar hidden-xs hidden-sm">
                <button type="button" className="js-promo close">
                    <i className="ion-ios-close-empty black" aria-hidden="true"></i>
                </button>
                <div className="container container-content">
                    <div className="row flex">
                        <div className="col col-sm-4">
                            <div className="topbar-left">
                                <span className="text-3xl">Hotline: +01 234 567 890</span>
                                <div className="topbar-social">
                                    <Link to="">
                                        <i className="fa fa-facebook">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </i>
                                    </Link>
                                    <Link to="">
                                        <i className="fa fa-twitter">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </i>
                                    </Link>
                                    <Link to="">
                                        <i className="fa fa-linkedin">
                                            <FontAwesomeIcon icon={faLinkedinIn} />
                                        </i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col col-sm-4 justify-content-center">
                            <p>
                                Summer sale discount off 50%! <Link to="">Shop Now</Link>
                            </p>
                        </div>
                        <div className="col col-sm-4 justify-content-end">
                            <div className="topbar-right">
                                <div className="element element-currency">
                                    <Link
                                        id="label3"
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span>$ USD</span>
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="label3">
                                        <li>
                                            <Link to="#">USD</Link>
                                        </li>
                                        <li>
                                            <Link to="#">AUD</Link>
                                        </li>
                                        <li>
                                            <Link to="#">EUR</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="element element-leaguage">
                                    <Link
                                        id="label2"
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <img src="img/icon-l.png" alt="" />
                                        <span>English</span>
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="label2">
                                        <li>
                                            <Link to="#">EN</Link>
                                        </li>
                                        <li>
                                            <Link to="#">DE</Link>
                                        </li>
                                        <li>
                                            <Link to="#">FR</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-center">
                <div className="container container-content">
                    <div className="row flex align-items-center justify-content-between">
                        <div className="col-md-4 col-xs-4 col-sm-4 col2 hidden-lg hidden-md">
                            <div className="topbar-right">
                                <div className="element">
                                    <Link to="#" className="icon-pushmenu js-push-menu">
                                        <img src={images.menubar} alt="menubar" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-4 col-sm-4 col2 justify-content-center">
                            <Link to="#">
                                <img src={require('@/assets/image/logo2.png')} alt="" className="img-reponsive" />
                            </Link>
                        </div>
                        <div className="col-md-9 col-xs-4 col-sm-4 col2 flex justify-content-end">
                            <ul className="nav navbar-nav js-menubar hidden-xs hidden-sm">
                                <li className="level1 active dropdown">
                                    <Link to="/" title="Home">
                                        Home
                                    </Link>
                                    <span className="plus js-plus-icon"></span>
                                    {/* <div className="menu-level-1 dropdown-menu style5">
                                        <ul className="level1">
                                            <li className="level2 col-6">
                                                <Link to="#">Home Set 1</Link>
                                                <ul className="menu-level-2">
                                                    <li className="level3">
                                                        <Link to="01-Home-v1.html" title="Home page 1">
                                                            Home page 1{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v2.html" title="Home page 2">
                                                            Home page 2{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v3.html" title="Home page 3">
                                                            Home page 3{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v4.html" title="Home page 4">
                                                            Home page 4{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v5.html" title="Home page 5">
                                                            Home page 5{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v6.html" title="Home page 6">
                                                            Home page 6{' '}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="level2 col-6">
                                                <Link to="#">Home Set 2</Link>
                                                <ul className="menu-level-2">
                                                    <li className="level3">
                                                        <Link to="01-Home-v7.html" title="Home page 7">
                                                            Home page 7{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v8.html" title="Home page 8">
                                                            Home page 8{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v9.html" title="Home page 9">
                                                            Home page 9{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v10.html" title="Home page 10">
                                                            Home page 10{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="01-Home-v11.html" title="Home page 11">
                                                            Home page 11{' '}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div> */}
                                </li>
                                <li className="level1 dropdown hassub">
                                    <Link to="/shop" title="Shop">
                                        Shop
                                    </Link>
                                    <span className="plus js-plus-icon"></span>
                                    <div className="menu-level-1 dropdown-menu style4">
                                        <ul className="level1">
                                            <li className="level2 col-4a">
                                                <Link to="#">Shop Pages</Link>
                                                <ul className="menu-level-2">
                                                    <li className="level3">
                                                        <Link to="02-Shop_v1.html" title="Shop page v1">
                                                            Shop page v1{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="02-Shop_v2.html" title="Shop page v2">
                                                            Shop page v2{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="02-Shop_v3.html" title="Shop page v3">
                                                            Shop page v3{' '}
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="02-Shop_v4.html" title="Shop page v4">
                                                            Shop page v4{' '}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="level2 col-4a">
                                                <Link to="#">Product Pages</Link>
                                                <ul className="menu-level-2">
                                                    <li className="level3">
                                                        <Link to="03-Single_product_v1.html" title="Single product v1">
                                                            Single product v1
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="03-Single_product_v2.html" title="Single product v2">
                                                            Single product v2
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="03-Single_product_v3.html" title="">
                                                            Single product v3
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="03-Single_product_v4.html" title="Single product v4">
                                                            Single product v4
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="level2 col-4a">
                                                <div className="demo-img">
                                                    <Link to="" className="effect-img3 plus-zoom">
                                                        <img
                                                            src={require('@/assets/image/collection_4.jpg')}
                                                            alt="02-Shop_v2.html"
                                                            className="img-reponsive"
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                </li>
                                <li className="level1 hassub dropdown">
                                    <Link to="/collection" title="Collection">
                                        Collection
                                    </Link>
                                    <div className="menu-level-1 dropdown-menu style3">
                                        <div className="row">
                                            <div className="cate-item col-md-4 col-sm-12">
                                                <div className="demo-img">
                                                    <Link to="02-Shop_v1.html" className="effect-img3 plus-zoom">
                                                        <img
                                                            src={require('@/assets/image/collection_4.jpg')}
                                                            alt="02-Shop_v2.html"
                                                            className="img-reponsive"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="demo-text text-center">New Trending '18</div>
                                            </div>
                                            <div className="cate-item col-md-4 col-sm-12">
                                                <div className="demo-img">
                                                    <Link className="effect-img3 plus-zoom" to="">
                                                        <img
                                                            src={require('@/assets/image/collection_4.jpg')}
                                                            alt="02-Shop_v2.html"
                                                            className="img-reponsive"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="demo-text text-center">New Lookbooks</div>
                                            </div>
                                            <div className="cate-item col-md-4 col-sm-12">
                                                <div className="demo-img">
                                                    <Link className="effect-img3 plus-zoom" to="02-Shop_v3.html">
                                                        <img
                                                            src={require('@/assets/image/collection_4.jpg')}
                                                            alt="02-Shop_v2.html"
                                                            className="img-reponsive"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="demo-text text-center">Onsale</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="level1 dropdown hassub">
                                    <Link to="#" title="Pages">
                                        Pages
                                    </Link>
                                    <span className="plus js-plus-icon"></span>
                                    <div className="menu-level-1 dropdown-menu style2">
                                        <ul className="level1">
                                            <li className="level2 col-6">
                                                {/* <Link to="#">Page Set 1</Link> */}
                                                <ul className="menu-level-2">
                                                    <li className="level3">
                                                        <Link to="/aboutUs" title="About Us">
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="/contact" title="Contact">
                                                            Contact
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="myAccount" title="My Account">
                                                            My Account
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="Checkout" title="Check out">
                                                            Check out
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="level2 col-6">
                                                {/* <Link to="#">Page Set 2</Link> */}
                                                <ul className="menu-level-2">
                                                    <li className="level3">
                                                        <Link to="/cart" title="Cart">
                                                            Cart
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="/commingSoon" title="Coming Soon">
                                                            Coming Soon
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="/fAQs" title="FAQS">
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li className="level3">
                                                        <Link to="page404" title="">
                                                            404
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                </li>
                                <li className="level1 active dropdown">
                                    <Link to="/blog" title="Blog">
                                        Blog
                                    </Link>
                                    <ul className="dropdown-menu menu-level-1">
                                        <li>
                                            <Link className="sm_title" to="/blog" title="Blogs">
                                                Blogs
                                            </Link>
                                        </li>
                                        <li className="level2">
                                            <Link to="/blog" title="Blog List">
                                                Blog List
                                            </Link>
                                        </li>
                                        <li className="level2">
                                            <Link to="/blog" title="Blog Single">
                                                Blog Single
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="topbar-left">
                                <div className="element element-search hidden-xs hidden-sm">
                                    <Link to="#" className="zoa-icon search-toggle">
                                        <img src={images.search} alt="menubar" />
                                    </Link>
                                </div>
                                <div className="element element-user hidden-xs hidden-sm">
                                    <Link to="#" className="zoa-icon js-user">
                                        <img src={images.user} alt="menubar" />
                                    </Link>
                                </div>
                                <div className="element element-cart">
                                    <Link to="#" className="zoa-icon icon-cart">
                                        <img src={images.cart} alt="menubar" />
                                        <span className="count cart-count">0</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
