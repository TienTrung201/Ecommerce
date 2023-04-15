import { api } from '@/api';
import { getData } from '@/api/service';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userOrderSlice from './UserOrderSlice';
import { optionsSelector, userOrderSelector, userSelector } from '@/redux/selector';
import { convertVnd } from '@/components/GlobalStyles/fuction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';

function Order() {
    const dispatch = useDispatch();
    const dataOrder = useSelector(userOrderSelector);
    const optionItems = useSelector(optionsSelector);
    const user = useSelector(userSelector);
    const [orderStatus, setOrderStatus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(user.uid !== '');
        if (user.uid !== '') {
            getData(api.shopOrders + '/myorders')
                .then((response) => {
                    dispatch(userOrderSlice.actions.setDataOrder(response.data.reverse()));
                    setIsLoading(false);
                    console.log('my Order', response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [dispatch, user.uid]);
    useEffect(() => {
        getData(api.orderStatuses)
            .then((response) => {
                console.log('order Status', response);
                setOrderStatus(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="shopping-cart">
            <h3 className="address-list-title">Danh sách Đơn hàng</h3>
            {isLoading ? (
                <div style={{ paddingTop: '100px' }}>
                    <Loading />
                </div>
            ) : (
                <div className="table-responsive">
                    {dataOrder.length !== 0 ? (
                        dataOrder.map((order) => {
                            const status = orderStatus.find((status) => status.orderStatusId === order.orderStatusId);
                            return (
                                <div key={order.orderId} className="table cart-table">
                                    <div className="product-thumbnail">
                                        <p className="order-code">Mã đơn hàng: {order.orderId}</p>
                                        {orderStatus.length !== 0 ? (
                                            <p className="order-status">
                                                <i>
                                                    <FontAwesomeIcon icon={faTruckMoving} />
                                                </i>{' '}
                                                Trạng thái: {status.name}
                                            </p>
                                        ) : (
                                            false
                                        )}
                                    </div>

                                    <div>
                                        {order.items.map((item) => {
                                            return (
                                                <div key={item.orderItemId} className="cart-items-bytrung">
                                                    <div className="cart-img">
                                                        <img src={item.product.image} alt="" />
                                                    </div>
                                                    <div className="cart-info">
                                                        <h5 className="item-name">{item.product.name}</h5>
                                                        <p className="item-type">
                                                            Phân loại:{' '}
                                                            {item.product.items[0].optionsId.map(
                                                                (optionCurrentItem) => {
                                                                    const typeOption = optionItems.find(
                                                                        (o) => o.productOptionId === optionCurrentItem,
                                                                    );
                                                                    return typeOption.name + ' ';
                                                                },
                                                            )}
                                                        </p>
                                                        <span className="item-quantity">x{item.qty}</span>
                                                    </div>
                                                    {item.product.items[0].discountRate === 0 ? (
                                                        <div className="cart-total">
                                                            {convertVnd(item.product.items[0].price)}
                                                        </div>
                                                    ) : (
                                                        <div className="cart-total">
                                                            {convertVnd(
                                                                item.product.items[0].price -
                                                                    (item.product.items[0].price *
                                                                        item.product.items[0].discountRate) /
                                                                        100,
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <div className="cart-total-order">
                                            <div className="order-total-box">
                                                <p className="total-title">
                                                    {' '}
                                                    <i style={{ color: '#eb5050' }}>
                                                        <FontAwesomeIcon icon={faMoneyBillAlt} />
                                                    </i>{' '}
                                                    Thành tiền:
                                                </p>
                                                <p style={{ color: '#eb5050' }} className="total-price">
                                                    {convertVnd(order.orderTotal)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order__items-footer">
                                        <button className="order__items-btn feedback">
                                            <Link to="">Đánh giá</Link>
                                        </button>
                                        <button className="order__items-btn contact">
                                            <Link to="/contact">Liên hệ người bán</Link>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="empty-cart autoCenter">
                            <img src={require('@/assets/image/emptyCart.png')} alt="" />
                            <p>Chưa có đơn hàng</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Order;
