import { api } from '@/api';
import { deleteData, getData, postData, updateData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShippingMethodsCreate() {
  const [nameInput, setNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { action, id } = useParams();

  // Get shipping method for update
  useEffect(() => {
    getData(api.shippingMethods + '/' + id)
      .then((response) => {
        console.log(response);
        setNameInput(response.name);
        setPriceInput(response.price);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [action, id]);

  // --------- Handle input change ---------
  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handlePriceInputChange = (e) => {
    setPriceInput(e.target.value);
  };
  // --------- End Handle input change ---------

  // Generate data
  const generateData = () => {
    return {
      name: nameInput,
      price: Number(priceInput),
    };
  };

  // --------- Handle submit ---------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameInput && priceInput) {
      dispatch(notificationsSlice.actions.showLoading('Đang thêm vận chuyển'));

      const data = generateData();

      postData(api.shippingMethods, data)
        .then((response) => {
          console.log(response);

          setTimeout(() => {
            dispatch(notificationsSlice.actions.showSuccess('Thêm thành công'));
            clearInputs();
            navigate('/admin/shipping-methods');
          }, 1000);
        })
        .catch((error) => {
          console.warn(error);
          dispatch(notificationsSlice.actions.showError('Thêm thất bại'));
        });
    } else {
      dispatch(notificationsSlice.actions.showError('Thêm thất bại'));
      setTimeout(() => {
        dispatch(notificationsSlice.actions.destroy());
      }, 1000);
    }
  };
  // --------- End Handle submit ---------

  // --------- Handle update ---------
  const handleUpdate = (e) => {
    e.preventDefault();

    if (nameInput && priceInput) {
      dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

      const data = generateData();

      updateData(api.shippingMethods + '/' + id, data)
        .then((response) => {
          console.log(response);

          setTimeout(() => {
            dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
          }, 1000);
        })
        .catch((error) => {
          console.warn(error);
          dispatch(notificationsSlice.actions.showError('Cập nhật thất bại'));
        });
    } else {
      dispatch(notificationsSlice.actions.showError('cập nhật thất bại'));
      setTimeout(() => {
        dispatch(notificationsSlice.actions.destroy());
      }, 1000);
    }
  };
  // --------- End handle update ---------

  // --------- Handle delete ---------
  const handleDelete = () => {
    dispatch(notificationsSlice.actions.showLoading('Đang xóa vận chuyển'));

    deleteData(api.shippingMethods + '/' + id)
      .then((response) => {
        console.log(response);

        setTimeout(() => {
          dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
          navigate('/admin/shipping-methods');
        }, 1000);
      })
      .catch((error) => {
        console.warn(error);
        dispatch(notificationsSlice.actions.showError('Xóa thất bại'));
      });
  };
  // --------- End handle delete ---------

  const clearInputs = () => {
    setNameInput('');
    setPriceInput('');
  };

  return (
    <>
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}>
          {action === 'update' ? 'Cập nhật đơn vị vận chuyển' : 'Thêm đơn vị vận chuyển'}
        </h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}>
              <Link to="/admin/shipping-methods">Tất cả đơn vị vận chuyển</Link>
            </li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              {action === 'update' ? 'Cập nhật đơn vị vận chuyển' : 'Thêm đơn vị vận chuyển'}
            </li>
          </ol>
        </nav>
      </div>
      <div className={cx('row', 'g-4', 'align-items-start')}>
        <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Đơn vị vận chuyển</h4>
              {/* <p className={cx('card-description')}>
                                Mã khuyến mãi sẽ được khách hàng nhập tại màn hình thanh toán
                            </p> */}
              <form className={cx('forms-sample')}>
                <div className={cx('form-group')}>
                  <label htmlFor="exampleInputName1">Tên đơn vị vận chuyển *</label>
                  <input
                    onChange={handleNameInputChange}
                    value={nameInput}
                    type="text"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="exampleInputName1"
                    placeholder="Nhập tên đơn vị vận chuyển"
                  />
                </div>

                <div className={cx('form-group')}>
                  <label htmlFor="promotionValue">Giá cước *</label>
                  <input
                    onChange={handlePriceInputChange}
                    value={priceInput}
                    type="number"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="promotionValue"
                    placeholder="Nhập giá cước"
                  />
                </div>

                {action === 'update' ? (
                  <>
                    <button onClick={handleUpdate} type="submit" className={cx('btn', 'btn-gradient-primary', 'me-2')}>
                      Cập nhật
                    </button>
                    <Popconfirm
                      title="Xóa đơn vị vận chuyển"
                      description="Bạn có chắc chắn muốn xóa đơn vị vận chuyển?"
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
                  <button onClick={handleSubmit} type="submit" className={cx('btn', 'btn-gradient-primary', 'me-2')}>
                    Thêm đơn vị vận chuyển
                  </button>
                )}

                <Link to="/admin/shipping-methods" className={cx('btn', 'btn-light')}>
                  Hủy
                </Link>
              </form>
            </div>
          </div>
        </div>

        <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Mô tả vận chuyển</h4>
              <p className={cx('card-description')}> Basic form elements </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingMethodsCreate;
