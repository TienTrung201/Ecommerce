import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { api } from '@/api';
import { updateData } from '@/api/service';
import images from '@/assets/admin/images';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import TextEditor from '@/components/Admin/TextEditor';
import TextEditorParagraph from '@/components/Admin/TextEditorParagraph';
import { uploadFile } from '@/firebase/service';
import { adminUserSelector } from '@/redux/selector';
import * as Unicons from '@iconscout/react-unicons';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import adminUserSlice from '../AdminLogin/adminUserSlice';

const cx = classNames.bind(styles);

function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const [imageInput, setImageInput] = useState({ image: null, imagePreview: '' });
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [birthDateInput, setBirthDateInput] = useState({});
    const [genderInput, setGenderInput] = useState(null);
    const [bioInput, setBioInput] = useState('');

    const imageInputRef = useRef();

    const dispatch = useDispatch();
    const adminUser = useSelector(adminUserSelector);
    const navigate = useNavigate();

    useEffect(() => {
        setImageInput({
            image: adminUser.avatar,
            imagePreview: adminUser.avatar,
        });
        setNameInput(adminUser.fullName);
        setEmailInput(adminUser.email);
        setPhoneNumberInput(adminUser.phoneNumber);
        setBirthDateInput({
            date: dayjs(adminUser.birthDate),
            dateString: adminUser.birthDate,
        });
        setGenderInput(adminUser.gender);
        setBioInput(adminUser.bio);
    }, [adminUser]);

    // ---------- Handle input change ----------
    const handleImageInputChange = (e) => {
        setImageInput({
            image: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
    };

    const handleEmailInputChange = (e) => {
        setEmailInput(e.target.value);
    };

    const handlePhoneNumberInputChange = (e) => {
        setPhoneNumberInput(e.target.value);
    };

    const handleBirthDateInputChange = (date, dateString) => {
        setBirthDateInput({
            date,
            dateString,
        });
    };

    const handleGenderInputChange = (value) => {
        setGenderInput(value);
    };

    const handleBioInputChange = (value) => {
        setBioInput(value);
    };
    // ---------- End Handle input change ----------

    // ---------- Handle submit ----------
    const gennerateData = async () => {
        const data = {
            userName: '000',
            password: '000',
            email: emailInput,
            phoneNumber: phoneNumberInput,
            fullName: nameInput,
            avatar: imageInput.image,
            bio: bioInput,
            gender: genderInput,
            birthDate: birthDateInput?.dateString,
        };

        if (data.avatar && typeof data.avatar != 'string') {
            const uploadedImage = await uploadFile(data.avatar, '/images/adminimages');
            data.avatar = uploadedImage.url;
        }

        return data;
    };

    const handleSubmit = async () => {
        if (nameInput && emailInput) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            const data = await gennerateData();
            console.log(data);

            updateData(api.adminAccount, data)
                .then((response) => {
                    console.log(response);
                    dispatch(adminUserSlice.actions.setAdminUser(response.data));

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        setIsEdit(false);
                    }, 1000);
                })
                .catch((error) => {
                    dispatch(notificationsSlice.actions.showError('Cập nhật thất bại'));
                    if (error.message === 'unauthorized') {
                        setTimeout(() => {
                            navigate('/admin/login');
                        }, 1000);
                    } else {
                        console.warn(error.message);
                    }
                });
        }
    };
    // ---------- End Handle submit ----------

    const handleToggleEditMode = () => {
        setIsEdit(!isEdit);
    };

    const handleClickImageInput = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Cài đặt tài khoản</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Cài đặt tài khoản
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Thông tin của tôi</h4>
                    </div>

                    {/* Information header */}
                    <div className={cx('d-flex', 'border', 'rounded-12', 'p-4')}>
                        <div>
                            <img
                                className={cx('rounded-circle', 'border')}
                                style={{ width: '80px', height: '80px' }}
                                src={imageInput.imagePreview || images.placeholder}
                                alt=""
                            />
                            <input
                                onChange={handleImageInputChange}
                                value={''}
                                ref={imageInputRef}
                                type="file"
                                hidden
                            />
                        </div>
                        <div className={cx('ms-4')}>
                            <p className={cx('font-weight-bold', 'mb-0', 'mt-2')}>{adminUser.fullName}</p>
                            <p className={cx('mb-0', 'text-secondary', 'small', 'font-weight-bold')}>Product Manager</p>
                            <TextEditorParagraph
                                value={adminUser.bio}
                                style={{ fontSize: '1.3rem', color: '#6c757d', marginBottom: '0' }}
                            />
                        </div>
                        <div className={cx('ms-auto', 'align-self-center')}>
                            <button
                                onClick={handleClickImageInput}
                                className={cx('btn', 'btn-outline-primary', 'btn-sm', 'rounded-pill')}
                            >
                                <span className={cx('me-2')}>Edit</span>
                                {/* <FontAwesomeIcon style={{ fontSize: 12 }} icon={faPen} /> */}
                                <Unicons.UilPen size="14" />
                            </button>
                        </div>
                    </div>
                    {/* End Information header */}

                    {/* Personal information */}
                    <div className={cx('rounded-12', 'p-4', 'mt-4')}>
                        <div className={cx('d-flex')}>
                            <h6 className={cx('h6')}>Thông tin cá nhân</h6>
                            <div className={cx('ms-auto')}>
                                <button
                                    onClick={handleToggleEditMode}
                                    className={cx('btn', 'btn-outline-primary', 'btn-sm', 'rounded-pill')}
                                >
                                    <span className={cx('me-2')}>Edit</span>
                                    {/* <FontAwesomeIcon style={{ fontSize: 12 }} icon={faPen} /> */}
                                    <Unicons.UilPen size="14" />
                                </button>
                            </div>
                        </div>

                        <div className={cx('row', 'gx-4')}>
                            <div className={cx('col-md-8')}>
                                <div className={cx('row', 'gx-4', 'transition-all')}>
                                    {/* Name input */}
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="fullName">
                                                Họ tên
                                            </label>
                                            {isEdit ? (
                                                <input
                                                    onChange={handleNameInputChange}
                                                    value={nameInput}
                                                    type="text"
                                                    className={cx(
                                                        'form-control',
                                                        'form-control-sm',
                                                        'border-secondary',
                                                    )}
                                                    id="fullName"
                                                    placeholder="Nhập họ tên"
                                                />
                                            ) : (
                                                <p
                                                    style={{ lineHeight: '34px' }}
                                                    className={cx('mb-0', 'small', 'font-weight-bold')}
                                                >
                                                    {adminUser.fullName}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* End Name input */}

                                    {/* Username input */}
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="username">
                                                Username
                                            </label>
                                            <p
                                                style={{ lineHeight: '34px' }}
                                                className={cx('mb-0', 'small', 'font-weight-bold')}
                                            >
                                                {adminUser.userName}
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Username input */}

                                    {/* Email input */}
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="email">
                                                Email
                                            </label>
                                            {isEdit ? (
                                                <input
                                                    onChange={handleEmailInputChange}
                                                    value={emailInput}
                                                    type="text"
                                                    className={cx(
                                                        'form-control',
                                                        'form-control-sm',
                                                        'border-secondary',
                                                    )}
                                                    id="email"
                                                    placeholder="Nhập email"
                                                />
                                            ) : (
                                                <p
                                                    style={{ lineHeight: '34px' }}
                                                    className={cx('mb-0', 'small', 'font-weight-bold')}
                                                >
                                                    {adminUser.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* End Email input */}

                                    {/* Phone number input */}
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="phoneNumber">
                                                Số điện thoại
                                            </label>
                                            {isEdit ? (
                                                <input
                                                    onChange={handlePhoneNumberInputChange}
                                                    value={phoneNumberInput}
                                                    type="text"
                                                    className={cx(
                                                        'form-control',
                                                        'form-control-sm',
                                                        'border-secondary',
                                                    )}
                                                    id="phoneNumber"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            ) : (
                                                <p
                                                    style={{ lineHeight: '34px' }}
                                                    className={cx('mb-0', 'small', 'font-weight-bold')}
                                                >
                                                    {adminUser.phoneNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/*End Phone number input */}

                                    {/* Birthdate input */}
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="birthDate">
                                                Ngày sinh
                                            </label>
                                            {isEdit ? (
                                                <DatePicker
                                                    onChange={handleBirthDateInputChange}
                                                    value={birthDateInput.date}
                                                    format="YYYY-MM-DD"
                                                    className={cx('w-100')}
                                                    placeholder="Chọn ngày sinh"
                                                    id="birthDate"
                                                />
                                            ) : (
                                                <p
                                                    style={{ lineHeight: '34px' }}
                                                    className={cx('mb-0', 'small', 'font-weight-bold')}
                                                >
                                                    {dayjs(adminUser.birthDate).format('DD/MM/YYYY')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Birthdate input */}

                                    {/* Gender input */}
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="gender">
                                                Giới tính
                                            </label>
                                            {isEdit ? (
                                                <Select
                                                    onChange={handleGenderInputChange}
                                                    value={genderInput}
                                                    style={{ width: '100%' }}
                                                    allowClear
                                                    placeholder="Chọn giới tính"
                                                    id="gender"
                                                    options={[
                                                        { name: 'Nam', value: 0 },
                                                        { name: 'Nữ', value: 1 },
                                                        { name: 'Khác', value: 2 },
                                                    ].map((item) => ({
                                                        label: item.name,
                                                        value: item.value,
                                                    }))}
                                                />
                                            ) : (
                                                <p
                                                    style={{ lineHeight: '34px' }}
                                                    className={cx('mb-0', 'small', 'font-weight-bold')}
                                                >
                                                    {adminUser.gender === 0
                                                        ? 'Nam'
                                                        : adminUser.gender === 1
                                                        ? 'Nữ'
                                                        : 'Khác'}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* End Gender input */}

                                    {/* Bio input */}
                                    <div className={cx('col-md-12')}>
                                        <div className={cx('form-group')}>
                                            <label className={cx('d-block', { 'mb-0': !isEdit })} htmlFor="bio">
                                                Bio
                                            </label>

                                            {isEdit ? (
                                                <TextEditor
                                                    onChange={handleBioInputChange}
                                                    editorState={bioInput}
                                                    height={160}
                                                />
                                            ) : (
                                                <div
                                                    style={{ lineHeight: '34px' }}
                                                    className={cx('mb-0', 'small', 'font-weight-bold')}
                                                >
                                                    <TextEditorParagraph
                                                        value={adminUser.bio}
                                                        style={{ fontSize: '13px !important', lineHeight: '34px' }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* End Bio input */}
                                </div>
                            </div>
                            <div className={cx('col-md-4')}></div>

                            {/* Submit controls */}
                            <div>
                                <button
                                    onClick={handleSubmit}
                                    className={cx('btn', 'btn-gradient-primary', 'me-2', {
                                        disabled: !isEdit && !(typeof imageInput.image === 'object'),
                                    })}
                                >
                                    Cập nhật
                                </button>

                                <Link to="/admin" className={cx('btn', 'btn-light')}>
                                    Hủy
                                </Link>
                            </div>
                            {/* End Submit controls */}
                        </div>
                    </div>
                    {/* End Personal information */}
                </div>
            </div>
        </>
    );
}

export default Profile;
