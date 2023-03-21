import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import { useState } from 'react';
import { postData } from '@/api/service';
import { api } from '@/api';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';

const cx = classNames.bind(styles);

function PromotionsCreate() {
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [discountInput, setDiscountInput] = useState(0);
  const [startDateInput, setStartDateInput] = useState({});
  const [endDateInput, setEndDateInput] = useState({});
  const dispatch = useDispatch();

  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handleDiscountInputChange = (e) => {
    setDiscountInput(e.target.value);
  };

  const handleStartDateInputChange = (date, dateString) => {
    setStartDateInput({
      date: date,
      dateString: dateString,
    });
  };

  const handleEndDateInputChange = (date, dateString) => {
    setEndDateInput({
      date: date,
      dateString: dateString,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameInput,
      description: descriptionInput,
      discountRate: Number(discountInput),
      startDate: startDateInput.dateString,
      endDate: endDateInput.dateString,
    };

    if (nameInput && discountInput && startDateInput.dateString && endDateInput.dateString) {
      dispatch(notificationsSlice.actions.showLoading('Đang tạo khuyến mãi'));

      postData(api.promotions, data)
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            dispatch(notificationsSlice.actions.showSuccess('Tạo khuyến mãi thành công'));
            clearInput();
          }, 1000);
        })
        .catch((error) => {
          dispatch(notificationsSlice.actions.showError('Tạo khuyến mãi không thành công'));
          console.warn(error);
        });
    } else {
      dispatch(notificationsSlice.actions.showError('Tạo khuyến mãi không thành công'));
      setTimeout(() => {
        dispatch(notificationsSlice.actions.destroy());
      }, 1000);
    }
  };

  const clearInput = () => {
    setNameInput('');
    setDescriptionInput('');
    setDiscountInput(0);
  };

  return (
    <>
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}>Tạo khuyến mãi</h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}>
              <Link to="/admin/promotions">Tất cả khuyến mãi</Link>
            </li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              Tạo khuyến mãi
            </li>
          </ol>
        </nav>
      </div>
      <div className={cx('row', 'g-4', 'align-items-start')}>
        <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Chương trình khuyến mãi</h4>
              <p className={cx('card-description')}>Mã khuyến mãi sẽ được khách hàng nhập tại màn hình thanh toán</p>
              <form className={cx('forms-sample')}>
                <div className={cx('form-group')}>
                  <label htmlFor="exampleInputName1">Tên hoặc mã khuyến mãi *</label>
                  <input
                    onChange={handleNameInputChange}
                    value={nameInput}
                    type="text"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="exampleInputName1"
                    placeholder="Vd: Siêu sale sinh nhật hoặc COUPON10%"
                  />
                </div>
                <div className={cx('form-group')}>
                  <label htmlFor="exampleTextarea1">Nội dung</label>
                  <textarea
                    onChange={handleDescriptionInputChange}
                    value={descriptionInput}
                    className={cx('form-control', 'border-secondary')}
                    id="exampleTextarea1"
                    rows="4"
                  ></textarea>
                </div>
                <div className={cx('form-group')}>
                  <label htmlFor="promotionValue">Giá trị khuyến mãi *</label>
                  <input
                    onChange={handleDiscountInputChange}
                    value={discountInput}
                    type="number"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="promotionValue"
                    placeholder=""
                  />
                </div>
                <div className={cx('form-group')}>
                  <div className={cx('row', 'gx-4')}>
                    <div className={cx('col-md-6')}>
                      <label htmlFor="">Ngày bắt đầu *</label>
                      <DatePicker
                        value={startDateInput.date}
                        onChange={handleStartDateInputChange}
                        format="YYYY-MM-DD"
                        className={cx('w-100')}
                      />
                    </div>
                    <div className={cx('col-md-6')}>
                      <label htmlFor="">Ngày kết thúc *</label>
                      <DatePicker
                        value={endDateInput.date}
                        onChange={handleEndDateInputChange}
                        format="YYYY-MM-DD"
                        className={cx('w-100')}
                      />
                    </div>
                  </div>
                </div>
                <button onClick={handleSubmit} type="submit" className={cx('btn', 'btn-gradient-primary', 'me-2')}>
                  Tạo khuyến mãi
                </button>
                <Link to="/admin/promotions" className={cx('btn', 'btn-light')}>
                  Hủy
                </Link>
              </form>
            </div>
          </div>
        </div>

        <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Tổng quan khuyến mãi</h4>
              <p className={cx('card-description')}> Basic form elements </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PromotionsCreate;
