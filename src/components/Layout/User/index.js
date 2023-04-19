import { Link, useNavigate } from 'react-router-dom';
import images from '@/assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, categoriesSelector, userSelector } from '@/redux/selector';
import { useEffect, useMemo, useState } from 'react';
import { getData } from '@/api/service';
import { api } from '@/api';
import userSlice from '@/pages/MyAccount/UserSlice';
import Notification from '@/components/Admin/Notification';
import CartHeader from '@/pages/Cart/CartHeader';
import cartSlice from '@/pages/Cart/CartSlice';
import shippingSlice from '@/pages/ShippingMethod/ShippingSlice';
function UserAccount({ onOpenSearch, onOpenCart }) {
    //userAccount
    const user = useSelector(userSelector);
    const cartItems = useSelector(cartSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(categoriesSelector);
    const [search, setSearch] = useState('');
    //handle change input
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    //filter categories
    const searchResult = useMemo(() => {
        const result = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
        if (result.length === categories.length) {
            return [];
        }
        return result;
    }, [categories, search]);

    //filter products
    const handleEnterInput = (event) => {
        if (event.key === 'Enter') {
            setSearch('');
            navigate('/shop?search=' + search);
        }
    };
    //get user
    useEffect(() => {
        getData(api.userAccount)
            .then((response) => {
                dispatch(userSlice.actions.setUser(response.data));
                console.log('userData', response);
            })
            .catch((error) => {
                // if (error.message === 'unauthorized') {
                //     navigate('/user/signin');
                // } else {
                //     const payload = JSON.parse(error.message);
                //     console.warn(payload);
                // }
                console.log(error.message);
            });
    }, [dispatch]);
    //userAccount
    //get cart
    useEffect(() => {
        if (user.uid !== '') {
            getData(api.shoppingCarts + '/' + user.uid)
                .then((response) => {
                    console.log('cart', response);
                    dispatch(cartSlice.actions.setCartId(response.data.cartId));
                    const cartUser = response.data.items.reduce((acc, item) => {
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
                    dispatch(cartSlice.actions.setCart(cartUser.reverse()));

                    console.log('convert cart ', cartUser);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user.uid, dispatch]);
    //gett shipping methods
    useEffect(() => {
        getData(api.shippingMethods).then((response) => {
            console.log(response);
            dispatch(shippingSlice.actions.setShippingMethods(response));
        });
    }, [dispatch]);
    //get wishlist
    useEffect(() => {
        if (user.uid !== '') {
            getData(api.wishLists + '/' + user.uid)
                .then((response) => {
                    dispatch(cartSlice.actions.setWishlist(response.data));
                    console.log('wishlist', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user.uid, dispatch]);
    return (
        <div className="topbar-left">
            <Notification />
            <div className="element element-search hidden-xs hidden-sm">
                <Link
                    // onClick={onOpenSearch}
                    to=""
                    className="zoa-icon wrapper-search search-toggle"
                >
                    <img className="search-img" src={images.search} alt="menubar" />
                    <input
                        onChange={handleChangeSearch}
                        onKeyDown={handleEnterInput}
                        className="search-input"
                        type="text"
                        value={search}
                    />
                </Link>
                {searchResult.length !== 0 ? (
                    <div className="wrapper-search-result">
                        <ul>
                            {searchResult.map((category) => {
                                return (
                                    <li key={category.categoryId}>
                                        <Link
                                            onClick={() => {
                                                setSearch('');
                                            }}
                                            to={`/shop?page=1&category=${category.name}`}
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    false
                )}
            </div>

            <div className="element element-cart">
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        if (user.uid === '') {
                            navigate('/user/signin');
                        } else {
                            navigate('/cart');
                        }
                    }}
                    className="zoa-icon icon-cart"
                >
                    <img src={images.cart} alt="menubar" />
                    <span className="count cart-count">{cartItems.cartItems.length}</span>
                </Link>
                <CartHeader />
            </div>
            {user.uid !== '' ? (
                <div className="user-account element element-user hidden-xs hidden-sm">
                    <Link to="/myaccount">
                        <img
                            src={
                                user.avatar === ''
                                    ? 'https://allenandclarke.com.au/wp-content/uploads/2020/08/Blank-Man_White-1343x1385px.jpg'
                                    : user.avatar
                            }
                            alt="menubar"
                        />
                    </Link>
                </div>
            ) : (
                <div className="user-account element element-user hidden-xs hidden-sm">
                    <Link to="/user/signin" className="zoa-icon js-user">
                        <img
                            src="https://allenandclarke.com.au/wp-content/uploads/2020/08/Blank-Man_White-1343x1385px.jpg"
                            alt="menubar"
                        />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default UserAccount;
