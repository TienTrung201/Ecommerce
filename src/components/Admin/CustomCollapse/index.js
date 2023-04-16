import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';

const cx = classNames.bind(styles);

function CustomCollapse({ isActive = false, onClick = (id) => {}, id, children, title = 'Tiêu đề', icon }) {
    isActive = isActive === id ? true : false;

    return (
        <>
            <li
                onClick={() => {
                    onClick(id);
                }}
                data-active="orders-dropdown"
                className={cx('nav-item', { active: isActive })}
            >
                <span className={cx('nav-link', 'pointer')}>
                    <i className={cx('menu-icon')}>{icon ? icon : <FontAwesomeIcon icon={faFileInvoiceDollar} />}</i>
                    <span className={cx('menu-title', 'ms-3')}>{title}</span>
                    <i className={cx('menu-arrow')}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </i>
                </span>
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto', overflowY: 'hidden' }}
                            exit={{ height: 0 }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </li>
        </>
    );
}

export default CustomCollapse;
