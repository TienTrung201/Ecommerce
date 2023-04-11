import images from '@/assets/image';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import CartHeader from '@/pages/Cart/CartHeader';
import UserAccount from '@/components/Layout/User';
function Header() {
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
                        {/* <li className="level1">
                            <Link to="/blog">Blog</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
            {/* pushmenu-open */}
            {/* Push cart */}
            <div ref={cart} className="pushmenu  pushmenu-left cart-box-container">
                <CartHeader />
            </div>
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
                            <Link to="/">All Categories</Link>
                        </li>
                        <li>
                            <Link to="/">Woman</Link>
                        </li>
                        <li>
                            <Link to="/">Man</Link>
                        </li>
                        <li>
                            <Link to="/">Accessories</Link>
                        </li>
                        <li>
                            <Link to="/">Kid</Link>
                        </li>
                        <li>
                            <Link to="/">Others</Link>
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

            <header id="header" className="header-v1">
                <div className="header-center">
                    <div className="container container-content">
                        <div className="row flex align-items-center justify-content-between">
                            <div className="col-md-4 col">
                                <div className="topbar-right">
                                    <div className="element">
                                        <Link onClick={handleOpenMenuBar} className="icon-pushmenu js-push-menu">
                                            <img src={images.menubar} alt="menubar" />
                                        </Link>
                                    </div>
                                    <div className="element element-currency hidden-xs hidden-sm">
                                        <Link
                                            id="label3"
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <span>USD</span>
                                            <span className="ion-arrow-down-b f-10 e-arrow"></span>
                                            {/* <FontAwesomeIcon icon={faCaretSquareDown} /> */}
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="label3">
                                            <li>
                                                <Link href="#">USD</Link>
                                            </li>
                                            <li>
                                                <Link href="#">AUD</Link>
                                            </li>
                                            <li>
                                                <Link href="#">EUR</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="element element-leaguage hidden-xs hidden-sm">
                                        <Link
                                            id="label2"
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <span>EN</span>
                                            <span className="ion-arrow-down-b f-10 e-arrow"></span>
                                            {/* <FontAwesomeIcon icon={faCaretSquareDown} /> */}
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="label2">
                                            <li>
                                                <Link href="#">EN</Link>
                                            </li>
                                            <li>
                                                <Link href="#">DE</Link>
                                            </li>
                                            <li>
                                                <Link href="#">FR</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col flex justify-content-center">
                                <Link to="/">
                                    <img src={require('@/assets/image/logo.png')} alt="" className="img-reponsive" />
                                </Link>
                            </div>
                            <div className="col-md-4 col flex justify-content-end">
                                <UserAccount onOpenSearch={handleOpenSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
