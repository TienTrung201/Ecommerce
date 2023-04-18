import { api } from '@/api';
import { deleteData, getData, postData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { cartSelector, categoriesSelector, optionsSelector, userSelector } from '@/redux/selector';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import cartSlice from '../Cart/CartSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';
import TextEditorParagraph from '@/components/Admin/TextEditorParagraph';
import { Rate } from 'antd';

function Product() {
    const dispatch = useDispatch();
    //filter product
    const cartUser = useSelector(cartSelector);
    const maxProductPrice = useRef();
    const [productItem, setProductItem] = useState(null);
    const options = useSelector(optionsSelector);
    const user = useSelector(userSelector);
    const categories = useSelector(categoriesSelector);
    const [sizeOprion, setSizeOption] = useState(null);
    const [colorOption, setColorOption] = useState(null);
    const [ItemsProduct, setItemsProduct] = useState([{ optionsId: [] }]);
    const [message, setMessage] = useState(null);
    const [categoryProduct, setCategoryProduct] = useState([]);
    const navigate = useNavigate();
    const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];

    //choose option
    useEffect(() => {
        if (ItemsProduct[0].optionsId.length === 2) {
            if (sizeOprion !== null && colorOption !== null) {
                // const optionItem=[sizeOprion,colorOption]

                const findItem = ItemsProduct.find(
                    (item) =>
                        item.optionsId.find((o) => o === sizeOprion) && item.optionsId.find((o) => o === colorOption),
                );
                if (findItem) {
                    setProductItem(findItem);
                } else {
                    setProductItem(null);
                }
            }
        }
        // console.log(ItemsProduct[0].optionsId.length);
        if (ItemsProduct[0].optionsId.length === 1) {
            if (sizeOprion !== null || colorOption !== null) {
                const findItem = ItemsProduct.find(
                    (item) =>
                        item.optionsId.find((o) => o === sizeOprion) || item.optionsId.find((o) => o === colorOption),
                );
                if (findItem) {
                    setProductItem(findItem);
                } else {
                    setProductItem(null);
                }
            }
        }
    }, [ItemsProduct, sizeOprion, colorOption]);
    //choose option

    useEffect(() => {
        if (productItem === null) {
            if (sizeOprion === null || colorOption === null) {
                setMessage('Chọn sản phẩm!');
            } else {
                setMessage('Lựa chọn này không còn!');
            }
        }
        console.log(productItem);
    }, [productItem, sizeOprion, colorOption]);

    //filter product
    //similar products
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        async function fetchSimilarProducts() {
            try {
                const listCategory = categories.filter((c) => categoryProduct.find((id) => id === c.categoriesId));
                const products = await listCategory.reduce(async (accPromise, category) => {
                    const acc = await accPromise;
                    const productCategory = await getData(api.products + `?category=${category.name}`);
                    acc.push(...productCategory.data);
                    return acc;
                }, []);
                const removeDuplicateProduct = await products.filter(
                    (item, index, self) => index === self.findIndex((t) => t.productId === item.productId),
                );

                setSimilarProducts(removeDuplicateProduct);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSimilarProducts();
    }, [categoryProduct, categories]);
    //similar products
    //productItem
    const [optionItem, setOptionItem] = useState([]);

    // productItem

    //get Product
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [priceRangeProduct, setPriceRangeProduct] = useState([]);
    const [productReviews, setProductReviews] = useState([]);
    useEffect(() => {
        Promise.all([
            getData(api.products + `/${id}`),
            getData(api.categories),
            getData(api.promotions),
            getData(api.productReview + `/${id}`),
        ])
            .then((values) => {
                values[0].items.forEach((element) => {
                    const a = [...element.optionsId];

                    setOptionItem((prev) =>
                        [...prev, ...a].filter((value, index, self) => {
                            return self.indexOf(value) === index;
                        }),
                    );
                });
                setItemsProduct(values[0].items);
                setCategoryProduct(values[0].categoriesId);
                maxProductPrice.current = values[0].items.sort((a, b) => b.price - a.price)[0].price;
                setPriceRangeProduct(values[0].items.sort((a, b) => a.price - b.price));
                setProduct(values[0]);
                setProductReviews(values[3].data);
                console.log(values[3].data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    //get Product
    //total rate
    const totalRate = useMemo(() => {
        const total = productReviews.reduce((acc, item) => {
            return (acc += item.ratingValue);
        }, 0);

        const ratingValue = total / productReviews.length;
        if (productReviews.length === 0) {
            return 0;
        }
        return ratingValue;
    }, [productReviews]);
    //
    //handle add product to cart
    const handleAddToCart = async () => {
        try {
            if (message === null) {
                const data = { items: [{ productItemId: productItem.productItemId, qty: productQuantity }] };
                const cartResponse = await postData(api.shoppingCarts, data);
                console.log(cartResponse);
                const newDataCartReponse = await getData(api.shoppingCarts + '/' + user.uid);
                console.log(newDataCartReponse);
                dispatch(cartSlice.actions.setCartId(newDataCartReponse.data.cartId));
                const cartUserRespones = newDataCartReponse.data.items.reduce((acc, item) => {
                    const { cartItemId, qty } = item;
                    const { productId, image, name, items } = item.product;
                    const { costPrice, qtyInStock, productItemId, sku, optionsId, price, discountRate } = items[0];
                    acc.push({
                        cartItemId,
                        productId,
                        image,
                        name,
                        costPrice,
                        qtyInStock,
                        productItemId,
                        sku,
                        qty,
                        optionsId,
                        price,
                        discountRate,
                        isChecked: false,
                    });
                    return acc;
                }, []);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Sản phẩm đã được thêm vào giỏ'));
                }, 1000);
                dispatch(cartSlice.actions.setCart(cartUserRespones.reverse()));
            }
        } catch (error) {
            dispatch(notificationsSlice.actions.showError('Thất bại'));

            console.log(error);
        } finally {
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        }
    };
    //handle add product to cart
    //wishlist
    const isWishlist = useMemo(() => {
        return cartUser.wishlist.find((wishlist) => wishlist.productId === product.productId);
    }, [cartUser.wishlist, product.productId]);
    //handle add wishlist
    const handleAddWishList = () => {
        postData(api.wishLists, { productId: id })
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
    //handle add wishlist
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
    //Change Description and Review
    const [tabs, setTabs] = useState('Reviews');
    const handleChangeTab = (e) => {
        const nameTab = e.target.innerText.split(' ')[0];
        setTabs(nameTab);
    };
    //Change Description and Review
    //set quantity product
    const [productQuantity, setProductQuantity] = useState(1);
    useEffect(() => {
        if (productItem !== null) {
            if (productItem.qtyInStock < productQuantity) {
                setMessage(`còn ${productItem.qtyInStock} sản phẩm trong kho!`);
            } else {
                setMessage(null);
            }
        }
    }, [productItem, productQuantity]);
    const handleChangeQuantityProduct = (e) => {
        if (!isNaN(e.target.value)) {
            if (e.target.value === '0') {
                setProductQuantity(1);
            } else {
                setProductQuantity(e.target.value === '' ? 1 : parseInt(e.target.value));
            }
        }
    };
    const handlePlus = () => {
        setProductQuantity((prev) => prev + 1);
    };
    const handleMinus = () => {
        if (productQuantity >= 2) {
            setProductQuantity((prev) => prev - 1);
        }
    };
    //set quantity product
    //setting slider product
    const slider1 = useRef();
    const slider2 = useRef();
    const currentIndexImg = 1;

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    useEffect(() => {
        slider1.current.slickGoTo(currentIndexImg);
        slider2.current.slickGoTo(currentIndexImg);
    }, [currentIndexImg]);
    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);
    const priceProduct = useMemo(() => {
        if (productItem !== null) {
            if (product.items[0].discountRate === 0) {
                return convertVnd(productItem.price);
            } else {
                return convertVnd(productItem.price - (productItem.price * product.items[0].discountRate) / 100);
            }
        } else if (priceRangeProduct.length > 1) {
            if (product.items[0].discountRate === 0) {
                return `${convertVnd(priceRangeProduct.slice(-1)[0].price)} - ${convertVnd(
                    priceRangeProduct.slice(0, 1)[0].price,
                )}`;
            } else {
                return `${convertVnd(
                    priceRangeProduct.slice(-1)[0].price -
                        (priceRangeProduct.slice(-1)[0].price * product.items[0].discountRate) / 100,
                )} - ${convertVnd(
                    priceRangeProduct.slice(-1)[0].price -
                        (priceRangeProduct.slice(0, 1)[0].price * product.items[0].discountRate) / 100,
                )}`;
            }
        } else if (priceRangeProduct.length === 1) {
            if (product.items[0].discountRate === 0) {
                return convertVnd(priceRangeProduct.slice(-1)[0].price);
            }
            return convertVnd((priceRangeProduct.slice(-1)[0].price * product.items[0].discountRate) / 100);
        }
        return '';
    }, [priceRangeProduct, product, productItem]);
    //setting slider product
    //settings related product slider
    // const settingRelated = {
    //     dots: false,
    //     // className: 'product-images',
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 4,
    //     slidesToScroll: 2,
    //     adaptiveHeight: true,
    // };
    //settings related product slider

    const settings = {
        dots: true,
        className: 'product-images',
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    const settingsListImage = {
        className: 'slick-clone',
        dots: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        infinite: false,
    };

    return (
        <>
            <div className="container container-content">
                <ul className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                        <i className="iconRight">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </i>
                    </li>

                    <li>
                        <Link to="/shop">Shop</Link>
                        <i className="iconRight">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </i>
                    </li>

                    <li className="active">Single Product</li>
                </ul>
            </div>
            <div className="container container-content">
                <div className="single-product-detail">
                    <div className="row align-items-stretch">
                        <div className="col-xs-12 col-sm-6 col-md-6 slide-product">
                            <div className="flex product-img-slide">
                                <div className="product-images">
                                    {product.items ? (
                                        product.items[0].discountRate === 0 ? (
                                            false
                                        ) : (
                                            <div className="ribbon zoa-sale">
                                                <span>-{product.items[0].discountRate}%</span>{' '}
                                            </div>
                                        )
                                    ) : (
                                        false
                                    )}

                                    <Slider
                                        asNavFor={nav2}
                                        ref={slider1}
                                        {...settings}
                                        className="main-img js-product-slider"
                                    >
                                        <Link to="#" className="hover-images effect autoCenter">
                                            <img src={product.image} alt="" className="img-responsive" />
                                        </Link>
                                        {product.items &&
                                            product.items.map((p, index) => {
                                                if (index >= 4) {
                                                    return false;
                                                }
                                                return (
                                                    <Link
                                                        key={p.productItemId}
                                                        to="#"
                                                        className="hover-images effect autoCenter"
                                                    >
                                                        <img src={p.image} alt="" className="img-responsive" />
                                                    </Link>
                                                );
                                            })}
                                    </Slider>
                                </div>
                                <Slider
                                    asNavFor={nav1}
                                    ref={slider2}
                                    {...settingsListImage}
                                    className="multiple-img-list-ver2 js-click-product slick-vertical slick-clone"
                                >
                                    <div className="product-col">
                                        <div className="img active">
                                            <img src={product.image} alt="" className="img-responsive" />
                                        </div>
                                    </div>
                                    {product.items &&
                                        product.items.map((p, index) => {
                                            if (index >= 4) {
                                                return false;
                                            }
                                            return (
                                                <div key={p.productItemId} className="product-col">
                                                    <div className="img ">
                                                        <img src={p.image} alt="" className="img-responsive" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="single-product-info product-info product-grid-v2">
                                <h3 className="product-title">{product.name}</h3>
                                <div className="product-price">
                                    <span className="old thin">{convertVnd(maxProductPrice.current)}</span>
                                    <span>{priceProduct}</span>
                                </div>
                                {totalRate === 0 ? (
                                    <div className="flex product-rating">
                                        <div className="group-star">
                                            <Rate allowHalf disabled={true} value={5} />
                                        </div>
                                        <div className="number-rating"> Sản phẩm chưa có đánh giá</div>
                                    </div>
                                ) : (
                                    <div className="flex product-rating">
                                        <div className="group-star">
                                            <Rate allowHalf disabled={true} value={totalRate} />
                                        </div>
                                        <div className="number-rating"> {totalRate.toFixed(1)}/5 </div>
                                    </div>
                                )}

                                <div className="short-desc">
                                    <div className="product-desc">
                                        <TextEditorParagraph value={product.description} />
                                    </div>
                                </div>
                                {message !== null ? <p className="notification">{message}</p> : false}

                                <div className="color-group">
                                    {/* <label>Color :</label> */}
                                    {optionItem.map((o) => {
                                        let activeOption;
                                        const optionValue = options.find((value) => {
                                            if (value.productOptionId === o && value.value.startsWith('#')) {
                                                activeOption = value.productOptionId;
                                            }
                                            return value.productOptionId === o && value.value.startsWith('#');
                                        });
                                        if (optionValue) {
                                            return (
                                                <Link
                                                    onClick={() => {
                                                        setColorOption(activeOption);
                                                    }}
                                                    key={optionValue.productOptionId}
                                                    to="#"
                                                    style={{ background: optionValue.value }}
                                                    className={
                                                        colorOption === activeOption ? 'circle active' : 'circle'
                                                    }
                                                ></Link>
                                            );
                                        } else {
                                            return false;
                                        }
                                    })}
                                </div>
                                <div className="product-size">
                                    <div className="size-group">
                                        {/* <label>Size :</label> */}
                                        <div className="size-option">
                                            {optionItem.map((o) => {
                                                let activeOption;
                                                const optionValue = options.find((value) => {
                                                    if (value.productOptionId === o && !value.value.startsWith('#')) {
                                                        activeOption = value.productOptionId;
                                                    }
                                                    return value.productOptionId === o && !value.value.startsWith('#');
                                                });
                                                if (optionValue) {
                                                    return (
                                                        <button
                                                            onClick={() => {
                                                                setSizeOption(activeOption);
                                                            }}
                                                            key={optionValue.productOptionId}
                                                            type="button"
                                                            className={
                                                                activeOption === sizeOprion
                                                                    ? 'size-button active'
                                                                    : 'size-button'
                                                            }
                                                        >
                                                            {optionValue.name}
                                                        </button>
                                                    );
                                                } else {
                                                    return false;
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="single-product-button-group">
                                    <div className="flex align-items-center element-button">
                                        <div className="zoa-qtt">
                                            <button
                                                onClick={handleMinus}
                                                type="button"
                                                className="quantity-left-minus btn btn-number js-minus"
                                                data-type="minus"
                                                data-field=""
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <input
                                                type="text"
                                                name="number"
                                                value={productQuantity}
                                                onChange={handleChangeQuantityProduct}
                                                className="product_quantity_number js-number"
                                            />
                                            <button
                                                onClick={handlePlus}
                                                type="button"
                                                className="quantity-right-plus btn btn-number js-plus"
                                                data-type="plus"
                                                data-field=""
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        <Link
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (user.uid === '') {
                                                    navigate('/user/signin');
                                                } else {
                                                    handleAddToCart();
                                                }
                                            }}
                                            className={
                                                message !== null
                                                    ? 'button-unauthorized zoa-btn zoa-addcart'
                                                    : 'zoa-btn zoa-addcart'
                                            }
                                        >
                                            <i className="zoa-icon-cart" />
                                            Thêm vào giỏ hàng
                                        </Link>
                                    </div>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (user.uid === '') {
                                                navigate('/user/signin');
                                            } else if (isWishlist) {
                                                handleDeleteWishlist(isWishlist.wishlistId);
                                            } else {
                                                handleAddWishList();
                                            }
                                        }}
                                        to=""
                                        className="btn-wishlist"
                                    >
                                        {isWishlist
                                            ? '- Xóa khỏi danh sách yêu thích'
                                            : ' + Thêm vào danh sách yêu thích'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <div className="single-product-tab bd-bottom">
                        <ul className="tabs text-center">
                            <li className={tabs === 'Description' ? 'active' : ''}>
                                <Link onClick={handleChangeTab} data-toggle="pill" href="#desc">
                                    Description
                                </Link>
                            </li>
                            <li className={tabs === 'Reviews' ? 'active' : ''}>
                                <Link onClick={handleChangeTab} data-toggle="pill" href="#review">
                                    Reviews <span className="review-number">{productReviews.length}</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div
                                id="desc"
                                className={tabs === 'Description' ? 'tab-pane fade in  active' : 'tab-pane fade in'}
                            >
                                <div className="content-desc text-center">
                                    <TextEditorParagraph value={product.description} />
                                </div>
                            </div>

                            <div
                                id="review"
                                className={tabs === 'Reviews' ? 'tab-pane fade in  active' : 'tab-pane fade in'}
                            >
                                <ul className="review-content">
                                    {productReviews.map((productReview) => {
                                        const date = new Date(productReview.commentDate);
                                        return (
                                            <li key={productReview.orderItemId} className="element-review">
                                                <p className="r-name">{productReview.name}</p>
                                                <p className="r-date">{date.toLocaleDateString()}</p>
                                                <div className="group-star">
                                                    <Rate disabled={true} defaultValue={productReview.ratingValue} />
                                                    <span className="ant-rate-text">
                                                        {desc[productReview.ratingValue - 1]}
                                                    </span>
                                                </div>
                                                <p className="r-desc">{productReview.comment}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container container-content">
                        <h3 className="related-title text-center">Related products</h3>
                        {/* <Slider {...settingRelated} className="owl-carousel owl-theme owl-cate v2 js-owl-cate"> */}

                        {/* </Slider> */}

                        <div className="product-collection-grid product-grid bd-bottom ">
                            <div className="row engoc-row-equal">
                                {similarProducts.map((product, i) => {
                                    if (i > 3) {
                                        return false;
                                    }
                                    return (
                                        <div
                                            key={product.productId}
                                            className="col-xs-6 col-sm-4 col-md-3 col-lg-3 product-item"
                                        >
                                            <div className="product-img">
                                                <Link
                                                    to={`/product/${product.name.replace(/ /g, '-')}/${
                                                        product.productId
                                                    }`}
                                                >
                                                    <img src={product.image} alt="" className="img-responsive" />
                                                </Link>
                                                <div className="ribbon zoa-sale">
                                                    {product.items[0].discountRate === 0 ? (
                                                        false
                                                    ) : (
                                                        <span>-{product.items[0].discountRate}%</span>
                                                    )}
                                                </div>
                                                <div className="product-button-group">
                                                    <Link to="#" className="zoa-btn zoa-wishlist">
                                                        <span className="zoa-icon-heart">
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </span>
                                                    </Link>
                                                    <Link
                                                        to={`/product/${product.name.replace(/ /g, '-')}/${
                                                            product.productId
                                                        }`}
                                                        className="zoa-btn zoa-addcart"
                                                    >
                                                        <span className="zoa-icon-cart">
                                                            <FontAwesomeIcon icon={faCartPlus} />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product-info text-center">
                                                <h3 className="product-title">
                                                    <Link
                                                        to={`/product/${product.name.replace(/ /g, '-')}/${
                                                            product.productId
                                                        }`}
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </h3>
                                                <div className="product-price">
                                                    <span className="old">{convertVnd(product.items[0].price)}</span>
                                                    {product.items[0].discountRate === 0 ? (
                                                        <span>{convertVnd(product.items[0].price)}</span>
                                                    ) : (
                                                        <span>
                                                            {convertVnd(
                                                                product.items[0].price -
                                                                    (product.items[0].price *
                                                                        product.items[0].discountRate) /
                                                                        100,
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
}

export default Product;
