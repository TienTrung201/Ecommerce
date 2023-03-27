import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import LayoutAccount from '@/components/Admin/Layout/LayoutAccount';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '@/api/service';
import { api } from '@/api';

const cx = classNames.bind(styles);

function AdminLogin() {
  const [userNameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  const handleUsernameInputChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (userNameInput && passwordInput) {
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
        });
    }
  };

  return (
    <LayoutAccount title="Đăng nhập vào Cosmetics shop" subTitle="Chào mừng quay trở lại">
      <div className={cx('form-group')}>
        <label htmlFor="inputUserName">Tên đăng nhập / email</label>
        <input
          onChange={handleUsernameInputChange}
          value={userNameInput}
          type="text"
          className={cx('form-control', 'form-control-sm', 'border-secondary')}
          id="inputUserName"
          placeholder=" Nhập tên đăng nhập hoặc email"
        />
      </div>
      <div className={cx('form-group')}>
        <label htmlFor="inputPassword">Mật khẩu</label>
        <input
          onChange={handlePasswordInputChange}
          value={passwordInput}
          type="password"
          className={cx('form-control', 'form-control-sm', 'border-secondary')}
          id="inputPassword"
          placeholder=" Nhập mật khẩu"
        />
      </div>
      <div className={cx('form-group')}>
        <button onClick={handleSubmitLogin} className={cx('btn', 'btn-gradient-primary', 'w-100')}>
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
