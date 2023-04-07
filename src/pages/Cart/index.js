import { api } from '@/api';
import { getData, updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { cartSelector, optionsSelector, userSelector } from '@/redux/selector';
import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import cartSlice from './CartSlice';

function Cart() {
    const dispatch = useDispatch();
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const optionProduct = useSelector(optionsSelector);
    const cart = useRef();
    const wishlist = useRef();
    const cartItem = useRef();
    const wishlistItem = useRef();
    // set quantiti item cart
    const handeSetQuantity = (id, position, action) => {
        dispatch(notificationsSlice.actions.showLoading(''));

        let itemCartChanged = cartUser.cartItems.find((item) => item.cartItemId === id);
        if (itemCartChanged.qty === 1 && action === '-') {
            handleDeleteCartItem(id, position);
        } else if (itemCartChanged.qty === itemCartChanged.qtyInStock && action === '+') {
            dispatch(notificationsSlice.actions.showError(`Chỉ còn ${itemCartChanged.qtyInStock} sản phẩm`));
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        } else {
            if (action === '+') {
                itemCartChanged = cartUser.cartItems.map((cartItem) => {
                    if (cartItem.cartItemId === id) {
                        return { ...cartItem, qty: cartItem.qty + 1 };
                    }
                    return cartItem;
                });
            } else {
                itemCartChanged = cartUser.cartItems.map((cartItem) => {
                    if (cartItem.cartItemId === id) {
                        return { ...cartItem, qty: cartItem.qty - 1 };
                    }
                    return cartItem;
                });
            }
            const convertDataUpdate = itemCartChanged.map((dataItem) => {
                return {
                    cartItemId: dataItem.cartItemId,
                    qty: dataItem.qty,
                    cartId: cartUser.cartId,
                    productItemId: dataItem.productItemId,
                };
            });
            updateData(api.shoppingCarts, {
                cartId: cartUser.cartId,
                userId: user.uid,
                items: convertDataUpdate,
            })
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        dispatch(cartSlice.actions.setCart(itemCartChanged));
                    }, 1000);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 2000);
                })
                .catch((error) => {
                    dispatch(notificationsSlice.actions.showError('Lỗi'));
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 1000);
                    console.log(error);
                });
        }
    };
    // set quantiti product cart
    //delete product in cart

    const handleDeleteCartItem = (id, position) => {
        console.log(cartUser);
        const dataDeleteBefore = cartUser.cartItems.filter((cartItem) => cartItem.cartItemId !== id);
        const convertDataUpdate = dataDeleteBefore.map((dataItem) => {
            return {
                cartItemId: dataItem.cartItemId,
                qty: dataItem.qty,
                cartId: cartUser.cartId,
                productItemId: dataItem.productItemId,
            };
        });
        console.log({ cartId: cartUser.cartId, userId: user.uid, items: convertDataUpdate });
        updateData(api.shoppingCarts, {
            cartId: cartUser.cartId,
            userId: user.uid,
            items: convertDataUpdate,
        })
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    dispatch(cartSlice.actions.removeItemCart(position));
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
    };
    //delete product in cart
    //checked item product
    const handleCheckedItemProduct = (id) => {
        let checkedItem = cartUser.cartItems.find((item) => item.cartItemId === id);

        const cartCheckedBefore = cartUser.cartItems.map((item) => {
            if (item.cartItemId === checkedItem.cartItemId) {
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });
        dispatch(cartSlice.actions.setCart(cartCheckedBefore));
    };
    //checked item product
    //total cart
    const totalCart = useMemo(() => {
        const total = cartUser.cartItems.reduce((acc, item) => {
            if (item.isChecked) {
                return (acc += item.costPrice * item.qty);
            }
            return (acc += 0);
        }, 0);
        return total;
    }, [cartUser]);
    //total cart
    //menu tab
    const handleChangeCart = (e) => {
        cart.current.classList.add('active', 'in');
        wishlist.current.classList.remove('active', 'in');
        cartItem.current.classList.add('active');
        wishlistItem.current.classList.remove('active');
    };
    const handleChangeWishlist = (e) => {
        cart.current.classList.remove('active', 'in');
        wishlist.current.classList.add('active', 'in');
        cartItem.current.classList.remove('active');
        wishlistItem.current.classList.add('active');
    };
    //menu tab

    return (
        <div className="container">
            <div className="zoa-cart">
                <ul className="account-tab">
                    <li ref={cartItem} onClick={handleChangeCart} className="active">
                        <Link data-toggle="tab" to="#" aria-expanded="false">
                            Shopping Cart
                        </Link>
                    </li>
                    <li ref={wishlistItem} onClick={handleChangeWishlist} className="">
                        <Link data-toggle="tab" to="#" aria-expanded="true">
                            Wishlist
                        </Link>
                    </li>
                </ul>
                <div className="tab-content">
                    <div ref={cart} id="cart" className="tab-pane fade in active">
                        <div className="shopping-cart">
                            <div className="table-responsive">
                                <table className="table cart-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className="product-thumbnail">Product</th>
                                            <th className="product-name">Description</th>
                                            <th className="product-name">Size</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-remove">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartUser.cartItems.map((item, i) => {
                                            return (
                                                <tr key={item.cartItemId} className="item_cart">
                                                    <td>
                                                        <input
                                                            onChange={() => {
                                                                handleCheckedItemProduct(item.cartItemId);
                                                            }}
                                                            type="checkbox"
                                                            className="checkbox"
                                                            checked={item.isChecked}
                                                        />
                                                    </td>
                                                    <td className=" product-name">
                                                        <div className="product-img">
                                                            <img src={item.image} alt="Product" />
                                                        </div>
                                                    </td>
                                                    <td className="product-desc">
                                                        <div className="product-info">
                                                            <Link
                                                                to={`/product/${item.name.replace(/ /g, '-')}/${
                                                                    item.productId
                                                                }`}
                                                                title=""
                                                            >
                                                                {item.name}
                                                            </Link>
                                                            <span>#SKU: {item.sku}</span>
                                                        </div>
                                                    </td>
                                                    <td className="product-same">
                                                        <div className="product-info">
                                                            <p>
                                                                {' '}
                                                                {item.optionsId.map((optionCurrentItem) => {
                                                                    const typeOption = optionProduct.find(
                                                                        (o) => o.productOptionId === optionCurrentItem,
                                                                    );
                                                                    return typeOption.name + ' ';
                                                                })}{' '}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="product-same total-price">
                                                        <p className="price">{item.costPrice} đ</p>
                                                    </td>
                                                    <td className="bcart-quantity single-product-detail">
                                                        <div className="autoCenter">
                                                            <button
                                                                onClick={() => {
                                                                    handeSetQuantity(item.cartItemId, i, '-');
                                                                }}
                                                                type="button"
                                                                className="quantity-right-plus btn btn-number js-plus"
                                                                data-type="plus"
                                                                data-field=""
                                                            >
                                                                <i className="ion-ios-plus-empty">
                                                                    <FontAwesomeIcon icon={faMinus} />
                                                                </i>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                name="number"
                                                                value={item.qty}
                                                                disabled={true}
                                                                className="product_quantity_number js-number"
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    handeSetQuantity(item.cartItemId, i, '+');
                                                                }}
                                                                type="button"
                                                                className="quantity-right-plus btn btn-number js-plus"
                                                                data-type="plus"
                                                                data-field=""
                                                            >
                                                                <i className="ion-ios-plus-empty">
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                </i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="total-price">
                                                        <p className="price">{item.qty * item.costPrice} đ</p>
                                                    </td>
                                                    <td
                                                        onClick={() => {
                                                            handleDeleteCartItem(item.cartItemId, i);
                                                        }}
                                                        className="product-remove"
                                                    >
                                                        <Link href="#" className="btn-del">
                                                            <FontAwesomeIcon icon={faClose} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-cart-bottom">
                                <div className="row">
                                    <div className="col-md-7 col-sm-6 col-xs-12">
                                        <div className="cart-btn-group">
                                            <Link href="" className="btn-continue">
                                                Continue shopping
                                            </Link>
                                            <Link href="" className="btn-clear">
                                                clear cart
                                            </Link>
                                        </div>
                                        <div className="coupon-group">
                                            <form className="form_coupon" action="#" method="post">
                                                <input
                                                    type="email"
                                                    defaultValue=""
                                                    placeholder="COUPON CODE"
                                                    name="EMAIL"
                                                    id="mail"
                                                    className="newsletter-input form-control"
                                                />
                                                <div className="input-icon">
                                                    <img src={require('@/assets/image/product/coupon.png')} alt="" />
                                                </div>
                                            </form>
                                            <Link href="#" className="btn-update">
                                                Update cart
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-6 col-xs-12">
                                        <div className="cart-text">
                                            <div className="cart-element">
                                                <p>Total products:</p>
                                                <p>{totalCart} đ</p>
                                            </div>
                                            <div className="cart-element">
                                                <p>Estimated shipping costs:</p>
                                                <p>$0.00</p>
                                            </div>
                                            <div className="cart-element text-bold">
                                                <p>Total:</p>
                                                <p>{totalCart} đ</p>
                                            </div>
                                        </div>
                                        <Link
                                            href=""
                                            className={
                                                totalCart === 0
                                                    ? 'zoa-btn zoa-checkout button-unauthorized'
                                                    : 'zoa-btn zoa-checkout'
                                            }
                                        >
                                            Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={wishlist} id="wishlist" className="tab-pane fade">
                        <div className="shopping-cart">
                            <div className="table-responsive">
                                <table className="table cart-table">
                                    <tbody>
                                        <tr className="item_cart">
                                            <td className="product-remove pd-right-30">
                                                <Link href="#" className="btn-del">
                                                    <FontAwesomeIcon icon={faClose} />
                                                </Link>
                                            </td>
                                            <td className=" product-name">
                                                <div className="product-img">
                                                    <img
                                                        src={require('@/assets/image/product/cart_product_1.jpg')}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-desc">
                                                <div className="product-info">
                                                    <Link href="#" title="">
                                                        Harman Kardon Onyx Studio{' '}
                                                    </Link>
                                                    <span>#SKU: 113106</span>
                                                </div>
                                            </td>
                                            <td className="wl total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-select">
                                                    Select Options
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-btn zoa-wl-addcart">
                                                    ADD TO CART
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr className="item_cart">
                                            <td className="product-remove pd-right-30">
                                                <Link href="#" className="btn-del">
                                                    <FontAwesomeIcon icon={faClose} />
                                                </Link>
                                            </td>
                                            <td className=" product-name">
                                                <div className="product-img">
                                                    <img
                                                        src={require('@/assets/image/product/cart_product_3.jpg')}
                                                        alt="Product"
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-desc">
                                                <div className="product-info">
                                                    <Link href="#" title="">
                                                        Harman Kardon Onyx Studio{' '}
                                                    </Link>
                                                    <span>#SKU: 113106</span>
                                                </div>
                                            </td>
                                            <td className="wl total-price">
                                                <p className="price">$19.00</p>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-select">
                                                    Select Options
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href="" className="zoa-btn zoa-wl-addcart">
                                                    ADD TO CART
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-cart-bottom v2">
                                <div className="cart-btn-group v2">
                                    <Link href="" className="btn-continue">
                                        Continue shopping
                                    </Link>
                                    <Link href="" className="btn-clear">
                                        Share my wishlist via mail{' '}
                                        <img src={require('@/assets/image/Icon_mail.png')} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
