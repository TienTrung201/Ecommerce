import { api } from '@/api';
import { deleteData, getData, postData } from '@/api/service';
// import sliderImg1 from '@/assets/image/slide/slider-1-home-1.png';
import sliderImg2 from '@/assets/image/slide/slider4.jpg';
import sliderImg1 from '@/assets/image/slide/slider3.jpg';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';
import { cartSelector, userSelector } from '@/redux/selector';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import cartSlice from '../Cart/CartSlice';

function Home() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const cartUser = useSelector(cartSelector);
    const navigate = useNavigate();
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
    //checkuser login
    // const checkLogin = () => {
    //     if (user.uid === '') {
    //         navigate('/user/signin');
    //     }
    // };
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
                            {/* <h3>Anna Collection</h3> */}
                            {/* <Link href="" className="slide-btn">
                                Shop Now
                            </Link> */}
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
                                        src={require('@/assets/image/home1/trend2.png')}
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
                                        if (index >= 6) {
                                            return false;
                                        }
                                        const isWishlist = cartUser.wishlist.find(
                                            (wishlist) => wishlist.productId === product.productId,
                                        );
                                        return (
                                            <div
                                                key={product.productId}
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
                                                        <Link
                                                            style={{ background: isWishlist ? '#dd2a2a' : '' }}
                                                            onClick={(e) => {
                                                                e.preventDefault();

                                                                if (user.uid === '') {
                                                                    navigate('/user/signin');
                                                                } else if (isWishlist) {
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
                                                    <h3 className="product-title">{product.name}</h3>
                                                    <div className="product-price">
                                                        <span className="old">
                                                            {convertVnd(product.items[0].price)}
                                                        </span>
                                                        {product.discountRate === 0 ? (
                                                            <span>{convertVnd(product.items[0].price)}</span>
                                                        ) : (
                                                            <span>
                                                                {convertVnd(
                                                                    (product.items[0].price * product.discountRate) /
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
                    </div>
                </div>
                <div className="single-banner">
                    <div className="container container-content">
                        <div className="banner-img hover-images">
                            <img
                                src={require('@/assets/image/home1/home-1-bg.jpg')}
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
