import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { faCircleInfo, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { api } from '@/api';
import { deleteData, getData, postData, updateData } from '@/api/service';

const cx = classNames.bind(styles);

function ProductOptionsCreate() {
    const [typeNameInput, setTypeNameInput] = useState('');
    const [optionNameInput, setOptionNameInput] = useState('');
    const [optionValueInput, setOptionValueInput] = useState('');

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { action, id } = useParams();

    useEffect(() => {
        if (action === 'update') {
            getData(api.productOptions + '/' + id)
                .then((response) => {
                    console.log(response);
                    setTypeNameInput(response.name);
                    setOptions(response.options);
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }, [action, id]);

    // ---------- Handle input change ----------
    const handleTypeNameInputChange = (e) => {
        setTypeNameInput(e.target.value);
    };

    const handleOptionNameInputChange = (e) => {
        setOptionNameInput(e.target.value);
    };

    const handleOptionValueInputChange = (e) => {
        setOptionValueInput(e.target.value);
    };
    // ---------- End Handle input change ----------

    // ---------- Handle edit options ----------
    const handleAddOption = (e) => {
        e.preventDefault();

        if (optionNameInput && optionValueInput) {
            const option = {
                name: optionNameInput,
                value: optionValueInput,
            };

            setOptions((prev) => [...prev, option]);

            clearOptionInput();
        }
    };

    const handleRemoveOption = (removeIndex) => {
        const newOptions = options.filter((item, index) => index !== removeIndex);
        setOptions(newOptions);
    };

    const handleSelectOption = (optionSelected) => {
        setSelectedOption(optionSelected);

        setOptionNameInput(optionSelected?.name);
        setOptionValueInput(optionSelected?.value);
    };

    const handleUpdateOption = (e) => {
        e.preventDefault();

        if (optionNameInput && optionValueInput) {
            selectedOption.name = optionNameInput;
            selectedOption.value = optionValueInput;

            clearOptionInput();
        }
    };
    // ---------- End Handle edit options ----------

    // ---------- Handle create ----------
    const generateData = () => {
        return {
            name: typeNameInput,
            options: options,
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (typeNameInput && options.length > 0) {
            dispatch(notificationsSlice.actions.showLoading('Đang tạo thuộc tính'));

            const data = generateData();

            postData(api.productOptions, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Tạo thành công'));
                        navigate('/admin/product-options');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Tạo thất bại'));
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 1000);
                });
        }
    };
    // ---------- End Handle create ----------

    // ---------- Handle update ----------
    const handleUpdate = (e) => {
        e.preventDefault();

        if (typeNameInput && options.length > 0) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            const data = generateData();

            updateData(api.productOptions + '/' + id, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        navigate('/admin/product-options');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Cập nhật thất bại'));
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 1000);
                });
        }
    };
    // ---------- End Handle update ----------

    // ---------- Handle delete ----------
    const handleDelete = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xoá'));

        deleteData(api.productOptions + '/' + id)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xoá thành công'));
                    navigate('/admin/product-options');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Xoá thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
            });
    };
    // ---------- End Handle delete ----------

    // Clear input
    const clearOptionInput = () => {
        setOptionNameInput('');
        setOptionValueInput('');
        setSelectedOption({});
    };

    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}>Thuộc tính sản phẩm</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/manage-roles">Sản phẩm</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>Tạo thuộc tính</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'mt-0', 'mb-4')}>Loại thuộc tính</h4>

                            <form className={cx('forms-sample')}>
                                {/* ------ Option type input ------ */}

                                <div className={cx('form-group')}>
                                    <label htmlFor="optionsType">Tên loại thuộc tính</label>
                                    <input
                                        onChange={handleTypeNameInputChange}
                                        value={typeNameInput}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="optionsType"
                                        placeholder="Vd: Màu sắc, Kích thước"
                                    />
                                </div>
                                {/* ------ End Option type input ------ */}

                                <Divider />

                                {/* ------ Option input ------ */}
                                <h4 className={cx('card-title', 'mt-0', 'mb-4')}>Thuộc tính</h4>
                                <div className={cx('row', 'g-4')}>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label htmlFor="optionName">Tên thuộc tính</label>
                                            <input
                                                onChange={handleOptionNameInputChange}
                                                value={optionNameInput}
                                                type="text"
                                                className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                                id="optionName"
                                                placeholder="Vd: Đỏ"
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label htmlFor="optionValue">Giá trị</label>
                                            <input
                                                onChange={handleOptionValueInputChange}
                                                value={optionValueInput}
                                                type="text"
                                                className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                                id="optionValue"
                                                placeholder="Vd: #EA5455"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('form-group')}>
                                    {Object.keys(selectedOption).length > 0 ? (
                                        <button
                                            onClick={handleUpdateOption}
                                            className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}
                                        >
                                            Cập nhật
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleAddOption}
                                            className={cx('btn', 'btn-sm', 'btn-gradient-info', 'me-2')}
                                        >
                                            Thêm thuộc tính
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                        className={cx('btn', 'btn-sm', 'btn-light', 'me-2')}
                                    >
                                        Huỷ
                                    </button>
                                </div>
                                {/* ------ End Option input ------ */}

                                {/* ------ Options table ------ */}
                                <div className={cx('form-group', 'overflow-x-auto')}>
                                    <table className={cx('table', 'table-responsive', 'table-hover')}>
                                        <thead>
                                            <tr>
                                                <th> Tên thuộc tính </th>
                                                <th> Giá trị </th>
                                                <th className={cx('text-center')}> Hành động </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {options.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.value}</td>
                                                    <td className={cx('text-center')}>
                                                        {/* Edit button */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSelectOption(item);
                                                            }}
                                                            className={cx(
                                                                'btn',
                                                                'btn-light',
                                                                'btn-rounded',
                                                                'btn-icon',
                                                            )}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        {/* End Edit button */}

                                                        {/* Delete button */}
                                                        <Popconfirm
                                                            title="Xóa thuộc tính"
                                                            description="Bạn có chắc chắn muốn xóa thuộc tính?"
                                                            onConfirm={() => {
                                                                handleRemoveOption(index);
                                                            }}
                                                            okText="Xóa"
                                                            cancelText="Hủy"
                                                        >
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                className={cx(
                                                                    'btn',
                                                                    'btn-light',
                                                                    'btn-rounded',
                                                                    'btn-icon',
                                                                    'ms-2',
                                                                )}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </Popconfirm>
                                                        {/* End Delete button */}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* ------ End Options table ------ */}

                                {/* ------ Submit controls ------ */}
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
                                            Tạo thuộc tính
                                        </button>
                                    )}

                                    <Link to="/admin/product-options" className={cx('btn', 'btn-light')}>
                                        Hủy
                                    </Link>
                                </div>
                                {/* ------ End Submit controls ------ */}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right bar */}
                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'mt-0', 'mb-4')}>Mô tả thuộc tính</h4>
                            <ul className={cx('ps-0')}>
                                <li className={cx('d-flex', 'text-secondary', 'lh-sm', 'fs-12')}>
                                    <FontAwesomeIcon className={cx('me-1', 'mt-1')} icon={faCircleInfo} />
                                    <p className={cx('fs-14')}>Các thuộc tính sẽ được chọn khi tạo sản phẩm</p>
                                </li>
                                <li className={cx('d-flex', 'text-secondary', 'lh-sm', 'fs-12')}>
                                    <FontAwesomeIcon className={cx('me-1', 'mt-1')} icon={faCircleInfo} />
                                    <p className={cx('fs-14')}>Màu sắc sẽ được hiển thị khi nhập đúng mã màu</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* End Right bar */}
            </div>
        </>
    );
}

export default ProductOptionsCreate;
