import { api } from '@/api';
import { updateData } from '@/api/service';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { uploadFile } from '@/firebase/service';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

function Account({ user }) {
    const dispatch = useDispatch();

    //onfocus input date
    const onDateFocus = (e) => (e.target.type = 'date');
    const onDateBlur = (e) => (e.target.type = 'text');
    //onfocus input date

    //Form
    const [isFormChange, setIsFormChange] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        gender: '',
        birthDate: '',
        password: '',
        avatar: '',
        email: '',
        userName: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setIsFormChange(true);
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    //handle change Img

    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const handleChangeImg = (fileimg) => {
        setImgFile(fileimg);
        setImgUrl(URL.createObjectURL(fileimg));
    };
    const file = useRef();
    useEffect(() => {
        const { fullName, phoneNumber, gender, birthDate, password, avatar, email, userName } = user;
        setFormData({ fullName, phoneNumber, gender, birthDate, password, avatar, email, userName });
        setImgUrl(avatar);
    }, [user]);
    //Form
    //update data
    const updateDataUser = (data) => {
        updateData(api.userAccount, data)
            .then((response) => {
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                }, 1000);
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 2000);
                console.log('update address', response.data);
            })
            .catch((err) => {
                const message = JSON.parse(err.message)?.title;
                if (formData.birthDate === '') {
                    dispatch(notificationsSlice.actions.showError('Ngày sinh không hợp lệ'));
                } else {
                    if (message.includes('email already exist')) {
                        dispatch(notificationsSlice.actions.showError('Email đã tồn tại'));
                    }
                    dispatch(notificationsSlice.actions.showError('Thất bại'));
                }
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
                console.warn(err);
            });
    };
    const handleSendForm = async () => {
        if (isFormChange || imgFile) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            if (imgFile) {
                const uploadedItemImg = await uploadFile(imgFile, 'images/avatar-users');
                const data = { ...formData, password: '123456', avatar: uploadedItemImg.url };
                updateDataUser(data);
            } else {
                const data = { ...formData, gender: Number(formData.gender), password: '123456' };
                updateDataUser(data);
            }
        }
    };
    //update data

    return (
        <div className="tab-content">
            {/* <Modal visible={true} title={'hello'} save={'Gửi'} /> */}
            <div id="home" className="tab-pane fade in active">
                <div className="form fix-form">
                    <div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 update-avatar-account">
                                <input
                                    onChange={(e) => {
                                        handleChangeImg(e.target.files[0]);
                                        e.target.value = '';
                                    }}
                                    style={{ display: 'none' }}
                                    type="file"
                                    name="avatar"
                                    placeholder=""
                                    required=""
                                    className=""
                                    ref={file}
                                />

                                <img
                                    className="avatar-user-url"
                                    src={
                                        imgUrl === ''
                                            ? 'https://allenandclarke.com.au/wp-content/uploads/2020/08/Blank-Man_White-1343x1385px.jpg'
                                            : imgUrl
                                    }
                                    alt=""
                                />

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        file.current.click();
                                    }}
                                    className="openChoseFile"
                                >
                                    <FontAwesomeIcon className="camera-icon" icon={faCameraRetro} />
                                </button>
                            </div>

                            {/* <div className="col-md-6 col-sm-6"></div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Tên</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    value={formData.fullName}
                                    type="text"
                                    name="fullName"
                                    placeholder="Name"
                                    required=""
                                    className="city"
                                />
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <label>Điện thoại</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    value={formData.phoneNumber}
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="+84 0123456789"
                                    required=""
                                    className="phone"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Giới tính</label>
                                <br />
                                <select
                                    onChange={handleChange}
                                    value={formData.gender}
                                    type="text"
                                    name="gender"
                                    placeholder="Nam/Nữ"
                                    required=""
                                    className="select-gender"
                                >
                                    {/* <option value="">Nam/Nữ</option> */}
                                    <option value="0">Nam</option>
                                    <option value="1">Nữ</option>
                                </select>
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <label>Ngày sinh</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    value={formData.birthDate}
                                    onFocus={onDateFocus}
                                    onBlur={onDateBlur}
                                    type="text"
                                    placeholder="Ngày sinh"
                                    name="birthDate"
                                    className="phone Account-Date"
                                />
                            </div>
                        </div>
                        <label className="mail">Email</label>
                        <br />
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            type="text"
                            name="email"
                            placeholder="felixdg@gmail.com"
                            required=""
                            className="gmail"
                        />
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Tên đăng nhập</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    value={formData.userName}
                                    type="text"
                                    name="userName"
                                    placeholder="user123456"
                                    required=""
                                    className="country"
                                    disabled={true}
                                />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label>Mật khẩu</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    value={formData.password}
                                    type="text"
                                    name="password"
                                    placeholder={'******'}
                                    required=""
                                    className="zipcode"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSendForm();
                            }}
                            className="change"
                        >
                            Cập nhật thông tin
                        </button>
                    </div>
                </div>
            </div>
            {/* <div id="menu1" className="tab-pane fade">
                <div className="form">
                    <form action="#" method="post">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Country</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="country"
                                    placeholder="Việt Nam"
                                    required=""
                                    className="country"
                                />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label>City /state</label>
                                <br />
                                <input type="text" name="city" placeholder="Hà nội" required="" className="city" />
                            </div>
                        </div>
                        <label>Street address</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="no1, trang tien, hoan kiem district"
                            required=""
                            className="city"
                        />
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>ZIP</label>
                                <br />
                                <input type="text" name="country" placeholder={12345} required="" className="zipcode" />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label>phone</label>
                                <br />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="+84 0123456789"
                                    required=""
                                    className="phone"
                                />
                            </div>
                        </div>
                        <label className="mail">email</label>
                        <br />
                        <input type="text" name="city" placeholder="felixdg@gmail.com" required="" className="gmail" />
                        <button className="change">Save change</button>
                    </form>
                </div>
            </div> */}
        </div>
    );
}

export default Account;
