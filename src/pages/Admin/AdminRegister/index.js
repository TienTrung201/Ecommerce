import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import LayoutAccount from '@/components/Admin/Layout/LayoutAccount';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '@/api/service';
import { api } from '@/api';
import Validator from '@/Validator/Validator';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function AdminRegister() {
    const [loading, setLoading] = useState(false);

    const [fullNameInput, setFullNameInput] = useState('');
    const [userNameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [userNameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    // ----------- Handle input change -----------
    const handleFullNameInputChange = (e) => {
        setFullNameInput(e.target.value);
        setFullNameError('');
    };

    const handleUsernameInputChange = (e) => {
        setUsernameInput(e.target.value);
        setUsernameError('');
    };

    const handleEmailInputChange = (e) => {
        setEmailInput(e.target.value);
        setEmailError('');
    };

    const handlePasswordInputChange = (e) => {
        setPasswordInput(e.target.value);
        setPasswordError('');
    };
    // ----------- End Handle input change -----------
    const handleValidateNameInput = () => {
        const isValidate = Validator({
            setErrorMessage: setFullNameError,
            rules: [Validator.isRequired(fullNameInput, 'Bạn chưa nhập tên')],
        });

        return isValidate;
    };

    const handleValidateUsernameInput = () => {
        const isValidate = Validator({
            setErrorMessage: setUsernameError,
            rules: [Validator.isRequired(userNameInput, 'Bạn chưa nhập tên đăng nhập')],
        });

        return isValidate;
    };

    const handleValidateEmailInput = () => {
        const isValidate = Validator({
            setErrorMessage: setEmailError,
            rules: [
                Validator.isRequired(emailInput, 'Bạn chưa nhập email'),
                Validator.isEmail(emailInput, 'Email chưa đúng định dạng'),
            ],
        });

        return isValidate;
    };

    const handleValidatePasswordInput = () => {
        const isValidate = Validator({
            setErrorMessage: setPasswordError,
            rules: [
                Validator.isRequired(passwordInput, 'Bạn chưa nhập mật khẩu'),
                Validator.minLength(passwordInput, 8, 'Mật khẩu tối thiểu phải có 8 ký tự'),
            ],
        });

        return isValidate;
    };
    // ----------- End Handle validate input -----------

    // ----------- Handle submit register -----------
    const handleSubmitRegister = (e) => {
        e.preventDefault();

        if (
            handleValidateNameInput() &&
            handleValidateUsernameInput() &&
            handleValidateEmailInput() &&
            handleValidatePasswordInput()
        ) {
            const data = {
                fullName: fullNameInput,
                userName: userNameInput,
                email: emailInput,
                password: passwordInput,
            };

            setLoading(true);

            postData(api.registerAdmin, data)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.data);

                    setTimeout(() => {
                        setLoading(false);
                        navigate('/admin');
                    }, 1500);
                })
                .catch((error) => {
                    console.warn(JSON.parse(error.message));
                    const message = JSON.parse(error.message)?.title;

                    if (message.includes('email already exist')) {
                        setEmailError('Email đã tồn tại');
                    } else if (message.includes('username already exist')) {
                        setUsernameError('Tên đăng nhập đã tồn tại');
                    }

                    setLoading(false);
                });
        }
    };
    // ----------- End Handle submit register -----------

    return (
        <LayoutAccount title="Đăng ký tài khoản Bellissa" subTitle="Đăng ký tài khoản mới">
            <Spin spinning={loading}>
                <div className={cx('row', 'gx-4')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="inputFullName">Họ tên</label>
                            <input
                                onChange={handleFullNameInputChange}
                                onBlur={handleValidateNameInput}
                                value={fullNameInput}
                                type="text"
                                className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                id="inputFullName"
                                placeholder=" Nhập họ tên"
                            />
                            <span className={cx('text-danger', 'fs-14')}>{fullNameError}</span>
                        </div>
                    </div>
                    <div className={cx('col-md-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="inputUserName">Tên đăng nhập</label>
                            <input
                                onChange={handleUsernameInputChange}
                                onBlur={handleValidateUsernameInput}
                                value={userNameInput}
                                type="text"
                                className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                id="inputUserName"
                                placeholder=" Nhập tên đăng nhập"
                            />
                            <span className={cx('text-danger', 'fs-14')}>{userNameError}</span>
                        </div>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="inputEmail">Email</label>
                    <input
                        onChange={handleEmailInputChange}
                        onBlur={handleValidateEmailInput}
                        value={emailInput}
                        type="text"
                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                        id="inputEmail"
                        placeholder=" Nhập email"
                    />
                    <span className={cx('text-danger', 'fs-14')}>{emailError}</span>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="inputPassword">Mật khẩu</label>
                    <input
                        onChange={handlePasswordInputChange}
                        onBlur={handleValidatePasswordInput}
                        value={passwordInput}
                        type="password"
                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                        id="inputPassword"
                        placeholder=" Nhập mật khẩu"
                    />
                    <span className={cx('text-danger', 'fs-14')}>{passwordError}</span>
                </div>
                <div className={cx('form-group')}>
                    <button onClick={handleSubmitRegister} className={cx('btn', 'btn-gradient-primary', 'w-100')}>
                        Đăng ký
                    </button>
                    <Link to={'/admin/login'} className={cx('btn', 'btn-light', 'w-100', 'mt-4')}>
                        Đăng nhập
                    </Link>
                </div>
            </Spin>
        </LayoutAccount>
    );
}

export default AdminRegister;
