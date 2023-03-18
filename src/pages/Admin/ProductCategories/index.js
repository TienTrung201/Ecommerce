import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductCategories() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Danh mục sản phẩm </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/products">Sản phẩm</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Danh mục sản phẩm
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả danh mục</h4>
                        <Link
                            to="/admin/products/categories/create"
                            className={cx('btn', 'btn-gradient-primary', 'btn-md')}
                        >
                            Tạo danh mục
                        </Link>
                    </div>

                    <table className={cx('table', 'table-striped')}>
                        <thead>
                            <tr>
                                <th> Ảnh </th>
                                <th> Tên danh mục </th>
                                <th> Khuyến mãi </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('py-1')}>
                                    <img src={images.faces.face1} alt="" />
                                </td>
                                <td> Herman Beck </td>
                                <td>
                                    <div className={cx('progress')}>
                                        <div
                                            className={cx('progress-bar', 'bg-success')}
                                            role="progressbar"
                                            style={{ width: '25%' }}
                                            aria-valuenow={25}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('py-1')}>
                                    <img src={images.faces.face2} alt="" />
                                </td>
                                <td> Messsy Adam </td>
                                <td>
                                    <div className={cx('progress')}>
                                        <div
                                            className={cx('progress-bar', 'bg-danger')}
                                            role="progressbar"
                                            style={{ width: '75%' }}
                                            aria-valuenow={75}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ProductCategories;
