import LayoutAccount from '@/components/Layout/LayoutAccount';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { postData } from '@/api/service';
import { api } from '@/api';

const cx = classNames.bind(styles);

function SignUp({ setOptionsLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');

    const handleChangeForm = (setInput, e) => {
        setInput(e.target.value);
    };
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if (name && userName && email && password) {
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
                    console.warn(error);
                });
        }
    };
    return (
        <>
            <LayoutAccount title="Đăng ký tài khoản Cosmetics shop" subTitle="Đăng ký tài khoản mới">
                <div className={cx('row', 'gx-4')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="inputFullName">Họ tên</label>
                            <input
                                onChange={(e) => {
                                    handleChangeForm(setName, e);
                                }}
                                value={name}
                                type="text"
                                className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                id="inputFullName"
                                placeholder=" Nhập họ tên"
                            />
                        </div>
                    </div>
                    <div className={cx('col-md-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="inputUserName">Tên đăng nhập</label>
                            <input
                                onChange={(e) => {
                                    handleChangeForm(setUserName, e);
                                }}
                                value={userName}
                                type="text"
                                className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                id="inputUserName"
                                placeholder=" Nhập tên đăng nhập"
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="inputEmail">Email</label>
                    <input
                        onChange={(e) => {
                            handleChangeForm(setEmail, e);
                        }}
                        value={email}
                        type="text"
                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                        id="inputEmail"
                        placeholder=" Nhập email"
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
