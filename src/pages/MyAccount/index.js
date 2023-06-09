import { userSelector } from '@/redux/selector';
import { faAddressCard, faMoneyBill1, faUser } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Account from './Account';
import Address from './Address';
import Order from './Order';
import PaymentMethods from './PaymentMethods';
import userSlice from './UserSlice';
import cartSlice from '../Cart/CartSlice';

function MyAccount() {
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const { infoManagerment } = useParams();
    const dispatch = useDispatch();
    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(userSlice.actions.deleteUser());
        dispatch(cartSlice.actions.deleteCart());
        navigate('/');
        localStorage.setItem('token', '');
        window.location.reload();
    };
    return (
        <>
            <div className="container container-content">
                <ul className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                        <i className="iconRight">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </i>
                    </li>

                    <li className="active">My Account</li>
                </ul>
            </div>
            <div className="my-account">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-3 howday">
                            <div className="titlelt">
                                <div className="address">
                                    <ul className="nav ">
                                        <li
                                            className={
                                                infoManagerment === 'account' || infoManagerment === undefined
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <Link to="/myAccount/account">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </i>
                                                Tài khoản
                                            </Link>
                                        </li>

                                        <li className={infoManagerment === 'order' ? 'active' : ''}>
                                            <Link to="/myAccount/order">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faListUl} />
                                                </i>
                                                Đơn hàng
                                            </Link>
                                        </li>
                                        <li className={infoManagerment === 'address' ? 'active' : ''}>
                                            <Link to="/myAccount/address">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </i>
                                                Địa chỉ
                                            </Link>
                                        </li>
                                        <li className={infoManagerment === 'paymentMethods' ? 'active' : ''}>
                                            <Link to="/myAccount/paymentMethods">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faMoneyBill1} />
                                                </i>
                                                Phương thức thanh toán
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="login">
                                    <ul className="nav ">
                                        <li onClick={handleSignOut}>
                                            <Link to="#">
                                                <img src={require('@/assets/image/Icon_Off.jpg')} alt="Icon_User.jpg" />{' '}
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 col-sm-9 porfolio">
                            {infoManagerment === 'account' || infoManagerment === undefined ? (
                                <Account user={user} />
                            ) : (
                                false
                            )}
                            {infoManagerment === 'order' ? <Order user={user} /> : false}
                            {infoManagerment === 'address' ? <Address user={user} /> : false}
                            {infoManagerment === 'paymentMethods' ? <PaymentMethods user={user} /> : false}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyAccount;
