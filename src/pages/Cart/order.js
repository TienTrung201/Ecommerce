import { cartSelector, optionsSelector, userSelector } from '@/redux/selector';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function Order({ total }) {
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const { addresses } = user;
    const optionProduct = useSelector(optionsSelector);
    const addressDefault = useMemo(() => {
        const addressOrder = addresses.find((address) => address.isDefault === true);
        return addressOrder;
    }, [addresses]);
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
                                                    {item.costPrice * item.qty} đ
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
                        <option value=""></option>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                    </select>
                </div>
                <div className="address-form__group">
                    <label className="address-form__label">Đơn vị vận chuyển</label>
                    <select
                        // onChange={onChangeForm}
                        // value={formData.provider}
                        type="text"
                        name="provider"
                        placeholder="Card"
                        required=""
                        className="address-form__input"
                    >
                        <option value=""></option>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                    </select>
                </div>
                <div className="total">
                    <p>Thành tiền: {total} đ</p>
                </div>
            </div>
        </>
    );
}

export default Order;
