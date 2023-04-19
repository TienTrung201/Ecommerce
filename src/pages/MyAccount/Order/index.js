import { api } from '@/api';
import { getData, updateData } from '@/api/service';
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
import Modal from '@/components/Layout/Modal';
import ProductReviews from './productReviews';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';

function Order() {
    const dispatch = useDispatch();
    const dataOrder = useSelector(userOrderSelector);
    const optionItems = useSelector(optionsSelector);
    const user = useSelector(userSelector);
    const [orderStatus, setOrderStatus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [typeActionRating, setTypeActionRating] = useState('');
    //review product Items
    const handleChooseReviewOrderItems = (orderItems) => {
        setVisible(true);
        const orderItemReview = orderItems.reduce((acc, item) => {
            if (item.isReview) {
                return acc;
            }
            acc.push({ ...item, comment: '', title: '', ratingValue: 5 });
            return acc;
        }, []);
        setOrderItems(orderItemReview);
    };
    const handleChooseEditReviewOrderItems = (orderItems, orderId) => {
        setVisible(true);
        getData(api.myorderReview + `/${orderId}`)
            .then((response) => {
                console.log('orderId ', response.data);
                const newOrderItems = orderItems.reduce((acc, item) => {
                    if (!item.isReview) {
                        return acc;
                    }
                    const orderItem = response.data.find((orderItem) => item.orderItemId === orderItem.orderItemId);
                    if (orderItem) {
                        acc.push({
                            ...item,
                            title: orderItem.title,
                            comment: orderItem.comment,
                            ratingValue: orderItem.ratingValue,
                            reviewId: orderItem.reviewId,
                        });
                    }
                    return acc;
                }, []);
                setOrderItems(newOrderItems);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getDataMyOrder = () => {
        if (user.uid !== '') {
            getData(api.shopOrders + '/myorders')
                .then((response) => {
                    dispatch(userOrderSlice.actions.setDataOrder(response.data));
                    setIsLoading(false);
                    console.log('my Order', response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleSuccessDelivery = (id) => {
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        updateData(api.shopOrders + '/success/' + id)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess(''));
                    getDataMyOrder();
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log(response);
            })
            .catch((error) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Không thể cập nhật'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log(error);
            });
    };
    useEffect(() => {
        console.log(user.uid !== '');
        if (user.uid !== '') {
            getData(api.shopOrders + '/myorders')
                .then((response) => {
                    dispatch(userOrderSlice.actions.setDataOrder(response.data));
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
                console.log('order Status', response.data);
                setOrderStatus(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="shopping-cart">
            <Modal
                visible={visible}
                setVisible={setVisible}
                title={typeActionRating === 'edit' ? 'Xem đánh giá' : 'Đánh giá sản phẩm'}
            >
                {typeActionRating === 'edit' ? (
                    <ProductReviews
                        setVisible={setVisible}
                        dispatch={dispatch}
                        getDataMyOrder={getDataMyOrder}
                        setOrderItems={setOrderItems}
                        optionItems={optionItems}
                        orderItems={orderItems}
                        typeActionRating={typeActionRating}
                    />
                ) : (
                    false
                )}
                {typeActionRating === 'rating' ? (
                    <ProductReviews
                        setVisible={setVisible}
                        dispatch={dispatch}
                        getDataMyOrder={getDataMyOrder}
                        setOrderItems={setOrderItems}
                        optionItems={optionItems}
                        orderItems={orderItems}
                        typeActionRating={typeActionRating}
                    />
                ) : (
                    false
                )}
            </Modal>
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
                            const isReview = order.items.find((orderItem) => orderItem.isReview === false);
                            const seeReview = order.items.find((orderItem) => orderItem.isReview === true);
                            if (status === undefined) {
                                return false;
                            }
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
                                                                    if (typeOption) {
                                                                        return typeOption.name + ' ';
                                                                    }
                                                                    return false;
                                                                },
                                                            )}
                                                        </p>
                                                        <span className="item-quantity">x{item.qty}</span>
                                                    </div>
                                                    {item.discountRate === 0 ? (
                                                        <div className="cart-total">{convertVnd(item.price)}</div>
                                                    ) : (
                                                        <div className="cart-total">
                                                            {convertVnd(
                                                                item.price - (item.price * item.discountRate) / 100,
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
                                        {status.status === 'success' ? (
                                            <>
                                                {seeReview !== undefined ? (
                                                    <button
                                                        onClick={() => {
                                                            setTypeActionRating('edit');
                                                            handleChooseEditReviewOrderItems(
                                                                order.items,
                                                                order.orderId,
                                                            );
                                                        }}
                                                        className="order__items-btn feedback"
                                                    >
                                                        <Link to="">Xem đánh giá</Link>
                                                    </button>
                                                ) : (
                                                    false
                                                )}
                                                {isReview === undefined ? (
                                                    false
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setTypeActionRating('rating');
                                                            handleChooseReviewOrderItems(order.items);
                                                        }}
                                                        className="order__items-btn feedback"
                                                    >
                                                        <Link to="">Đánh giá</Link>
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {status.status === 'delivery' ? (
                                                    <button
                                                        onClick={() => {
                                                            handleSuccessDelivery(order.orderId);
                                                        }}
                                                        className="order__items-btn feedback"
                                                    >
                                                        <Link to="">Đã nhận được hàng</Link>
                                                    </button>
                                                ) : (
                                                    false
                                                )}
                                            </>
                                        )}

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
