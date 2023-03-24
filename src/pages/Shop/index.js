import { api } from '@/api';
import { getData } from '@/api/service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowUpWideShort,
    faCartPlus,
    faChevronDown,
    faChevronRight,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Shop() {
    //Products
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [proviers, setProviders] = useState([]);
    useEffect(() => {
        Promise.all([getData(api.products), getData(api.categories), getData(api.promotions), getData(api.providers)])
            .then((values) => {
                const categories = values[1]
                    .map((categorie) => {
                        const result = values[2].find((promotion) => promotion.promotionId === categorie.promotionId);

                        return result !== undefined
                            ? {
                                  name: result.name,
                                  promotionId: result.promotionId,
                                  discountRate: result.discountRate,
                                  categoriesId: categorie.categoryId,
                              }
                            : undefined;
                    })
                    .filter((category) => category !== undefined);

                const allProduct = values[0].reduce((acc, item) => {
                    const discount = categories
                        .filter((c) =>
                            item.categoriesId.find((item) => {
                                return c.categoriesId === item;
                            }),
                        )
                        .sort((a, b) => b.discountRate - a.discountRate)[0];

                    acc.push({ ...item, discountRate: discount.discountRate, categoriesId: discount.categoriesId });

                    return acc;
                }, []);
                setProviders(values[3]);
                setCategories(values[1]);
                setProducts(allProduct);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);
    //Products

    //ViewProduct
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
    //ViewProduct

    //show filter tablet mobile
    const filterView = useRef();
    const handleShowFilter = () => {
        filterView.current.classList.add('filter-sidebar');
    };
    //show filter tablet mobile

    return (
        <>
            <div ref={filterView} className="shop-heading text-center">
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
                {/* <div className="filter-collection-left hidden-lg hidden-md">
                    <Link className="btn">
                        <i style={{ color: '#8888' }} className="zoa-icon-filter">
                            <FontAwesomeIcon icon={faFilter} />
                        </i>
                        Filter
                    </Link>
                </div> */}
                {/* <div className="col-xs-12 hidden-md hidden-lg col-left collection-sidebar" id="filter-sidebar">
                    <div className="close-sidebar-collection hidden-lg hidden-md">
                        <span>Filter</span>
                        <i className="icon_close ion-close" />
                    </div>
                    <div className="widget-filter filter-cate no-pd-top">
                        <h3>Categories</h3>
                        <ul>
                            {categories.map((category) => {
                                return (
                                    <li key={category.categoriesId}>
                                        <Link className="active" to="">
                                            {category.name}
                                        </Link>
                                    </li>
                                );
                            })}
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
                            {proviers.map((provider) => {
                                return (
                                    <li key={provider.providerId}>
                                        <Link className="" to="">
                                            {provider.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <Link className="zoa-btn btn-filter">Filter</Link>
                </div> */}
                <div className="shop-top">
                    <div className="shop-element left">
                        <ul className="js-filter">
                            <li style={{ position: 'relative' }} className="filter filter-static ">
                                <Link to="">
                                    <i className="zoa-icon-filter">
                                        <FontAwesomeIcon icon={faFilter} />
                                    </i>
                                    Filter products
                                    <i style={{ position: 'absolute', right: 0 }} className="zoa-icon-down">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </i>
                                </Link>
                                <div className="dropdown-menu fullw">
                                    <div className=" widget-filter filter-cate">
                                        <h3>Categories</h3>
                                        <ul>
                                            {categories.map((category) => {
                                                return (
                                                    <li key={category.categoriesId}>
                                                        <Link className="active" to="">
                                                            {category.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div className=" widget-filter filter-cate filter-size">
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
                                    <div className=" widget-filter filter-cate filter-size">
                                        <h3>Filter by brand</h3>
                                        <ul>
                                            {proviers.map((provider) => {
                                                return (
                                                    <li key={provider.providerId}>
                                                        <Link className="" to="">
                                                            {provider.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
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
                            <Link ref={activeView2} to="" onClick={handleViewProduct} className="list-icon list">
                                <i className="fa fa-circle" aria-hidden="true">
                                    ●
                                </i>
                            </Link>

                            <Link ref={activeView} to="" onClick={handleView2Product} className="grid-icon col2 active">
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
                        {products.map((product) => {
                            return (
                                <div
                                    key={product.productId}
                                    className="col-xs-6 col-sm-4 col-md-3 col-lg-3 product-item"
                                >
                                    <div className="product-img">
                                        <Link to="/product">
                                            <img src={product.image} alt="" className="img-responsive" />
                                        </Link>
                                        <div className="ribbon zoa-sale">
                                            <span>-{product.discountRate}%</span>
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
                                            <Link to="">{product.name}</Link>
                                        </h3>
                                        <div className="short-desc">
                                            <p className="product-desc">{product.description}</p>
                                        </div>
                                        <div className="product-price">
                                            <span>${(product.items[0].price * product.discountRate) / 100}</span>
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
                            );
                        })}
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
