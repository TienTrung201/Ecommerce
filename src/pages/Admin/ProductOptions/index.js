import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { api } from '@/api';
import { getData } from '@/api/service';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductOptions() {
    const [productOptions, setProductOptions] = useState([]);
    // test test test
    const navigate = useNavigate();

    useEffect(() => {
        getData(api.productOptions)
            .then((response) => {
                console.log(response);
                setProductOptions(response);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Thuộc tính</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/products">Sản phẩm</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')}>Thuộc tính</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0', 'mt-0')}>Tất cả người dùng</h4>
                        <Link
                            to="/admin/product-options/create/0"
                            className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}
                        >
                            Thêm thuộc tính
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Loại thuộc tính </th>
                                    <th> Danh sách thuộc tính </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productOptions.map((optionType, index) => (
                                    <tr
                                        onClick={() => {
                                            navigate(`/admin/product-options/update/${optionType.optionTypeId}`);
                                        }}
                                        key={optionType.optionTypeId}
                                        className={cx('pointer')}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{optionType.name}</td>
                                        <td>
                                            <div className={cx('text-wrap')}>
                                                {optionType?.options.map((option) => (
                                                    <span
                                                        key={option.productOptionId}
                                                        className={cx('badge', 'badge-info', 'm-1')}
                                                    >
                                                        {option.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductOptions;
