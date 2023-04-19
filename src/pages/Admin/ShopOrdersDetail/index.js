import { api } from '@/api';
import { getData, updateData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import currencyConvert from '@/service/currencyConvert';
import * as Unicons from '@iconscout/react-unicons';
import { Divider, Popconfirm, Spin, Timeline } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShopOrdersDetail() {
    const [loading, setLoading] = useState(false);

    const [shopOrder, setShopOrder] = useState({});
    const [orderUser, setOrderUser] = useState({});
    const [orderAddress, setOrderAddress] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderPayment, setOrderPayment] = useState({});

    const [orderStatuses, setOrderStatuses] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    const [toggleStatus, setToggleStatus] = useState('pending');

    const { id } = useParams();

    const dispatch = useDispatch();

    // Get data
    useEffect(() => {
        setLoading(true);

        Promise.all([getData(api.shopOrders + '/' + id), getData(api.orderStatuses), getData(api.productOptions)])
            .then((response) => {
                console.log(response);

                setShopOrder(response[0].data);
                setOrderAddress(response[0].data.address);
                setOrderUser(response[0].data.user);
                setOrderItems(response[0].data.items);
                setOrderPayment(response[0].data.paymentMethod);

                // Order statuses
                setOrderStatuses(response[1].data);

                // Product options
                setProductOptions(response[2].data);

                // Disable loading
                setTimeout(() => {
                    setLoading(false);
                }, 400);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, [id, toggleStatus]);

    // Get current order status
    const currentStatus = useMemo(() => {
        const orderStatus = orderStatuses.find((os) => os.orderStatusId === shopOrder?.orderStatusId);

        let className = '';
        let timeline = [
            {
                children: 'Đã tạo đơn hàng',
            },
        ];

        if (shopOrder.paymentMethodId) {
            timeline = [...timeline, { children: 'Đã thanh toán' }];
        }

        switch (orderStatus?.status) {
            case 'created':
                className = 'badge-warning';
                break;
            case 'delivery':
                className = 'badge-info';
                timeline = [...timeline, { children: 'Đang giao hàng' }];
                break;
            case 'canceled':
                className = 'badge-light';
                timeline = [...timeline, { children: 'Đã huỷ đơn hàng', color: 'gray' }];
                break;
            case 'success':
                className = 'badge-success';
                timeline = [
                    ...timeline,
                    { children: 'Đang giao hàng' },
                    { children: 'Giao hàng thành công', color: 'green' },
                ];
                break;
            default:
                className = 'badge-info';
                break;
        }

        return {
            className,
            status: orderStatus?.status,
            name: orderStatus?.name || 'N/A',
            timeline,
        };
    }, [orderStatuses, shopOrder]);

    // ---------- Cancel order ----------
    const handleCancelOrder = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang huỷ đơn hàng'));
        updateData(api.shopOrders + `/cancel/${id}`)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Huỷ đơn thành công'));
                    setToggleStatus('cancel');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Huỷ đơn thất bại'));
            });
    };

    // ---------- Order delivery  ----------
    const handleDeliveryOrder = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xác nhận giao hàng'));
        updateData(api.shopOrders + `/delivery/${id}`)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Đã xác nhận giao hàng'));
                    setToggleStatus('delivery');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Xác nhận giao hàng thất bại'));
            });
    };

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mb-0', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Chi tiết đơn hàng #{shopOrder.orderId}</h3>
                <nav>
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/orders">Đơn hàng</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>Chi tiết đơn hàng</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('page-header', 'align-middle')}>
                <p>{dayjs(shopOrder.orderDate).utcOffset(7).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm')}</p>
            </div>

            <Spin spinning={loading}>
                <div className={cx('row', 'gx-4', 'gy-4')}>
                    <div className={cx('col-md-8')}>
                        <div className={cx('card', 'shadow-sm')}>
                            <div className={cx('card-body')}>
                                {/* Card title */}
                                <h4 className={cx('card-title', 'mt-0')}>
                                    Chi tiết đơn hàng
                                    <span className={cx('badge', `${currentStatus.className}`, 'm-1', 'ms-2')}>
                                        {currentStatus.name}
                                    </span>
                                </h4>
                                {/* End card title */}

                                <Divider className={cx('mb-0')} />
                                <div className={cx('w-100', 'overflow-x-auto')}>
                                    <table className={cx('table')}>
                                        <tbody>
                                            {/* Order items */}
                                            {orderItems.map((item) => (
                                                <tr key={item.orderItemId}>
                                                    <td className={cx('py-1', 'ps-0', 'vertical-align-top')}>
                                                        <img
                                                            style={{ width: 42, height: 42 }}
                                                            className={cx('rounded', 'border')}
                                                            src={item?.product?.image || images.placeholder}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className={cx('py-1')}>
                                                        <p
                                                            style={{ minWidth: '220px' }}
                                                            className={cx('mb-0', 'fs-13', 'text-wrap')}
                                                        >
                                                            {item.product.name}
                                                        </p>
                                                        <p className={cx('mb-0', 'fs-13', 'text-secondary')}>
                                                            {productOptions
                                                                .reduce((result, po) => {
                                                                    const options = po.options.filter((o) =>
                                                                        item?.product?.items[0]?.optionsId?.includes(
                                                                            o.productOptionId,
                                                                        ),
                                                                    );
                                                                    result = [...result, ...options.map((i) => i.name)];

                                                                    return result;
                                                                }, [])
                                                                .join(' / ')}
                                                        </p>
                                                        <p className={cx('mb-0', 'fs-13', 'text-secondary')}>
                                                            SKU: {item?.product?.items[0]?.sku || 'N/A'}
                                                        </p>
                                                    </td>
                                                    <td className={cx('py-1')}>
                                                        <p className={cx('mb-0', 'fs-12', 'text-secondary')}>
                                                            {item.discountRate > 0 && (
                                                                <span className={cx('text-decoration-line-through')}>
                                                                    {currencyConvert(item.price, false)}
                                                                </span>
                                                            )}
                                                            {item.discountRate > 0 && (
                                                                <span className={cx('text-decoration-none')}>
                                                                    {' '}
                                                                    -{item.discountRate}%
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className={cx('mb-0', 'fs-14')}>
                                                            {currencyConvert(
                                                                item.price - (item.price * item.discountRate) / 100,
                                                                false,
                                                            )}{' '}
                                                            x {item.qty}
                                                        </p>
                                                    </td>
                                                    <td className={cx('py-1', 'pe-0', 'text-end')}>
                                                        {currencyConvert(
                                                            (item.price - (item.price * item.discountRate) / 100) *
                                                                item.qty,
                                                            false,
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {/* End order items */}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Order total */}
                                <div className={cx('w-100', 'mt-5')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col-md-6')}></div>
                                        <div className={cx('col-md-6')}>
                                            <div className={cx('row')}>
                                                <p className={cx('col-6', 'fs-14', 'text-start', 'mb-1')}>Tổng tiền</p>
                                                <p className={cx('col-6', 'fs-14', 'text-end', 'mb-1')}>
                                                    {currencyConvert(
                                                        orderItems.reduce((total, item) => {
                                                            return (
                                                                total +
                                                                (item.price - (item.price * item.discountRate) / 100) *
                                                                    item.qty
                                                            );
                                                        }, 0),
                                                    )}
                                                </p>
                                            </div>
                                            <div className={cx('row')}>
                                                <p className={cx('col-6', 'fs-14', 'text-start', 'mb-1')}>Khuyến mãi</p>
                                                <p className={cx('col-6', 'fs-14', 'text-end', 'mb-1')}>
                                                    {currencyConvert(0)}
                                                </p>
                                            </div>
                                            <div className={cx('row')}>
                                                <p className={cx('col-6', 'fs-14', 'text-start', 'mb-1')}>Vận chuyển</p>
                                                <p className={cx('col-6', 'fs-14', 'text-end', 'mb-1')}>
                                                    {currencyConvert(shopOrder.shippingCost)}
                                                </p>
                                            </div>
                                            <div className={cx('row')}>
                                                <p
                                                    className={cx(
                                                        'col-6',
                                                        'fs-14',
                                                        'font-weight-bold',
                                                        'text-start',
                                                        'mb-0',
                                                    )}
                                                >
                                                    Thành tiền
                                                </p>
                                                <p
                                                    className={cx(
                                                        'col-6',
                                                        'fs-14',
                                                        'font-weight-bold',
                                                        'text-end',
                                                        'mb-0',
                                                    )}
                                                >
                                                    {currencyConvert(shopOrder.orderTotal)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Order total */}

                                <Divider />
                                <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                                    <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                                        <>
                                            {currentStatus.status === 'canceled' ? (
                                                <Unicons.UilTimesCircle
                                                    size="20"
                                                    className={cx('text-secondary', 'fs-13')}
                                                />
                                            ) : (
                                                <Unicons.UilCheckCircle
                                                    size="20"
                                                    className={cx('text-primary', 'fs-13')}
                                                />
                                            )}
                                        </>
                                        <p
                                            className={cx(
                                                'mb-0',
                                                'ms-2',
                                                'fs-13',
                                                'font-weight-bold',
                                                'text-uppercase',
                                            )}
                                        >
                                            {currentStatus.status === 'canceled'
                                                ? 'Đã huỷ đơn'
                                                : 'Đơn hàng đã xác nhận thanh toán'}
                                        </p>
                                    </div>
                                    <Popconfirm
                                        title="Xác nhận huỷ đơn"
                                        description="Bạn chắc chắn muốn huỷ đơn?"
                                        onConfirm={handleCancelOrder}
                                        okText="Xác nhận"
                                        cancelText="Huỷ"
                                    >
                                        <button
                                            style={{ minWidth: '106px' }}
                                            className={cx('btn', 'btn-light', {
                                                disabled: currentStatus.status === 'canceled',
                                            })}
                                        >
                                            Hoàn trả
                                        </button>
                                    </Popconfirm>
                                </div>

                                <Divider className={cx('mt-4', 'mb-4')} />

                                <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                                    <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                                        <Unicons.UilTruck
                                            size="20"
                                            className={cx(
                                                `${
                                                    currentStatus.status === 'delivery'
                                                        ? 'text-primary'
                                                        : 'text-secondary'
                                                }`,
                                                'fs-5',
                                            )}
                                        />
                                        <p
                                            className={cx(
                                                'mb-0',
                                                'ms-2',
                                                'fs-13',
                                                'font-weight-bold',
                                                'text-uppercase',
                                            )}
                                        >
                                            {currentStatus.status === 'delivery' ? 'Đang giao hàng' : 'Giao hàng'}
                                        </p>
                                    </div>
                                    <Popconfirm
                                        title="Xác nhận giao hàng"
                                        description="Bạn chắc chắn muốn giao hàng?"
                                        onConfirm={handleDeliveryOrder}
                                        okText="Xác nhận"
                                        cancelText="Huỷ"
                                    >
                                        <button
                                            className={cx('btn', 'btn-gradient-primary', {
                                                disabled: currentStatus.status === 'delivery',
                                            })}
                                        >
                                            Giao hàng
                                        </button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>

                        {/* Order status */}
                        <div className={cx('card', 'shadow-sm', 'mt-4')}>
                            <div className={cx('card-body')}>
                                <h4 className={cx('card-title', 'mt-0')}>Trạng thái đơn hàng</h4>

                                <Timeline items={currentStatus.timeline} reverse={true} className={cx('mt-5')} />
                            </div>
                        </div>
                        {/* End Order status */}
                    </div>

                    <div className={cx('col-md-4')}>
                        <div className={cx('card', 'shadow-sm')}>
                            <div className={cx('card-body')}>
                                <h4 className={cx('card-title', 'mt-0', 'mb-2')}>Khách hàng</h4>
                                {Object.keys(orderUser).length > 0 ? (
                                    <p className={cx('text-secondary', 'small', 'mb-0')}>{orderUser.fullName}</p>
                                ) : (
                                    <p className={cx('text-secondary', 'small', 'mb-0')}>Không có khách hàng</p>
                                )}

                                <Divider />

                                {/* User contact */}
                                <div>
                                    <p className={cx('h6')}>Liên hệ</p>
                                    {Object.keys(orderUser).length > 0 && (orderUser.email || orderUser.phoneNumber) ? (
                                        <>
                                            {orderUser.email && (
                                                <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                    {orderUser.email}
                                                </p>
                                            )}
                                            {orderUser.phoneNumber && (
                                                <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                    {orderUser.phoneNumber}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className={cx('text-secondary', 'small', 'mb-0')}>Không có liên hệ</p>
                                    )}
                                </div>
                                {/* End User contact */}

                                <Divider />

                                <div>
                                    <p className={cx('h6')}>Địa chỉ giao hàng</p>
                                    {shopOrder.addressId ? (
                                        <div>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                {orderAddress?.fullName || 'N/A'}
                                            </p>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                {orderAddress?.phoneNumber || 'N/A'}
                                            </p>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                {orderAddress?.addressLine || 'N/A'}
                                            </p>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                {orderAddress?.ward || 'N/A'}
                                            </p>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                {orderAddress?.district || 'N/A'}
                                            </p>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>
                                                {orderAddress?.city || 'N/A'}
                                            </p>
                                            <p className={cx('text-secondary', 'small', 'mb-0')}>Vietnam</p>
                                        </div>
                                    ) : (
                                        <p className={cx('text-secondary', 'small', 'mb-0')}>
                                            Không có địa chỉ giao hàng
                                        </p>
                                    )}
                                </div>

                                <Divider />

                                <div>
                                    <p className={cx('h6')}>Thông tin mua hàng</p>
                                    <div>
                                        <p className={cx('text-secondary', 'small', 'mb-0')}>
                                            {shopOrder.paymentMethodId
                                                ? `Thanh toán bằng ${orderPayment.provider}`
                                                : 'Thanh toán khi nhận hàng'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </>
    );
}

export default ShopOrdersDetail;
