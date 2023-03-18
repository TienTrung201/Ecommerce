import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';

const cx = classNames.bind(styles);

function PromotionsCreate() {
    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}> Chương trình khuyến mãi </h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/promotions">Tất cả khuyến mãi</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Tạo khuyến mãi
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Tạo chương trình khuyến mãi</h4>
                            <p className={cx('card-description')}>
                                Mã khuyến mãi sẽ được khách hàng nhập tại màn hình thanh toán
                            </p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên hoặc mã khuyến mãi *</label>
                                    <input
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Vd: Siêu sale sinh nhật hoặc COUPON10%"
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleTextarea1">Nội dung</label>
                                    <textarea
                                        className={cx('form-control', 'border-secondary')}
                                        id="exampleTextarea1"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="promotionValue">Giá trị khuyến mãi *</label>
                                    <input
                                        type="number"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="promotionValue"
                                        placeholder=""
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('row', 'gx-4')}>
                                        <div className={cx('col-md-6')}>
                                            <label htmlFor="">Ngày bắt đầu *</label>
                                            <DatePicker className={cx('w-100')} />
                                        </div>
                                        <div className={cx('col-md-6')}>
                                            <label htmlFor="">Ngày kết thúc *</label>
                                            <DatePicker className={cx('w-100')} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className={cx('btn', 'btn-gradient-primary', 'me-2')}>
                                    Tạo khuyến mãi
                                </button>
                                <Link to="/admin/products/categories" className={cx('btn', 'btn-light')}>
                                    Hủy
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Tổng quan khuyến mãi</h4>
                            <p className={cx('card-description')}> Basic form elements </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromotionsCreate;
