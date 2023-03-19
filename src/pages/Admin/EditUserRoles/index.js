import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditUserRoles() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}>Phân quyền người dùng</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/manage-users">Danh sách người dùng</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Phân quyền
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Phân quyền</h4>
                            <p className={cx('card-description')}></p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Vai trò *</label>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Chọn vai trò"
                                        defaultValue={['a10', 'c12']}
                                        options={['a10', 'a11', 'a12', 'c10', 'c11', 'c12'].map((item) => ({
                                            label: item,
                                            value: item,
                                        }))}
                                    />
                                </div>

                                <div>
                                    <button className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'me-2')}>
                                        Thêm vai trò
                                    </button>
                                    <Link to="/admin/manage-users" className={cx('btn', 'btn-lg', 'btn-light')}>
                                        Hủy
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right bar */}
                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Mô tả các quyền</h4>
                            <p className={cx('card-description')}>Roles description</p>
                        </div>
                    </div>
                </div>
                {/* End Right bar */}
            </div>
        </>
    );
}

export default EditUserRoles;
