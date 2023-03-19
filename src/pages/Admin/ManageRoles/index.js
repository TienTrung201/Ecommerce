import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faKey, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageRoles() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Danh sách vai trò </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Vai trò</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả vai trò</h4>
                        <Link
                            to="/admin/manage-roles/edit-roles"
                            className={cx('btn', 'btn-gradient-primary', 'btn-md')}
                        >
                            Tạo vai trò
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-striped')}>
                            <thead>
                                <tr>
                                    <th> Vai trò </th>
                                    <th> Hành động </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Admin</td>
                                    <td className={cx('text-center')}>
                                        <button
                                            className={cx('btn', 'btn-gradient-info', 'btn-rounded', 'btn-icon')}
                                            title="Đặt lại mật khẩu"
                                        >
                                            <FontAwesomeIcon icon={faKey} />
                                        </button>
                                        <button
                                            className={cx(
                                                'btn',
                                                'btn-gradient-danger',
                                                'btn-rounded',
                                                'btn-icon',
                                                'ms-2',
                                            )}
                                            title="Xóa"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Editor</td>
                                    <td className={cx('text-center')}>
                                        <button
                                            className={cx('btn', 'btn-gradient-info', 'btn-rounded', 'btn-icon')}
                                            title="Đặt lại mật khẩu"
                                        >
                                            <FontAwesomeIcon icon={faKey} />
                                        </button>
                                        <button
                                            className={cx(
                                                'btn',
                                                'btn-gradient-danger',
                                                'btn-rounded',
                                                'btn-icon',
                                                'ms-2',
                                            )}
                                            title="Xóa"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageRoles;
