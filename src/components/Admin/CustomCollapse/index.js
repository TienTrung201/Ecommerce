import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CustomCollapse({ children, title = 'Tiêu đề', icon }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleActiveItem = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <li onClick={handleActiveItem} data-active="orders-dropdown" className={cx('nav-item', { active: isOpen })}>
                <span className={cx('nav-link', 'pointer')}>
                    <i className={cx('menu-icon')}>
                        <FontAwesomeIcon icon={icon || faFileInvoiceDollar} />
                    </i>
                    <span className={cx('menu-title', 'ms-4')}>{title}</span>
                    <i className={cx('menu-arrow')}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </i>
                </span>
                <AnimatePresence>
                    {isOpen && (
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
