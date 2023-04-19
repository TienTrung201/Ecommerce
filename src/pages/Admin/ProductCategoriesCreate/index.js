import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import './statusMessage.css';
import * as Unicons from '@iconscout/react-unicons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '@/firebase/service';
import { Image, Popconfirm, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteData, getData, postData, updateData } from '@/api/service';
import { api } from '@/api';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import Validator from '@/Validator/Validator';

const cx = classNames.bind(styles);

function ProductCategoriesCreate() {
    const [promotions, setPromotions] = useState([]);

    const [imageUpload, setImageUpload] = useState({ image: null, imagePreview: '' });
    const [categoryName, setCategoryName] = useState('');
    const [promotionInput, setPromotionInput] = useState(null);

    const [categoryNameError, setCategoryNameError] = useState('');

    const inputImageRef = useRef();
    const dispatch = useDispatch();
    const { action, id } = useParams();
    const navigate = useNavigate();

    // Get promotions
    useEffect(() => {
        getData(api.promotions)
            .then((response) => {
                console.log('promotions: ', response);
                setPromotions(response.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    // Get category for update
    useEffect(() => {
        if (action === 'update') {
            getData(api.categories + '/' + id)
                .then((response) => {
                    console.log('category: ', response);

                    const data = response.data;

                    setCategoryName(data.name);
                    setPromotionInput(data.promotionId);
                    setImageUpload({
                        image: data.image,
                        imagePreview: data.image,
                    });
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }, [action, id]);

    // ---------- Handle validate input ----------
    const handleValidateCategoryName = () => {
        const isValidate = Validator({
            setErrorMessage: setCategoryNameError,
            rules: [Validator.isRequired(categoryName, 'Bạn chưa nhập tên danh mục')],
        });

        return isValidate;
    };
    // ---------- Handle validate input ----------

    // ---------- Handle input ----------
    const handleInputImageChange = (e) => {
        setImageUpload({
            image: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleInputCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
        setCategoryNameError('');
    };

    const handleSelectPromotionChange = (value) => {
        setPromotionInput(value);
    };
    // ---------- End Handle intput ----------

    // Generate data for create and update
    const generateData = async () => {
        const data = {
            name: categoryName,
            image: imageUpload.image,
            promotionId: promotionInput,
        };

        if (data.image && typeof imageUpload.image != 'string') {
            const uploadedImage = await uploadFile(imageUpload.image, '/images/categories');
            data.image = uploadedImage.url;
        }

        return data;
    };

    // ---------- Handle submit ----------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidateCategoryName()) {
            dispatch(notificationsSlice.actions.showLoading('Đang tạo danh mục'));
            const data = await generateData();

            postData(api.categories, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Tạo danh mục thành công'));
                        clearInputs();
                        navigate('/admin/categories');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Tạo danh mục thất bại'));
                });
        }
    };
    // ---------- End Handle submit ----------

    // ---------- Handle update ----------
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (handleValidateCategoryName()) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            const data = await generateData();

            updateData(api.categories + '/' + id, data)
                .then((response) => {
                    console.log(response);

                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        navigate('/admin/categories');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Cập nhật thất bại'));
                });
        }
    };
    // ---------- End Handle update ----------

    // ---------- Handle delete ----------
    const handleDelete = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xóa'));

        deleteData(api.categories + '/' + id)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    navigate('/admin/categories');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Xóa thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
            });
    };
    // ---------- Handle delete ----------

    // Clear input
    const clearInputs = () => {
        setCategoryName('');
        setPromotions('');
        setImageUpload({ image: null, imagePreview: '' });
    };

    return (
        <>
            {/* Page header */}
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>
                    {action === 'update' ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
                </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/categories">Danh mục</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            {action === 'update' ? 'Cập nhật danh mục' : 'Thêm danh mục'}
                        </li>
                    </ol>
                </nav>
            </div>
            {/* End Page header */}

            {/* Page content */}
            <div className={cx('row', 'g-4', 'align-items-start')}>
                {/* Category form */}
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'm-0')}>Danh mục</h4>
                            <p className={cx('card-description')}></p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên danh mục</label>
                                    <input
                                        onChange={handleInputCategoryNameChange}
                                        onBlur={handleValidateCategoryName}
                                        value={categoryName}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên danh mục"
                                    />
                                    <span className={cx('text-danger', 'fs-14')}>{categoryNameError}</span>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleSelectGender">Chương trình giảm giá</label>
                                    <Select
                                        onChange={handleSelectPromotionChange}
                                        value={promotionInput}
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
                                        <button
                                            onClick={() => {
                                                inputImageRef.current && inputImageRef.current.click();
                                            }}
                                            className={cx(
                                                'file-upload-browse',
                                                'btn',
                                                'btn-sm',
                                                'btn-outline-secondary',
                                            )}
                                            type="button"
                                        >
                                            <Unicons.UilUpload size="14" className={cx('me-2')} />
                                            Upload
                                        </button>
                                    </div>
                                </div>

                                {action === 'update' ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                        >
                                            Cập nhật
                                        </button>
                                        <Popconfirm
                                            title="Xóa danh mục"
                                            description="Bạn có chắc chắn muốn xóa danh mục?"
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
                                    <button
                                        onClick={handleSubmit}
                                        className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                    >
                                        Tạo danh mục
                                    </button>
                                )}
                                <Link to="/admin/categories" className={cx('btn', 'btn-light')}>
                                    Hủy
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
                {/* End Category form */}

                {/* Category image */}
                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title', 'mt-0')}>Ảnh danh mục</h4>
                            {/* <p className={cx('card-description')}> Basic form elements </p> */}
                            <div className={cx('card-img-wrap')}>
                                <Image className={cx('rounded')} src={imageUpload.imagePreview || images.placeholder} />
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
