import Modal from '@/components/Layout/Modal';
import { useState } from 'react';
import AddressForm from './FormAddress';

function Address() {
    const [visible, setVisible] = useState(false);
    return (
        <div className="address-list">
            <Modal visible={visible} title={'Thêm địa chỉ mới'} save={'Thêm'} setVisible={setVisible}>
                <AddressForm />
            </Modal>
            <h3 className="address-list-title">Danh sách địa chỉ</h3>
            <div className="address-list-container">
                <div className="address-list-item">
                    <div className="address-list-item-header-right">
                        <button className="address-list-item-edit-button button-app">Sửa</button>
                        <button className="address-list-item-delete-button button-app">Xoá</button>
                    </div>

                    <div className="address-list-item-body">
                        <p className="address-list-item-name">Trần Văn A</p>
                        <p className="address-list-item-phone">0123456789</p>
                        <p className="address-list-item-address">
                            Số 123 Đường ABC, Phường XYZ, Quận 123, TP. Hồ Chí Minh
                        </p>
                    </div>
                </div>
                <div className="address-list-item">
                    <div className="address-list-item-header-right">
                        <button className="address-list-item-edit-button button-app">Sửa</button>
                        <button className="address-list-item-delete-button button-app">Xoá</button>
                    </div>

                    <div className="address-list-item-body">
                        <p className="address-list-item-name">Nguyễn Thị B</p>
                        <p className="address-list-item-phone">0987654321</p>
                        <p className="address-list-item-address">
                            Số 456 Đường XYZ, Phường ABC, Quận 789, TP. Hồ Chí Minh
                        </p>
                    </div>
                </div>
                {/* Thêm các địa chỉ khác tương tự ở đây */}
                <button
                    onClick={() => {
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
