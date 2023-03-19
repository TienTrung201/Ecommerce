import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShippingMethods() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Quản lý vận chuyển </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Quản lý vận chuyển
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả đơn vị vận chuyển</h4>
                        <Link
                            to="/admin/shipping-methods/create"
                            className={cx('btn', 'btn-gradient-primary', 'btn-md')}
                        >
                            Thêm đơn vị vận chuyển
                        </Link>
                    </div>

                    <table className={cx('table', 'table-striped', 'overflow-x-auto')}>
                        <thead>
                            <tr>
                                <th>Tên đơn vị vận chuyển</th>
                                <th>Giá cước</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('py-1')}>Giao hàng tiết kiệm</td>
                                <td>25.000đ</td>
                            </tr>
                            <tr>
                                <td className={cx('py-1')}>Giao hàng nhanh</td>
                                <td>25.000đ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ShippingMethods;
