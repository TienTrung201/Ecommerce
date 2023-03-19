import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faKey, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageUsers() {
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
                        <table className={cx('table', 'table-striped')}>
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
                                <tr>
                                    <td className={cx('py-1')}>
                                        <img src={images.faces.face1} alt="" />
                                    </td>
                                    <td>Xuân Phúc</td>
                                    <td>xuanphuc@xuanphuc.space</td>
                                    <td>
                                        <div style={{ maxWidth: 100, display: 'flex', flexDirection: 'column' }}>
                                            <Link to="/admin/manage-users/edit-roles" className={cx('mb-1')}>
                                                <Badge count={'Admin'} style={{ backgroundColor: '#52c41a' }} />
                                            </Link>
                                        </div>
                                    </td>
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
                                    <td className={cx('py-1')}>
                                        <img src={images.faces.face2} alt="" />
                                    </td>
                                    <td>Nguyễn Văn A</td>
                                    <td>abc@xuanphuc.space</td>
                                    <td>
                                        <div style={{ maxWidth: 100, display: 'flex', flexDirection: 'column' }}>
                                            <Link to="/admin/manage-users/edit-roles" className={cx('mb-1')}>
                                                <Badge count={'+ Thêm roles'} style={{ backgroundColor: '#52c41a' }} />
                                            </Link>
                                        </div>
                                    </td>
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

export default ManageUsers;
