import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import images from '@/assets/admin/images';
import * as Unicons from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <>
            <div className={cx('page-header', 'align-items-center', 'mt-2')}>
                <h3 className={cx('page-title', 'd-flex', 'align-items-center', 'm-0')}>
                    <span className={cx('page-title-icon', 'bg-gradient-primary', 'text-white', 'me-3')}>
                        <i className={cx('mdi')}>
                            {/* <FontAwesomeIcon icon={faHouse} /> */}
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
                <div className={cx('col-md-4', 'stretch-card', 'grid-margin')}>
                    <div className={cx('card', 'bg-gradient-danger', 'card-img-holder', 'text-white')}>
                        <div className={cx('card-body')}>
                            <img src={images.dashboard.circleSvg} className={cx('card-img-absolute')} alt="" />
                            <h4 className={cx('font-weight-normal', 'mb-3')}>
                                Weekly Sales{' '}
                                <i className={cx('mdi', 'mdi-24px', 'float-right')}>
                                    <FontAwesomeIcon icon={faChartLine} />
                                </i>
                            </h4>
                            <h2 className={cx('mb-5')}>$ 15,0000</h2>
                            <h6 className={cx('card-text')}>Increased by 60%</h6>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-4', 'stretch-card', 'grid-margin')}>
                    <div className={cx('card', 'bg-gradient-info', 'card-img-holder', 'text-white')}>
                        <div className={cx('card-body')}>
                            <img src={images.dashboard.circleSvg} className={cx('card-img-absolute')} alt="" />
                            <h4 className={cx('font-weight-normal', 'mb-3')}>
                                Weekly Orders{' '}
                                <i className={cx('mdi', 'mdi-24px', 'float-right')}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </i>
                            </h4>
                            <h2 className={cx('mb-5')}>45,6334</h2>
                            <h6 className={cx('card-text')}>Decreased by 10%</h6>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-4', 'stretch-card', 'grid-margin')}>
                    <div className={cx('card', 'bg-gradient-success', 'card-img-holder', 'text-white')}>
                        <div className={cx('card-body')}>
                            <img src={images.dashboard.circleSvg} className={cx('card-img-absolute')} alt="" />
                            <h4 className={cx('font-weight-normal', 'mb-3')}>
                                Visitors Online{' '}
                                <i className={cx('mdi', 'mdi-24px', 'float-right')}>
                                    <FontAwesomeIcon icon={faStar} />
                                </i>
                            </h4>
                            <h2 className={cx('mb-5')}>95,5741</h2>
                            <h6 className={cx('card-text')}>Increased by 5%</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('col-12', 'grid-margin')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Recent Tickets</h4>
                            <div className={cx('table-responsive')}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th> Assignee </th>
                                            <th> Subject </th>
                                            <th> Status </th>
                                            <th> Last Update </th>
                                            <th> Tracking ID </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={images.faces.face1} className={cx('me-2')} alt="" /> David
                                                Grey
                                            </td>
                                            <td> Fund is not recieved </td>
                                            <td>
                                                <label className={cx('badge', 'badge-gradient-success')}>DONE</label>
                                            </td>
                                            <td> Dec 5, 2017 </td>
                                            <td> WD-12345 </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={images.faces.face2} className={cx('me-2')} alt="" /> Stella
                                                Johnson
                                            </td>
                                            <td> High loading time </td>
                                            <td>
                                                <label className={cx('badge', 'badge-gradient-warning')}>
                                                    PROGRESS
                                                </label>
                                            </td>
                                            <td> Dec 12, 2017 </td>
                                            <td> WD-12346 </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={images.faces.face3} className={cx('me-2')} alt="" /> Marina
                                                Michel
                                            </td>
                                            <td> Website down for one week </td>
                                            <td>
                                                <label className={cx('badge', 'badge-gradient-info')}>ON HOLD</label>
                                            </td>
                                            <td> Dec 16, 2017 </td>
                                            <td> WD-12347 </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={images.faces.face4} className={cx('me-2')} alt="" /> John Doe
                                            </td>
                                            <td> Loosing control on server </td>
                                            <td>
                                                <label className={cx('badge', 'badge-gradient-danger')}>REJECTED</label>
                                            </td>
                                            <td> Dec 3, 2017 </td>
                                            <td> WD-12348 </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
