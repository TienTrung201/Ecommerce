import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Badge } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShopOrders() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}>Đơn hàng</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Đơn hàng
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả đơn hàng</h4>
                        <Link to="/admin/orders" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
                            Tạo đơn hàng
                        </Link>
                    </div>

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
                            <tr>
                                <td className={cx('py-1')}>#DH001</td>
                                <td>May 15, 2015</td>
                                <td>Xuân Phúc</td>
                                <td>
                                    <Badge count={'Đã thanh toán'} style={{ backgroundColor: '#c3bdbd' }} />
                                </td>
                                <td>
                                    <Badge count={'Đang vận chuyển'} style={{ backgroundColor: '#1bcfb4' }} />
                                </td>
                                <td>500.000đ</td>
                            </tr>
                            <tr>
                                <td className={cx('py-1')}>#DH002</td>
                                <td>May 15, 2015</td>
                                <td>Nguyễn Văn A</td>
                                <td>
                                    <Badge count={'Đã thanh toán'} style={{ backgroundColor: '#c3bdbd' }} />
                                </td>
                                <td>
                                    <Badge
                                        count={'Chưa vận chuyển'}
                                        style={{ backgroundColor: '#fed713', color: '#333' }}
                                    />
                                </td>
                                <td>500.000đ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ShopOrders;
