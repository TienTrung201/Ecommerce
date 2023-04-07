import { api } from '@/api';
import { getData, postData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { optionsSelector, userSelector } from '@/redux/selector';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faChevronRight, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import cartSlice from '../Cart/CartSlice';

function Product() {
    const dispatch = useDispatch();
    //filter product
    const maxProductPrice = useRef();
    const [productItem, setProductItem] = useState(null);
    const options = useSelector(optionsSelector);
    const user = useSelector(userSelector);
    const [sizeOprion, setSizeOption] = useState(null);
    const [colorOption, setColorOption] = useState(null);
    const [ItemsProduct, setItemsProduct] = useState([{ optionsId: [] }]);
    const [message, setMessage] = useState(null);

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

    //productItem
    const [optionItem, setOptionItem] = useState([]);

    // productItem

    //get Product
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [priceRangeProduct, setPriceRangeProduct] = useState([]);
    useEffect(() => {
        Promise.all([getData(api.products + `/${id}`), getData(api.categories), getData(api.promotions)])
            .then((values) => {
                // console.log(values[0]);
                const categoriesProduct = values[2]
                    .map((categorie) => {
                        const result = values[1].find((promotion) => promotion.promotionId === categorie.promotionId);
                        return result !== undefined
                            ? {
                                  name: result.name,
                                  promotionId: result.promotionId,
                                  discountRate: categorie.discountRate,
                                  categoryId: result.categoryId,
                              }
                            : {
                                  name: categorie.name,
                                  promotionId: categorie.promotionId,
                                  discountRate: 0,
                                  categoryId: categorie.categoryId,
                              };
                    })
                    .filter((category) => category !== undefined);
                // console.log(categoriesProduct);
                const discount = categoriesProduct
                    .filter((c) =>
                        values[0].categoriesId.find((p) => {
                            return c.categoryId === p;
                        }),
                    )
                    .sort((a, b) => b.discountRate - a.discountRate)[0];

                values[0].items.forEach((element) => {
                    const a = [...element.optionsId];

                    setOptionItem((prev) =>
                        [...prev, ...a].filter((value, index, self) => {
                            return self.indexOf(value) === index;
                        }),
                    );
                });
                setItemsProduct(values[0].items);
                maxProductPrice.current = values[0].items.sort((a, b) => b.price - a.price)[0].price;
                setPriceRangeProduct(values[0].items.sort((a, b) => b.price - a.price));
                setProduct({ ...values[0], discountRate: discount === undefined ? 0 : discount.discountRate });

                // setProductItem(values[0].items.sort((a, b) => b.price - a.price)[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    //get Product
    //handle add product to cart
    const handleAddToCart = () => {
        if (message === null) {
            const data = { items: [{ productItemId: productItem.productItemId, qty: productQuantity }] };
            dispatch(notificationsSlice.actions.showLoading('Thêm vào giỏ hàng'));

            postData(api.shoppingCarts, data)
                .then((response) => {
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('thành công'));
                        getData(api.shoppingCarts + '/' + user.uid)
                            .then((response) => {
                                console.log(response);
                                dispatch(cartSlice.actions.setCartId(response.cartId));
                                const cartUser = response.items.reduce((acc, item) => {
                                    const { cartItemId, qty } = item;
                                    const { productId, image, name, items } = item.product;
                                    const { costPrice, qtyInStock, productItemId, sku, optionsId } = items[0];
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
                                        isChecked: false,
                                    });
                                    return acc;
                                }, []);
                                dispatch(cartSlice.actions.setCart(cartUser.reverse()));

                                console.log(cartUser);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }, 1000);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 2000);

                    console.log(response);
                })
                .catch((error) => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 1000);
                    console.log(error);
                });
        }
    };
    //handle add product to cart

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
    //setting slider product
    //settings related product slider
    const settingRelated = {
        dots: false,
        // className: 'product-images',
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        adaptiveHeight: true,
    };
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
                                    <div className="ribbon zoa-sale">
                                        {product.discountRate === 0 ? false : <span>-{product.discountRate}%</span>}
                                    </div>
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
                                <h3 className="product-title">
                                    <Link to="#">{product.name}</Link>
                                </h3>
                                <div className="product-price">
                                    <span className="old thin">${maxProductPrice.current}</span>
                                    <span>
                                        {productItem !== null
                                            ? product.discountRate === 0
                                                ? productItem.price + '$'
                                                : (productItem.price * product.discountRate) / 100 + '$'
                                            : priceRangeProduct.length > 1
                                            ? product.discountRate === 0
                                                ? `$${priceRangeProduct.slice(-1)[0].price} - $${
                                                      priceRangeProduct.slice(0, 1)[0].price
                                                  }`
                                                : `$${
                                                      (priceRangeProduct.slice(-1)[0].price * product.discountRate) /
                                                      100
                                                  } - $${
                                                      (priceRangeProduct.slice(0, 1)[0].price * product.discountRate) /
                                                      100
                                                  }`
                                            : priceRangeProduct.length === 1
                                            ? product.discountRate === 0
                                                ? priceRangeProduct.slice(-1)[0].price + '$'
                                                : `$${
                                                      (priceRangeProduct.slice(-1)[0].price * product.discountRate) /
                                                      100
                                                  }`
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex product-rating">
                                    <div className="group-star">
                                        <span className="star star-5">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="star star-4">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="star star-3">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="star star-2">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="star star-1">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                    </div>
                                    <div className="number-rating">( 02 reviews )</div>
                                </div>
                                <div className="short-desc">
                                    <p className="product-desc">{product.description}</p>
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
                                                            {optionValue.value}ml
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
                                                handleAddToCart();
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
                                    <Link to="" className="btn-wishlist">
                                        + Thêm vào danh sách yêu thích
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
                                    Reviews <span className="review-number">2</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div
                                id="desc"
                                className={tabs === 'Description' ? 'tab-pane fade in  active' : 'tab-pane fade in'}
                            >
                                <div className="content-desc text-center">
                                    <p>
                                        Add a British twist to your wardrobe with the Erika skirt in seersucker.
                                        Pinstripe pattern. 2 patched front pockets. Waist tie belt with loops. Button
                                        detailing on the front. Integrated cotton lining.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur.
                                    </p>
                                </div>
                            </div>

                            <div
                                id="review"
                                className={tabs === 'Reviews' ? 'tab-pane fade in  active' : 'tab-pane fade in'}
                            >
                                <ul className="review-content">
                                    <li className="element-review">
                                        <p className="r-name">Felix Nguyen</p>
                                        <p className="r-date">25, March 2018</p>
                                        <div className="group-star">
                                            <span className="star star-5">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-4">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-3">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-2">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-1">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        </div>
                                        <p className="r-desc">
                                            Free shipping on orders over 150€ within Europe and North America. Place
                                            your order today and receive it within 48 hours. And now, free and easy
                                            returns within Europe.
                                        </p>
                                    </li>
                                    <li className="element-review">
                                        <p className="r-name">Felix Nguyen</p>
                                        <p className="r-date">25, March 2018</p>
                                        <div className="group-star">
                                            <span className="star star-5">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-4">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-3">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-2">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className="star star-1">
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        </div>
                                        <p className="r-desc">
                                            Free shipping on orders over 150€ within Europe and North America. Place
                                            your order today and receive it within 48 hours. And now, free and easy
                                            returns within Europe.
                                        </p>
                                    </li>
                                </ul>
                                <div className="review-form">
                                    <h3 className="review-heading">Your Rating</h3>
                                    <div className="rating-star">
                                        <span className="fa fa-star-o" aria-hidden="true">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="fa fa-star-o" aria-hidden="true">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="fa fa-star-o" aria-hidden="true">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="fa fa-star-o" aria-hidden="true">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="fa fa-star-o" aria-hidden="true">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                    </div>

                                    <div className="cmt-form">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        className="form-control"
                                                        name="comment[name]"
                                                        defaultValue=""
                                                        placeholder="Name *"
                                                    />
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        className="form-control"
                                                        name="comment[email]"
                                                        defaultValue=""
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <textarea
                                                        id="message"
                                                        className="form-control"
                                                        name="comment[body]"
                                                        rows={9}
                                                        placeholder="Your reviews"
                                                        defaultValue={''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group text-center">
                                            <button type="submit" className="zoa-btn">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container container-content">
                        <div className="product-related">
                            <h3 className="related-title text-center">Related products</h3>
                            <Slider {...settingRelated} className="owl-carousel owl-theme owl-cate v2 js-owl-cate">
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link href="">
                                            <img
                                                src={require('@/assets/image/product/related_1.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <div className="ribbon zoa-sale">
                                            <span>-{product.discountRate}</span>
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
                                            <Link href="">Grosgrain tie cotton top</Link>
                                        </h3>
                                        <div className="product-price">
                                            <span className="old">$25.5</span>
                                            <span>$20.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link href="">
                                            <img
                                                src={require('@/assets/image/product/related_2.jpg')}
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
                                            <Link href="">Grosgrain tie cotton top</Link>
                                        </h3>
                                        <div className="product-price">
                                            <span>$20.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link href="">
                                            <img
                                                src={require('@/assets/image/product/related_3.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
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
                                        <h3 className="product-title">
                                            <Link href="">Grosgrain tie cotton top</Link>
                                        </h3>
                                        <div className="product-price">
                                            <span className="old">$25.5</span>
                                            <span>$20.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link href="">
                                            <img
                                                src={require('@/assets/image/product/related_4.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <div className="ribbon zoa-hot">
                                            <span>hot</span>
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
                                            <Link href="">Grosgrain tie cotton top</Link>
                                        </h3>
                                        <div className="product-price">
                                            <span>$20.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link href="">
                                            <img
                                                src={require('@/assets/image/product/related_5.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <div className="ribbon zoa-new">
                                            <span>new</span>
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
                                            <Link href="">Grosgrain tie cotton top</Link>
                                        </h3>
                                        <div className="product-price">
                                            <span>$20.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <div className="product-img">
                                        <Link href="">
                                            <img
                                                src={require('@/assets/image/product/related_5.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <div className="ribbon zoa-new">
                                            <span>new</span>
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
                                            <Link href="">Grosgrain tie cotton top</Link>
                                        </h3>
                                        <div className="product-price">
                                            <span>$20.9</span>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
}

export default Product;
