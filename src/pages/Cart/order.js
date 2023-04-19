import { cartSelector, optionsSelector, shippingMethodsSelector, userSelector } from '@/redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../MyAccount/UserSlice';
import { convertVnd } from '@/components/GlobalStyles/fuction';

function Order({ chooseAddressId, setChooseAddressId, total, priceShipping, addressDefault, addresses }) {
    const dispatch = useDispatch();
    const cartUser = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const shippingMethods = useSelector(shippingMethodsSelector);
    const optionProduct = useSelector(optionsSelector);
    // const addressDefault = useMemo(() => {
    //     const addressOrder = addresses.find((address) => address.isDefault === true);
    //     return addressOrder;
    // }, [addresses]);
    const handleShippingMethod = (e) => {
        dispatch(userSlice.actions.setShippingMethodId(Number(e.target.value)));
    };
    const handleChangePaymentMethod = (e) => {
        dispatch(userSlice.actions.setpaymentMethod(Number(e.target.value)));
    };
    // const priceShipping = useMemo(() => {
    //     if (user.paymentMethodId === '0') {
    //         return 0;
    //     }
    //     const typeShipping = shippingMethods.find(
    //         (shippingMethod) => shippingMethod.shippingMethodId === Number(user.paymentMethodId),
    //     );
    //     return typeShipping.price;
    // }, [shippingMethods, user]);

    return (
        <>
            <div className="order_wrapper">
                <div className="address-form__group address-scroll">
                    <label className="address-form__label">Địa chỉ nhận hàng:</label>
                    {addressDefault
                        ? addresses.map((address) => {
                              return (
                                  <div
                                      className={address.addressId !== chooseAddressId ? 'address-checked' : ''}
                                      onClick={() => {
                                          setChooseAddressId(address.addressId);
                                      }}
                                      key={address.addressId}
                                  >
                                      <div className="address_checkbox-radio">
                                          <input
                                              onChange={() => {
                                                  setChooseAddressId(address.addressId);
                                              }}
                                              checked={address.addressId === chooseAddressId}
                                              type="radio"
                                          />
                                          <p className="address-name">{`${address.fullName}  `}</p>
                                      </div>
                                      <p className="address-phone">{address.phoneNumber}</p>
                                      <p className="address">
                                          {' '}
                                          {`${address.addressLine} ${address.ward} ${address.district} ${address.city}`}
                                      </p>
                                  </div>
                              );
                          })
                        : false}
                    {/* { } */}
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
                                                ,
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
                        onChange={handleChangePaymentMethod}
                        type="text"
                        name="provider"
                        placeholder="Card"
                        required=""
                        className="address-form__input"
                    >
                        <option value="0">Thanh toán khi nhận hàng</option>
                        {user.paymentMethods.map((pm) => {
                            return (
                                <option key={pm.paymentMethodId} value={pm.paymentMethodId}>
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
                        onChange={handleShippingMethod}
                        type="text"
                        name="provider"
                        placeholder="Card"
                        required=""
                        className="address-form__input"
                    >
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
