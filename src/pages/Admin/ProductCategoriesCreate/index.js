import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import './statusMessage.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '@/firebase/service';
import { Image, Select } from 'antd';
import { Link } from 'react-router-dom';
import { getData, postData } from '@/api/service';
import { api } from '@/api';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';

const cx = classNames.bind(styles);

function ProductCategoriesCreate() {
  const [imageUpload, setImageUpload] = useState({ image: null, imagePreview: '' });
  const [categoryName, setCategoryName] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [promotionInput, setPromotionInput] = useState(null);
  const inputImageRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    getData(api.promotions).then((data) => {
      console.log('promotions: ', data);
      setPromotions(data);
    });
  }, []);

  const handleInputImageChange = (e) => {
    setImageUpload({
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleInputCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSelectPromotionChange = (value) => {
    setPromotionInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryName !== '') {
      dispatch(notificationsSlice.actions.showLoading('Đang tạo danh mục'));

      if (imageUpload.image) {
        uploadFile(imageUpload.image, '/images/categories')
          .then((response) => {
            const data = {
              name: categoryName,
              image: response.url,
              promotionId: promotionInput,
            };

            return postData(api.categories, data);
          })
          .then((data) => {
            console.log(data);

            setTimeout(() => {
              dispatch(notificationsSlice.actions.showSuccess('Tạo danh mục thành công'));
            }, 1000);
          })
          .catch((error) => {
            console.warn(error);
          });
      } else {
        const data = {
          name: categoryName,
          image: null,
          promotionId: promotionInput,
        };

        postData(api.categories, data)
          .then((response) => {
            console.log(response);

            setTimeout(() => {
              dispatch(notificationsSlice.actions.showSuccess('Tạo danh mục thành công'));
            }, 1000);
          })
          .catch((error) => {
            console.warn(error);
          });
      }
    }
  };

  return (
    <>
      {/* Page header */}
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}> Danh mục sản phẩm </h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}>
              <Link to="/admin/products/categories">Tất cả danh mục</Link>
            </li>
            <li className={cx('breadcrumb-item', 'active')} aria-current="page">
              Tạo danh mục
            </li>
          </ol>
        </nav>
      </div>
      {/* End Page header */}

      {/* Page content */}
      <div className={cx('row', 'g-4', 'align-items-start')}>
        {/* Category form */}
        <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Tạo danh mục sản phẩm</h4>
              <p className={cx('card-description')}></p>
              <form className={cx('forms-sample')}>
                <div className={cx('form-group')}>
                  <label htmlFor="exampleInputName1">Tên danh mục</label>
                  <input
                    onChange={handleInputCategoryNameChange}
                    value={categoryName}
                    type="text"
                    className={cx('form-control', 'form-control-sm', 'border-secondary')}
                    id="exampleInputName1"
                    placeholder="Nhập tên danh mục"
                  />
                </div>
                <div className={cx('form-group')}>
                  <label htmlFor="exampleSelectGender">Chương trình giảm giá</label>
                  <Select
                    onChange={handleSelectPromotionChange}
                    style={{ width: '100%' }}
                    allowClear
                    placeholder="Chọn chương trình giảm giá"
                    options={promotions.map((item) => ({
                      label: item.name,
                      value: item.promotionId,
                    }))}
                  />
                </div>
                <div className={cx('form-group')}>
                  <label>Ảnh</label>
                  <input
                    ref={inputImageRef}
                    onChange={handleInputImageChange}
                    type="file"
                    name="img"
                    className={cx('file-upload-default')}
                  />
                  <div className={cx('input-group')}>
                    <input
                      value={imageUpload.image ? imageUpload.image.name : ''}
                      type="text"
                      className={cx('form-control', 'border-secondary', 'form-control-sm', 'file-upload-info')}
                      disabled
                      placeholder="Tải lên ảnh danh mục"
                    />
                    <button
                      onClick={() => {
                        inputImageRef.current && inputImageRef.current.click();
                      }}
                      className={cx('file-upload-browse', 'btn', 'btn-sm', 'btn-gradient-primary')}
                      type="button"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <button onClick={handleSubmit} className={cx('btn', 'btn-gradient-primary', 'me-2')}>
                  Tạo danh mục
                </button>
                <Link to="/admin/products/categories" className={cx('btn', 'btn-light')}>
                  Hủy
                </Link>
              </form>
            </div>
          </div>
        </div>
        {/* End Category form */}

        {/* Category image */}
        <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
          <div className={cx('card')}>
            <div className={cx('card-body')}>
              <h4 className={cx('card-title')}>Ảnh danh mục</h4>
              {/* <p className={cx('card-description')}> Basic form elements </p> */}
              <div className={cx('card-img-wrap')}>
                <Image src={imageUpload.imagePreview || images.placeholder} />
              </div>
            </div>
          </div>
        </div>
        {/* End Category image */}
      </div>
      {/* End Page content */}
    </>
  );
}

export default ProductCategoriesCreate;
