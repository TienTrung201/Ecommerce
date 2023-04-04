import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from 'antd';
import { getData } from '@/api/service';
import { api } from '@/api';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function Promotions() {
    const [promotions, setPromotions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getData(api.promotions).then((data) => {
            console.log(data);
            setPromotions(data);
        });
    }, []);

    const renderPromotions = useMemo(() => {
        const dateNow = new Date();

        return promotions.map((promotion) => {
            let status = '';
            if (dateNow > new Date(promotion.endDate)) {
                status = 'expired';
            } else if (dateNow < new Date(promotion.startDate)) {
                status = 'comming';
            } else {
                status = 'active';
            }
            return (
                <tr
                    onClick={() => {
                        navigate(`/admin/promotions/update/${promotion.promotionId}`);
                    }}
                    className={cx('pointer')}
                    key={promotion.promotionId}
                >
                    <td className={cx('py-1')}>{promotion.name}</td>
                    <td>{promotion.discountRate}%</td>
                    <td>
                        {status === 'active' ? (
                            <span className={cx('badge', 'badge-success')}>Đang áp dụng</span>
                        ) : status === 'expired' ? (
                            <span className={cx('badge', 'badge-light')}>Đã hết hạn</span>
                        ) : (
                            <span className={cx('badge', 'badge-warning')}>Chưa áp dụng</span>
                        )}
                    </td>
                    <td>{dayjs(promotion.startDate).format('DD/MM/YYYY')}</td>
                    <td>{dayjs(promotion.endDate).format('DD/MM/YYYY')}</td>
                </tr>
            );
        });
    }, [promotions]);

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
                        <Link to="/admin/promotions/create/0" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
                            Tạo khuyến mãi
                        </Link>
                    </div>

                    <table className={cx('table', 'table-hover', 'overflow-x-auto')}>
                        <thead>
                            <tr>
                                <th> Khuyến mãi </th>
                                <th> Giảm giá </th>
                                <th> Trạng thái </th>
                                <th> Ngày bắt đầu </th>
                                <th> Ngày kết thúc </th>
                            </tr>
                        </thead>
                        <tbody>{renderPromotions}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Promotions;
