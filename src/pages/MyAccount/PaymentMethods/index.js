import Modal from '@/components/Layout/Modal';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentForm from './FormPaymentMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { deleteData, postData } from '@/api/service';
import { api } from '@/api';
import userSlice from '../UserSlice';

function PaymentMethods({ user }) {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        provider: '',
        accountNumber: '',
        expiryDate: '',
        cardholderName: '',
        securityCode: '',
    });
    const checkedSubmit = useMemo(() => {
        const { provider, accountNumber, expiryDate, cardholderName, securityCode } = formData;
        if (
            provider === '' ||
            accountNumber === '' ||
            expiryDate === '' ||
            cardholderName === '' ||
            securityCode === ''
        ) {
            return false;
        }
        return true;
    }, [formData]);
    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSetNullFormData = () => {
        setFormData({
            provider: '',
            accountNumber: '',
            expiryDate: '',
        });
    };
    // handle add paymentmethod
    const handleAddNewPaymentMethod = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        postData(api.paymentMethods, formData)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Thành công'));
                    dispatch(
                        userSlice.actions.addPaymentMethod({
                            ...formData,
                            paymentMethodId: response.data.paymentMethodId,
                        }),
                    );
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.destroy());
                    }, 2000);
                    console.log('update paymentmethod', response.data);
                    handleSetNullFormData();
                }, 1000);
                console.log(response);
            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.warn(err);
            });
    };
    // handle add paymentmethod
    // handle delete paymentmethod
    const handleDeletePaymentMethod = (id, index) => {
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        deleteData(api.paymentMethods + '/' + id)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    dispatch(userSlice.actions.removePaymentMethod(index));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);

                console.log('delete', response.data);
            })
            .catch((err) => {
                dispatch(notificationsSlice.actions.showError('Thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.warn(err);
            });
    };
    // handle delete paymentmethod

    return (
        <div className="address-list">
            <Modal
                title={'Thêm phương thức thanh toán'}
                haldleSendModal={handleAddNewPaymentMethod}
                save={'Thêm'}
                visible={visible}
                setVisible={setVisible}
                checkedSubmit={checkedSubmit}
            >
                <PaymentForm formData={formData} setFormData={setFormData} onChangeForm={handleChangeForm} />
            </Modal>
            <h3 className="address-list-title">Phương thức thanh toán</h3>
            <ul className="payment-methods__list">
                {user.paymentMethods.map((paymentMethod, i) => {
                    return (
                        <li key={paymentMethod.paymentMethodId} className="payment-methods__item">
                            <div className="payment-methods__card">
                                <img
                                    className="payment-methods__card-logo"
                                    src={
                                        paymentMethod.provider === 'Visa'
                                            ? require('@/assets/image/Visa.jpg')
                                            : require('@/assets/image/Mastercard.jpg')
                                    }
                                    alt="Visa"
                                />
                                <div className="payment-methods__card-details">
                                    <p className="payment-methods__card-name">
                                        {paymentMethod.provider === 'Visa'
                                            ? 'Thẻ tín dụng Visa'
                                            : 'Thẻ tín dụng Mastercard'}
                                    </p>
                                    <p className="payment-methods__card-number">
                                        {paymentMethod.accountNumber.replace(/\d{4}(?=\d)/g, '$& ')}
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        handleDeletePaymentMethod(paymentMethod.paymentMethodId, i);
                                    }}
                                    className="payment-methods__card-delete autoCenter"
                                >
                                    <i className="payment-methods__card_icon-delete">
                                        <FontAwesomeIcon icon={faClose} />
                                    </i>
                                </div>
                            </div>
                        </li>
                    );
                })}

                {/* <li className="payment-methods__item">
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
                </li> */}
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
