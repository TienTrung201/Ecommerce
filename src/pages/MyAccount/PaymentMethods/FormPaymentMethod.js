import React, { useState } from 'react';

function PaymentForm({ formData, onChangeForm }) {
    //onfocus input date
    const onDateFocus = (e) => (e.target.type = 'date');
    const onDateBlur = (e) => (e.target.type = 'text');
    //onfocus input date
    return (
        <div className="address-form">
            <div className="address-form__group">
                <label className="address-form__label">
                    Tên chủ thẻ:
                    <input
                        type="text"
                        name="cardholderName"
                        placeholder="Tên chủ thẻ"
                        value={formData.cardholderName}
                        onChange={onChangeForm}
                        className="address-form__input"
                    />
                </label>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">Loại thẻ</label>
                <select
                    onChange={onChangeForm}
                    value={formData.provider}
                    type="text"
                    name="provider"
                    placeholder="Card"
                    required=""
                    className="address-form__input"
                >
                    <option value=""></option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                </select>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">
                    Số thẻ:
                    <input
                        type="text"
                        placeholder="Số thẻ"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={onChangeForm}
                        className="address-form__input"
                    />
                </label>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">
                    Ngày hết hạn:
                    <input
                        onChange={onChangeForm}
                        onFocus={onDateFocus}
                        onBlur={onDateBlur}
                        value={formData.expiryDate}
                        type="text"
                        placeholder="Ngày hết hạn"
                        name="expiryDate"
                        className="address-form__input"
                    />
                </label>
            </div>
            <div className="address-form__group">
                <label className="address-form__label">
                    CVC:
                    <input
                        type="text"
                        placeholder="CVC"
                        name="securityCode"
                        value={formData.securityCode}
                        onChange={onChangeForm}
                        className="address-form__input"
                    />
                </label>
            </div>
        </div>
    );
}

export default PaymentForm;
