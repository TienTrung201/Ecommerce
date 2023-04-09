import { api } from '@/api';
import { getData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Badge, Pagination } from 'antd';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShopOrders() {
    const [shopOrders, setShopOrders] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);

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
                        <table className={cx('table', 'table-striped', 'overflow-x-auto')}>
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
                                    <tr key={shopOrder.orderId}>
                                        <td className={cx('py-1')}>
                                            <Link to={`/admin/orders/detail/${shopOrder.orderId}`}>
                                                #{shopOrder.orderId}
                                            </Link>
                                        </td>
                                        <td>{dayjs(shopOrder.orderDate).format('YYYY/MM/DD HH:MM')}</td>
                                        <td>{shopOrder.userId}</td>
                                        <td>
                                            <Badge count={'Đã thanh toán'} style={{ backgroundColor: '#c3bdbd' }} />
                                        </td>
                                        <td>
                                            <Badge
                                                count={
                                                    orderStatuses.find(
                                                        (os) => os.orderStatusId === shopOrder.orderStatusId,
                                                    )?.status || 'N/A'
                                                }
                                                style={{
                                                    backgroundColor:
                                                        shopOrder.orderStatusId === 1
                                                            ? '#fed713'
                                                            : shopOrder.orderStatusId === 2
                                                            ? '#1bcfb4'
                                                            : '#c3bdbd',
                                                }}
                                            />
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
