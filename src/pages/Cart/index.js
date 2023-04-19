import { api } from '@/api';
import { getData, postData, updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { cartSelector, optionsSelector, shippingMethodsSelector, userSelector } from '@/redux/selector';
import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import cartSlice from './CartSlice';
import Modal from '@/components/Layout/Modal';
import Order from './order';
import { convertVnd } from '@/components/GlobalStyles/fuction';
import WishList from './wishList';

function Cart() {
    const dispatch = useDispatch();
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const optionProduct = useSelector(optionsSelector);
    const cart = useRef();
    const wishlist = useRef();
    const cartItem = useRef();
    const wishlistItem = useRef();
    const [visible, setVisible] = useState(false);
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
                    console.log('update cart', response.data);
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

                console.log('update cart', response);
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
                if (item.discountRate === 0) {
                    return (acc += item.price * item.qty);
                }
                return (acc += (item.price - (item.price * item.discountRate) / 100) * item.qty);
            }
            return (acc += 0);
        }, 0);
        return total;
    }, [cartUser]);
    //total cart
    //handle click order cart
    const handleOpenModalOrderCart = () => {
        if (totalCart !== 0) {
            setVisible(true);
        }
    };
    //handle click order cart
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

    //order

    const { addresses, shippingMethodId, paymentMethodId } = user;
    const shippingMethods = useSelector(shippingMethodsSelector);
    const addressDefault = useMemo(() => {
        const addressOrder = addresses.find((address) => address.isDefault === true);

        return addressOrder;
    }, [addresses]);
    const [chooseAddressId, setChooseAddressId] = useState(addressDefault ? addressDefault.addressId : 0);
    useEffect(() => {
        if (addressDefault) {
            setChooseAddressId(addressDefault.addressId);
        }
    }, [addressDefault]);
    const priceShipping = useMemo(() => {
        if (shippingMethods.length === 0) {
            return 0;
        }
        const typeShipping = shippingMethods.find((shippingMethod) => {
            return shippingMethod.shippingMethodId === shippingMethodId;
        });
        return typeShipping.price;
    }, [shippingMethods, shippingMethodId]);

    const handleOrderCart = async () => {
        try {
            const typeShipping = shippingMethods.find(
                (shippingMethod) => shippingMethod.shippingMethodId === user.shippingMethodId,
            );
            const itemsOrder = cartUser.cartItems.filter((item) => item.isChecked === true);
            const dataItemsOrder = itemsOrder.map((item) => {
                return {
                    productItemId: item.productItemId,
                    qty: item.qty,
                };
            });
            const dataOrder =
                paymentMethodId === 0
                    ? {
                          addressId: chooseAddressId,
                          shippingMethodId: typeShipping.shippingMethodId,
                          items: dataItemsOrder,
                      }
                    : {
                          addressId: chooseAddressId,
                          shippingMethodId: typeShipping.shippingMethodId,
                          paymentMethodId: paymentMethodId,
                          items: dataItemsOrder,
                      };
            console.log(dataOrder);
            const orderResponse = await postData(api.shopOrders, dataOrder);
            console.log(orderResponse);
            const remainingProductCart = cartUser.cartItems.filter((item) => item.isChecked === false);

            const convertRemainingProductCartToUpdate = remainingProductCart.map((dataItem) => {
                return {
                    cartItemId: dataItem.cartItemId,
                    qty: dataItem.qty,
                    cartId: cartUser.cartId,
                    productItemId: dataItem.productItemId,
                };
            });
            const cartOrderReponse = await updateData(api.shoppingCarts, {
                cartId: cartUser.cartId,
                userId: user.uid,
                items: convertRemainingProductCartToUpdate,
            });
            console.log(cartOrderReponse);

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
                dispatch(notificationsSlice.actions.showSuccess('Đặt hàng thành công'));
                dispatch(cartSlice.actions.setCart(cartUserRespones.reverse()));
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                dispatch(notificationsSlice.actions.showError('Thất bại'));
            }, 1000);

            console.log(error);
        } finally {
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        }
    };

    return (
        <div className="container">
            <Modal
                haldleSendModal={handleOrderCart}
                visible={visible}
                setVisible={setVisible}
                title={'Đơn đặt hàng'}
                save={'Đặt hàng'}
                checkedSubmit={addressDefault ? true : false}
            >
                <Order
                    addresses={addresses}
                    paymentMethodId={paymentMethodId}
                    priceShipping={priceShipping}
                    addressDefault={addressDefault}
                    total={totalCart}
                    setChooseAddressId={setChooseAddressId}
                    chooseAddressId={chooseAddressId}
                />
            </Modal>
            <div className="zoa-cart">
                <ul className="account-tab">
                    <li ref={cartItem} onClick={handleChangeCart} className="active">
                        <Link data-toggle="tab" to="#" aria-expanded="false">
                            Giỏ hàng
                        </Link>
                    </li>
                    <li ref={wishlistItem} onClick={handleChangeWishlist} className="">
                        <Link data-toggle="tab" to="#" aria-expanded="true">
                            Danh sách yêu thích
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
                                            <th className="">Sản phẩm</th>
                                            <th className="product-name">Mô tả</th>
                                            <th className="product-name">Loại</th>
                                            <th className="product-price">Giá</th>
                                            <th className="product-quantity">Số lượng</th>
                                            <th className="product-subtotal">Tổng tiền</th>
                                            <th className="product-remove">Xóa</th>
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
                                                        {item.discountRate === 0 ? (
                                                            <p className="price">{convertVnd(item.price)}</p>
                                                        ) : (
                                                            <p className="price">
                                                                {convertVnd(
                                                                    item.price - (item.price * item.discountRate) / 100,
                                                                )}
                                                            </p>
                                                        )}
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
                                                        {item.discountRate === 0 ? (
                                                            <p className="price">{convertVnd(item.qty * item.price)}</p>
                                                        ) : (
                                                            <p className="price">
                                                                {convertVnd(
                                                                    item.qty *
                                                                        (item.price -
                                                                            (item.price * item.discountRate) / 100),
                                                                )}
                                                            </p>
                                                        )}
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
                                                    style={{ height: '60px' }}
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
                                                <p>Tổng tiền sản phẩm:</p>
                                                <p>{convertVnd(totalCart)}</p>
                                            </div>
                                            <div className="cart-element">
                                                <p>Estimated shipping costs:</p>
                                                <p>{convertVnd(0)}</p>
                                            </div>
                                            <div className="cart-element text-bold">
                                                <p>Tổng thanh toán:</p>
                                                <p>{convertVnd(totalCart)}</p>
                                            </div>
                                        </div>
                                        <Link
                                            onClick={() => {
                                                handleOpenModalOrderCart();
                                            }}
                                            to=""
                                            className={
                                                totalCart === 0
                                                    ? 'zoa-btn zoa-checkout button-unauthorized'
                                                    : 'zoa-btn zoa-checkout'
                                            }
                                        >
                                            Mua hàng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={wishlist} id="wishlist" className="tab-pane fade">
                        <WishList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
