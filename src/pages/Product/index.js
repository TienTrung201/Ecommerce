import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faChevronDown, faChevronRight, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function Product() {
    //Change Description and Review
    const [tabs, setTabs] = useState('Reviews');
    const handleChangeTab = (e) => {
        const nameTab = e.target.innerText.split(' ')[0];
        setTabs(nameTab);
    };
    //Change Description and Review
    //set quantity product
    const [productQuantity, setProductQuantity] = useState(1);
    const handleChangeQuantityProduct = (e) => {
        if (!isNaN(e.target.value)) {
            setProductQuantity(e.target.value === '' ? 1 : parseInt(e.target.value));
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
        // centerPadding: "60px",
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        // centerMode: true,
        infinite: false,
        // row: 1,
        // slidesPerRow: 1,
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
                        <Link to="/">Category</Link>
                        <i className="iconRight">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </i>
                    </li>

                    <li className="active">Single Product</li>
                </ul>
            </div>
            <div className="container container-content">
                <div className="single-product-detail">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="flex product-img-slide">
                                <div className="product-images">
                                    <div className="ribbon zoa-sale">
                                        <span>-15%</span>
                                    </div>
                                    <Slider
                                        asNavFor={nav2}
                                        ref={slider1}
                                        {...settings}
                                        className="main-img js-product-slider"
                                    >
                                        <Link to="#" className="hover-images effect">
                                            <img
                                                src={require('@/assets/image/product/single_1a.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <Link to="#" className="hover-images effect">
                                            <img
                                                src={require('@/assets/image/product/single_2a.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <Link to="#" className="hover-images effect">
                                            <img
                                                src={require('@/assets/image/product/single_3a.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <Link to="#" className="hover-images effect">
                                            <img
                                                src={require('@/assets/image/product/single_4a.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
                                        <Link to="#" className="hover-images effect">
                                            <img
                                                src={require('@/assets/image/product/single_5a.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </Link>
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
                                            <img
                                                src={require('@/assets/image/product/single_1.jpg')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div className="product-col">
                                        <div className="img">
                                            <img
                                                src={require('@/assets/image/product/single_2.jpg')}
                                                alt="images"
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div className="product-col">
                                        <div className="img">
                                            <img
                                                src={require('@/assets/image/product/single_3.jpg')}
                                                alt="images"
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div className="product-col">
                                        <div className="img">
                                            <img
                                                src={require('@/assets/image/product/single_4.jpg')}
                                                alt="images"
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div className="product-col">
                                        <div className="img">
                                            <img
                                                src={require('@/assets/image/product/single_5.jpg')}
                                                alt="images"
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="single-product-info product-info product-grid-v2">
                                <h3 className="product-title">
                                    <Link to="#">T-shirt Smooth</Link>
                                </h3>
                                <div className="product-price">
                                    <span className="old thin">$59.00</span>
                                    <span>$29.00</span>
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
                                    <p className="product-desc">
                                        Round neck sweater with long sleeves. Features a knotted opening in the <br />{' '}
                                        front. Phasellus gravida dolor in sem placerat sodales lullam feugiat non <br />
                                        dolor id commodo.
                                    </p>
                                </div>
                                <div className="color-group">
                                    <label>Color :</label>
                                    <Link to="#" className="circle gray" />
                                    <Link to="#" className="circle active yellow" />
                                    <Link to="#" className="circle white" />
                                </div>
                                <div className="product-size">
                                    <div className="size-group">
                                        <label>Size :</label>
                                        <select
                                            className="single-option-selector"
                                            data-option="option1"
                                            id="productSelect-option-0"
                                        >
                                            <option value="S">S</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                        <i className="iconDown">
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </i>{' '}
                                    </div>
                                    <Link to="" className="size-guide">
                                        Size guide
                                    </Link>
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
                                        <Link to="" className="zoa-btn zoa-addcart">
                                            <i className="zoa-icon-cart" />
                                            add to cart
                                        </Link>
                                    </div>
                                    <Link to="" className="btn-wishlist">
                                        + Add to wishlist
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
                                            <span>-15%</span>
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
                                            <span>-15%</span>
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
