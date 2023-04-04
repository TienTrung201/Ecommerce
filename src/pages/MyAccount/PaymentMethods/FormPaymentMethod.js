import React, { useState } from 'react';

function PaymentForm() {
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Gửi dữ liệu đến server
        console.log(formData);
        // Reset form
        setFormData({
            name: '',
            cardNumber: '',
            expirationDate: '',
            cvv: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="address-form">
            <div className="address-form__group">
                <label className="address-form__label">
                    Tên chủ thẻ:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="address-form__input"
                    />
                </label>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">
                    Số thẻ:
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="address-form__input"
                    />
                </label>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">
                    Ngày hết hạn:
                    <input
                        type="text"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        className="address-form__input"
                    />
                </label>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">
                    CVV:
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="address-form__input"
                    />
                </label>
            </div>
        </form>
    );
}

export default PaymentForm;
