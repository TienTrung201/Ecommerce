import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShippingMethodsCreate() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}>Thêm đơn vị vận chuyển</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/shipping-methods">Tất cả đơn vị vận chuyển</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Thêm đơn vị vận chuyển
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Đơn vị vận chuyển</h4>
                            {/* <p className={cx('card-description')}>
                                Mã khuyến mãi sẽ được khách hàng nhập tại màn hình thanh toán
                            </p> */}
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên đơn vị vận chuyển *</label>
                                    <input
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên đơn vị vận chuyển"
                                    />
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="promotionValue">Giá cước *</label>
                                    <input
                                        type="number"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="promotionValue"
                                        placeholder="Nhập giá cước"
                                    />
                                </div>

                                <button type="submit" className={cx('btn', 'btn-gradient-primary', 'me-2')}>
                                    Thêm đơn vị vận chuyển
                                </button>
                                <Link to="/admin/shipping-methods" className={cx('btn', 'btn-light')}>
                                    Hủy
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Mô tả vận chuyển</h4>
                            <p className={cx('card-description')}> Basic form elements </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShippingMethodsCreate;
