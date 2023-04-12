import LayoutAccount from '@/components/Layout/LayoutAccount';
import { Link, useNavigate } from 'react-router-dom';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { postData } from '@/api/service';
import { api } from '@/api';
const cx = classNames.bind(styles);

function SignIn({ setOptionsLogin }) {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChangeForm = (setInput, e) => {
        setInput(e.target.value);
    };
    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if (username && password) {
            const data = {
                userName: username,
                password: password,
            };

            postData(api.loginUser, data)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.data);
                    navigate('/');
                })
                .catch((error) => {
                    const payload = JSON.parse(error.message);
                    setPasswordError('Sai tên đăng nhập hoặc mật khẩu');
                    console.warn(payload);
                });
        } else {
            setPasswordError('Bạn chưa nhập thông tin đăng nhập');
        }
    };

    return (
        <>
            <LayoutAccount title="Đăng nhập vào Cosmetics shop" subTitle="Chào mừng quay trở lại">
                <div className={cx('form-group')}>
                    <label htmlFor="inputUserName">Tên đăng nhập / email</label>
                    <input
                        onChange={(e) => {
                            handleChangeForm(setUsername, e);
                        }}
                        value={username}
                        type="text"
                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                        id="inputUserName"
                        placeholder=" Nhập tên đăng nhập hoặc email"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="inputPassword">Mật khẩu</label>
                    <input
                        onChange={(e) => {
                            handleChangeForm(setPassword, e);
                        }}
                        value={password}
                        type="password"
                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                        id="inputPassword"
                        placeholder=" Nhập mật khẩu"
                    />
                    <span className={cx('text-danger', 'fs-14')}>{passwordError}</span>
                </div>
                <div className={cx('form-group')}>
                    <button onClick={handleSubmitLogin} className={cx('btn', 'btn-app-primary', 'w-100')}>
                        Đăng nhập
                    </button>
                    <Link to={'/user/signup'} className={cx('btn', 'btn-light', 'w-100', 'mt-4')}>
                        Đăng ký
                    </Link>
                </div>

                <div className={cx('form-group', 'text-center')}>
                    <button className={cx('btn', 'btn-link', 'text-color-app')}>Quên mật khẩu?</button>
                </div>
            </LayoutAccount>
        </>
    );
}

export default SignIn;
