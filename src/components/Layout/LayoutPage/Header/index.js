import images from '@/assets/image';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header id="header" className="header-v1">
            <div className="header-center">
                <div className="container container-content">
                    <div className="row flex align-items-center justify-content-between">
                        <div className="col-md-4 col">
                            <div className="topbar-right">
                                <div className="element">
                                    <Link href="#" className="icon-pushmenu js-push-menu">
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
                                <img src={require('@/assets/image/logo2.png')} alt="" classNameName="img-reponsive" />\
                            </Link>
                        </div>
                        <div className="col-md-4 col flex justify-content-end">
                            <div className="topbar-left">
                                <div className="element element-search hidden-xs hidden-sm">
                                    <Link href="#" className="zoa-icon search-toggle">
                                        <img src={images.search} alt="menubar" />
                                    </Link>
                                </div>
                                <div className="element element-user hidden-xs hidden-sm">
                                    <Link href="#" className="zoa-icon js-user">
                                        <img src={images.user} alt="menubar" />
                                    </Link>
                                </div>
                                <div className="element element-cart">
                                    <Link href="#" className="zoa-icon icon-cart">
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
