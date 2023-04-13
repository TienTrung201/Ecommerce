import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/api';
import { useEffect, useMemo, useState } from 'react';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import * as Unicons from '@iconscout/react-unicons';
import { Button, Collapse, Empty, Input, Pagination, Popover, Radio, Space, Spin } from 'antd';
import { debounce } from 'lodash';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function Products() {
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);

    const [queryParams, setQueryParams] = useSearchParams();
    const [allQueryParams, setAllQueryParams] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const page = queryParams.get('page');
        const search = queryParams.get('search');
        const sort = queryParams.get('sort');
        const status = queryParams.get('status');

        setLoading(true);

        Promise.all([
            getData(
                api.products + `?page=${page || 1}&search=${search || ''}&sort=${sort || ''}&status=${status || ''}`,
            ),
            getData(api.categories),
            getData(api.providers),
        ])
            .then((values) => {
                console.log(values);
                setProducts(values[0].data);
                setTotalPages(values[0].totalPages * 10);
                setCategories(values[1]);
                setProviders(values[2]);

                setTimeout(() => {
                    setLoading(false);
                }, 400);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, [queryParams]);

    // Get all query params
    useEffect(() => {
        const allParams = {};
        queryParams.forEach((value, key) => {
            allParams[key] = value;
        });

        setAllQueryParams(allParams);
    }, [queryParams]);

    // --------- Input change ---------
    // Delay search
    const handleDebounceSearch = useMemo(() => {
        return debounce((value) => {
            setQueryParams({ ...allQueryParams, search: value });
        }, 500);
    }, [setQueryParams, allQueryParams]);

    const handleSearchParamChange = (e) => {
        handleDebounceSearch(e.target.value);
    };

    const handleSortParamChange = (e) => {
        let value = e.target.value;
        setQueryParams({ ...allQueryParams, sort: value });
    };

    const handleStatusParamChange = (e) => {
        let value = e.target.value;
        setQueryParams({ ...allQueryParams, status: value });
    };

    const handlePageParamChange = (page) => {
        setQueryParams({ ...allQueryParams, page: page });
    };
    // --------- End Input change ---------

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

                    {/* Search and filter */}
                    <div className={cx('w-100', 'pt-2', 'pb-2')}>
                        <Space.Compact block>
                            <Input
                                onChange={handleSearchParamChange}
                                placeholder="Tìm kiếm"
                                prefix={<Unicons.UilSearch size="16" />}
                            />
                            <Popover
                                title="Filter"
                                placement="bottom"
                                trigger="click"
                                content={
                                    <>
                                        <Collapse
                                            defaultActiveKey={1}
                                            size="small"
                                            ghost
                                            accordion
                                            expandIconPosition="end"
                                        >
                                            <Panel header="Sắp xếp" key="1">
                                                <Radio.Group onChange={handleSortParamChange}>
                                                    <Space size="small" direction="vertical">
                                                        <Radio value={'creationTimeDesc'}>Mới hơn</Radio>
                                                        <Radio value={'creationTimeAsc'}>Cũ hơn</Radio>
                                                        <Radio value={'nameAsc'}>Tên A - Z</Radio>
                                                        <Radio value={'nameDesc'}>Tên Z - A</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </Panel>
                                            <Panel header="Trạng thái" key="2">
                                                <Radio.Group onChange={handleStatusParamChange}>
                                                    <Space size="small" direction="vertical">
                                                        <Radio value={'inStock'}>Còn hàng</Radio>
                                                        <Radio value={'soldOut'}>Hết hàng</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </Panel>
                                        </Collapse>
                                    </>
                                }
                            >
                                <Button
                                    className={cx('d-flex', 'align-items-center')}
                                    icon={<Unicons.UilFilter size="16" />}
                                >
                                    <span className={cx('ps-1')}>Filter</span>
                                </Button>
                            </Popover>
                        </Space.Compact>
                    </div>
                    {/* End Search and filter */}

                    <Spin spinning={loading}>
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
                                                {product.items.reduce(
                                                    (total, current) => total + current.qtyInStock,
                                                    0,
                                                )}{' '}
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
                                                {providers.find((p) => p.providerId === product.providerId)?.name ||
                                                    'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        </div>
                    </Spin>

                    {/* Paging */}
                    <div className={cx('mt-5', 'd-flex', 'justify-content-end')}>
                        <Pagination
                            current={queryParams.get('page') || 1}
                            onChange={handlePageParamChange}
                            total={totalPages}
                            size="small"
                            simple
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
