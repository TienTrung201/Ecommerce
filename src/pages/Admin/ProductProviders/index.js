import { api } from '@/api';
import { getData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductProviders() {
    const [providers, setProviders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getData(api.providers)
            .then((response) => {
                console.log(response);
                setProviders(response);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}>Danh sách nhà cung cấp</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/products">Sản phẩm</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>Nhà cung cấp</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0', 'mt-0')}>Tất cả nhà cung cấp</h4>
                        <Link
                            to="/admin/providers/create/0"
                            className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}
                        >
                            Thêm nhà cung cấp
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên nhà cung cấp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {providers.map((item, index) => (
                                    <tr
                                        onClick={() => {
                                            navigate(`/admin/providers/update/${item.providerId}`);
                                        }}
                                        className={cx('pointer')}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductProviders;
