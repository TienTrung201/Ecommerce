import { api } from '@/api';
import { deleteData, getData, postData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';
import { cartSelector, userSelector } from '@/redux/selector';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faChevronDown, faChevronRight, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cartSlice from '../Cart/CartSlice';
import TextEditorParagraph from '@/components/Admin/TextEditorParagraph';

function Shop() {
    //Products  FilterProduct and Paging
    const user = useSelector(userSelector);
    const cartUser = useSelector(cartSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const [filterCategory, setFilterCategory] = useState(
        new URLSearchParams(location.search).get('category')
            ? new URLSearchParams(location.search).get('category')
            : '',
    );
    const [filterProvider, setFilterProvider] = useState(
        new URLSearchParams(location.search).get('provider')
            ? new URLSearchParams(location.search).get('provider')
            : '',
    );
    const [minPrice, setMinPrice] = useState(
        new URLSearchParams(location.search).get('min') ? new URLSearchParams(location.search).get('min') : '',
    );
    const [maxPrice, setMaxPrice] = useState(
        new URLSearchParams(location.search).get('max') ? new URLSearchParams(location.search).get('max') : '',
    );
    const [pageNumber, setPageNumber] = useState(
        new URLSearchParams(location.search).get('page') ? new URLSearchParams(location.search).get('page') : 1,
    );
    const [totalPages, setTotalPages] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [proviers, setProviders] = useState([]);
    useEffect(() => {
        const dataQuery = `?${'page=' + pageNumber}${filterCategory !== '' ? '&category=' + filterCategory : ''}${
            filterProvider !== '' ? '&provider=' + filterProvider : ''
        }${minPrice !== '' ? '&min=' + minPrice : ''}${maxPrice !== '' ? '&max=' + maxPrice : ''}`;
        navigate(`/shop${dataQuery}`);
        Promise.all([
            getData(api.products + dataQuery),
            getData(api.categories),
            getData(api.promotions),
            getData(api.providers),
        ])
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

                const allProduct = values[0].data.reduce((acc, item) => {
                    const discount = categories
                        .filter((c) =>
                            item.categoriesId.find((item) => {
                                return c.categoriesId === item;
                            }),
                        )
                        .sort((a, b) => b.discountRate - a.discountRate)[0];

                    acc.push({
                        ...item,
                        discountRate: discount === undefined ? 0 : discount.discountRate,
                        categoriesId: discount === undefined ? 0 : discount.categoriesId,
                    });

                    return acc;
                }, []);
                setProviders(values[3]);
                setCategories(values[1]);
                setProducts(allProduct);
                const pageSize = [];
                for (let i = 1; i <= values[0].totalPages; i++) {
                    pageSize.push(i);
                }
                setTotalPages(pageSize);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, [filterCategory, filterProvider, minPrice, maxPrice, navigate, pageNumber]);
    const handleFilterCategory = (name) => {
        if (name !== filterCategory) {
            setFilterCategory(name);
        } else {
            setFilterCategory('');
        }
        setPageNumber(1);
    };
    const handleFilterProvider = (name) => {
        if (name !== filterProvider) {
            setFilterProvider(name);
        } else {
            setFilterProvider('');
        }

        setPageNumber(1);
    };
    const handleChangePrice = (setPrice, e) => {
        if (!isNaN(e.target.value) && !e.target.value.startsWith('0')) {
            console.log(e.target.value);
            setPrice(e.target.value);
            setPageNumber(1);
        }
    };
    const handleNextPage = () => {
        if (pageNumber < totalPages.length) {
            setPageNumber((prev) => parseInt(prev) + 1);
        }
    };
    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
        }
    };

    //Products  FilterProduct and Paging

    //handle add wichlist
    const dispatch = useDispatch();

    const getDataWishlist = () => {
        getData(api.wishLists, user.uid)
            .then((response) => {
                dispatch(cartSlice.actions.setWishlist(response));

                console.log('wishlist', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleAddWishList = (productId) => {
        postData(api.wishLists, { productId: productId })
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Đã thêm vào danh sách yêu thích'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                getDataWishlist();
                console.log(response);
            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log(err);
            });
    };
    //handle add wichlist
    //deletewishlist
    const handleDeleteWishlist = (wishlistId) => {
        deleteData(api.wishLists + '/' + wishlistId)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Đã xóa khỏi danh sách yêu thích'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                getDataWishlist();
                console.log('delete wishlist', response);
            })
            .catch((err) => {
                console.log('delete wishlist', err);
            });
    };
    //deletewishlist

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

    return (
        <>
            <div className="shop-heading text-center">
                <h1>All Cosmetics</h1>
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
                                                    <li
                                                        onClick={() => handleFilterCategory(category.name)}
                                                        key={category.categoryId}
                                                    >
                                                        <Link
                                                            className={category.name === filterCategory ? 'active' : ''}
                                                            to=""
                                                        >
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
                                            <input
                                                className="filterPrice"
                                                onChange={(e) => handleChangePrice(setMinPrice, e, 'min')}
                                                value={minPrice}
                                                type="text"
                                                placeholder="min"
                                            />
                                            <input
                                                className="filterPrice"
                                                onChange={(e) => handleChangePrice(setMaxPrice, e, 'max')}
                                                value={maxPrice}
                                                type="text"
                                                placeholder="max"
                                            />
                                        </ul>
                                    </div>
                                    <div className=" widget-filter filter-cate filter-size">
                                        <h3>Filter by brand</h3>
                                        <ul>
                                            {proviers.map((provider) => {
                                                return (
                                                    <li
                                                        onClick={() => handleFilterProvider(provider.name)}
                                                        key={provider.providerId}
                                                    >
                                                        <Link
                                                            className={provider.name === filterProvider ? 'active' : ''}
                                                            to=""
                                                        >
                                                            {provider.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            {/* <li className="filter">
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
                            </li> */}
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
                            const isWishlist = cartUser.wishlist.find(
                                (wishlist) => wishlist.productId === product.productId,
                            );
                            return (
                                <div
                                    key={product.productId}
                                    className="col-xs-6 col-sm-4 col-md-3 col-lg-3 product-item"
                                >
                                    <div className="product-img">
                                        <Link to={`/product/${product.name.replace(/ /g, '-')}/${product.productId}`}>
                                            <img src={product.image} alt="" className="img-responsive" />
                                        </Link>
                                        {product.discountRate === 0 ? (
                                            false
                                        ) : (
                                            <div className="ribbon zoa-sale">
                                                <span>-{product.discountRate}%</span>
                                            </div>
                                        )}

                                        <div className="product-button-group">
                                            <Link
                                                style={{ background: isWishlist ? '#dd2a2a' : '' }}
                                                onClick={() => {
                                                    if (isWishlist) {
                                                        handleDeleteWishlist(isWishlist.wishlistId);
                                                    } else {
                                                        handleAddWishList(product.productId);
                                                    }
                                                }}
                                                className="zoa-btn zoa-wishlist"
                                            >
                                                <span className="zoa-icon-heart">
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </span>
                                            </Link>
                                            <Link
                                                to={`/product/${product.name.replace(/ /g, '-')}/${product.productId}`}
                                                className="zoa-btn zoa-addcart"
                                            >
                                                <span className="zoa-icon-cart">
                                                    <FontAwesomeIcon icon={faCartPlus} />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="product-info text-center">
                                        {/* đây là layout 2 */}
                                        <h3 className="product-title">
                                            <Link
                                                to={`/product/${product.name.replace(/ /g, '-')}/${product.productId}`}
                                            >
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <div className="short-desc">
                                            <div className="product-desc">
                                                <TextEditorParagraph value={product.description} />
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            {product.discountRate === 0 ? (
                                                <span>{convertVnd(product.items[0].price)}</span>
                                            ) : (
                                                <span>
                                                    {convertVnd((product.items[0].price * product.discountRate) / 100)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="product-bottom-group">
                                            <Link to="#" className="zoa-btn zoa-wishlist">
                                                <span className="zoa-icon-heart">
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </span>
                                            </Link>
                                            <Link
                                                to={`/product/${product.name.replace(/ /g, '-')}/${product.productId}`}
                                                className="zoa-btn zoa-addcart"
                                            >
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
                    {totalPages.length > 1 ? (
                        <div className="text-center">
                            <div className="pagination">
                                {pageNumber === `1` ? (
                                    false
                                ) : (
                                    <Link
                                        onClick={() => {
                                            handlePrevPage();
                                        }}
                                    >
                                        &laquo;
                                    </Link>
                                )}

                                {totalPages.map((p, i) => {
                                    return (
                                        <Link
                                            key={i}
                                            onClick={(e) => {
                                                if (pageNumber === `${p}`) {
                                                    e.preventDefault();
                                                }
                                                setPageNumber(`${p}`);
                                            }}
                                            className={pageNumber === `${p}` ? 'active' : ''}
                                            to="#"
                                        >
                                            {p}
                                        </Link>
                                    );
                                })}
                                {pageNumber === `${totalPages.length}` ? (
                                    false
                                ) : (
                                    <Link
                                        onClick={() => {
                                            handleNextPage();
                                        }}
                                    >
                                        &raquo;
                                    </Link>
                                )}
                            </div>
                        </div>
                    ) : (
                        false
                    )}
                </div>
            </div>
        </>
    );
}

export default Shop;
