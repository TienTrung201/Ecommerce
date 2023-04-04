import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faKey, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Danh sách người dùng </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Người dùng</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả người dùng</h4>
                        <Link to="" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
                            Thêm người dùng
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
                                                className={cx('d-flex', 'flex-column', 'pointer')}
                                            >
                                                {item?.roles?.map((role) => (
                                                    <span className={cx('badge', 'badge-info', 'mb-1')}>
                                                        {role.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className={cx('text-center')}>
                                            <button
                                                className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon')}
                                                title="Đặt lại mật khẩu"
                                            >
                                                <FontAwesomeIcon icon={faKey} />
                                            </button>
                                            <button
                                                className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon', 'ms-2')}
                                                title="Xóa"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
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
