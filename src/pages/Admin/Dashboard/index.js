import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import * as Unicons from '@iconscout/react-unicons';
import images from '@/assets/admin/images';
import { useEffect, useState } from 'react';
import { getData } from '@/api/service';
import { api } from '@/api';

const cx = classNames.bind(styles);

function Dashboard() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        Promise.all([
            getData(api.reports + '/total-orders'),
            getData(api.reports + '/total-sales'),
            getData(api.reports + '/total-customers'),
        ])
            .then((response) => {
                console.log(response);
                setTotalOrders(response[0].data);
                setTotalSales(response[1].data);
                setTotalCustomers(response[2].data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-items-center', 'mt-2')}>
                <h3 className={cx('page-title', 'd-flex', 'align-items-center', 'm-0')}>
                    <span className={cx('page-title-icon', 'bg-gradient-primary', 'text-white', 'me-3')}>
                        <i className={cx('mdi')}>
                            <Unicons.UilEstate size="24" />
                        </i>
                    </span>
                    Tổng quan
                </h3>
                <nav aria-label="breadcrumb">
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            <span />
                            Overview
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={cx('row', 'gx-4')}>
                {/* Block 1 */}
                <div className={cx('col-md-4', 'stretch-card', 'grid-margin')}>
                    <div className={cx('card', 'rounded-12', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            {/* <img src={images.dashboard.circleSvg} className={cx('card-img-absolute')} alt="" /> */}
                            <h4
                                className={cx(
                                    'd-flex',
                                    'align-items-center',
                                    'font-weight-normal',
                                    'mb-3',
                                    'mt-0',
                                    'fs-6',
                                )}
                            >
                                <i
                                    style={{ background: '#d8f2dc', width: '32px', height: '32px' }}
                                    className={cx(
                                        'd-inline-flex',
                                        'me-2',
                                        'rounded',
                                        'justify-content-center',
                                        'align-items-center',
                                    )}
                                >
                                    <Unicons.UilBill size="20" />
                                </i>
                                Đơn đã bán
                            </h4>
                            <h2 className={cx('mb-5', 'fw-bold')}>{totalOrders}</h2>
                            <h6 className={cx('card-text', 'fs-14', 'text-success')}>
                                <i className={cx('me-1')}>
                                    <Unicons.UilArrowGrowth size="18" />
                                </i>
                                6.0%
                            </h6>
                        </div>
                    </div>
                </div>
                {/* End Block 1 */}

                {/* Block 2 */}
                <div className={cx('col-md-4', 'stretch-card', 'grid-margin')}>
                    <div className={cx('card', 'rounded-12', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            {/* <img src={images.dashboard.circleSvg} className={cx('card-img-absolute')} alt="" /> */}
                            <h4
                                className={cx(
                                    'd-flex',
                                    'align-items-center',
                                    'font-weight-normal',
                                    'mb-3',
                                    'mt-0',
                                    'fs-6',
                                )}
                            >
                                <i
                                    style={{ background: '#eae4ff', width: '32px', height: '32px' }}
                                    className={cx(
                                        'd-inline-flex',
                                        'me-2',
                                        'rounded',
                                        'justify-content-center',
                                        'align-items-center',
                                    )}
                                >
                                    <Unicons.UilMoneybag size="20" />
                                </i>
                                Doanh thu
                            </h4>
                            <h2 className={cx('mb-5', 'fw-bold')}>{totalSales / 1000000}M</h2>
                            <h6 className={cx('card-text', 'fs-14', 'text-danger')}>
                                <i className={cx('me-1')}>
                                    <Unicons.UilChartDown size="18" />
                                </i>
                                0.1%
                            </h6>
                        </div>
                    </div>
                </div>
                {/* End Block 2 */}

                {/* Block 3 */}
                <div className={cx('col-md-4', 'stretch-card', 'grid-margin')}>
                    <div className={cx('card', 'rounded-12', 'shadow-sm')}>
                        <div className={cx('card-body')}>
                            {/* <img src={images.dashboard.circleSvg} className={cx('card-img-absolute')} alt="" /> */}
                            <h4
                                className={cx(
                                    'd-flex',
                                    'align-items-center',
                                    'font-weight-normal',
                                    'mb-3',
                                    'mt-0',
                                    'fs-6',
                                )}
                            >
                                <i
                                    style={{ background: '#f4e9dd', width: '32px', height: '32px' }}
                                    className={cx(
                                        'd-inline-flex',
                                        'me-2',
                                        'rounded',
                                        'justify-content-center',
                                        'align-items-center',
                                    )}
                                >
                                    <Unicons.UilUserPlus size="20" />
                                </i>
                                Khách hàng
                            </h4>
                            <h2 className={cx('mb-5', 'fw-bold')}>{totalCustomers}</h2>
                            <h6 className={cx('card-text', 'fs-14', 'text-success')}>
                                <i className={cx('me-1')}>
                                    <Unicons.UilArrowGrowth size="18" />
                                </i>
                                9.0%
                            </h6>
                        </div>
                    </div>
                </div>
                {/* End Block   3 */}
            </div>

            {/* Block 4 */}
            <div className={cx('row')}>
                <div className={cx('col-md-12', 'stretch-card', 'grid-margin')}>
                    <div
                        style={{ backgroundColor: '#dfd6c9', minHeight: '200px' }}
                        className={cx('card', 'rounded-12', 'card-img-holder')}
                    >
                        <div className={cx('card-body', 'd-flex', 'flex-column')}>
                            <h2 className={cx('mb-2', 'mt-4', 'fs-4')} style={{ color: '#634944' }}>
                                Tải app Bellissa cho smartphone
                            </h2>
                            <p className={cx('mb-4')} style={{ color: '#634944' }}>
                                Giúp bạn bán hàng, theo dõi đơn hàng, xem báo cáo thuận tiện.
                            </p>
                            <div className={cx('mt-auto', 'mb-4')}>
                                <button className={cx('btn', 'btn-sm', 'btn-primary')}>
                                    <Unicons.UilImport size="18" className={cx('me-2')} />
                                    Tải app ngay
                                </button>
                            </div>
                            <img
                                src={images.mockup}
                                className={cx('card-img-absolute', 'd-none', 'd-md-inline-block')}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Block 4 */}
        </>
    );
}

export default Dashboard;
