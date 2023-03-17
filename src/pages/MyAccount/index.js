import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function MyAccount() {
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
                                        <li>
                                            <Link href="#">
                                                <img
                                                    src={require('@/assets/image/Icon_User.jpg')}
                                                    alt="Icon_User.jpg"
                                                />{' '}
                                                Account detail
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <img src={require('@/assets/image/Icon_Add.jpg')} alt="Icon_User.jpg" />{' '}
                                                Adderesses
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <img
                                                    src={require('@/assets/image/Icon_Listing.jpg')}
                                                    alt="Icon_User.jpg"
                                                />{' '}
                                                My orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <img
                                                    src={require('@/assets/image/Icon_Upload.jpg')}
                                                    alt="Icon_User.jpg"
                                                />{' '}
                                                Download
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="login">
                                    <ul className="nav ">
                                        <li>
                                            <Link href="#">
                                                <img
                                                    src={require('@/assets/image/Icon_Lock.jpg')}
                                                    alt="Icon_User.jpg"
                                                />{' '}
                                                change password
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <img src={require('@/assets/image/Icon_Off.jpg')} alt="Icon_User.jpg" />{' '}
                                                log out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-8 porfolio">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <Link href="#home">Billing Adress</Link>
                                </li>
                                <li>
                                    <Link href="#menu1">Shipping Address</Link>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="home" className="tab-pane fade in active">
                                    <div className="form">
                                        <form action="#" method="post">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <label>Country</label>
                                                    <br />
                                                    <input
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
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        placeholder="Hà nội"
                                                        required=""
                                                        className="city"
                                                    />
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
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        placeholder={12345}
                                                        required=""
                                                        className="zipcode"
                                                    />
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
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="felixdg@gmail.com"
                                                required=""
                                                className="gmail"
                                            />
                                            <button className="change">Save change</button>
                                        </form>
                                    </div>
                                </div>
                                <div id="menu1" className="tab-pane fade">
                                    <div className="form">
                                        <form action="#" method="post">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <label>Country</label>
                                                    <br />
                                                    <input
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
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        placeholder="Hà nội"
                                                        required=""
                                                        className="city"
                                                    />
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
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        placeholder={12345}
                                                        required=""
                                                        className="zipcode"
                                                    />
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
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="felixdg@gmail.com"
                                                required=""
                                                className="gmail"
                                            />
                                            <button className="change">Save change</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyAccount;
