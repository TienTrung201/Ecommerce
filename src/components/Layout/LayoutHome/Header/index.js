import images from '@/assets/image';
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '@/assets/css/fixStyleBase.scss';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import UserAccount from '@/components/Layout/User';

function Header({ isUser }) {
    //event close open header
    const cart = useRef();
    const menuBar = useRef();
    const overlay = useRef();
    const searchProduct = useRef();

    const handleCloseSearch = () => {
        searchProduct.current.classList.remove('search--open');
    };
    const handleOpenSearch = () => {
        searchProduct.current.classList.add('search--open');
    };
    const handleCloseOverlay = () => {
        overlay.current.classList.remove('overlay-open');
        cart.current.classList.remove('pushmenu-open');
        menuBar.current.classList.remove('pushmenu-open');
    };
    const handleOpenOverlay = () => {
        overlay.current.classList.add('overlay-open');
    };
    const handleOpenMenuBar = () => {
        menuBar.current.classList.add('pushmenu-open');

        handleOpenOverlay();
    };
    const handleCloseMenuBar = () => {
        menuBar.current.classList.remove('pushmenu-open');
        handleCloseOverlay();
    };
    //event close open header
    return (
        <>
            {/* overlay */}
            <div ref={overlay} onClick={handleCloseOverlay} className="overlay-container overlay-close "></div>
            {/* overlay */}

            {/* pushmenu-open */}
            <div ref={menuBar} className="pushmenu menu-home5">
                <div className="menu-push">
                    <span onClick={handleCloseMenuBar} className="close-left js-close">
                        <i className="ion-ios-close-empty f-40">
                            <FontAwesomeIcon icon={faClose} />
                        </i>
                    </span>
                    <div className="clearfix"></div>
                    <form role="search" method="get" id="searchform" className="searchform" action="/search">
                        <div>
                            <label className="screen-reader-text" htmlFor="q"></label>
                            <input type="text" placeholder="Search for products" name="q" id="q" autoComplete="off" />
                            <input type="hidden" name="type" />
                            <button type="submit" id="searchsubmit">
                                <i className="ion-ios-search-strong">
                                    <FontAwesomeIcon icon={faSearch} />
                                </i>
                            </button>
                        </div>
                    </form>
                    <ul className="nav-home5 js-menubar">
                        <li className="level1 active dropdown">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="level1 active dropdown">
                            <Link to="/shop" title="Shop">
                                Shop
                            </Link>
                        </li>
                        <li className="level1 active dropdown">
                            <Link to="/myAccount" title="Shop">
                                My Account
                            </Link>
                        </li>
                        <li className="level1">
                            <Link to="/aboutUs">About Us</Link>
                        </li>
                        <li className="level1">
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li className="level1">
                            <Link to="/commingSoon">Comming Soon</Link>
                        </li>
                        <li className="level1">
                            <Link to="/contact">Contact</Link>
                        </li>
                        {/* <li className="level1">
                            <Link to="/blog">Blog</Link>
                        </li> */}
                    </ul>
                    <ul className="mobile-account">
                        <li>
                            <Link href="">
                                <i className="fa fa-unlock-alt"></i>Login
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <i className="fa fa-user-plus"></i>Register
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <i className="fa fa-heart"></i>Wishlist
                            </Link>
                        </li>
                    </ul>
                    <h4 className="mb-title">connect and follow</h4>
                    <div className="mobile-social mg-bottom-30">
                        <Link href="">
                            <i className="fa fa-facebook"></i>
                        </Link>
                        <Link href="">
                            <i className="fa fa-twitter"></i>
                        </Link>
                        <Link href="">
                            <i className="fa fa-google-plus"></i>
                        </Link>
                    </div>
                </div>
            </div>
            {/* pushmenu-open */}
            {/* Push cart */}

            {/* Push cart */}

            {/* Search form */}
            <div ref={searchProduct} className="search-form-wrapper header-search-form ">
                <div className="container">
                    <div className="search-results-wrapper">
                        <div onClick={handleCloseSearch} className="btn-search-close">
                            <i className="ion-ios-close-empty">
                                <FontAwesomeIcon icon={faClose} />
                            </i>
                        </div>
                    </div>
                    <ul className="zoa-category text-center">
                        <li>
                            <Link href="">All Categories</Link>
                        </li>
                        <li>
                            <Link href="">Woman</Link>
                        </li>
                        <li>
                            <Link href="">Man</Link>
                        </li>
                        <li>
                            <Link href="">Accessories</Link>
                        </li>
                        <li>
                            <Link href="">Kid</Link>
                        </li>
                        <li>
                            <Link href="">Others</Link>
                        </li>
                    </ul>
                    <form method="get" action="/search" role="search" className="search-form has-categories-select">
                        <input
                            name="q"
                            className="search-input"
                            type="text"
                            defaultValue=""
                            placeholder="Enter your keywords..."
                            autoComplete="off"
                        />
                        <input type="hidden" name="post_type" defaultValue="product" />
                        <button type="submit" id="search-btn">
                            <i className="ion-ios-search-strong">
                                <FontAwesomeIcon icon={faSearch} />
                            </i>
                        </button>
                    </form>
                </div>
            </div>
            {/* Search form */}

            {/* Header */}
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
                                    <div onClick={handleOpenMenuBar} className="element">
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
                                    </li>
                                    <li className="level1 dropdown hassub">
                                        <Link to="/shop" title="Shop">
                                            Shop
                                        </Link>
                                    </li>
                                    {/* <li className="level1 hassub dropdown">
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
                                    </li> */}
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
                                                            <Link to="/cart" title="Cart">
                                                                Cart
                                                            </Link>
                                                        </li>
                                                        <li className="level3">
                                                            <Link to="/aboutUs" title="About Us">
                                                                About Us
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
                                        <Link to="/contact" title="Contact">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                                <UserAccount onOpenSearch={handleOpenSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header */}
        </>
    );
}

export default Header;
