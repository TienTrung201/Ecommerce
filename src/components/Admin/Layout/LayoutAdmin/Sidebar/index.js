import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faHouse, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminUserSelector } from '@/redux/selector';
import CustomCollapse from '@/components/Admin/CustomCollapse';
import images from '@/assets/admin/images';

const cx = classNames.bind(styles);

function Sidebar({ active }) {
    const location = useLocation();

    const handleStopBubble = (e) => {
        e.stopPropagation();
    };

    const adminUser = useSelector(adminUserSelector);

    return (
        <>
            <nav className={cx('sidebar', 'sidebar-offcanvas', 'select-none', { active: active })}>
                <ul className={cx('nav')}>
                    <li className={cx('nav-item', 'nav-profile')}>
                        <Link to={'/admin/profile'} className={cx('nav-link', 'pointer')}>
                            <div className={cx('nav-profile-image')}>
                                <img
                                    style={{ border: '1px solid #bba8bff5' }}
                                    src={adminUser.avatar || images.placeholder}
                                    alt="profile"
                                />
                            </div>
                            <div className={cx('nav-profile-text', 'd-flex', 'flex-column')}>
                                <span
                                    style={{ width: '130px' }}
                                    className={cx('font-weight-bold', 'mb-2', 'text-ellipsis')}
                                >
                                    {adminUser.fullName}
                                </span>
                                <span
                                    style={{ width: '130px' }}
                                    className={cx('text-secondary', 'text-small', 'text-ellipsis')}
                                >
                                    {adminUser.email}
                                </span>
                            </div>
                        </Link>
                    </li>

                    <li data-active="dashboard" className={cx('nav-item', { active: location.pathname === '/admin' })}>
                        <Link to="/admin" className={cx('nav-link')} href="../../index.html">
                            <i className={cx('menu-icon')}>
                                <FontAwesomeIcon icon={faHouse} />
                            </i>
                            <span className={cx('menu-title', 'ms-4')}>Tổng quan</span>
                        </Link>
                    </li>

                    <CustomCollapse title="Đơn hàng">
                        <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to="/admin/orders"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/orders'),
                                    })}
                                >
                                    Danh sách đơn hàng
                                </Link>
                            </li>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to=""
                                    className={cx('nav-link', {
                                        active: false,
                                    })}
                                >
                                    Đơn chưa hoàn tất
                                </Link>
                            </li>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to="/admin/shipping-methods"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/shipping-methods'),
                                    })}
                                >
                                    Quản lý vận chuyển
                                </Link>
                            </li>
                        </ul>
                    </CustomCollapse>

                    <CustomCollapse title="Sản phẩm" icon={faBox}>
                        <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to="/admin/products"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/products'),
                                    })}
                                >
                                    Danh sách sản phẩm
                                </Link>
                            </li>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to="/admin/categories"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/categories'),
                                    })}
                                >
                                    Danh mục sản phẩm
                                </Link>
                            </li>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to="/admin/providers"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/providers'),
                                    })}
                                >
                                    Nhà cung cấp
                                </Link>
                            </li>
                            <li onClick={handleStopBubble} className={cx('nav-item')}>
                                <Link
                                    to="/admin/product-options"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/product-options'),
                                    })}
                                >
                                    Thuộc tính sản phẩm
                                </Link>
                            </li>
                        </ul>
                    </CustomCollapse>

                    <li className={cx('nav-item', { active: location.pathname.includes('/admin/promotions') })}>
                        <Link to="/admin/promotions" className={cx('nav-link')} href="#">
                            <i className={cx('menu-icon')}>
                                <FontAwesomeIcon icon={faTags} />
                            </i>
                            <span className={cx('menu-title', 'ms-4')}>Khuyến mãi</span>
                        </Link>
                    </li>

                    <CustomCollapse title="Người dùng" icon={faUser}>
                        <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                            <li onClick={handleStopBubble} data-active="product-list" className={cx('nav-item')}>
                                <Link
                                    to="/admin/manage-admins"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/manage-admins'),
                                    })}
                                >
                                    Danh sách người dùng
                                </Link>
                            </li>
                            <li onClick={handleStopBubble} data-active="product-category" className={cx('nav-item')}>
                                <Link
                                    to="/admin/manage-roles"
                                    className={cx('nav-link', {
                                        active: location.pathname.includes('/admin/manage-roles'),
                                    })}
                                >
                                    Quản lý vai trò
                                </Link>
                            </li>
                        </ul>
                    </CustomCollapse>

                    <li className={cx('nav-item', 'sidebar-actions')}>
                        <div className={cx('border-bottom')}>
                            <h6 className={cx('font-weight-normal', 'fs-14', 'mb-3')}>Website</h6>
                        </div>
                        <button className={cx('btn', 'btn-gradient-primary', 'text-ellipsis', 'mt-4')}>
                            Đến trang bán hàng
                        </button>
                        <div className={cx('border-bottom', 'mt-4')}></div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
