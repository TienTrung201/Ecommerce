import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DatePicker, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { deleteData, getData, postData, updateData } from '@/api/service';
import { api } from '@/api';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import dayjs from 'dayjs';
import TextEditor from '@/components/Admin/TextEditor';
import Validator from '@/Validator/Validator';

const cx = classNames.bind(styles);

function PromotionsCreate() {
    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [discountInput, setDiscountInput] = useState(0);
    const [startDateInput, setStartDateInput] = useState({});
    const [endDateInput, setEndDateInput] = useState({});
    const dispatch = useDispatch();

    const { action, id } = useParams();
    const navigate = useNavigate();

    // Get data for update
    useEffect(() => {
        if (action === 'update') {
            getData(api.promotions + '/' + id)
                .then((response) => {
                    console.log(response);

                    const data = response.data;

                    setNameInput(data.name);
                    setDescriptionInput(data.description);
                    setDiscountInput(data.discountRate);
                    setStartDateInput({
                        date: dayjs(data.startDate),
                        dateString: data.startDate,
                    });
                    setEndDateInput({
                        date: dayjs(data.endDate),
                        dateString: data.endDate,
                    });
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }, [action, id]);

    // ------- Handle validate input -------
    const [nameError, setNameError] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const handleValidateName = () => {
        const isValidate = Validator({
            setErrorMessage: setNameError,
            rules: [Validator.isRequired(nameInput, 'Bạn chưa nhập tên khuyến mãi')],
        });

        return isValidate;
    };

    const handleValidateDiscount = () => {
        const isValidate = Validator({
            setErrorMessage: setDiscountError,
            rules: [Validator.isRequired(discountInput, 'Bạn chưa nhập giá trị khuyến mãi')],
        });

        return isValidate;
    };

    const handleValidateStartDate = () => {
        const isValidate = Validator({
            setErrorMessage: setStartDateError,
            rules: [Validator.isRequired(startDateInput.dateString, 'Bạn chưa nhập ngày bắt đầu')],
        });

        return isValidate;
    };

    const handleValidateEndDate = () => {
        const isValidate = Validator({
            setErrorMessage: setEndDateError,
            rules: [Validator.isRequired(endDateInput.dateString, 'Bạn chưa nhập ngày kết thúc')],
        });

        return isValidate;
    };
    // ------- End Handle validate input -------

    // ------- Handle input change -------
    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
        setNameError('');
    };

    const handleDescriptionInputChange = (value) => {
        setDescriptionInput(value);
    };

    const handleDiscountInputChange = (e) => {
        setDiscountInput(e.target.value);
        setDiscountError('');
    };

    const handleStartDateInputChange = (date, dateString) => {
        setStartDateInput({
            date: date,
            dateString: dateString,
        });
        setStartDateError('');
    };

    const handleEndDateInputChange = (date, dateString) => {
        setEndDateInput({
            date: date,
            dateString: dateString,
        });
        setEndDateError('');
    };
    // ------- End Handle input change -------

    const generateData = () => {
        return {
            name: nameInput,
            description: descriptionInput,
            discountRate: Number(discountInput),
            startDate: startDateInput.dateString,
            endDate: endDateInput.dateString,
        };
    };

    // ------- Handle submit -------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleValidateName() && handleValidateDiscount() && handleValidateStartDate() && handleValidateEndDate()) {
            dispatch(notificationsSlice.actions.showLoading('Đang tạo khuyến mãi'));

            const data = generateData();

            postData(api.promotions, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Tạo khuyến mãi thành công'));
                        navigate('/admin/promotions');
                        clearInput();
                    }, 1000);
                })
                .catch((error) => {
                    dispatch(notificationsSlice.actions.showError('Tạo khuyến mãi không thành công'));
                    console.warn(error);
                });
        }
    };
    // ------- End Handle submit -------

    // ------- Handle update -------
    const handleUpdate = (e) => {
        e.preventDefault();

        if (handleValidateName() && handleValidateDiscount() && handleValidateStartDate() && handleValidateEndDate()) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            const data = generateData();

            updateData(api.promotions + '/' + id, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        navigate('/admin/promotions');
                    }, 1000);
                })
                .catch((error) => {
                    dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
                    console.warn(error);
                });
        }
    };
    // ------- End Handle update -------

    // ------- Handle delete -------
    const handleDelete = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xóa'));

        deleteData(api.promotions + '/' + id)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    navigate('/admin/promotions');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Xóa thất bại'));
            });
    };
    // ------- End Handle delete -------

    const clearInput = () => {
        setNameInput('');
        setDescriptionInput('');
        setDiscountInput(0);
    };

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>
                    {action === 'update' ? 'Cập nhật khuyến mãi' : 'Thêm mới khuyến mãi'}
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/promotions">Khuyến mãi</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            {action === 'update' ? 'Cập nhật khuyến mãi' : 'Thêm khuyến mãi'}
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Khuyến mãi</h4>
                            <p className={cx('card-description')}>
                                Mã khuyến mãi sẽ được khách hàng nhập tại màn hình thanh toán
                            </p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên hoặc mã khuyến mãi *</label>
                                    <input
                                        onChange={handleNameInputChange}
                                        onBlur={handleValidateName}
                                        value={nameInput}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Vd: Siêu sale sinh nhật hoặc COUPON10%"
                                    />
                                    <span className={cx('text-danger', 'fs-14')}>{nameError}</span>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleTextarea1">Nội dung</label>
                                    <TextEditor
                                        onChange={handleDescriptionInputChange}
                                        editorState={descriptionInput}
                                        height={240}
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="promotionValue">Giá trị khuyến mãi *</label>
                                    <input
                                        onChange={handleDiscountInputChange}
                                        onBlur={handleValidateDiscount}
                                        value={discountInput}
                                        type="number"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="promotionValue"
                                        placeholder=""
                                    />
                                    <span className={cx('text-danger', 'fs-14')}>{discountError}</span>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('row', 'gx-4')}>
                                        <div className={cx('col-md-6')}>
                                            <label htmlFor="">Ngày bắt đầu *</label>
                                            <DatePicker
                                                onChange={handleStartDateInputChange}
                                                onBlur={handleValidateStartDate}
                                                value={startDateInput.date}
                                                format="YYYY-MM-DD"
                                                className={cx('w-100')}
                                            />
                                            <span className={cx('text-danger', 'fs-14')}>{startDateError}</span>
                                        </div>
                                        <div className={cx('col-md-6')}>
                                            <label htmlFor="">Ngày kết thúc *</label>
                                            <DatePicker
                                                onChange={handleEndDateInputChange}
                                                onBlur={handleValidateEndDate}
                                                value={endDateInput.date}
                                                format="YYYY-MM-DD"
                                                className={cx('w-100')}
                                            />
                                            <span className={cx('text-danger', 'fs-14')}>{endDateError}</span>
                                        </div>
                                    </div>
                                </div>
                                {action === 'update' ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            type="submit"
                                            className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                        >
                                            Cập nhật
                                        </button>

                                        <Popconfirm
                                            title="Xóa khuyến mãi"
                                            description="Bạn có chắc chắn muốn xóa khuyến mãi?"
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
                                                Xóa
                                            </button>
                                        </Popconfirm>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                    >
                                        Tạo khuyến mãi
                                    </button>
                                )}
                                <Link to="/admin/promotions" className={cx('btn', 'btn-light')}>
                                    Hủy
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Mô tả</h4>
                            <p className={cx('card-description')}> Basic form elements </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromotionsCreate;
