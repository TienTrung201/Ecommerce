import images from '@/assets/admin/images';
import './statusMessage.css';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { uploadFile } from '@/firebase/service';
import { Image, message, Select } from 'antd';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductCategoriesCreate() {
    const [messageApi, contextHolder] = message.useMessage();
    const [imageUpload, setImageUpload] = useState({ image: null, imagePreview: '' });
    const [categoryName, setCategoryName] = useState('');
    const [promotions, setPromotions] = useState([
        { name: 'Siêu sale sinh nhật', promotionId: 'p01' },
        { name: 'Flash sale', promotionId: 'p02' },
    ]);
    const [promotionInput, setPromotionInput] = useState(null);
    const inputImageRef = useRef();

    const loading = (content) => {
        messageApi.open({
            type: 'loading',
            content: content,
            duration: 5.5,
            className: 'antd-status-mesage',
        });
    };

    const success = (content) => {
        messageApi.open({
            type: 'success',
            content: content,
            duration: 2.5,
            className: 'antd-status-mesage',
        });
    };

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
            loading('Đang tạo danh mục');
            if (imageUpload.image) {
                uploadFile(imageUpload.image, '/images/categories', (response) => {
                    const data = {
                        name: categoryName,
                        image: response.url,
                        promotionId: promotionInput,
                    };
                    console.log(data);
                    setTimeout(() => {
                        messageApi.destroy();
                        success('Tạo danh mục thành công');
                    }, 2500);
                });
            } else {
                const data = {
                    name: categoryName,
                    image: null,
                    promotionId: promotionInput,
                };
                console.log(data);

                setTimeout(() => {
                    messageApi.destroy();
                    success('Tạo danh mục thành công');
                }, 1000);
            }
        }
    };

    return (
        <>
            {contextHolder}
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
                                            className={cx(
                                                'form-control',
                                                'border-secondary',
                                                'form-control-sm',
                                                'file-upload-info',
                                            )}
                                            disabled
                                            placeholder="Tải lên ảnh danh mục"
                                        />
                                        <button
                                            onClick={() => {
                                                inputImageRef.current && inputImageRef.current.click();
                                            }}
                                            className={cx(
                                                'file-upload-browse',
                                                'btn',
                                                'btn-sm',
                                                'btn-gradient-primary',
                                            )}
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
