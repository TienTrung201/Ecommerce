import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function Product() {
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

                    <li className="active">My Account</li>
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
                                        <span className="star star-5" />
                                        <span className="star star-4" />
                                        <span className="star star-3" />
                                        <span className="star star-2" />
                                        <span className="star star-1" />
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
                                    </div>
                                    <Link to="" className="size-guide">
                                        Size guide
                                    </Link>
                                </div>
                                <div className="single-product-button-group">
                                    <div className="flex align-items-center element-button">
                                        <div className="zoa-qtt">
                                            <button
                                                type="button"
                                                className="quantity-left-minus btn btn-number js-minus"
                                                data-type="minus"
                                                data-field=""
                                            ></button>
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
                                            ></button>
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
                                <div className="product-tags">
                                    <div className="element-tag">
                                        <label>SKU :</label>
                                        <span>N/A</span>
                                    </div>
                                    <div className="element-tag">
                                        <label>Categories :</label>
                                        <Link to="#">All,</Link>
                                        <Link to="#">Shirts,</Link>
                                        <Link to="#">Featured</Link>
                                    </div>
                                    <div className="element-tag">
                                        <label>Tags :</label>
                                        <Link to="#">Back,</Link>
                                        <Link to="#">Blue,</Link>
                                        <Link to="#">new,</Link>
                                        <Link to="#">£0.00 - £150.00</Link>
                                    </div>
                                </div>
                                <div className="product-social">
                                    <label>Share +</label>
                                    <div className="social">
                                        <Link to="">
                                            <i className="fa fa-facebook" />
                                        </Link>
                                        <Link to="">
                                            <i className="fa fa-twitter" />
                                        </Link>
                                        <Link to="">
                                            <i className="fa fa-instagram" />
                                        </Link>
                                        <Link to="">
                                            <i className="fa fa-pinterest" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
