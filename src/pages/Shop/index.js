import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowUpWideShort,
    faCartPlus,
    faChevronDown,
    faChevronRight,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Shop() {
    const listProduct = useRef();
    const activeView = useRef();
    const activeView2 = useRef();
    const handleViewProduct = () => {
        listProduct.current.classList.add('product-list', 'product-grid-v2');
        activeView2.current.classList.add('active');
        activeView.current.classList.remove('active');
    };
    const handleView2Product = () => {
        listProduct.current.classList.remove('product-list', 'product-grid-v2');
        activeView2.current.classList.remove('active');
        activeView.current.classList.add('active');
    };
    return (
        <>
            <div className="shop-heading text-center">
                <h1>All Clothing</h1>
                <ul className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <i style={{ padding: ' 0 4px', color: '#888', fontSize: '1rem' }} className="iconRight">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                    <li className="active">Shop</li>
                </ul>
            </div>
            <div className="container container-content">
                <div className="filter-collection-left hidden-lg hidden-md">
                    <Link className="btn">
                        <i style={{ color: '#8888' }} className="zoa-icon-filter">
                            <FontAwesomeIcon icon={faFilter} />
                        </i>
                        Filter
                    </Link>
                </div>
                <div className="col-xs-12 hidden-md hidden-lg col-left collection-sidebar" id="filter-sidebar">
                    <div className="close-sidebar-collection hidden-lg hidden-md">
                        <span>Filter</span>
                        <i className="icon_close ion-close" />
                    </div>
                    <div className="widget-filter filter-cate no-pd-top">
                        <h3>Categories</h3>
                        <ul>
                            <li>
                                <Link className="active" to="">
                                    Mens
                                </Link>
                            </li>
                            <li>
                                <Link to="">Womens</Link>
                            </li>
                            <li>
                                <Link to="">Kids</Link>
                            </li>
                            <li>
                                <Link to="">Accessories</Link>
                            </li>
                            <li>
                                <Link to="">Others</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="widget-filter filter-cate filter-color">
                        <h3>Filter by colors</h3>
                        <ul>
                            <li>
                                <Link className="active" to="">
                                    Black
                                </Link>
                            </li>
                            <li>
                                <Link to="">White</Link>
                            </li>
                            <li>
                                <Link to="">Grey</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="widget-filter filter-cate filter-size">
                        <h3>Filter by sizes</h3>
                        <ul>
                            <li>
                                <Link className="" to="">
                                    S
                                </Link>
                            </li>
                            <li>
                                <Link to="">M</Link>
                            </li>
                            <li>
                                <Link to="">L</Link>
                            </li>
                            <li>
                                <Link to="">XL</Link>
                            </li>
                            <li>
                                <Link to="">XS</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="widget-filter filter-cate filter-size">
                        <h3>Filter by price</h3>
                        <ul>
                            <li>
                                <Link className="" to="">
                                    0 - $29
                                </Link>
                            </li>
                            <li>
                                <Link to="">$30 - $59</Link>
                            </li>
                            <li>
                                <Link to="">$60 - $89 </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="widget-filter filter-cate filter-size">
                        <h3>Filter by brand</h3>
                        <ul>
                            <li>
                                <Link className="" to="">
                                    Adidas
                                </Link>
                            </li>
                            <li>
                                <Link to="">Nike</Link>
                            </li>
                            <li>
                                <Link to="">Bitis </Link>
                            </li>
                        </ul>
                    </div>
                    <Link className="zoa-btn btn-filter">Filter</Link>
                </div>
                <div className="shop-top">
                    <div className="shop-element left">
                        <ul className="js-filter">
                            <li className="filter filter-static hidden-xs hidden-sm">
                                <Link to="">
                                    <i className="zoa-icon-filter">
                                        <FontAwesomeIcon icon={faFilter} />
                                    </i>
                                    Filter products
                                    <i className="zoa-icon-down">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </i>
                                </Link>
                                <div className="dropdown-menu fullw">
                                    <div className="col-md-15 col-lg-15 widget-filter filter-cate">
                                        <h3>Categories</h3>
                                        <ul>
                                            <li>
                                                <Link className="active" to="">
                                                    Mens
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">Womens</Link>
                                            </li>
                                            <li>
                                                <Link to="">Kids</Link>
                                            </li>
                                            <li>
                                                <Link to="">Accessories</Link>
                                            </li>
                                            <li>
                                                <Link to="">Others</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-15 col-lg-15 widget-filter filter-cate filter-color">
                                        <h3>Filter by colors</h3>
                                        <ul>
                                            <li>
                                                <Link className="active" to="">
                                                    Black
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">White</Link>
                                            </li>
                                            <li>
                                                <Link to="">Grey</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-15 col-lg-15 widget-filter filter-cate filter-size">
                                        <h3>Filter by sizes</h3>
                                        <ul>
                                            <li>
                                                <Link className="" to="">
                                                    S
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">M</Link>
                                            </li>
                                            <li>
                                                <Link to="">L</Link>
                                            </li>
                                            <li>
                                                <Link to="">XL</Link>
                                            </li>
                                            <li>
                                                <Link to="">XS</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-15 col-lg-15 widget-filter filter-cate filter-size">
                                        <h3>Filter by price</h3>
                                        <ul>
                                            <li>
                                                <Link className="" to="">
                                                    0 - $29
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">$30 - $59</Link>
                                            </li>
                                            <li>
                                                <Link to="">$60 - $89 </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-15 col-lg-15 widget-filter filter-cate filter-size">
                                        <h3>Filter by brand</h3>
                                        <ul>
                                            <li>
                                                <Link className="" to="">
                                                    Adidas
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="">Nike</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bitis </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="filter">
                                <i className="zoa-icon-sort">
                                    <FontAwesomeIcon icon={faArrowUpWideShort} />
                                </i>
                                <Link to="">
                                    <i className="zoa-icon-sort" />
                                    Sort by: <span>Best selling</span>
                                </Link>
                                <i className="zoa-icon-down">
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </i>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="manual">Featured</Link>
                                    </li>
                                    <li>
                                        <Link to="best-selling">Best Selling</Link>
                                    </li>
                                    <li>
                                        <Link to="title-ascending">Alphabetically, A-Z</Link>
                                    </li>
                                    <li>
                                        <Link to="title-descending">Alphabetically, A-Z</Link>
                                    </li>
                                    <li>
                                        <Link to="price-descending">Price, high to low</Link>
                                    </li>
                                    <li>
                                        <Link to="price-ascending">Price, low to high</Link>
                                    </li>
                                    <li>
                                        <Link to="created-ascending">Date, old to new</Link>
                                    </li>
                                    <li>
                                        <Link to="created-descending">Date, new to old</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="shop-element right">
                        <span>Showing 1-15 of 69 products</span>
                        <div className="view-mode view-group">
                            <Link ref={activeView} to="" onClick={handleView2Product} className="list-icon list active">
                                <i className="fa fa-circle" aria-hidden="true">
                                    ●
                                </i>
                            </Link>

                            <Link ref={activeView2} to="" onClick={handleViewProduct} className="grid-icon col2 ">
                                <div>
                                    <i className="zoa-icon-view-3 view-3-1">●●●●</i>
                                    <i className="zoa-icon-view-3 view-3-2">●●●●</i>
                                    <i className="zoa-icon-view-3 view-3-3">●●●●</i>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div ref={listProduct} className="product-collection-grid product-grid bd-bottom ">
                    <div className="row engoc-row-equal">
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_1.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="ribbon zoa-hot">
                                    <span>Hot</span>
                                </div>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                {/* đây là layout 2 */}
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="short-desc">
                                    <p className="product-desc">
                                        Round neck sweater with long sleeves. Features a knotted opening in the <br />{' '}
                                        front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non <br />
                                        dolor id commodo.
                                    </p>
                                </div>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                                <div className="product-bottom-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                                {/* đây là layout 2 */}
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_2.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="short-desc">
                                    <p className="product-desc">
                                        Round neck sweater with long sleeves. Features a knotted opening in the <br />{' '}
                                        front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non <br />
                                        dolor id commodo.
                                    </p>
                                </div>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                                <div className="product-bottom-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_3.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="short-desc">
                                    <p className="product-desc">
                                        Round neck sweater with long sleeves. Features a knotted opening in the <br />{' '}
                                        front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non <br />
                                        dolor id commodo.
                                    </p>
                                </div>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                                <div className="product-bottom-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_4.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_5.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_6.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_7.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="ribbon zoa-hot">
                                    <span>Hot</span>
                                </div>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_8.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_9.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_10.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_11.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_12.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_13.jpg')}
                                        alt=""
                                        className="img-resrtponsive"
                                    />
                                </Link>
                                <div className="ribbon zoa-hot">
                                    <span>Hot</span>
                                </div>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_14.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_15.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_16.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_17.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 product-item">
                            <div className="product-img">
                                <Link to="">
                                    <img
                                        src={require('@/assets/image/product/product_19.jpg')}
                                        alt=""
                                        className="img-responsive"
                                    />
                                </Link>
                                <div className="product-button-group">
                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                        <span className="zoa-icon-heart">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </Link>
                                    <Link to="#" className="zoa-btn zoa-addcart">
                                        <span className="zoa-icon-cart">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="product-info text-center">
                                <h3 className="product-title">
                                    <Link to="">Grosgrain tie cotton top</Link>
                                </h3>
                                <div className="product-price">
                                    <span>$20.9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link to="" className="zoa-btn btn-loadmore">
                            Load more
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
