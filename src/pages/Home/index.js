import sliderImg1 from '@/assets/image/slide/slider-1-home-1.png';
import sliderImg2 from '@/assets/image/slide/slider-2-home-1.png';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function Home() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className="slide v3">
                <Slider {...settings} className="js-slider-v4">
                    <div className="slide-img">
                        <img src={sliderImg1} alt="" className="img-responsive" />
                        <div className="box-center content2">
                            <h3>Anna Collection</h3>
                            <Link href="" className="slide-btn">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                    <div className="slide-img">
                        <img src={sliderImg2} alt="" className="img-responsive" />
                        <div className="box-center content1" />
                    </div>
                </Slider>
                <div className="custom">
                    <div className="pagingInfo" />
                </div>
            </div>
            <>
                <div className="trend-product pad">
                    <div className="container container-content">
                        <div className="row first">
                            <div className="col-md-5 col-sm-6 col-xs-12">
                                <div className="trend-img hover-images">
                                    <img
                                        className="img-responsive"
                                        src={require('@/assets/image/home1/trend.png')}
                                        alt=""
                                    />
                                    <div className="box-center align-items-end">
                                        <h3 className="zoa-category-box-title">
                                            <Link href="#">#trend</Link>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 col-sm-6 col-xs-12">
                                <div className="row engoc-row-equal">
                                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
                                        <div className="product-img">
                                            <Link href="">
                                                <img
                                                    src={require('@/assets/image/home1/product_1b.jpg')}
                                                    alt=""
                                                    className="img-responsive"
                                                />
                                            </Link>
                                            <div className="ribbon zoa-sale">
                                                <span>-15%</span>
                                            </div>
                                            <div className="product-button-group">
                                                <Link href="#" className="zoa-btn zoa-wishlist">
                                                    <span className="zoa-icon-heart">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </span>
                                                </Link>
                                                <Link href="#" className="zoa-btn zoa-addcart">
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
                                            <div className="color-group">
                                                <Link href="#" className="circle gray" />
                                                <Link href="#" className="circle yellow active" />
                                                <Link href="#" className="circle white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
                                        <div className="product-img">
                                            <Link href="">
                                                <img
                                                    src={require('@/assets/image/home1/product_2.jpg')}
                                                    alt=""
                                                    className="img-responsive"
                                                />
                                            </Link>
                                            <div className="ribbon zoa-hot">
                                                <span>Hot</span>
                                            </div>
                                            <div className="product-button-group">
                                                <Link href="#" className="zoa-btn zoa-wishlist">
                                                    <span className="zoa-icon-heart">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </span>
                                                </Link>
                                                <Link href="#" className="zoa-btn zoa-addcart">
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
                                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
                                        <div className="product-img">
                                            <Link href="">
                                                <img
                                                    src={require('@/assets/image/home1/product_3.jpg')}
                                                    alt=""
                                                    className="img-responsive"
                                                />
                                            </Link>
                                            <div className="ribbon zoa-new">
                                                <span>New</span>
                                            </div>
                                            <div className="product-button-group">
                                                <Link href="#" className="zoa-btn zoa-wishlist">
                                                    <span className="zoa-icon-heart">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </span>
                                                </Link>
                                                <Link href="#" className="zoa-btn zoa-addcart">
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
                                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
                                        <div className="product-img">
                                            <Link href="">
                                                <img
                                                    src={require('@/assets/image/home1/product_4.jpg')}
                                                    alt=""
                                                    className="img-responsive"
                                                />
                                            </Link>
                                            <div className="product-button-group">
                                                <Link href="#" className="zoa-btn zoa-wishlist">
                                                    <span className="zoa-icon-heart">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </span>
                                                </Link>
                                                <Link href="#" className="zoa-btn zoa-addcart">
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
                                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
                                        <div className="product-img">
                                            <Link href="">
                                                <img
                                                    src={require('@/assets/image/home1/product_5.jpg')}
                                                    alt=""
                                                    className="img-responsive"
                                                />
                                            </Link>
                                            <div className="product-button-group">
                                                <Link href="#" className="zoa-btn zoa-wishlist">
                                                    <span className="zoa-icon-heart">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </span>
                                                </Link>
                                                <Link href="#" className="zoa-btn zoa-addcart">
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
                                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
                                        <div className="product-img">
                                            <Link href="">
                                                <img
                                                    src={require('@/assets/image/home1/product_6.jpg')}
                                                    alt=""
                                                    className="img-responsive"
                                                />
                                            </Link>
                                            <div className="ribbon zoa-new">
                                                <span>trend</span>
                                            </div>
                                            <div className="product-button-group">
                                                <Link href="#" className="zoa-btn zoa-wishlist">
                                                    <span className="zoa-icon-heart">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </span>
                                                </Link>
                                                <Link href="#" className="zoa-btn zoa-addcart">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-banner">
                    <div className="container container-content">
                        <div className="banner-img hover-images">
                            <img
                                src={require('@/assets/image/home1/home-1-bg.png')}
                                alt=""
                                className="img-responsive"
                            />
                            <div className="box-center">
                                <div className="content">
                                    <Link className="text" href="">
                                        #spring collect
                                    </Link>
                                    <h2>-50%</h2>
                                    <Link href="#" className="zoa-btn btn-shopnow">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default Home;
