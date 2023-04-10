import { api } from '@/api';
import { getData, updateData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import * as Unicons from '@iconscout/react-unicons';
import { Divider, Popconfirm, Timeline } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShopOrdersDetail() {
    const [shopOrder, setShopOrder] = useState({});
    const [orderAddress, setOrderAddress] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);

    const [toggleStatus, setToggleStatus] = useState('pending');

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([getData(api.shopOrders + '/' + id), getData(api.shippingMethods), getData(api.orderStatuses)])
            .then((response) => {
                // console.log(response);
                setShopOrder(response[0].data);
                setOrderAddress(response[0].data.address);
                setOrderItems(response[0].data.items);

                // Order statuses
                setOrderStatuses(response[2].data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, [id, toggleStatus]);

    const currentStatus = useMemo(() => {
        const orderStatus = orderStatuses.find((os) => os.orderStatusId === shopOrder.orderStatusId);

        let className = '';
        switch (orderStatus?.status) {
            case 'created':
                className = 'badge-warning';
                break;
            case 'delivery':
                className = 'badge-info';
                break;
            case 'canceled':
                className = 'badge-light';
                break;
            default:
                className = 'badge-info';
                break;
        }
        console.log({
            className: className,
            status: orderStatus?.status,
            name: orderStatus?.name || 'N/A',
        });

        return {
            className: className,
            status: orderStatus?.status,
            name: orderStatus?.name || 'N/A',
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

    console.log(orderItems);

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
                <p>{dayjs(shopOrder.orderDate).format('DD/MM/YYYY HH:MM')}</p>
            </div>
            <div className={cx('row', 'gx-4', 'gy-4')}>
                <div className={cx('col-md-8')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            {/* Card title */}
                            <h4 className={cx('card-title')}>
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
                                                    <p className={cx('mb-0', 'small')}>{item.product.name}</p>
                                                    <p className={cx('mb-0', 'small')}>25cm / Xanh</p>
                                                    <p className={cx('mb-0', 'small')}>
                                                        SKU: {item?.product?.items[0]?.sku || 'N/A'}
                                                    </p>
                                                </td>
                                                <td className={cx('py-1')}>
                                                    <p
                                                        className={cx(
                                                            'mb-0',
                                                            'fs-12',
                                                            'text-decoration-line-through',
                                                            'text-secondary',
                                                        )}
                                                    >
                                                        {item.price}đ
                                                    </p>
                                                    <p className={cx('mb-0', 'fs-14')}>
                                                        {item.price - (item.price * item.discountRate) / 100}đ x{' '}
                                                        {item.qty}
                                                    </p>
                                                </td>
                                                <td className={cx('py-1', 'pe-0', 'text-end')}>
                                                    {(item.price - (item.price * item.discountRate) / 100) * item.qty}đ
                                                </td>
                                            </tr>
                                        ))}
                                        {/* End order items */}

                                        {/* Order total */}
                                        <tr>
                                            <td
                                                className={cx('py-1', 'ps-0', 'border-hide', 'vertical-align-top')}
                                            ></td>
                                            <td className={cx('py-1', 'border-hide')}></td>
                                            <td className={cx('py-1', 'pt-5', 'border-hide')}>Tổng tiền</td>
                                            <td className={cx('py-1', 'pt-5', 'pe-0', 'border-hide', 'text-end')}>
                                                {orderItems.reduce((total, item) => {
                                                    return (
                                                        total +
                                                        (item.price - (item.price * item.discountRate) / 100) * item.qty
                                                    );
                                                }, 0)}
                                                đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className={cx('py-1', 'ps-0', 'border-hide', 'vertical-align-top')}
                                            ></td>
                                            <td className={cx('py-1', 'border-hide')}></td>
                                            <td className={cx('py-1', 'border-hide')}>Khuyến mãi</td>
                                            <td className={cx('py-1', 'pe-0', 'border-hide', 'text-end')}>0đ</td>
                                        </tr>
                                        <tr>
                                            <td
                                                className={cx('py-1', 'ps-0', 'border-hide', 'vertical-align-top')}
                                            ></td>
                                            <td className={cx('py-1', 'border-hide')}></td>
                                            <td className={cx('py-1', 'border-hide')}>
                                                <p className={cx('mb-0', 'fs-14')}>Vận chuyển</p>
                                            </td>
                                            <td className={cx('py-1', 'pe-0', 'border-hide', 'text-end')}>
                                                {shopOrder.shippingCost}đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={cx('py-1', 'border-hide')}></td>
                                            <td className={cx('py-1', 'border-hide')}></td>
                                            <td className={cx('py-1', 'border-hide', 'fw-semibold')}>Thành tiền</td>
                                            <td
                                                className={cx('py-1', 'pe-0', 'border-hide', 'text-end', 'fw-semibold')}
                                            >
                                                {shopOrder.orderTotal}đ
                                            </td>
                                        </tr>
                                        {/* End Order total */}
                                    </tbody>
                                </table>
                            </div>
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
                                            <Unicons.UilCheckCircle size="20" className={cx('text-success', 'fs-13')} />
                                        )}
                                    </>
                                    <p className={cx('mb-0', 'ms-2', 'fs-13', 'font-weight-bold', 'text-uppercase')}>
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
                                                currentStatus.status === 'delivery' ? 'text-success' : 'text-secondary'
                                            }`,
                                            'fs-5',
                                        )}
                                    />
                                    <p className={cx('mb-0', 'ms-2', 'fs-13', 'font-weight-bold', 'text-uppercase')}>
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

                    <div className={cx('card', 'shadow-sm', 'mt-4')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Trạng thái đơn hàng</h4>
                            {/* <p className={cx('card-description')}>Không có khách hàng</p> */}

                            <Timeline
                                className={cx('mt-5')}
                                items={[
                                    {
                                        children: 'Đã giao cho đơn vị vận chuyển 2023-09-01',
                                    },
                                    {
                                        children: 'Đang chuẩn bị 2023-09-01',
                                    },
                                    {
                                        children: 'Đã thanh toán 2023-09-01',
                                    },
                                    {
                                        children: 'Đã đặt hàng 2023-09-01',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('col-md-4')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Khách hàng</h4>
                            <p className={cx('card-description')}>Không có khách hàng</p>

                            <Divider />

                            <div>
                                <p className={cx('h6')}>Liên hệ</p>
                                <div>
                                    <p className={cx('text-secondary', 'small', 'mb-0')}>Không có liên hệ</p>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <p className={cx('h6')}>Địa chỉ giao hàng</p>
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
                            </div>

                            <Divider />

                            <div>
                                <p className={cx('h6')}>Thông tin mua hàng</p>
                                <div>
                                    <p className={cx('text-secondary', 'small', 'mb-0')}>Không có thông tin mua hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopOrdersDetail;
