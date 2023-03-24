import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';
import images from '@/assets/admin/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faBars,
  faBox,
  faHouse,
  faMagnifyingGlass,
  faTags,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Notification from '../../Notification';
import Collapse from '../../Collapse';

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
  const [sidebarIconOnly, setSidebarIconOnly] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);

  const location = useLocation();

  const handleStopBubble = (e) => {
    // e.currentTarget.getAttribute('data-active')
    // e.currentTarget.dataset.active
    e.stopPropagation();
    // setActiveSubItem(e.currentTarget.dataset.active);
  };

  return (
    <>
      <Notification />
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
            'select-none',
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
                <span className={cx('nav-link', 'count-indicator', 'dropdown-toggle')} data-bs-toggle="dropdown">
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
                  className={cx('dropdown-menu', 'dropdown-menu-right', 'navbar-dropdown', 'preview-list', {
                    show: showNotifications,
                  })}
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
                      <h6 className={cx('preview-subject', 'font-weight-normal', 'mb-1')}>Event today</h6>
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
                      <h6 className={cx('preview-subject', 'font-weight-normal', 'mb-1')}>Settings</h6>
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
                      <h6 className={cx('preview-subject', 'font-weight-normal', 'mb-1')}>Launch Admin</h6>
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
          <nav className={cx('sidebar', 'sidebar-offcanvas', 'select-none', { active: sidebarActive })} id="sidebar">
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
                  <i className={cx('mdi', 'mdi-bookmark-check', 'text-success', 'nav-profile-badge')}></i>
                </span>
              </li>

              <li data-active="dashboard" className={cx('nav-item', { active: location.pathname === '/admin' })}>
                <Link to="/admin" className={cx('nav-link')} href="../../index.html">
                  <span className={cx('menu-title')}>Tổng quan</span>
                  <i className={cx('menu-icon')}>
                    <FontAwesomeIcon icon={faHouse} />
                  </i>
                </Link>
              </li>

              <Collapse title="Đơn hàng">
                <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                  <li onClick={handleStopBubble} className={cx('nav-item')}>
                    <Link
                      to="/admin/orders"
                      className={cx('nav-link', { active: location.pathname.includes('/admin/orders') })}
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
              </Collapse>

              <Collapse title="Sản phẩm" icon={faBox}>
                <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                  <li onClick={handleStopBubble} className={cx('nav-item')}>
                    <Link
                      to="/admin/products"
                      className={cx('nav-link', { active: location.pathname.includes('/admin/products') })}
                      href="#"
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
                      href="#"
                    >
                      Danh mục sản phẩm
                    </Link>
                  </li>
                </ul>
              </Collapse>

              <li className={cx('nav-item', { active: location.pathname.includes('/admin/promotions') })}>
                <Link to="/admin/promotions" className={cx('nav-link')} href="#">
                  <span className={cx('menu-title')}>Khuyến mãi</span>
                  <i className={cx('menu-icon')}>
                    <FontAwesomeIcon icon={faTags} />
                  </i>
                </Link>
              </li>

              <Collapse title="Người dùng" icon={faUser}>
                <ul className={cx('nav', 'flex-column', 'sub-menu')}>
                  <li onClick={handleStopBubble} data-active="product-list" className={cx('nav-item')}>
                    <Link
                      to="/admin/manage-users"
                      className={cx('nav-link', { active: location.pathname.includes('/admin/manage-users') })}
                      href="#"
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
                      href="#"
                    >
                      Quản lý vai trò
                    </Link>
                  </li>
                </ul>
              </Collapse>

              <li className={cx('nav-item', 'sidebar-actions')}>
                <div className={cx('border-bottom')}>
                  <h6 className={cx('font-weight-normal', 'mb-3')}>Website</h6>
                </div>
                <button className={cx('btn', 'btn-lg', 'btn-gradient-primary', 'mt-4')}>Đến trang bán hàng</button>
                <div className={cx('border-bottom', 'mt-4')}></div>
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
                <span className={cx('text-muted', 'd-block', 'text-center', 'text-sm-start', 'd-sm-inline-block')}>
                  Copyright © xuanphuc.space 2023
                </span>
                <span className={cx('float-none', 'float-sm-end', 'mt-1', 'mt-sm-0', 'text-end')}>Cosmetics Shop</span>
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
