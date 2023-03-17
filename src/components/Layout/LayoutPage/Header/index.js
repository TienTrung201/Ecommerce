import images from '@/assets/image';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
function Header() {
    //ref
    const cart = useRef();
    const menuBar = useRef();
    const overlay = useRef();
    const searchProduct = useRef();

    //handle
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
    const handleOpenCart = () => {
        cart.current.classList.add('pushmenu-open');
        handleOpenOverlay();
    };
    const handleCloseCart = () => {
        cart.current.classList.remove('pushmenu-open');
        handleCloseOverlay();
    };
    //handle
    return (
        <>
            {/* overlay */}
            <div ref={overlay} onClick={handleCloseOverlay} className="overlay-container overlay-close "></div>
            {/* overlay */}

            {/* pushmenu-open */}
            <div ref={menuBar} onClick={handleCloseMenuBar} className="pushmenu menu-home5">
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
                            <Link to="/blog">Blog</Link>
                        </li>
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
            <div ref={cart} className="pushmenu  pushmenu-left cart-box-container">
                <div className="cart-list">
                    <div className="cart-list-heading">
                        <h3 className="cart-title">My cart</h3>
                        <span onClick={handleCloseCart} className="close-left js-close">
                            <i className="ion-ios-close-empty">
                                <FontAwesomeIcon icon={faClose} />
                            </i>
                        </span>
                    </div>
                    <div className="cart-inside">
                        <ul className="list">
                            <li className="item-cart">
                                <div className="product-img-wrap">
                                    <Link href="#" title="Product">
                                        <img
                                            src={require('@/assets/image/product/cart_product_1.jpg')}
                                            alt="Product"
                                            className="img-responsive"
                                        />
                                    </Link>
                                </div>
                                <div className="product-details">
                                    <div className="inner-left">
                                        <div className="product-name">
                                            <Link href="#">Grosgrain tie cotton top</Link>
                                        </div>
                                        <div className="product-price">
                                            <span>$20.9</span>
                                        </div>
                                        <div className="cart-qtt">
                                            <button
                                                type="button"
                                                className="quantity-left-minus btn btn-number js-minus"
                                                data-type="minus"
                                                data-field=""
                                            >
                                                <span className="minus-icon">
                                                    <i className="ion-ios-minus-empty" />
                                                </span>
                                            </button>
                                            <input
                                                type="text"
                                                name="number"
                                                defaultValue={1}
                                                className="product_quantity_number js-number"
                                            />
                                            <button
                                                type="button"
                                                className="quantity-right-plus btn btn-number js-plus"
                                                data-type="plus"
                                                data-field=""
                                            >
                                                <span className="plus-icon">
                                                    <i className="ion-ios-plus-empty" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="item-cart">
                                <div className="product-img-wrap">
                                    <Link href="#" title="Product">
                                        <img
                                            src={require('@/assets/image/product/cart_product_1.jpg')}
                                            alt="Product"
                                            className="img-responsive"
                                        />
                                    </Link>
                                </div>
                                <div className="product-details">
                                    <div className="inner-left">
                                        <div className="product-name">
                                            <Link href="#">Grosgrain tie cotton top</Link>
                                        </div>
                                        <div className="product-price">
                                            <span>$20.9</span>
                                        </div>
                                        <div className="cart-qtt">
                                            <button
                                                type="button"
                                                className="quantity-left-minus btn btn-number js-minus"
                                                data-type="minus"
                                                data-field=""
                                            >
                                                <span className="minus-icon">
                                                    <i className="ion-ios-minus-empty" />
                                                </span>
                                            </button>
                                            <input
                                                type="text"
                                                name="number"
                                                defaultValue={1}
                                                className="product_quantity_number js-number"
                                            />
                                            <button
                                                type="button"
                                                className="quantity-right-plus btn btn-number js-plus"
                                                data-type="plus"
                                                data-field=""
                                            >
                                                <span className="plus-icon">
                                                    <i className="ion-ios-plus-empty" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="cart-bottom">
                            <div className="cart-form">
                                <div className="cart-note-form">
                                    <label
                                        htmlFor="CartSpecialInstructions"
                                        className="cart-note cart-note_text_label small--text-center"
                                    >
                                        Special Offer:
                                    </label>
                                    <textarea
                                        rows={6}
                                        name="note"
                                        id="CartSpecialInstructions"
                                        className="cart-note__input form-control note--input"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <div className="cart-button mg-top-30">
                                <Link className="zoa-btn checkout" href="#" title="">
                                    Check out
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* End cart bottom */}
                </div>
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
                                <Link href="#">
                                    <img src={require('@/assets/image/logo.png')} alt="" className="img-reponsive" />\
                                </Link>
                            </div>
                            <div className="col-md-4 col flex justify-content-end">
                                <div className="topbar-left">
                                    <div className="element element-search hidden-xs hidden-sm">
                                        <Link onClick={handleOpenSearch} className="zoa-icon search-toggle">
                                            <img src={images.search} alt="menubar" />
                                        </Link>
                                    </div>
                                    <div className="element element-user hidden-xs hidden-sm">
                                        <Link to="/login" className="zoa-icon js-user">
                                            <img src={images.user} alt="menubar" />
                                        </Link>
                                    </div>
                                    <div className="element element-cart">
                                        <Link onClick={handleOpenCart} className="zoa-icon icon-cart">
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
        </>
    );
}

export default Header;
