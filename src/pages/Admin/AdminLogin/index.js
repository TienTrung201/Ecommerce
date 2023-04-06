import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import LayoutAccount from '@/components/Admin/Layout/LayoutAccount';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '@/api/service';
import { api } from '@/api';
import Validator from '@/Validator/Validator';

const cx = classNames.bind(styles);

function AdminLogin() {
    const [userNameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [userNameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    // -------- Handle input change --------
    const handleUsernameInputChange = (e) => {
        setUsernameInput(e.target.value);
        setUsernameError('');
    };

    const handlePasswordInputChange = (e) => {
        setPasswordInput(e.target.value);
        setPasswordError('');
    };
    // -------- End Handle input change --------

    // -------- Handle validate input --------
    const handleValidateUserNameInput = () => {
        const isValidate = Validator({
            setErrorMessage: setUsernameError,
            rules: [Validator.isRequired(userNameInput, 'Bạn chưa nhập username')],
        });

        return isValidate;
    };

    const handleValidatePasswordInput = () => {
        const isValidate = Validator({
            setErrorMessage: setPasswordError,
            rules: [
                Validator.isRequired(passwordInput, 'Bạn chưa nhập mật khẩu'),
                Validator.minLength(passwordInput, 6, 'Mật khẩu tối thiểu phải có 6 ký tự'),
            ],
        });

        return isValidate;
    };
    // -------- End Handle validate input --------

    // -------- Handle submit login --------
    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if (handleValidateUserNameInput() && handleValidatePasswordInput()) {
            const data = {
                userName: userNameInput,
                password: passwordInput,
            };

            postData(api.loginAdmin, data)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.data);
                    navigate('/admin');
                })
                .catch((error) => {
                    const payload = JSON.parse(error.message);
                    console.warn(payload);
                    setPasswordError('Sai tên đăng nhập hoặc mật khẩu');
                });
        }
    };
    // -------- End Handle submit login --------

    return (
        <LayoutAccount title="Đăng nhập vào Cosmetics shop" subTitle="Chào mừng quay trở lại">
            <div className={cx('form-group')}>
                <label htmlFor="inputUserName">Tên đăng nhập / email</label>
                <input
                    onChange={handleUsernameInputChange}
                    onBlur={handleValidateUserNameInput}
                    value={userNameInput}
                    type="text"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="inputUserName"
                    placeholder=" Nhập tên đăng nhập hoặc email"
                />
                <span className={cx('text-danger', 'fs-14')}>{userNameError}</span>
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
                <button
                    onClick={handleSubmitLogin}
                    className={cx('btn', 'btn-gradient-primary', 'w-100', { disabled: userNameError || passwordError })}
                >
                    Đăng nhập
                </button>
                <Link to={'/admin/register'} className={cx('btn', 'btn-light', 'w-100', 'mt-4')}>
                    Đăng ký
                </Link>
            </div>

            <div className={cx('form-group', 'text-center')}>
                <button className={cx('btn', 'btn-link')}>Quên mật khẩu?</button>
            </div>
        </LayoutAccount>
    );
}

export default AdminLogin;
