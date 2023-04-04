function AddressForm() {
    return (
        <form className="address-form">
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="name">
                    Họ và tên
                </label>
                <input className="address-form__input" type="text" id="name" name="name" required="" />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="phone">
                    Số điện thoại
                </label>
                <input className="address-form__input" type="tel" id="phone" name="phone" required="" />
            </div>

            <div className="address-form__group">
                <label className="address-form__label" htmlFor="city">
                    Thành phố/Tỉnh
                </label>
                <input className="address-form__input" type="text" id="city" name="city" required="" />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="district">
                    Quận/Huyện
                </label>
                <input className="address-form__input" type="text" id="district" name="district" required="" />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="ward">
                    Phường
                </label>
                <input className="address-form__input" type="text" id="ward" name="ward" required="" />
            </div>
            <div className="address-form__group">
                <label className="address-form__label" htmlFor="address">
                    Địa chỉ
                </label>
                <textarea
                    className="address-form__input address-form__textarea"
                    id="address"
                    name="address"
                    required=""
                    defaultValue={''}
                />
            </div>
        </form>
    );
}

export default AddressForm;
