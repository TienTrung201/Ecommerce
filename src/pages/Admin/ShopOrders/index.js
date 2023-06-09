import { api } from '@/api';
import { getData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Button, Collapse, Empty, Input, Pagination, Popover, Radio, Space, Spin } from 'antd';
import classNames from 'classnames/bind';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as Unicons from '@iconscout/react-unicons';
import { debounce } from 'lodash';
import currencyConvert from '@/service/currencyConvert';

const cx = classNames.bind(styles);

const { Panel } = Collapse;

dayjs.extend(utc);
dayjs.extend(timezone);

function ShopOrders() {
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [shopOrders, setShopOrders] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);

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
                api.shopOrders + `?page=${page || 1}&search=${search || ''}&sort=${sort || ''}&status=${status || ''}`,
            ),
            getData(api.orderStatuses),
        ])
            .then((response) => {
                console.log(response);
                setShopOrders(response[0].data);
                setTotalPages(response[0].totalPages * 10);

                setOrderStatuses(response[1].data);

                setTimeout(() => {
                    setLoading(false);
                }, 200);
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

    const getCurrentStatus = useCallback(
        (shopOrder) => {
            const orderStatus = orderStatuses.find((os) => os.orderStatusId === shopOrder.orderStatusId);

            let className = '';
            switch (orderStatus?.status) {
                case 'created':
                    className = 'badge-warning';
                    break;
                case 'delivery':
                    className = 'badge-info';
                    break;
                case 'canceled':
                    className = 'badge-light';
                    break;
                case 'success':
                    className = 'badge-success';
                    break;
                default:
                    className = 'badge-info';
                    break;
            }

            return {
                className: className,
                name: orderStatus?.name || 'N/A',
            };
        },
        [orderStatuses],
    );

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Đơn hàng</h3>
                <nav>
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}></li>
                        <li className={cx('breadcrumb-item', 'active')}>Đơn hàng</li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'm-0')}>Tất cả đơn hàng</h4>
                        <Link to="/admin/orders" className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}>
                            Tạo đơn hàng
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
                                    <div style={{ maxHeight: '240px' }} className={cx('overflow-y-auto')}>
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
                                                        <Radio value={'totalDesc'}>Tổng tiền lớn - nhỏ</Radio>
                                                        <Radio value={'totalAsc'}>Tổng tiền nhỏ - lớn</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </Panel>
                                            <Panel header="Trạng thái" key="2">
                                                <Radio.Group onChange={handleStatusParamChange}>
                                                    <Space size="small" direction="vertical">
                                                        <Radio value={'created'}>Đã tạo đơn hàng</Radio>
                                                        <Radio value={'delivery'}>Đang giao hàng</Radio>
                                                        <Radio value={'canceled'}>Đã huỷ đơn</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </Panel>
                                        </Collapse>
                                    </div>
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
                        <div className={cx('w-100', 'overflow-x-auto')}>
                            <table className={cx('table', 'table-hover')}>
                                <thead>
                                    <tr>
                                        <th>Đơn hàng</th>
                                        <th>Ngày đặt</th>
                                        <th>Khách hàng</th>
                                        <th>Thanh toán</th>
                                        <th>Trạng thái</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shopOrders.map((shopOrder) => (
                                        <tr
                                            key={shopOrder.orderId}
                                            className={cx('pointer')}
                                            onClick={() => {
                                                navigate(`/admin/orders/detail/${shopOrder.orderId}`);
                                            }}
                                        >
                                            <td className={cx('py-1')}>#{shopOrder.orderId}</td>
                                            <td>
                                                {dayjs(shopOrder.orderDate)
                                                    .utcOffset(7)
                                                    .tz('Asia/Bangkok')
                                                    .format('DD/MM/YYYY HH:mm')}
                                            </td>
                                            <td>{shopOrder?.user?.fullName || 'N/A'}</td>
                                            <td>
                                                {shopOrder?.paymentMethodId ? (
                                                    <span className={cx('badge', 'badge-light')}>Đã thanh toán</span>
                                                ) : (
                                                    <span className={cx('badge', 'badge-warning')}>
                                                        TT khi nhận hàng
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <span
                                                    className={cx('badge', `${getCurrentStatus(shopOrder).className}`)}
                                                >
                                                    {getCurrentStatus(shopOrder).name}
                                                </span>
                                            </td>
                                            <td>{currencyConvert(shopOrder.orderTotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {shopOrders.length === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
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

export default ShopOrders;
