import LayoutAccount from '@/components/Layout/LayoutAccount';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { postData } from '@/api/service';
import { api } from '@/api';
import Validator from '@/Validator/Validator';

const cx = classNames.bind(styles);

function SignUp({ setOptionsLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fullNameError, setFullNameError] = useState('');

    const handleChangeForm = (setInput, e) => {
        if (name !== '') {
            setFullNameError('');
        }
        if (userName !== '') {
            setUserNameError('');
        }
        if (password !== '') {
            setPasswordError('');
        }
        if (email !== '') {
            setEmailError('');
        }
        setInput(e.target.value);
    };
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if (
            handleValidateNameInput() &&
            handleValidateUsernameInput() &&
            handleValidateEmailInput() &&
            handleValidatePasswordInput()
        ) {
            const data = {
                fullName: name,
                userName: userName,
                email: email,
                password: password,
            };
            console.log(data);

            postData(api.registerUser, data)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.data);
                    navigate('/');
                })
                .catch((error) => {
                    console.warn(JSON.parse(error.message));
                    const message = JSON.parse(error.message)?.title;

                    if (message.includes('email already exist')) {
                        setEmailError('Email đã tồn tại');
                    } else if (message.includes('username already exist')) {
                        setUserNameError('Tên đăng nhập đã tồn tại');
                    }
                });
        } else {
            setPasswordError('Bạn chưa nhập đủ thông tin đăng ký');
        }
    };
    const handleValidateUsernameInput = () => {
        const isValidate = Validator({
            setErrorMessage: setUserNameError,
            rules: [Validator.isRequired(userName, 'Bạn chưa nhập tên đăng nhập')],
        });

        return isValidate;
    };
    const handleValidateNameInput = () => {
        const isValidate = Validator({
            setErrorMessage: setFullNameError,
            rules: [Validator.isRequired(name, 'Bạn chưa nhập tên')],
        });

        return isValidate;
    };
    const handleValidatePasswordInput = () => {
        const isValidate = Validator({
            setErrorMessage: setPasswordError,
            rules: [
                Validator.isRequired(password, 'Bạn chưa nhập mật khẩu'),
                Validator.minLength(password, 8, 'Mật khẩu tối thiểu phải có 8 ký tự'),
            ],
        });

        return isValidate;
    };
    const handleValidateEmailInput = () => {
        const isValidate = Validator({
            setErrorMessage: setEmailError,
            rules: [
                Validator.isRequired(email, 'Bạn chưa nhập email'),
                Validator.isEmail(email, 'Email chưa đúng định dạng'),
            ],
        });

        return isValidate;
    };
    return (
        <>
            <LayoutAccount title="Cosmetics shop" subTitle="Đăng ký tài khoản mới">
                <div className={cx('row', 'gx-4')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="inputFullName">Họ tên</label>
                            <input
                                onChange={(e) => {
                                    handleChangeForm(setName, e);
                                }}
                                onBlur={handleValidateNameInput}
                                value={name}
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
                                onChange={(e) => {
                                    handleChangeForm(setUserName, e);
                                }}
                                onBlur={handleValidateUsernameInput}
                                value={userName}
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
                        onChange={(e) => {
                            handleChangeForm(setEmail, e);
                        }}
                        onBlur={handleValidateEmailInput}
                        value={email}
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
                        onChange={(e) => {
                            handleChangeForm(setPassword, e);
                        }}
                        onBlur={handleValidatePasswordInput}
                        value={password}
                        type="password"
                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                        id="inputPassword"
                        placeholder=" Nhập mật khẩu"
                    />
                    <span className={cx('text-danger', 'fs-14')}>{passwordError}</span>
                </div>
                <div className={cx('form-group')}>
                    <button onClick={handleSubmitRegister} className={cx('btn', 'btn-app-primary', 'w-100')}>
                        Đăng ký
                    </button>
                    <Link to={'/user/signin'} className={cx('btn', 'btn-light', 'w-100', 'mt-4')}>
                        Đăng nhập
                    </Link>
                </div>
            </LayoutAccount>
        </>
    );
}

export default SignUp;
