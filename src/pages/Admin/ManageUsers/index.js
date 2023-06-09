import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import * as Unicons from '@iconscout/react-unicons';
import { Button, Collapse, Empty, Input, Pagination, Popover, Radio, Space, Spin } from 'antd';
import classNames from 'classnames/bind';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function ManageUsers() {
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);

    const [queryParams, setQueryParams] = useSearchParams();
    const [allQueryParams, setAllQueryParams] = useState({});

    useEffect(() => {
        // const page = queryParams.get('page');
        // const search = queryParams.get('search');
        // const sort = queryParams.get('sort');

        setLoading(true);

        getData(api.users)
            .then((response) => {
                console.log(response);
                setUsers(response.data);

                setTimeout(() => {
                    setLoading(false);
                }, 200);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

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

    // const handlePageParamChange = (page) => {
    //     setQueryParams({ ...allQueryParams, page: page });
    // };
    // --------- End Input change ---------

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Khách hàng</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Khách hàng</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'mb-0', 'mt-0')}>Tất cả khách hàng</h4>
                        <Link to="" className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}>
                            Thêm khách hàng
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
                                        <th> Tên người dùng </th>
                                        <th> Số điện thoại </th>
                                        <th> Email </th>
                                        <th> Hành động </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item) => (
                                        <tr key={item.userId}>
                                            <td className={cx('py-1')}>
                                                <img src={item.avatar || images.placeholder} alt="" />
                                            </td>
                                            <td>{item.fullName}</td>
                                            <td>{'-'}</td>
                                            <td>{item.email}</td>
                                            <td className={cx('')}>
                                                <button
                                                    className={cx('btn', 'btn-light', 'btn-rounded', 'btn-icon')}
                                                    title="Đặt lại mật khẩu"
                                                >
                                                    {/* <FontAwesomeIcon icon={faKey} /> */}
                                                    <Unicons.UilKeySkeletonAlt size="18" />
                                                </button>
                                                <button
                                                    className={cx(
                                                        'btn',
                                                        'btn-light',
                                                        'btn-rounded',
                                                        'btn-icon',
                                                        'ms-2',
                                                    )}
                                                    title="Xóa"
                                                >
                                                    {/* <FontAwesomeIcon icon={faTrash} /> */}
                                                    <Unicons.UilTrash size="18" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {users.length === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        </div>
                    </Spin>

                    {/* Paging */}
                    <div className={cx('mt-5', 'd-flex', 'justify-content-end')}>
                        <Pagination current={1} onChange={(page, pageSize) => {}} total={1} size="small" simple />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageUsers;
