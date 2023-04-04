import { userSelector } from '@/redux/selector';
import { faAddressCard, faMoneyBill1, faUser } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Account from './Account';
import Address from './Address';
import Order from './Order';
import PaymentMethods from './PaymentMethods';

function MyAccount() {
    const { infoManagerment } = useParams();

    const user = useSelector(userSelector);
    const [name, setName] = useState(user.fullName);
    const [phone, setPhone] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [avatar, setAvatar] = useState(null);
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
                        <div className="col-md-4 col-sm-4 howday">
                            <div className="titlelt">
                                <h2>
                                    Howdy, <strong> Felix!</strong>
                                </h2>
                                <div className="address">
                                    <ul className="nav ">
                                        <li className={infoManagerment === 'account' ? 'active' : ''}>
                                            <Link to="/myAccount/account">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </i>
                                                Account detail
                                            </Link>
                                        </li>

                                        <li className={infoManagerment === 'order' ? 'active' : ''}>
                                            <Link to="/myAccount/order">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faListUl} />
                                                </i>
                                                My orders
                                            </Link>
                                        </li>
                                        <li className={infoManagerment === 'address' ? 'active' : ''}>
                                            <Link to="/myAccount/address">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </i>
                                                My Addresses
                                            </Link>
                                        </li>
                                        <li className={infoManagerment === 'paymentMethods' ? 'active' : ''}>
                                            <Link to="/myAccount/paymentMethods">
                                                <i className="icon-menu-user">
                                                    <FontAwesomeIcon icon={faMoneyBill1} />
                                                </i>
                                                My PaymentMethods
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="login">
                                    <ul className="nav ">
                                        <li>
                                            <Link to="#">
                                                <img src={require('@/assets/image/Icon_Off.jpg')} alt="Icon_User.jpg" />{' '}
                                                log out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-8 porfolio">
                            {infoManagerment === 'account' || infoManagerment === undefined ? <Account /> : false}
                            {infoManagerment === 'order' ? <Order /> : false}
                            {infoManagerment === 'address' ? <Address /> : false}
                            {infoManagerment === 'paymentMethods' ? <PaymentMethods /> : false}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyAccount;
