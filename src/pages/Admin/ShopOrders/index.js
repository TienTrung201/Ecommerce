import { api } from '@/api';
import { getData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Pagination } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShopOrders() {
    const [shopOrders, setShopOrders] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([getData(api.shopOrders), getData(api.orderStatuses)])
            .then((response) => {
                console.log(response);
                setShopOrders(response[0].data);
                setOrderStatuses(response[1].data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    const getCurrentStatus = useCallback(
        (shopOrder) => {
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

            return {
                className: className,
                name: orderStatus?.name || 'N/A',
            };
        },
        [orderStatuses],
    );

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Đơn hàng</h3>
                <nav>
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Đơn hàng</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'm-0')}>Tất cả đơn hàng</h4>
                        <Link to="/admin/orders" className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}>
                            Tạo đơn hàng
                        </Link>
                    </div>

                    <div className={cx('w-100', 'overflow-x-auto')}>
                        <table className={cx('table', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th>Đơn hàng</th>
                                    <th>Ngày đặt</th>
                                    <th>Khách hàng</th>
                                    <th>Thanh toán</th>
                                    <th>Giao hàng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shopOrders.map((shopOrder) => (
                                    <tr
                                        key={shopOrder.orderId}
                                        className={cx('pointer')}
                                        onClick={() => {
                                            navigate(`/admin/orders/detail/${shopOrder.orderId}`);
                                        }}
                                    >
                                        <td className={cx('py-1')}>#{shopOrder.orderId}</td>
                                        <td>{dayjs(shopOrder.orderDate).format('DD/MM/YYYY HH:MM')}</td>
                                        <td>{shopOrder?.address?.fullName || 'N/A'}</td>
                                        <td>
                                            <span className={cx('badge', 'badge-light', 'm-1')}>Đã thanh toán</span>
                                        </td>
                                        <td>
                                            <span
                                                className={cx(
                                                    'badge',
                                                    `${getCurrentStatus(shopOrder).className}`,
                                                    'm-1',
                                                )}
                                            >
                                                {getCurrentStatus(shopOrder).name}
                                            </span>
                                        </td>
                                        <td>{shopOrder.orderTotal}đ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paging */}
                    <div className={cx('mt-5', 'd-flex', 'justify-content-end')}>
                        <Pagination current={1} onChange={(page, pageSize) => {}} total={1} size="small" simple />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopOrders;
