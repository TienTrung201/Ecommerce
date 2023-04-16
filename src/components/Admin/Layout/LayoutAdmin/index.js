import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../Notification';
import { getData } from '@/api/service';
import { api } from '@/api';
import { useDispatch } from 'react-redux';
import adminUserSlice from '@/pages/Admin/AdminLogin/adminUserSlice';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
    const [sidebarIconOnly, setSidebarIconOnly] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);

    const mainPanelRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Auto scroll to top
    useEffect(() => {
        if (mainPanelRef.current) {
            mainPanelRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }, [navigate]);

    useEffect(() => {
        const handleHideSidebarMobile = () => {
            setSidebarActive(false);
        };

        document.addEventListener('click', handleHideSidebarMobile);

        return () => {
            document.removeEventListener('click', handleHideSidebarMobile);
        };
    }, []);

    // Get current admin information
    useEffect(() => {
        getData(api.adminAccount)
            .then((response) => {
                dispatch(adminUserSlice.actions.setAdminUser(response.data));
            })
            .catch((error) => {
                if (error.message === 'unauthorized') {
                    navigate('/admin/login');
                } else {
                    const payload = JSON.parse(error.message);
                    console.warn(payload);
                }
            });
    }, [navigate, dispatch]);

    return (
        <>
            <Notification />
            <div className={cx('container-scroller', { 'sidebar-icon-only': sidebarIconOnly })}>
                {/* <!-- partial:../../partials/_navbar.html --> */}
                <Navbar
                    onClickIconOnly={() => {
                        setSidebarIconOnly(!sidebarIconOnly);
                    }}
                    onClickActiveSidebar={() => {
                        setSidebarActive(!sidebarActive);
                    }}
                />

                {/* <!-- partial --> */}
                <div className={cx('container-fluid', 'page-body-wrapper')}>
                    {/* <!-- partial:../../partials/_sidebar.html --> */}
                    <Sidebar iconOnly={sidebarIconOnly} active={sidebarActive} />

                    {/* <!-- partial --> */}
                    <div ref={mainPanelRef} className={cx('main-panel')}>
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
