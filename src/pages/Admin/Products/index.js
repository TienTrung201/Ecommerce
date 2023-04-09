import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/api';
import { useEffect, useState } from 'react';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([getData(api.products), getData(api.categories), getData(api.providers)])
            .then((values) => {
                console.log(values);
                setProducts(values[0].data);
                setCategories(values[1]);
                setProviders(values[2]);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}> Sản phẩm </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Sản phẩm</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'm-0')}>Tất cả sản phẩm</h4>
                        <Link
                            to="/admin/products/create/0"
                            className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}
                        >
                            Thêm sản phẩm
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-hover')}>
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
                                {products.map((product) => (
                                    <tr
                                        onClick={() => {
                                            navigate(`/admin/products/update/${product.productId}`);
                                        }}
                                        className={cx('pointer')}
                                        key={product.productId}
                                    >
                                        <td className={cx('py-1')}>
                                            <img
                                                className={cx('rounded-6', 'border')}
                                                src={product.image || images.placeholder}
                                                alt=""
                                            />
                                        </td>
                                        <td className={cx('text-wrap', 'lh-base')} style={{ minWidth: '280px' }}>
                                            {product.name}
                                        </td>
                                        <td>
                                            {product.items.reduce((total, current) => total + current.qtyInStock, 0)}{' '}
                                            của {product.items.length} loại
                                        </td>
                                        <td>
                                            {(categories.length &&
                                                categories
                                                    .map((c) =>
                                                        product.categoriesId.includes(c.categoryId) ? c.name : '',
                                                    )
                                                    .filter((c) => c !== '')
                                                    .join(', ')) ||
                                                'N/A'}
                                        </td>
                                        <td>
                                            {providers.find((p) => p.providerId === product.providerId)?.name || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paging */}
                    <div className={cx('mt-5', 'd-flex', 'justify-content-end')}>
                        <Pagination current={1} onChange={(page, pageSize) => {}} total={1} size="small" simple />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
