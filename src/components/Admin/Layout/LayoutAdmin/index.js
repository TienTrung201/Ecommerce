import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';
import images from '@/assets/admin/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faArrowRightFromBracket,
    faBars,
    faBox,
    faFileInvoiceDollar,
    faHouse,
    faMagnifyingGlass,
    faTags,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
    const [sidebarIconOnly, setSidebarIconOnly] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [adminDropdown, setAdminDropdown] = useState(false);
    const [orderMenuDropdown, setOrderMenuDropdown] = useState(false);
    const [productMenuDropDown, setProductMenuDropDown] = useState(false);

    return (
        <>
            <div className={cx('container-scroller', { 'sidebar-icon-only': sidebarIconOnly })}>
                {/* <!-- partial:../../partials/_navbar.html --> */}
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
                    )}
                >
                    <div
                        className={cx(
                            'text-center',
                            'navbar-brand-wrapper',
                            'd-flex',
                            'align-items-center',
                            'justify-content-center',
                        )}
                    >
                        <a className={cx('navbar-brand', 'brand-logo')} href="/admin">
                            <img src={images.logo} alt="logo" />
                        </a>
                        <a className={cx('navbar-brand', 'brand-logo-mini')} href="/admin">
                            <img src={images.logoMini} alt="logo" />
                        </a>
                    </div>
                    <div className={cx('navbar-menu-wrapper', 'd-flex', 'align-items-stretch')}>
                        <button
                            onClick={() => {
                                setSidebarIconOnly(!sidebarIconOnly);
                            }}
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
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </i>
                                    </div>
                                    <input
                                        type="text"
                                        className={cx('form-control', 'bg-transparent', 'border-0')}
                                        placeholder="Search projects"
                                    />
                                </div>
                            </form>
                        </div>
                        <ul className={cx('navbar-nav', 'navbar-nav-right')}>
                            <li className={cx('nav-item', 'nav-profile', 'dropdown')}>
                                <span
                                    onClick={() => {
                                        setAdminDropdown(!adminDropdown);
                                    }}
                                    className={cx('nav-link', 'dropdown-toggle', 'pointer', 'select-none')}
                                >
                                    <div className={cx('nav-profile-img')}>
                                        <img src={images.faces.face1} alt="" />
                                        <span className={cx('availability-status', 'online')}></span>
                                    </div>
                                    <div className={cx('nav-profile-text')}>
                                        <p className={cx('mb-1', 'text-black', 'select-none')}>Xuan Phuccc</p>
                                    </div>
                                </span>
                                <div
                                    className={cx('dropdown-menu', 'navbar-dropdown', { show: adminDropdown })}
                                    aria-labelledby="profileDropdown"
                                >
                                    <span className={cx('dropdown-item', 'pointer')}>
                                        <i className={cx('mdi', 'me-2', 'text-primary')}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </i>
                                        Quản lý tài khoản
                                    </span>
                                    <div className={cx('dropdown-divider')}></div>
                                    <span className={cx('dropdown-item', 'pointer')} href="#">
                                        <i className={cx('mdi', 'me-2', 'text-danger')}>
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                        </i>
                                        Đăng xuất
                                    </span>
                                </div>
                            </li>
                            <li className={cx('nav-item', 'dropdown')}>
                                <span className={cx('nav-link', 'count-indicator', 'dropdown-toggle')}>
                                    <i
                                        onClick={() => {
                                            setShowMessages(!showMessages);
                                        }}
                                        className={cx('mdi', 'pointer')}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </i>

                                    <span className={cx('count-symbol', 'bg-warning')}></span>
                                </span>
                                <div
                                    className={cx(
                                        'dropdown-menu',
                                        'dropdown-menu-right',
                                        'navbar-dropdown',
                                        'preview-list',
                                        { show: showMessages },
                                    )}
                                    aria-labelledby="messageDropdown"
                                >
                                    <h6 className={cx('p-3', 'mb-0')}>Messages</h6>
                                    <div className={cx('dropdown-divider')}></div>
                                    <div className={cx('dropdown-item', 'preview-item', 'pointer')}>
                                        <div className={cx('preview-thumbnail')}>
                                            <img src={images.faces.face4} alt="" className={cx('profile-pic')} />
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
                                            <h6
                                                className={cx(
                                                    'preview-subject',
                                                    'ellipsis',
                                                    'mb-1',
                                                    'font-weight-normal',
                                                )}
                                            >
                                                Mark send you a message
                                            </h6>
                                            <p className={cx('text-gray', 'mb-0')}>1 Minutes ago</p>
                                        </div>
                                    </div>
                                    <div className={cx('dropdown-divider')}></div>
                                    <div className={cx('dropdown-item', 'preview-item', 'pointer')}>
                                        <div className={cx('preview-thumbnail')}>
                                            <img src={images.faces.face2} alt="" className={cx('profile-pic')} />
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
                                            <h6
                                                className={cx(
                                                    'preview-subject',
                                                    'ellipsis',
                                                    'mb-1',
                                                    'font-weight-normal',
                                                )}
                                            >
                                                Cregh send you a message
                                            </h6>
                                            <p className={cx('text-gray', 'mb-0')}>15 Minutes ago</p>
                                        </div>
                                    </div>
                                    <div className={cx('dropdown-divider')}></div>
                                    <div className={cx('dropdown-item', 'preview-item', 'pointer')}>
                                        <div className={cx('preview-thumbnail')}>
                                            <img src={images.faces.face3} alt="" className={cx('profile-pic')} />
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
                                            <h6
                                                className={cx(
                                                    'preview-subject',
                                                    'ellipsis',
                                                    'mb-1',
                                                    'font-weight-normal',
                                                )}
                                            >
                                                Profile picture updated
                                            </h6>
                                            <p className={cx('text-gray', 'mb-0')}>18 Minutes ago</p>
                                        </div>
                                    </div>
                                    <div className={cx('dropdown-divider')}></div>
                                    <h6 className={cx('p-3', 'mb-0', 'text-center')}>4 new messages</h6>
                                </div>
                            </li>
                            <li className={cx('nav-item', 'dropdown')}>
                                <span
                                    className={cx('nav-link', 'count-indicator', 'dropdown-toggle')}
                                    data-bs-toggle="dropdown"
                                >
                                    <i
                                        onClick={() => {
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
                                        { show: showNotifications },
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
                            onClick={() => {
                                setSidebarActive(!sidebarActive);
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
                {/* <!-- partial --> */}
                <div className={cx('container-fluid', 'page-body-wrapper')}>
                    {/* <!-- partial:../../partials/_sidebar.html --> */}
                    <nav className={cx('sidebar', 'sidebar-offcanvas', { active: sidebarActive })} id="sidebar">
                        <ul className={cx('nav')}>
                            <li className={cx('nav-item', 'nav-profile')}>
                                <span href="#" className={cx('nav-link', 'pointer')}>
                                    <div className={cx('nav-profile-image')}>
                                        <img src={images.faces.face1} alt="profile" />
                                        <span className={cx('login-status', 'online')}></span>
                                        {/* <!--change to offline or busy as needed--> */}
                                    </div>
                                    <div className={cx('nav-profile-text', 'd-flex', 'flex-column')}>
                                        <span className={cx('font-weight-bold', 'mb-2')}>Xuan Phuccc</span>
                                        <span className={cx('text-secondary', 'text-small')}>Project Manager</span>
                                    </div>
                                    <i
                                        className={cx('mdi', 'mdi-bookmark-check', 'text-success', 'nav-profile-badge')}
                                    ></i>
                                </span>
                            </li>
                            <li className={cx('nav-item')}>
                                <a className={cx('nav-link')} href="../../index.html">
                                    <span className={cx('menu-title')}>Tổng quan</span>
                                    <i className={cx('menu-icon')}>
                                        <FontAwesomeIcon icon={faHouse} />
                                    </i>
                                </a>
                            </li>
                            <li
                                onClick={() => {
                                    setOrderMenuDropdown(!orderMenuDropdown);
                                }}
                                className={cx('nav-item')}
                            >
                                <a
                                    className={cx('nav-link')}
                                    data-bs-toggle="collapse"
                                    href="#"
                                    aria-expanded="false"
                                    aria-controls="ui-basic"
                                >
                                    <span className={cx('menu-title')}>Đơn hàng</span>
                                    <i className={cx('menu-arrow')}>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </i>
                                    <i className={cx('menu-icon')}>
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                    </i>
                                </a>
                                <div className={cx('collapse', { show: orderMenuDropdown })} id="ui-basic">
                                    <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="../../pages/ui-features/buttons.html">
                                                Danh sách đơn hàng
                                            </a>
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <a
                                                className={cx('nav-link')}
                                                href="../../pages/ui-features/typography.html"
                                            >
                                                Đơn chưa hoàn tất
                                            </a>
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <a
                                                className={cx('nav-link')}
                                                href="../../pages/ui-features/typography.html"
                                            >
                                                Quản lý vận chuyển
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li
                                onClick={() => {
                                    setProductMenuDropDown(!productMenuDropDown);
                                }}
                                className={cx('nav-item')}
                            >
                                <a
                                    className={cx('nav-link')}
                                    data-bs-toggle="collapse"
                                    href="#"
                                    aria-expanded="false"
                                    aria-controls="ui-basic"
                                >
                                    <span className={cx('menu-title')}>Sản phẩm</span>
                                    <i className={cx('menu-arrow')}>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </i>
                                    <i className={cx('menu-icon')}>
                                        <FontAwesomeIcon icon={faBox} />
                                    </i>
                                </a>
                                <div className={cx('collapse', { show: productMenuDropDown })} id="ui-basic">
                                    <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="../../pages/ui-features/buttons.html">
                                                Danh sách sản phẩm
                                            </a>
                                        </li>
                                        <li className={cx('nav-item')}>
                                            <a
                                                className={cx('nav-link')}
                                                href="../../pages/ui-features/typography.html"
                                            >
                                                Danh mục sản phẩm
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx('nav-item')}>
                                <a className={cx('nav-link')} href="../../pages/icons/mdi.html">
                                    <span className={cx('menu-title')}>Khuyến mãi</span>
                                    <i className={cx('menu-icon')}>
                                        <FontAwesomeIcon icon={faTags} />
                                    </i>
                                </a>
                            </li>
                            <li className={cx('nav-item', 'sidebar-actions')}>
                                <span className={cx('nav-link')}>
                                    <div className={cx('border-bottom')}>
                                        <h6 className={cx('font-weight-normal', 'mb-3')}>Projects</h6>
                                    </div>
                                    <button
                                        className={cx('btn', 'btn-block', 'btn-lg', 'btn-gradient-primary', 'mt-4')}
                                    >
                                        + Add a project
                                    </button>
                                    <div className={cx('mt-4')}>
                                        <div className={cx('border-bottom')}>
                                            <p className={cx('text-secondary')}>Categories</p>
                                        </div>
                                        <ul className={cx('gradient-bullet-list', 'mt-4')}>
                                            <li>Free</li>
                                            <li>Pro</li>
                                        </ul>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </nav>
                    {/* <!-- partial --> */}
                    <div className={cx('main-panel')}>
                        <div className={cx('content-wrapper')}>{children}</div>
                        {/* <!-- content-wrapper ends --> */}
                        {/* <!-- partial:../../partials/_footer.html --> */}
                        <footer className={cx('footer')}>
                            <div className={cx('container-fluid', 'd-flex', 'justify-content-between')}>
                                <span
                                    className={cx(
                                        'text-muted',
                                        'd-block',
                                        'text-center',
                                        'text-sm-start',
                                        'd-sm-inline-block',
                                    )}
                                >
                                    Copyright © xuanphuc.space 2023
                                </span>
                                <span className={cx('float-none', 'float-sm-end', 'mt-1', 'mt-sm-0', 'text-end')}>
                                    Cosmetics Shop
                                </span>
                            </div>
                        </footer>
                        {/* <!-- partial --> */}
                    </div>
                    {/* <!-- main-panel ends --> */}
                </div>
                {/* <!-- page-body-wrapper ends --> */}
            </div>
            {/* <!-- container-scroller --> */}
        </>
    );
}

export default LayoutAdmin;
