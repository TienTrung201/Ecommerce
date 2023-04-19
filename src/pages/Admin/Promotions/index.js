import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getData } from '@/api/service';
import { api } from '@/api';
import dayjs from 'dayjs';
import * as Unicons from '@iconscout/react-unicons';
import { Button, Collapse, Pagination, Popover, Radio, Space, Input, Spin, Empty } from 'antd';
import { debounce } from 'lodash';

const cx = classNames.bind(styles);

const { Panel } = Collapse;

function Promotions() {
    const [loading, setLoading] = useState(false);

    const [promotions, setPromotions] = useState([]);

    const [queryParams, setQueryParams] = useSearchParams();
    const [allQueryParams, setAllQueryParams] = useState({});

    const navigate = useNavigate();

    // Get promotions
    useEffect(() => {
        setLoading(true);
        const search = queryParams.get('search');
        const sort = queryParams.get('sort');
        const status = queryParams.get('status');

        getData(api.promotions + `?search=${search || ''}&sort=${sort || ''}&status=${status || ''}`)
            .then((response) => {
                console.log(response);

                setPromotions(response.data);

                setTimeout(() => {
                    setLoading(false);
                }, 200);
            })
            .catch((error) => {
                console.warn(error.message);
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
    // --------- End Input change ---------

    const renderPromotions = useMemo(() => {
        const dateNow = new Date();

        return promotions.map((promotion) => {
            let status = '';
            if (dateNow > new Date(promotion.endDate)) {
                status = 'expired';
            } else if (dateNow < new Date(promotion.startDate)) {
                status = 'comming';
            } else {
                status = 'active';
            }
            return (
                <tr
                    onClick={() => {
                        navigate(`/admin/promotions/update/${promotion.promotionId}`);
                    }}
                    className={cx('pointer')}
                    key={promotion.promotionId}
                >
                    <td className={cx('py-1')}>{promotion.name}</td>
                    <td>{promotion.discountRate}%</td>
                    <td>
                        {status === 'active' ? (
                            <span className={cx('badge', 'badge-success')}>Đang áp dụng</span>
                        ) : status === 'expired' ? (
                            <span className={cx('badge', 'badge-light')}>Đã hết hạn</span>
                        ) : (
                            <span className={cx('badge', 'badge-info')}>Chưa áp dụng</span>
                        )}
                    </td>
                    <td>{dayjs(promotion.startDate).format('DD/MM/YYYY')}</td>
                    <td>{dayjs(promotion.endDate).format('DD/MM/YYYY')}</td>
                </tr>
            );
        });
    }, [promotions, navigate]);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Khuyến mãi</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Khuyến mãi</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'm-0')}>Tất cả khuyến mãi</h4>
                        <Link
                            to="/admin/promotions/create/0"
                            className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}
                        >
                            Tạo khuyến mãi
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
                                                        <Radio value={'discountDesc'}>Giá trị lớn - nhỏ</Radio>
                                                        <Radio value={'discountAsc'}>Giá trị nhỏ - lớn</Radio>
                                                        <Radio value={'nameAsc'}>Tên A - Z</Radio>
                                                        <Radio value={'nameDesc'}>Tên Z - A</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </Panel>
                                            <Panel header="Trạng thái" key="2">
                                                <Radio.Group onChange={handleStatusParamChange}>
                                                    <Space size="small" direction="vertical">
                                                        <Radio value={'active'}>Đang áp dụng</Radio>
                                                        <Radio value={'comming'}>Chưa áp dụng</Radio>
                                                        <Radio value={'expired'}>Đã hết hạn</Radio>
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

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <Spin spinning={loading}>
                            <table className={cx('table', 'table-hover', 'overflow-x-auto')}>
                                <thead>
                                    <tr>
                                        <th> Khuyến mãi </th>
                                        <th> Giảm giá </th>
                                        <th> Trạng thái </th>
                                        <th> Ngày bắt đầu </th>
                                        <th> Ngày kết thúc </th>
                                    </tr>
                                </thead>
                                <tbody>{renderPromotions}</tbody>
                            </table>

                            {renderPromotions.length === 0 && !loading && (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </Spin>
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

export default Promotions;
