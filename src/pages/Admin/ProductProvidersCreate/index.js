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

function ProductProviderCreate() {
    const [providerNameInput, setProviderNameInput] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { action, id } = useParams();

    useEffect(() => {
        if (action === 'update') {
            getData(api.providers + '/' + id)
                .then((response) => {
                    console.log(response);
                    setProviderNameInput(response.name);
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }, [action, id]);

    // ---------- Handle input change ----------
    const handleProviderNameInputChange = (e) => {
        setProviderNameInput(e.target.value);
    };
    // ---------- End Handle input change ----------

    // ---------- Handle create ----------
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: providerNameInput,
        };

        if (providerNameInput) {
            dispatch(notificationsSlice.actions.showLoading('Đang thêm nhà cung cấp'));

            postData(api.providers, data)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Thêm thành công'));
                        navigate('/admin/providers');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Thêm không thành công'));
                });
        } else {
            dispatch(notificationsSlice.actions.showError('Thêm không thành công'));
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        }
    };
    // ---------- End Handle create ----------

    // ---------- Handle update ----------
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: providerNameInput,
        };

        if (providerNameInput) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            updateData(api.providers + '/' + id, data)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        navigate('/admin/providers');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
                });
        } else {
            dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        }
    };
    // ---------- End Handle update ----------

    // ---------- Handle delete ----------
    const handleDelete = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xóa'));

        deleteData(api.providers + '/' + id)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    navigate('/admin/providers');
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
                    {action === 'update' ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp'}
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/providers">Nhà cung cấp</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>
                            {action === 'update' ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp'}
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Nhà cung cấp</h4>
                            <p className={cx('card-description')}></p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên nhà cung cấp</label>
                                    <input
                                        onChange={handleProviderNameInputChange}
                                        value={providerNameInput}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên nhà cung cấp"
                                    />
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
                                                description="Bạn có chắc chắn muốn xóa nhà cung cấp?"
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
                                            Thêm nhà cung cấp
                                        </button>
                                    )}

                                    <Link to="/admin/providers" className={cx('btn', 'btn-light')}>
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
                            <p className={cx('card-description')}>Provider description</p>
                        </div>
                    </div>
                </div>
                {/* End Right bar */}
            </div>
        </>
    );
}

export default ProductProviderCreate;
