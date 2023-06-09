import { api } from '@/api';
import { updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { cartSelector, optionsSelector, userSelector } from '@/redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import cartSlice from '../CartSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';

function CartHeader() {
    const dispatch = useDispatch();
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const optionProduct = useSelector(optionsSelector);
    const navigate = useNavigate();
    //delete item in cart
    const handleDeleteCartItem = (id, position) => {
        console.log(cartUser);
        dispatch(notificationsSlice.actions.showLoading(''));
        const data = cartUser.cartItems.filter((cartItem) => cartItem.cartItemId !== id);
        const convertDataUpdate = data.map((dataItem) => {
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

                console.log('update cart', response.data);
            })
            .catch((error) => {
                dispatch(notificationsSlice.actions.showError('Thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.log(error);
            });
    };
    //delete item in cart

    return (
        <div className="header__cart-list">
            <img className="header__cart-list-empty-cart-img" src="./assets/img/empty_cart.png" alt="Empty cart" />
            <span className="header__cart-list-empty-cart-msg">Chưa có sản phẩm</span>
            <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
            <ul className="header__cart-list-items">
                {cartUser.cartItems.map((item, i) => {
                    return (
                        <li
                            onClick={() => {
                                navigate(`/product/${item.name.replace(/ /g, '-')}/${item.productId}`);
                            }}
                            key={item.cartItemId}
                            className="header__cart-item"
                        >
                            <img className="header__cart-item-img" src={item.image} alt="" />
                            <div className="header__cart-item-info">
                                <div className="header__cart-item-head">
                                    <h5 className="header__cart-item-name">{item.name}</h5>
                                    <div className="header__cart-item-price-wrap">
                                        {item.discountRate !== 0 ? (
                                            <span className="header__cart-item-price">
                                                {convertVnd(item.price - (item.price * item.discountRate) / 100)}
                                            </span>
                                        ) : (
                                            <span className="header__cart-item-price">{convertVnd(item.price)}</span>
                                        )}

                                        <span className="header__cart-item-multiply">x</span>
                                        <span className="header__cart-item-qnt">{item.qty}</span>
                                    </div>
                                </div>
                                <div className="header__cart-item-body">
                                    <span className="header__cart-item-description">
                                        Phân loại:
                                        {item.optionsId.map((optionCurrentItem) => {
                                            const typeOption = optionProduct.find(
                                                (o) => o.productOptionId === optionCurrentItem,
                                            );
                                            return typeOption.name;
                                        })}{' '}
                                    </span>
                                    <span
                                        onClick={() => {
                                            handleDeleteCartItem(item.cartItemId, i);
                                        }}
                                        className="header__cart-item-remove"
                                    >
                                        Xóa
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    if (user.uid === '') {
                        navigate('/user/signin');
                    } else {
                        navigate('/cart');
                    }
                }}
                className="header__cart-view-cart btn btn--primary"
            >
                Xem giỏ hàng
            </Link>
        </div>
    );
}

export default CartHeader;
