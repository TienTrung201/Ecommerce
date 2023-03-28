import { api } from '@/api';
import { getData } from '@/api/service';
import sliderImg1 from '@/assets/image/slide/slider-1-home-1.png';
import sliderImg2 from '@/assets/image/slide/slider-2-home-1.png';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function Home() {
    const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [promotions, setPromotions] = useState([]);
    // const [discounts,setDiscounts] = useState([]);
    useEffect(() => {
        Promise.all([getData(api.products), getData(api.categories), getData(api.promotions)])
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
                setProducts(allProduct);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);
    //setting slider
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    //setting slider

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
                                    {products.map((product, index) => {
                                        if (index >= 5) {
                                            return false;
                                        }

                                        return (
                                            <div
                                                key={products.productId}
                                                className="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item"
                                            >
                                                <div className="product-img">
                                                    <Link
                                                        to={`/product/${product.name.replace(/ /g, '-')}/${
                                                            product.productId
                                                        }`}
                                                    >
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
                                                    <h3 className="product-title">{product.name}</h3>
                                                    <div className="product-price">
                                                        <span className="old">${product.items[0].price}</span>
                                                        {product.discountRate === 0 ? (
                                                            <span>${product.items[0].price}</span>
                                                        ) : (
                                                            <span>
                                                                ${(product.items[0].price * product.discountRate) / 100}
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
