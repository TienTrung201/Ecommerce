function AddressForm({ formData, onChanceForm }) {
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
                    id="phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    required=""
                />
            </div>

            <div className="address-form__group">
                <label className="address-form__label" htmlFor="city">
                    Thành phố/Tỉnh
                </label>
                <input
                    onChange={onChanceForm}
                    className="address-form__input"
                    type="text"
                    id="city"
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
                    name="addressLine"
                    required=""
                    value={formData.addressLine}
                />
            </div>
        </div>
    );
}

export default AddressForm;
