import Validator from '@/Validator/Validator';
import { api } from '@/api';
import { deleteData, getData, postData, updateData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditRoles() {
    const [roleNameInput, setRoleNameInput] = useState('');

    const [roleNameError, setRoleNameError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { action, id } = useParams();

    useEffect(() => {
        if (action === 'update') {
            getData(api.roles + '/' + id)
                .then((response) => {
                    console.log(response);

                    const data = response.data;

                    setRoleNameInput(data.name);
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }, [action, id]);

    // ---------- Handle validate input ----------
    const handleValidateRoleName = () => {
        const isValidate = Validator({
            setErrorMessage: setRoleNameError,
            rules: [Validator.isRequired(roleNameInput, 'Bạn chưa nhập tên vai trò')],
        });

        return isValidate;
    };
    // ---------- Handle validate input ----------

    // ---------- Handle input change ----------
    const handleRoleNameInputChange = (e) => {
        setRoleNameInput(e.target.value);
        setRoleNameError('');
    };
    // ---------- End Handle input change ----------

    // ---------- Handle create ----------
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: roleNameInput,
        };

        if (handleValidateRoleName()) {
            dispatch(notificationsSlice.actions.showLoading('Đang tạo role'));

            postData(api.roles, data)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Tạo role thành công'));
                        navigate('/admin/manage-roles');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Tạo role không thành công'));
                });
        }
    };
    // ---------- End Handle create ----------

    // ---------- Handle update ----------
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: roleNameInput,
        };

        if (handleValidateRoleName()) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            updateData(api.roles + '/' + id, data)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        navigate('/admin/manage-roles');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
                });
        }
    };
    // ---------- End Handle update ----------

    // ---------- Handle delete ----------
    const handleDelete = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xóa'));

        deleteData(api.roles + '/' + id)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    navigate('/admin/manage-roles');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Xóa thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
            });
    };
    // ---------- End Handle delete ----------

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>
                    {action === 'update' ? 'Cập nhật vai trò' : 'Thêm mới vai trò'}
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/manage-roles">Vai trò</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>
                            {action === 'update' ? 'Cập nhật vai trò' : 'Thêm vai trò'}
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Vai trò</h4>
                            <p className={cx('card-description')}></p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên vai trò</label>
                                    <input
                                        onChange={handleRoleNameInputChange}
                                        onBlur={handleValidateRoleName}
                                        value={roleNameInput}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên vai trò"
                                    />
                                    <span className={cx('text-danger', 'fs-14')}>{roleNameError}</span>
                                </div>

                                <div>
                                    {action === 'update' ? (
                                        <>
                                            <button
                                                onClick={handleUpdate}
                                                className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                            >
                                                Cập nhật
                                            </button>

                                            <Popconfirm
                                                title="Xóa khuyến mãi"
                                                description="Bạn có chắc chắn muốn xóa vai trò?"
                                                onConfirm={handleDelete}
                                                okText="Xóa"
                                                cancelText="Hủy"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    className={cx('btn', 'btn-inverse-danger', 'me-2')}
                                                >
                                                    Xoá
                                                </button>
                                            </Popconfirm>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                        >
                                            Tạo vai trò
                                        </button>
                                    )}

                                    <Link to="/admin/manage-roles" className={cx('btn', 'btn-light')}>
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
                            <h4 className={cx('card-title', 'm-0')}>Mô tả</h4>
                            <p className={cx('card-description')}>Roles description</p>
                        </div>
                    </div>
                </div>
                {/* End Right bar */}
            </div>
        </>
    );
}

export default EditRoles;
