import classNames from 'classnames/bind';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
const cx = classNames.bind(styles);

function AddressForm({ formData, onChanceForm, messageError }) {
    return (
        <div className="address-form">
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="fullName">
                    Họ và tên
                </label>
                <input
                    onChange={onChanceForm}
                    className="address-form__input"
                    type="text"
                    id="name"
                    name="fullName"
                    required=""
                    placeholder="Tên người nhận"
                    value={formData.fullName}
                />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="phoneNumber">
                    Số điện thoại
                </label>
                <input
                    onChange={onChanceForm}
                    className="address-form__input"
                    type="tel"
                    placeholder="Số điện thoại"
                    id="phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    required=""
                />
            </div>

            <div className="address-form__group">
                <label className="address-form__label" htmlFor="city">
                    Tỉnh/Thành phố
                </label>
                <input
                    onChange={onChanceForm}
                    className="address-form__input"
                    type="text"
                    id="city"
                    placeholder="Tỉnh/Thành phố"
                    name="city"
                    required=""
                    value={formData.city}
                />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="district">
                    Quận/Huyện
                </label>
                <input
                    onChange={onChanceForm}
                    className="address-form__input"
                    placeholder="Quận/Huyện"
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    required=""
                />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="ward">
                    Phường
                </label>
                <input
                    onChange={onChanceForm}
                    className="address-form__input"
                    type="text"
                    placeholder="Phường"
                    id="ward"
                    name="ward"
                    value={formData.ward}
                    required=""
                />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="addressLine">
                    Địa chỉ
                </label>
                <textarea
                    className="address-form__input address-form__textarea"
                    onChange={onChanceForm}
                    id="address"
                    placeholder="Địa chỉ"
                    name="addressLine"
                    required=""
                    value={formData.addressLine}
                />
                <span className={cx('text-danger', 'fs-14')}>{messageError}</span>
            </div>
        </div>
    );
}

export default AddressForm;
