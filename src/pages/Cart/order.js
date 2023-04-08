import { cartSelector, optionsSelector, shippingMethodsSelector, userSelector } from '@/redux/selector';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../MyAccount/UserSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';

function Order({ total }) {
    const dispatch = useDispatch();
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const shippingMethods = useSelector(shippingMethodsSelector);
    const { addresses } = user;
    const optionProduct = useSelector(optionsSelector);
    const addressDefault = useMemo(() => {
        const addressOrder = addresses.find((address) => address.isDefault === true);
        return addressOrder;
    }, [addresses]);
    const handleChangePaymentMethod = (e) => {
        dispatch(userSlice.actions.setpaymentMethod(e.target.value));
    };
    const priceShipping = useMemo(() => {
        if (user.paymentMethodId === '0') {
            return 0;
        }
        const typeShipping = shippingMethods.find(
            (shippingMethod) => shippingMethod.shippingMethodId === Number(user.paymentMethodId),
        );
        return typeShipping.price;
    }, [shippingMethods, user]);
    return (
        <>
            <div className="order_wrapper">
                <div className="address-form__group">
                    <label className="address-form__label">Địa chỉ nhận hàng:</label>
                    {addresses.length > 0 ? (
                        <>
                            <p className="address-name">{`${addressDefault.fullName}  `}</p>
                            <p className="address-phone">{addressDefault.phoneNumber}</p>
                            <p className="address">
                                {' '}
                                {`${addressDefault.addressLine} ${addressDefault.ward} ${addressDefault.district} ${addressDefault.city}`}
                            </p>
                        </>
                    ) : (
                        false
                    )}
                </div>
                <label className="address-form__label">Sản phẩm:</label>
                <ul className="header__cart-list-items">
                    {cartUser.cartItems.map((item, i) => {
                        if (item.isChecked) {
                            return (
                                <li key={item.cartItemId} className="header__cart-item">
                                    <img className="header__cart-item-img" src={item.image} alt="" />
                                    <div className="header__cart-item-info">
                                        <div className="header__cart-item-head">
                                            <h5 className="header__cart-item-name">{item.name}</h5>
                                            <div className="header__cart-item-price-wrap">
                                                <span className="header__cart-item-price">
                                                    {convertVnd(item.costPrice)}
                                                </span>
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
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                        return false;
                    })}
                </ul>
                <div className="total-product">
                    <p>Tổng số tiền sản phẩm: {convertVnd(total)}</p>
                </div>
                <div className="address-form__group">
                    <label className="address-form__label">Phương thức thanh toán</label>
                    <select
                        // onChange={onChangeForm}
                        // value={formData.provider}
                        type="text"
                        name="provider"
                        placeholder="Card"
                        required=""
                        className="address-form__input"
                    >
                        <option value="0">Thanh toán khi nhận hàng</option>
                        {user.paymentMethods.map((pm) => {
                            return (
                                <option key={pm.paymentMethodId} value="Visa">
                                    {`${pm.provider}  **** **** ****${pm.accountNumber.slice(-4)}`}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="address-form__group">
                    <label className="address-form__label">Đơn vị vận chuyển</label>
                    <select
                        // value={formData.provider}
                        onChange={handleChangePaymentMethod}
                        type="text"
                        name="provider"
                        placeholder="Card"
                        required=""
                        className="address-form__input"
                    >
                        <option value="0">Chọn đơn vị vận chuyển</option>
                        {shippingMethods.map((method) => {
                            return (
                                <option key={method.shippingMethodId} value={method.shippingMethodId}>{`${
                                    method.name
                                } ${convertVnd(method.price)}`}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="total-order">
                    <p>Tổng thanh toán: {convertVnd(total + priceShipping)}</p>
                </div>
            </div>
        </>
    );
}

export default Order;
