import images from '@/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '@/assets/css/fixStyleBase.scss';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import UserAccount from '@/components/Layout/User';

function Header() {
    //event close open header
    const menuBar = useRef();
    const overlay = useRef();

    const handleCloseOverlay = () => {
        overlay.current.classList.remove('overlay-open');
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
                </div>
            </div>
            {/* pushmenu-open */}
            {/* Push cart */}

            {/* Push cart */}

            {/* Header */}
            <header id="header" className="header-v2 ">
                <nav className="header-center position-sticky">
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
                                <Link className="header-logo" to="/">
                                    {/* <img src={require('@/assets/image/logo2.png')} alt="" className="img-reponsive" /> */}
                                    <img src={images.logo} alt="" className="img-reponsive" />
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

                                    <li className="level1 active dropdown">
                                        <Link to="/contact" title="Contact">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                                <UserAccount />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/* Header */}
        </>
    );
}

export default Header;
