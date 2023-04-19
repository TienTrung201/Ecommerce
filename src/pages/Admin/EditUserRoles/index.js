import { api } from '@/api';
import { getData, updateData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditUserRoles() {
    const [roles, setRoles] = useState([]);
    const [adminUser, setAdminUser] = useState({});
    const [rolesInput, setRolesInput] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // --------- Get data ---------
    useEffect(() => {
        Promise.all([getData(api.adminAccount + `/${id}`), getData(api.roles)])
            .then((response) => {
                console.log(response);
                setAdminUser(response[0]?.data);
                setRolesInput(response[0]?.data?.roles?.map((item) => item.roleId));
                setRoles(response[1]?.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, [id]);
    // --------- End Get data ---------

    // --------- Handle input change ---------
    const handleRolesInputChange = (values) => {
        setRolesInput(values);
    };
    // --------- End Handle input change ---------

    // --------- Handle submit ---------
    const handleSubmit = (e) => {
        e.preventDefault();

        const adminRoles = rolesInput.map((item) => {
            return {
                roleId: item,
                name: '000',
            };
        });

        const data = adminUser;
        data.roles = adminRoles;
        data.password = '000';

        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

        updateData(api.adminAccount + `/${id}`, data)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                    navigate('/admin/manage-admins');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
            });
    };
    // --------- End Handle submit ---------

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Phân quyền</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/manage-admins">Quản trị viên</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>Phân quyền</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'mt-0', 'mb-5')}>Phân quyền</h4>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Vai trò</label>
                                    <Select
                                        onChange={handleRolesInputChange}
                                        value={rolesInput}
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Chọn vai trò"
                                        options={roles.map((item) => ({
                                            label: item.name,
                                            value: item.roleId,
                                        }))}
                                    />
                                </div>

                                <div>
                                    <button
                                        onClick={handleSubmit}
                                        className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                    >
                                        Phân quyền
                                    </button>
                                    <Link to="/admin/manage-admins" className={cx('btn', 'btn-light')}>
                                        Hủy
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right bar */}
                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'mb-0', 'mt-0')}>Mô tả</h4>
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
