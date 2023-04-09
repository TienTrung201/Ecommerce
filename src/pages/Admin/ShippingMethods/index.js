import { api } from '@/api';
import { getData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Pagination } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShippingMethods() {
    const [shippingMethods, setShippingMethods] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getData(api.shippingMethods)
            .then((response) => {
                console.log(response);
                setShippingMethods(response);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
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
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'm-0')}>Tất cả đơn vị vận chuyển</h4>
                        <Link
                            to="/admin/shipping-methods/create/0"
                            className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}
                        >
                            Thêm vận chuyển
                        </Link>
                    </div>

                    <div className={cx('w-100', 'overflow-x-auto')}>
                        <table className={cx('table', 'table-hover', 'overflow-x-auto')}>
                            <thead>
                                <tr>
                                    <th>Tên đơn vị vận chuyển</th>
                                    <th>Giá cước</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shippingMethods.map((item) => (
                                    <tr
                                        onClick={() => {
                                            navigate(`/admin/shipping-methods/update/${item.shippingMethodId}`);
                                        }}
                                        className={cx('pointer')}
                                        key={item.shippingMethodId}
                                    >
                                        <td className={cx('py-1')}>{item.name}</td>
                                        <td>{item.price}đ</td>
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

export default ShippingMethods;
