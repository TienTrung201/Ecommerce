import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Products() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Danh sách sản phẩm </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Sản phẩm</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0')}>Tất cả sản phẩm</h4>
                        <Link to="/admin/products/create" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
                            Thêm sản phẩm
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-striped')}>
                            <thead>
                                <tr>
                                    <th> Ảnh </th>
                                    <th> Tên sản phẩm </th>
                                    <th> Kho </th>
                                    <th> Danh mục </th>
                                    <th> Nhà cung cấp </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={cx('py-1')}>
                                        <img src={images.faces.face1} alt="" />
                                    </td>
                                    <td> Kem dưỡng ẩm nam Satellite </td>
                                    <td>100 của 2 loại</td>
                                    <td> Dưỡng ẩm </td>
                                    <td> Gucci </td>
                                </tr>
                                <tr>
                                    <td className={cx('py-1')}>
                                        <img src={images.faces.face2} alt="" />
                                    </td>
                                    <td> Kem chống nắng Satellite </td>
                                    <td>250 của 4 loại</td>
                                    <td> Kem chống nắng </td>
                                    <td> Chanel </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
