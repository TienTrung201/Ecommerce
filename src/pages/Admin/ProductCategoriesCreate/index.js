import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Image, Select } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductCategoriesCreate() {
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
                            <p className={cx('card-description')}> Basic form elements </p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên danh mục</label>
                                    <input
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên danh mục"
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleSelectGender">Chương trình giảm giá</label>
                                    <Select
                                        style={{ width: '100%' }}
                                        allowClear
                                        placeholder="Chọn chương trình giảm giá"
                                        options={['Dior', 'Chanel'].map((item) => ({ label: item, value: item }))}
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label>Ảnh</label>
                                    <input type="file" name="img[]" className={cx('file-upload-default')} />
                                    <div className={cx('input-group')}>
                                        <input
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
                                <button type="submit" className={cx('btn', 'btn-gradient-primary', 'me-2')}>
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
                                <Image src={images.placeholder} />
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
