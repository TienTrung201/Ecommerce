import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import * as Unicons from '@iconscout/react-unicons';
import { Pagination } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData(api.users)
            .then((response) => {
                console.log(response);
                setUsers(response.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Khách hàng</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Khách hàng</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0', 'mt-0')}>Tất cả khách hàng</h4>
                        <Link to="" className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}>
                            Thêm khách hàng
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th> Ảnh </th>
                                    <th> Tên người dùng </th>
                                    <th> Số điện thoại </th>
                                    <th> Email </th>
                                    <th> Hành động </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item) => (
                                    <tr key={item.userId}>
                                        <td className={cx('py-1')}>
                                            <img src={item.avatar || images.placeholder} alt="" />
                                        </td>
                                        <td>{item.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>{'-'}</td>
                                        <td className={cx('')}>
                                            <button
                                                className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon')}
                                                title="Đặt lại mật khẩu"
                                            >
                                                {/* <FontAwesomeIcon icon={faKey} /> */}
                                                <Unicons.UilKeySkeletonAlt size="18" />
                                            </button>
                                            <button
                                                className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon', 'ms-2')}
                                                title="Xóa"
                                            >
                                                {/* <FontAwesomeIcon icon={faTrash} /> */}
                                                <Unicons.UilTrash size="18" />
                                            </button>
                                        </td>
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

export default ManageUsers;
