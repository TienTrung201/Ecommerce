import Modal from '@/components/Layout/Modal';
import { useEffect, useState } from 'react';
import AddressForm from './FormAddress';
import { useDispatch } from 'react-redux';
import { deleteData, postData, updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { api } from '@/api';
import userSlice from '../UserSlice';

function Address({ user }) {
    const [actionForm, setActionForm] = useState('');
    const [visible, setVisible] = useState(false);
    const { addresses } = user;

    //form change
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        addressLine: '',
    });
    const handleSetNullFormData = () => {
        setFormData({
            fullName: '',
            phoneNumber: '',
            city: '',
            district: '',
            ward: '',
            addressLine: '',
        });
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    //form change
    const dispatch = useDispatch();

    // handle add address
    const handleAddNewAddress = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        postData(api.address, formData)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Thành công'));
                    dispatch(userSlice.actions.addAdress({ ...formData, addressId: response.addressId }));
                    handleSetNullFormData();
                }, 1000);
                console.log(response);
            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }, 1000);
                console.warn(err);
            });
    };
    // handle add address
    //handle delete address
    const handleDeleteAddress = (id, index) => {
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        deleteData(api.address + '/' + id)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    dispatch(userSlice.actions.removeAddress(index));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log(response);
            })
            .catch((err) => {
                dispatch(notificationsSlice.actions.showError('Thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.warn(err);
            });
    };
    //handle delete address
    //handleEditAddress
    const handleClickbuttonEditAddress = (data, position) => {
        setActionForm('edit');
        setVisible(true);
        setFormData(data);
        dispatch(userSlice.actions.setPosition(position));
    };
    const handleEditAddress = (i) => {
        updateData(api.address + '/' + formData.addressId, formData)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                    dispatch(userSlice.actions.editAddress({ data: formData, position: user.positionAddress }));
                }, 1000);
                console.log(response);
            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }, 1000);
                console.warn(err);
            });
    };
    //handleEditAddress
    useEffect(() => {
        if (!visible) {
            handleSetNullFormData();
            setActionForm('edit');
        }
    }, [visible]);
    return (
        <div className="address-list">
            <Modal
                visible={visible}
                title={'Thêm địa chỉ mới'}
                save={actionForm === 'edit' ? 'Cập nhật' : 'Thêm'}
                haldleSendModal={actionForm === 'edit' ? handleEditAddress : handleAddNewAddress}
                setVisible={setVisible}
            >
                <AddressForm formData={formData} onChanceForm={handleChange} />
            </Modal>
            <h3 className="address-list-title">Danh sách địa chỉ</h3>
            <div className="address-list-container">
                {addresses.length !== 0
                    ? addresses.map((address, i) => {
                          return (
                              <div key={address.addressId} className="address-list-item">
                                  <div className="address-list-item-header-right">
                                      <button
                                          onClick={() => {
                                              handleClickbuttonEditAddress(address, i);
                                          }}
                                          className="address-list-item-edit-button button-app"
                                      >
                                          Sửa
                                      </button>
                                      <button
                                          onClick={() => {
                                              handleDeleteAddress(address.addressId, i);
                                          }}
                                          className="address-list-item-delete-button button-app"
                                      >
                                          Xoá
                                      </button>
                                  </div>

                                  <div className="address-list-item-body">
                                      <p className="address-list-item-name">{address.fullName}</p>
                                      <p className="address-list-item-phone">{address.phoneNumber}</p>
                                      <p className="address-list-item-address">
                                          {`${address.addressLine} ${address.ward} ${address.district} ${address.city}`}
                                      </p>
                                  </div>
                              </div>
                          );
                      })
                    : false}

                {/* Thêm các địa chỉ khác tương tự ở đây */}
                <button
                    onClick={() => {
                        setActionForm('add');
                        setVisible(true);
                    }}
                    className="address-list-add-button button-app"
                >
                    Thêm địa chỉ mới
                </button>
            </div>
        </div>
    );
}

export default Address;
