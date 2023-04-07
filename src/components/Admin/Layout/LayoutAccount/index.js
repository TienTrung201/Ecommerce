import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import images from '@/assets/admin/images';

const cx = classNames.bind(styles);

function LayoutAccount({ title = 'Form title', subTitle, children }) {
    return (
        <div className={cx('container-fluid', 'ps-0', 'pe-0')} style={{ height: '100vh', overflowY: 'auto' }}>
            <div className={cx('row', 'h-100')}>
                <div className={cx('col-md-5', 'ps-0', 'pe-0')}>
                    <div className={cx('w-100', 'h-100')} style={{ padding: '48px' }}>
                        <div className={cx('w-100')}>
                            <img style={{ height: '24px' }} src={images.logo} alt="" />
                        </div>
                        <div className={cx('w-100')}>
                            <h1 className={cx('fs-1', 'fw-bold', 'text-center', 'mt-5')}>{title}</h1>
                            <p className={cx('text-center', 'mb-5', 'ff-roboto', 'text-secondary')}>{subTitle}</p>
                            {children}

                            <div className={cx('form-group')}>
                                <p className={cx('fs-14', 'text-center')}>
                                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                                    <span className={cx('text-hight-light')}>Điều khoản sử dụng</span> của chúng tôi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-7', 'ps-0', 'pe-0', 'h-100', 'd-none', 'd-md-block')}>
                    <div className={cx('w-100', 'h-100', 'p-2')}>
                        <div
                            style={{
                                background: `url(${images.loginBg}) center center / cover no-repeat border-box border-box`,
                            }}
                            className={cx('w-100', 'h-100', 'rounded-12')}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutAccount;
