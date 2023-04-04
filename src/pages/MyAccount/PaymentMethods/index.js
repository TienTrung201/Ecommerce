import Modal from '@/components/Layout/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentForm from './FormPaymentMethod';

function PaymentMethods() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="payment-methods">
            <Modal title={'Thêm phương thức thanh toán'} save={'Thêm'} visible={visible} setVisible={setVisible}>
                <PaymentForm />
            </Modal>
            <h2 className="payment-methods__title">Phương thức thanh toán</h2>
            <ul className="payment-methods__list">
                <li className="payment-methods__item">
                    <div className="payment-methods__card">
                        <img
                            className="payment-methods__card-logo"
                            src={require('@/assets/image/Visa.jpg')}
                            alt="Visa"
                        />
                        <div className="payment-methods__card-details">
                            <p className="payment-methods__card-name">Thẻ tín dụng Visa</p>
                            <p className="payment-methods__card-number">•••• •••• •••• 1234</p>
                        </div>
                        <div></div>
                    </div>
                </li>
                <li className="payment-methods__item">
                    <div className="payment-methods__card">
                        <img
                            className="payment-methods__card-logo"
                            src={require('@/assets/image/Mastercard.jpg')}
                            alt="Mastercard"
                        />
                        <div className="payment-methods__card-details">
                            <p className="payment-methods__card-name">Thẻ tín dụng Mastercard</p>
                            <p className="payment-methods__card-number">•••• •••• •••• 5678</p>
                        </div>
                        <div></div>
                    </div>
                </li>
                <li className="payment-methods__item">
                    <div className="payment-methods__card">
                        <img
                            className="payment-methods__card-logo"
                            src={require('@/assets/image/Ewallet.jpg')}
                            alt="PayPal"
                        />
                        <div className="payment-methods__card-details">
                            <p className="payment-methods__card-name">PayPal</p>
                            <p className="payment-methods__card-email">example@gmail.com</p>
                        </div>
                        <div></div>
                    </div>
                </li>
            </ul>
            <Link
                onClick={() => {
                    setVisible(true);
                }}
                className=" add-payment"
            >
                Thêm phương thức thanh toán
            </Link>
        </div>
    );
}

export default PaymentMethods;
