import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Badge } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Promotions() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Chương trình khuyến mãi </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Chương trình khuyến mãi
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả khuyến mãi</h4>
                        <Link to="/admin/promotions/create" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
                            Tạo khuyến mãi
                        </Link>
                    </div>

                    <table className={cx('table', 'table-striped', 'overflow-x-auto')}>
                        <thead>
                            <tr>
                                <th> Khuyến mãi </th>
                                <th> Giảm giá </th>
                                <th> Trạng thái </th>
                                <th> Ngày bắt đầu </th>
                                <th> Ngày kết thúc </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('py-1')}>DISCOUNT10%</td>
                                <td> 10% </td>
                                <td>
                                    <Badge count={true ? 'Đang áp dụng' : 0} style={{ backgroundColor: '#52c41a' }} />
                                </td>
                                <td> May 15, 2015 </td>
                                <td> May 15, 2015 </td>
                            </tr>
                            <tr>
                                <td className={cx('py-1')}>DISCOUNT20</td>
                                <td> 20% </td>
                                <td>
                                    <Badge count={true ? 'Đang áp dụng' : 0} style={{ backgroundColor: '#52c41a' }} />
                                </td>
                                <td> July 1, 2015 </td>
                                <td> July 1, 2015 </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Promotions;
