import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import LayoutAccount from '@/components/Admin/Layout/LayoutAccount';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '@/api/service';
import { api } from '@/api';

const cx = classNames.bind(styles);

function AdminRegister() {
  const [fullNameInput, setFullNameInput] = useState('');
  const [userNameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  // ----------- Handle input change -----------
  const handleFullNameInputChange = (e) => {
    setFullNameInput(e.target.value);
  };

  const handleUsernameInputChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };
  // ----------- End Handle input change -----------

  // ----------- Handle submit register -----------
  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (fullNameInput && userNameInput && emailInput && passwordInput) {
      const data = {
        fullName: fullNameInput,
        userName: userNameInput,
        email: emailInput,
        password: passwordInput,
      };
      console.log(data);

      postData(api.registerAdmin, data)
        .then((response) => {
          console.log(response);
          localStorage.setItem('token', response.data);
          navigate('/admin');
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };
  // ----------- End Handle submit register -----------

  return (
    <LayoutAccount title="Đăng ký tài khoản Cosmetics shop" subTitle="Đăng ký tài khoản mới">
      <div className={cx('row', 'gx-4')}>
        <div className={cx('col-md-6')}>
          <div className={cx('form-group')}>
            <label htmlFor="inputFullName">Họ tên</label>
            <input
              onChange={handleFullNameInputChange}
              value={fullNameInput}
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
              onChange={handleUsernameInputChange}
              value={userNameInput}
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
          onChange={handleEmailInputChange}
          value={emailInput}
          type="text"
          className={cx('form-control', 'form-control-sm', 'border-secondary')}
          id="inputEmail"
          placeholder=" Nhập email"
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
        <button onClick={handleSubmitRegister} className={cx('btn', 'btn-gradient-primary', 'w-100')}>
          Đăng ký
        </button>
        <Link to={'/admin/login'} className={cx('btn', 'btn-light', 'w-100', 'mt-4')}>
          Đăng nhập
        </Link>
      </div>
    </LayoutAccount>
  );
}

export default AdminRegister;
