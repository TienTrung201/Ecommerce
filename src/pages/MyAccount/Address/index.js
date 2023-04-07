import Modal from '@/components/Layout/Modal';
import { useEffect, useState } from 'react';
import AddressForm from './FormAddress';
import { useDispatch } from 'react-redux';
import { deleteData, postData, updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { api } from '@/api';
import userSlice from '../UserSlice';

function Address({ user }) {
    const dispatch = useDispatch();
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

    // handle add address
    const handleAddNewAddress = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
        postData(api.address, formData)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Thành công'));
                    dispatch(
                        userSlice.actions.addAdress({ ...formData, addressId: response.addressId, isDefault: false }),
                    );
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
    //handle set default address
    const handleSetDefaultAddress = (address, i) => {
        let oldAddressPossition;
        addresses.forEach((address, i) => {
            if (address.isDefault === true) {
                oldAddressPossition = i;
            }
        });

        const oldAddressDefault = addresses.find((address, i) => {
            return address.isDefault === true;
        });
        console.log(oldAddressDefault);
        updateData(api.address + '/' + oldAddressDefault.addressId, { ...oldAddressDefault, isDefault: false })
            .then((response) => {
                dispatch(
                    userSlice.actions.editAddress({
                        data: { ...oldAddressDefault, isDefault: false },
                        position: oldAddressPossition,
                    }),
                );
                console.log(response);
            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.warn(err);
            });
        const setAddressDefault = { ...address, isDefault: true };
        updateData(api.address + '/' + setAddressDefault.addressId, setAddressDefault)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                    dispatch(userSlice.actions.editAddress({ data: setAddressDefault, position: i }));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log(response);
            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.warn(err);
            });
    };
    //handle set default address
    //handle delete address
    const handleDeleteAddress = (address, index) => {
        if (address.isDefault) {
            dispatch(notificationsSlice.actions.showError('Đây là địa chỉ mặc định'));
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        } else {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));
            deleteData(api.address + '/' + address.addressId)
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
        }
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
                              <div key={address.addressId}>
                                  <div key={address.addressId} className="address-list-item-header-left">
                                      <input
                                          className="checkIsDefaultAddress"
                                          onChange={() => {
                                              handleSetDefaultAddress(address, i);
                                          }}
                                          type="radio"
                                          name="address-radio"
                                          id="address-radio-1"
                                          checked={address.isDefault}
                                      />
                                      <label htmlFor="address-radio-1">Địa chỉ giao hàng mặc định</label>
                                  </div>
                                  <div className="address-list-item">
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
                                                  handleDeleteAddress(address, i);
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
