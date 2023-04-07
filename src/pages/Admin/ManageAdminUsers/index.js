import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import * as Unicons from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageAdminUsers() {
    const [adminUsers, setAdminUser] = useState([]);
    // test test test
    const navigate = useNavigate();

    useEffect(() => {
        getData(api.adminUsers)
            .then((response) => {
                console.log(response);
                setAdminUser(response.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Quản trị viên</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Quản trị viên</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0', 'mt-0')}>Tất cả quản trị viên</h4>
                        <Link to="" className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}>
                            Thêm quản trị viên
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th> Ảnh </th>
                                    <th> Tên người dùng </th>
                                    <th> Email </th>
                                    <th> Vai trò </th>
                                    <th> Hành động </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminUsers.map((item) => (
                                    <tr>
                                        <td className={cx('py-1')}>
                                            <img src={item.avatar || images.placeholder} alt="" />
                                        </td>
                                        <td>{item.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <div
                                                onClick={() => {
                                                    navigate(`/admin/manage-admins/edit-roles/${item.adminUserId}`);
                                                }}
                                                className={cx('pointer', 'text-wrap')}
                                            >
                                                {item?.roles?.map((role) => (
                                                    <span className={cx('badge', 'badge-info', 'm-1')}>
                                                        {role.name}
                                                    </span>
                                                ))}

                                                {item?.roles?.length === 0 && (
                                                    <span className={cx('badge', 'badge-info', 'm-1')}>
                                                        + Phân quyền
                                                    </span>
                                                )}
                                            </div>
                                        </td>
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
                </div>
            </div>
        </>
    );
}

export default ManageAdminUsers;
