import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';

import * as Unicons from '@iconscout/react-unicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminUserSelector } from '@/redux/selector';
import { useEffect, useState } from 'react';
import images from '@/assets/admin/images';

const cx = classNames.bind(styles);

function Navbar({ onClickActiveSidebar, onClickIconOnly }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const navigate = useNavigate();

    const adminUser = useSelector(adminUserSelector);

    // Handle sign out
    const handleSignOut = (e) => {
        e.preventDefault();

        localStorage.setItem('token', '');
        window.location.reload();
    };

    useEffect(() => {
        const handleCloseMenu = () => {
            setShowAccountMenu(false);
            setShowNotifications(false);
        };

        document.addEventListener('click', handleCloseMenu);

        return () => {
            document.removeEventListener('click', handleCloseMenu);
        };
    }, []);

    return (
        <>
            <nav
                className={cx(
                    'navbar',
                    'default-layout-navbar',
                    'col-lg-12',
                    'col-12',
                    'p-0',
                    'fixed-top',
                    'd-flex',
                    'flex-row',
                    'select-none',
                )}
            >
                <div className={cx('navbar-brand-wrapper', 'd-flex', 'align-items-center', 'justify-content-center')}>
                    <Link to={'/admin'} className={cx('navbar-brand', 'brand-logo')} style={{ padding: '0 40px' }}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                    <Link to={'/admin'} className={cx('navbar-brand', 'brand-logo-mini', 'text-center')}>
                        <img src={images.logoMini} alt="logo" />
                    </Link>
                </div>
                <div className={cx('navbar-menu-wrapper', 'd-flex', 'align-items-stretch')}>
                    <button
                        onClick={onClickIconOnly}
                        className={cx('navbar-toggler', 'navbar-toggler', 'align-self-center')}
                        type="button"
                    >
                        <span className={cx('mdi')}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </button>
                    <div className={cx('search-field', 'd-none', 'd-md-block')}>
                        <form className={cx('d-flex', 'align-items-center', 'h-100')} action="#">
                            <div className={cx('input-group', 'border', 'rounded')}>
                                <div className={cx('input-group-prepend', 'bg-transparent')}>
                                    <i className={cx('input-group-text', 'border-0', 'mdi')}>
                                        <Unicons.UilSearch size="16" />
                                    </i>
                                </div>
                                <input
                                    type="text"
                                    className={cx('form-control', 'bg-transparent', 'border-0')}
                                    placeholder="Tìm kiếm"
                                />
                            </div>
                        </form>
                    </div>
                    <ul className={cx('navbar-nav', 'navbar-nav-right')}>
                        <li className={cx('nav-item', 'nav-profile', 'dropdown')}>
                            <div className={cx('nav-link', 'pointer', 'select-none')}>
                                <div className={cx('nav-profile-img')}>
                                    <img
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowAccountMenu(!showAccountMenu);
                                        }}
                                        style={{ border: '1px solid #bba8bff5' }}
                                        src={adminUser.avatar || images.placeholder}
                                        alt=""
                                    />
                                    {/* <span className={cx('availability-status', 'online')}></span> */}
                                </div>
                            </div>
                            <ul
                                className={cx(
                                    'dropdown-menu',
                                    'dropdown-menu-right',
                                    'navbar-dropdown',
                                    'preview-list',
                                    'overflow-hidden',
                                    {
                                        show: showAccountMenu,
                                    },
                                )}
                            >
                                <li
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/admin/profile');
                                    }}
                                    className={cx('dropdown-item', 'preview-item', 'fs-14', 'pointer')}
                                >
                                    {/* <FontAwesomeIcon className={cx('text-secondary')} icon={faUser} /> */}
                                    <Unicons.UilUser size="18" />
                                    <span className={cx('ms-2')}>Tài khoản của bạn</span>
                                </li>
                                <li
                                    onClick={handleSignOut}
                                    className={cx('dropdown-item', 'preview-item', 'fs-14', 'pointer')}
                                >
                                    {/* <FontAwesomeIcon className={cx('text-secondary')} icon={faArrowRightFromBracket} /> */}
                                    <Unicons.UilSignOutAlt size="18" />
                                    <span className={cx('ms-2')}>Đăng xuất</span>
                                </li>
                            </ul>
                        </li>

                        <li className={cx('nav-item', 'dropdown')}>
                            <span className={cx('nav-link', 'count-indicator', 'dropdown-toggle')}>
                                <i
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowNotifications(!showNotifications);
                                    }}
                                    className={cx('mdi', 'pointer')}
                                >
                                    <FontAwesomeIcon icon={faBell} />
                                </i>
                                <span className={cx('count-symbol', 'bg-danger')}></span>
                            </span>
                            <div
                                className={cx(
                                    'dropdown-menu',
                                    'dropdown-menu-right',
                                    'navbar-dropdown',
                                    'preview-list',
                                    {
                                        show: showNotifications,
                                    },
                                )}
                                aria-labelledby="notificationDropdown"
                            >
                                <h6 className={cx('p-3', 'mb-0')}>Notifications</h6>
                                <div className={cx('dropdown-divider')}></div>
                                <span className={cx('dropdown-item', 'preview-item', 'pointer')}>
                                    <div className={cx('preview-thumbnail')}>
                                        <div className={cx('preview-icon', 'bg-success')}>
                                            <i className={cx('mdi', 'mdi-calendar')}></i>
                                        </div>
                                    </div>
                                    <div
                                        className={cx(
                                            'preview-item-content',
                                            'd-flex',
                                            'align-items-start',
                                            'flex-column',
                                            'justify-content-center',
                                        )}
                                    >
                                        <h6 className={cx('preview-subject', 'font-weight-normal', 'mb-1')}>
                                            Event today
                                        </h6>
                                        <p className={cx('text-gray', 'ellipsis', 'mb-0')}>
                                            Just a reminder that you have an event today
                                        </p>
                                    </div>
                                </span>
                                <div className={cx('dropdown-divider')}></div>
                                <span className={cx('dropdown-item', 'preview-item', 'pointer')}>
                                    <div className={cx('preview-thumbnail')}>
                                        <div className={cx('preview-icon', 'bg-warning')}>
                                            <i className={cx('mdi', 'mdi-settings')}></i>
                                        </div>
                                    </div>
                                    <div
                                        className={cx(
                                            'preview-item-content',
                                            'd-flex',
                                            'align-items-start',
                                            'flex-column',
                                            'justify-content-center',
                                        )}
                                    >
                                        <h6 className={cx('preview-subject', 'font-weight-normal', 'mb-1')}>
                                            Settings
                                        </h6>
                                        <p className={cx('text-gray', 'ellipsis', 'mb-0')}>Update dashboard</p>
                                    </div>
                                </span>
                                <div className={cx('dropdown-divider')}></div>
                                <span className={cx('dropdown-item', 'preview-item', 'pointer')}>
                                    <div className={cx('preview-thumbnail')}>
                                        <div className={cx('preview-icon', 'bg-info')}>
                                            <i className={cx('mdi', 'mdi-link-variant')}></i>
                                        </div>
                                    </div>
                                    <div
                                        className={cx(
                                            'preview-item-content',
                                            'd-flex',
                                            'align-items-start',
                                            'flex-column',
                                            'justify-content-center',
                                        )}
                                    >
                                        <h6 className={cx('preview-subject', 'font-weight-normal', 'mb-1')}>
                                            Launch Admin
                                        </h6>
                                        <p className={cx('text-gray', 'ellipsis', 'mb-0')}>New admin wow!</p>
                                    </div>
                                </span>
                                <div className={cx('dropdown-divider')}></div>
                                <h6 className={cx('p-3', 'mb-0', 'text-center')}>See all notifications</h6>
                            </div>
                        </li>
                    </ul>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickActiveSidebar();
                        }}
                        className={cx('navbar-toggler', 'navbar-toggler-right', 'd-lg-none', 'align-self-center')}
                        type="button"
                    >
                        <span className={cx('mdi')}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
